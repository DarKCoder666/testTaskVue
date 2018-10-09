import Vue from 'vue';
import Vuex from 'vuex';

import db from './components/firebaseInit'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loggedIn: false,
        page: 1,
        elementsPerPage: 10,
        pageCompanies: [],
        allCompanies: []
    },
    mutations: {
        initCompaniesListener(state) {
            // Listening for the newcoming data and putting it into the state
            const companies = db.collection('companies');
            companies.onSnapshot(async (docSnapshot) => {
                const allElems = await companies.orderBy('name').get();
                let elements = [];
                if(state.page == 1) {
                    elements = await companies.orderBy('name').limit(10).get();
                } else {
                    const startAtId = allElems.docs[(state.page - 1) * state.elementsPerPage].id;
                    elements = await companies.orderBy('name').startAt(startAtId).limit(10).get();
                }

                state.amountOfCompanies = allElems.docs.length;

                state.allCompanies = allElems.docs.map((el, i) => ({
                    id: el.id,
                    name: el.data().name
                }));

                state.pageCompanies = elements.docs.map(async (el, i) => {
                    let element = {
                        ...el.data(),
                        contracts: []
                    };
                    const seller_contracts = (await db.collection('contracts').where("seller", "==", el.id).get()).docs;

                    seller_contracts.forEach(async (e) => {
                        let data = e.data();
                        state.allCompanies.forEach(e => {
                            if(data.client == e.id) {
                                data.clientName = e.name;
                                data.finishDate = data.finishDate.toDate();
                                data.startDate = data.startDate.toDate();

                                data.finishDate = `${data.finishDate.getFullYear()}/${data.finishDate.getDate()}/${data.finishDate.getMonth() + 1}`;
                                data.startDate = `${data.startDate.getFullYear()}/${data.startDate.getDate()}/${data.startDate.getMonth() + 1}`;
                            }
                        });

                        element.contracts.push(data);
                    })
                    return element;
                });

                state.pageCompanies = await Promise.all(state.pageCompanies);
                console.log(state.pageCompanies);
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
        },
        loggedIn(state) {
            state.loggedIn = true;
        },
        loggedOut(state) {
            state.loggedIn = false;
        },
        changePage(state, newPage) {
            console.log(arguments);  
            state.page = newPage;
            this.commit('initCompaniesListener');
        },
    }
});