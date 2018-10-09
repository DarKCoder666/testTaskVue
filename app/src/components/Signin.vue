<template>
    <div class="signin">
        <h1 class="">Sign in</h1>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">

            <el-form-item prop="email">
                <el-input v-model.number="ruleForm2.email" placeholder="Email"></el-input>
            </el-form-item>

            <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" placeholder="Password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'signin',

        data() {

            // Email validation
            const checkEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Please input the email'));
                }
                
                // RegEx to validate an email
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const isValid = re.test(String(value).toLowerCase());

                if (!isValid) {
                    callback(new Error('Email is invalid!'));
                } else {
                    callback();
                }
            };

            return {
                ruleForm2: {
                    pass: '',
                    email: ''
                },
                rules2: {
                    email: [
                        { validator: checkEmail, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                // Validating
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // Sign in
                        firebase.auth().signInWithEmailAndPassword(this.ruleForm2.email, this.ruleForm2.pass)
                            .then((user) => {
                                this.$router.replace('/');
                                this.$store.commit('loggedIn')
                            }, (error) => {
                                alert('Unfortunately something went wrong!');
                            });
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
    .signin {
        max-width: 500px;
        width: 90%;
        margin: auto;
    }
</style>