<template>
    <div class="signup">
        <h1 class="">Sign up</h1>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">

            <el-form-item prop="email">
                <el-input v-model.number="ruleForm2.email" placeholder="Email"></el-input>
            </el-form-item>

            <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" placeholder="Password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" placeholder="Repeat password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">Submit</el-button>
                <el-button @click="resetForm('ruleForm2')">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'signup',

        data() {
            // Validation functions
            const checkEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Please input the email'));
                }

                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const isValid = re.test(String(value).toLowerCase());

                if(!isValid) {
                    callback(new Error('Email is invalid!'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password'));
                } else if(value.length < 6) {
                    callback(new Error('The password must be at least 6 characters!'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('Two inputs don\'t match!'));
                } else {
                    callback();
                }
            };

            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    email: ''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    email: [
                        { validator: checkEmail, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                // On submit validate all of the inputs by their validating functions
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // Sending request to create a user to the firebase
                        firebase.auth().createUserWithEmailAndPassword(this.ruleForm2.email, this.ruleForm2.pass)
                            .then((user) => {
                                // On success
                                this.resetForm(formName);
                                alert("Congratulations! \nYou are successfully signed up! \nNow you can sign in.");
                            }, (err) => {
                                // On error
                                alert('Unfortunately something went wrong!');
                                console.log(err);
                            })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    .signup {
        max-width: 500px;
        width: 90%;
        margin: auto;
    }
</style>