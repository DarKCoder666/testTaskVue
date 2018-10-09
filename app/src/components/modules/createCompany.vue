<template>
    <div class="createCompany">
        <h1>Create a Company</h1>
        <el-form :model="form" :rules="rules" ref="createCompanyForm">
            <el-form-item prop="name">
                <el-col :span="12">
                    <el-input v-model="form.name" placeholder="Name"></el-input>
                </el-col>
                <el-col :span="12">
                    <el-button type="primary" @click="submitForm('createCompanyForm')">Create</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import db from '../firebaseInit'

    export default {
        name: 'createcompany',
        data() {
            return {
                form: {
                    name: ''
                },
                rules: {
                    name: [
                        { required: true, message: 'Please input company name', trigger: 'blur' },
                        { min: 3, message: 'Length should be at least 3 characters', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            submitForm(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // Creating a new contract
                        db.collection('companies').add({
                            name: this.form.name
                        })
                        .then(docRef => {
                            // Company added
                        })
                        .catch(error => {
                            console.error('Error adding company: ', error)
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
    .createCompany {
        margin: 0 auto;
        max-width: 500px;
    }
</style>