<template>
    <div class="createContract">
        <h2>Create a contract</h2>
        <el-form :model="form" :rules="rules" ref="createCompanyForm">
            <el-form-item>
                <el-col :span="24" class="mb-20">
                    <el-date-picker v-model="form.date" type="daterange" range-separator="To" start-placeholder="Start date"
                        end-placeholder="End date">
                    </el-date-picker>
                </el-col>

                <el-col :span="24" class="mb-20">
                    <el-col :span="12" class="mb-20">
                        <el-select v-model="form.seller" placeholder="Seller">
                            <template v-for="el in $store.state.allCompanies">
                                <el-option :label="el.name" :value="el.id"></el-option>
                            </template>
                        </el-select>
                    </el-col>
                    <el-col :span="12" class="mb-20">
                        <el-select v-model="form.client" placeholder="Client">
                            <template v-for="el in $store.state.allCompanies">
                                <el-option :label="el.name" :value="el.id"></el-option>
                            </template>
                        </el-select>
                    </el-col>
                </el-col>

                <el-col :span="24" class="mb-20">
                    <el-button type="primary" @click="submitForm('createCompanyForm')">Create</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'createcontract',
        data() {
            return {
                form: {
                    date: '',
                    seller: '',
                    client: ''
                },
                rules: {
                    seller: [
                        { required: true, message: 'Please choise the seller', trigger: 'blur' }
                    ],
                    client: [
                        { required: true, message: 'Please choise the client', trigger: 'blur' },
                    ],
                    date: [
                        { required: true, message: 'Please choise the dates', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            submitForm(name) {
                // Validation the form
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // Creating a new contract
                        db.collection('contracts').add({
                            seller: this.form.seller,
                            client: this.form.client,
                            startDate: this.form.date[0],
                            finishDate: this.form.date[1]
                        })
                            .then(docRef => {
                                // Contract added
                            })
                            .catch(error => {
                                console.error('Error adding contract: ', error)
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .createContract {
        margin: 0 auto;
        max-width: 500px;
    }

    .mb-20 {
        margin-bottom: 20px;
    }
</style>