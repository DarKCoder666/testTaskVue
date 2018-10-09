<template>
    <div>
        <el-container>
            <div class="companiesWrap">

                <createCompany></createCompany>
                <createContract></createContract>

                <h1>Companies</h1>

                <el-collapse v-model="activeName" accordion class="collapseCompanies">
                    <template v-for="item in $store.state.pageCompanies">
                        <el-collapse-item :title="item.name" :name="item.id">
                            <template v-if="item.contracts && item.contracts.length > 0">
                                <el-table :data="item.contracts" style="width: 100%">
                                    <el-table-column prop="clientName" label="Client" width="180">
                                    </el-table-column>
                                    <el-table-column prop="startDate" label="Start date" width="180">
                                    </el-table-column>
                                    <el-table-column prop="finishDate" label="Finish date">
                                    </el-table-column>
                                </el-table>

                            </template>
                        </el-collapse-item>
                    </template>
                </el-collapse>

                <el-pagination @current-change="pageChange" :current-page="$store.state.page" :page-size="$store.state.elementsPerPage" :pager-count="5" layout="prev, pager, next" :total="$store.state.amountOfCompanies">
                </el-pagination>
            </div>
        </el-container>
    </div>
</template>


<script>
    import createCompany from './modules/createCompany';
    import createContract from './modules/createContract';

    export default {
        name: 'companies',
        components: {
            createCompany,
            createContract
        },
        data() {
            return {
                activeName: 1,

            }
        },
        methods: {
            pageChange(newPage) {
                this.$store.commit('changePage', newPage)
            }
        },
        beforeMount() {
            if (!this.$store.state.loggedIn) {
                this.$router.replace('/');
            }
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