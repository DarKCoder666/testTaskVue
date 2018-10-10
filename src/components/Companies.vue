<template>
    <div>
        <el-container>
            <div class="companiesWrap">

                <!-- <createCompany></createCompany>
                <createContract></createContract> -->

                <h1>Companies</h1>

                <el-collapse v-model="activeName" accordion class="collapseCompanies">
                    
                    <template v-for="item in $store.state.companies[$store.state.page]">
                        <el-collapse-item :title="item.name" :name="item.id">

                            <template v-if="item.contracts && item.contracts.length > 0">
                                <el-table :data="item.contracts ? item.contracts : []" style="width: 100%">
                                    <el-table-column prop="number" label="Contract" width="180">
                                    </el-table-column>
                                    <el-table-column prop="clientName" label="Client" width="180">
                                    </el-table-column>
                                    <el-table-column prop="signed_at" label="Start date" width="180">
                                    </el-table-column>
                                    <el-table-column prop="valid_till" label="Finish date">
                                    </el-table-column>
                                </el-table>

                                <template v-if="(item.amountOfContracts / item.contractsPerPage) > 1">
                                    <el-pagination 
                                        @current-change="contractsPageChange" 
                                        :current-page="item.contractsPage + 1" 
                                        :page-size="item.contractsPerPage" 
                                        :pager-count="5"
                                        small
                                        layout="prev, pager, next" :total="item.amountOfContracts">
                                    </el-pagination>
                                </template>

                            </template>

                        </el-collapse-item>
                    </template>

                </el-collapse>

                <el-pagination 
                    @current-change="companiesPageChange" 
                    :current-page="$store.state.page + 1" 
                    :page-size="$store.state.perPage" 
                    :pager-count="5" 
                    layout="prev, pager, next" 
                    background
                    :total="$store.state.amountOfCompanies">
                </el-pagination>
            </div>
        </el-container>
    </div>
</template>


<script>
    // import createCompany from './modules/createCompany';
    // import createContract from './modules/createContract';

    export default {
        name: 'companies',
        data() {
            return {
                activeName: 1
            }
        },
        methods: {
            companiesPageChange(newPage) {
                this.$store.commit('loadCompaniesList', newPage -1)
            },
            contractsPageChange(newPage) {
                const page = this.$store.state.page,
                      perPage = this.$store.state.perPage,
                      activeIndex = this.activeName - page * perPage - 1;
                this.$store.commit('changeContractsPage', [page, activeIndex, newPage - 1]);
            },
        }
    }
</script>

<style>
    .collapseCompanies {
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
    }

    .companiesWrap {
        width: 90%;
        margin: 0 auto;
    }
</style>