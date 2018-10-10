import Vue from 'vue';
import Vuex from 'vuex';

import { Companies, Contracts } from '../services/resources';

const companies = new Companies();
const contracts = new Contracts();

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        page: 0,                // Current page number
        perPage: 5,             // Amount of companies/contracts per page
        companies: [],          // The list of companies that will be shown. Consist of objects where index is (page number - 1)
        companiesOriginal: [],  // Need this one, to compare for updates before making a request for a newest data, because in 'companies' property are changed objects with contracts and name properties
        amountOfCompanies: 0,
    },
    getters: {
        getState(state) {
            return state
        }
    },
    mutations: {
        /**
         * Initialize store base data 
         * 
        */
        initStore() {
            this.loadCompaniesList(); // Loadign companies to show
        },

        /** 
         * Loads list of companies.
           If the requested list of companies is loaded show it first and then make a request for the same information to the db
           to check the list for updates. Othervise load it.
         * @param page {Number} The number of the page which user is going to move. Starts from 0.
         */
        async loadCompaniesList(state, page = 0) {
            let list = state.companies[page];
            let listOriginal = state.companiesOriginal[page]; // Need this to check for updates

            // If the list already loaded

            const res = await companies.list(page, state.perPage);
            const newList = res.data;

            state.amountOfCompanies = res.meta.total; // Set amount of companies

            // If there is no need in updates
            if (Vue._.isEqual(newList, listOriginal)) {
                this.commit('loaded', true);  // Hide Updating preloader
                return;
            }

            // Next, we get ask to check for a contracts in 'loadContractsList',
            // and without waiting change companies in state to the ones, which we got from db.
            let pageContractsPromise = [];

            for (let i = 0; i < newList.length; i++) {
                const comp = newList[i];
                pageContractsPromise.push(this.commit('loadContractsList', { sid: comp.id }));
            }

            Promise.all(pageContractsPromise);

            let companiesNew = Object.assign({}, state.companies);
            companiesNew[page] = newList;
            state.page = page;
            state.companies = Object.assign([], { ...state.companies }, { ...companiesNew });
            console.log(state);
        },

        async loadContractsList(state, { sid, page = 0, perPage = 3 }) {
            let theContracts = await contracts.getBatchByElementValue('sid', sid, page, perPage);
            const theContractsAmount = theContracts.meta.total;
            theContracts = theContracts.data;
            let theCompaniesPromise = [];
            let newPage = page;

            for (let i = 0; i < theContracts.length; i++) {
                let contract = theContracts[i];
                // First of all, look through all companies which are already loaded
                state.companies.forEach(page => {
                    page.forEach(c => {
                        if (c.id === contract.cid) {
                            contract.clientName = c.name;
                            theContracts[i] = contract;
                        }
                    });
                });

                // Othervise, make a request to db to get not existing contract client company,
                // because we need to get its name(by id)
                theCompaniesPromise.push(companies.find(contract.cid));
            }

            // As we got all needed information about companies
            theCompaniesPromise = Promise.all(theCompaniesPromise).then((res) => {
                theCompaniesPromise = res;

                // We fill the names of the companies to their object in state
                for (let i = 0; i < theCompaniesPromise.length; i++) {
                    const theCompany = theCompaniesPromise[i];

                    for (let j = 0; j < theContracts.length; j++) {
                        let contract = theContracts[j];
                        if (contract.clientName) break;

                        contract.clientName = theCompany.name;
                        theContracts[j] = contract;
                    }
                }

                // And now, evrything is ready and we can just change the object in state by newest one, with contracts property in it.
                for (let i = 0; i < state.companies.length; i++) {
                    const pageElements = state.companies[i];
                    for (let j = 0; j < pageElements.length; j++) {
                        const comp = pageElements[j];
                        if (comp.id === sid) {
                            let companiesNew = Object.assign({}, state.companies);
                            companiesNew[i][j].contracts = theContracts;
                            companiesNew[i][j].contractsPage = newPage;
                            companiesNew[i][j].amountOfContracts = theContractsAmount;
                            companiesNew[i][j].contractsPerPage = 3;

                            state.companies = Object.assign([], { ...state.companies }, { ...companiesNew });
                        }
                    }
                }
            });

            await theCompaniesPromise;
        },

        // Vue.set(state.companies[page][index], 'contractsPage', newPageNumber);
        // Vue.set(state.companies[page][index], 'contracts', []);
        // console.log(state.companies[page][index].id, newPageNumber);
        changeContractsPage(state, [page, index, newPageNumber]) {
            this.commit('loadContractsList', { sid: state.companies[page][index].id, page: newPageNumber });
            return state;
        },

    }
});