<template>
    <div class="container">
        <div class="login_box">
            <div class="head">
                Online Shopping System
            </div>
            <!-- log in -->
            <div v-show="target == 1">
                <el-form label-width="0" class="login_form" :model="login_form" :rules="login_rules" ref="login_form">
                    <!-- user ID -->
                    <el-form-item prop="userortel">
                        <el-input v-model="login_form.userortel" spellcheck="false" placeholder="Telephone Number">
                        </el-input>
                    </el-form-item>
                    <!-- password -->
                    <el-form-item prop="password">
                        <el-input v-model="login_form.password" show-password spellcheck="false" placeholder="Password">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="role">
                        <el-select v-model="login_form.role" placeholder="Plz choose your role">
                            <el-option v-for="item in role_options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <!-- button -->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="llogin()">Login</el-button>
                    </el-form-item>

                </el-form>
                <div>
                    <div class="operate">
                        <span id="op1" @click="change(2)">Register</span>
                        <span id="op2" @click="change(3)">Forgotten password</span>
                    </div>
                </div>
            </div>
        </div>


        <!-- registration form -->
        <div class="reg_box" v-show="target == 2">
            <div class="head">
                Online Shopping System
            </div>
            <div>
                <el-form class="reg_form" :model="reg_form" :rules="reg_rules" ref="reg_form">
                    <!-- username -->
                    <el-form-item prop="username">
                        <el-input prefix-icon="iconfont icon-user" v-model="reg_form.username" spellcheck="false"
                            placeholder="Username">
                        </el-input>
                    </el-form-item>
                    <!-- Password -->
                    <el-form-item prop="password">
                        <el-input prefix-icon="iconfont icon-password" v-model="reg_form.password" show-password
                            spellcheck="false" placeholder="Setting your Password"></el-input>
                    </el-form-item>

                    <el-form-item prop="telephone">
                        <el-input prefix-icon="iconfont icon-password" v-model="reg_form.telephone" spellcheck="false"
                            placeholder="Telephone Number"></el-input>
                    </el-form-item>

                    <el-form-item prop="role">
                        <el-select v-model="reg_form.role" placeholder="Plz choose your role">
                            <el-option v-for="item in role_options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- button -->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="zhuce()">Register!</el-button>
                    </el-form-item>

                </el-form>
                <div>
                    <div>
                        <span @click="change(1)"
                            style="margin-left:210px;color: #000;opacity: .5;font-weight: 400;font-size: 16px;cursor:pointer;">Login</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Retrieve password -->
        <div class="forget_box" v-show="target == 3">
            <div class="head">
                Online Shopping System
            </div>
            <div>
                <el-form class="reg_form" :model="findback_form" :rules="findback_rules" ref="findback_form">



                    <el-form-item prop="telephone">
                        <el-input prefix-icon="iconfont icon-password" v-model="reg_form.telephone" spellcheck="false"
                            placeholder="Telephone Number"></el-input>
                    </el-form-item>
                    <!-- Password -->
                    <el-form-item prop="password">
                        <el-input prefix-icon="iconfont icon-password" v-model="reg_form.password" show-password
                            spellcheck="false" placeholder="New Password"></el-input>
                    </el-form-item>

                    <el-form-item prop="vercode">
                        <el-input v-model="reg_form.vercode" spellcheck="false" placeholder="CAPTCHA" style="width:230px">
                        </el-input>
                        <span style="width:120px;font-size: 16px;cursor: pointer;" @click="send_vercode_pre()"
                            v-show="getcode_show">
                            Get CAPTCHA
                        </span>

                        <span style="width:120px;font-size: 16px;cursor: pointer;" v-show="!getcode_show">
                            {{ time_count }}s Retrieve
                        </span>
                    </el-form-item>
                    <!-- button -->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="findback()">Confirmation of changes</el-button>
                    </el-form-item>

                </el-form>
                <div>
                    <div>
                        <span @click="change(1)"
                            style="margin-left:210px;color: #000;opacity: .5;font-weight: 400;font-size: 16px;cursor:pointer;">Login</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userLogin, userReg } from '@/api/login';

export default {
    name: 'MyLogin',
    data() {
        var checkPassword = (rule, value, cb) => {
            const regPassword = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,12}$/;
            if (regPassword.test(value)) {
                // 
                return cb()
            }
            return cb()
            // 
        };
        var checkMobile = (rule, value, cb) => {
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (regMobile.test(value)) {
                // 
                return cb()
            }
            return cb()
            // 
        };
        return {
            getcode_show: true,
            time_count: '',
            timer: null,
            target: 1,
            login_form: {
                userortel: '',
                password: '',
                role: '',
            },
            reg_form: {
                username: '',
                password: '',
                telephone: '',
                role: ''
            },
            findback_form: {
                userortel: '',
                password: '',
                vercode: '',
            },
            role_options: [{ label: "Users", value: "0" }, { label: "Admin", value: "1" }],
            login_rules: {
                userortel: [
                    { required: true, message: 'Please enter your phone number', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }],
                password: [
                    { required: true, message: 'Please enter your password', trigger: 'blur' }]
            },
            reg_rules: {
                username: [{ required: true, message: 'Please set the user name', trigger: 'blur' }],
                password: [{ required: true, message: 'Please set a password', trigger: 'blur' }, { validator: checkPassword, trigger: 'blur' }],
                telephone: [{ required: true, message: 'Please bind the cell phone number', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }]
            },
            findback_rules: {
                userortel: [
                    { required: true, message: 'Please enter your phone number', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }],
                password: [
                    { required: true, message: 'Please enter your password', trigger: 'blur' }]
            },
        }
    },
    methods: {
        findback() {
            this.$refs.findback_form.validate(valid => {
                if (!valid)
                    return;
                else if (this.findback_form.vercode == '')
                    return;
                else {
                    console.log(111);
                }
            })
        },
        async zhuce() {
            this.$refs.reg_form.validate(valid => {
                if (!valid)
                    return;
                else {
                    if (this.reg_form.vercode == '')
                        return;
                    else {
                        this.register()
                        // console.log(res.status);
                    }
                }
            })
        },
        async register() {
            await userReg(this.reg_form)

        },
        change(id) {
            this.target = id;
        },
        llogin() {
            this.$refs.login_form.validate(valid => {
                if (!valid)
                    return;
                else //Authentication passes before sending the request
                    this.login();
            })


        },
        async login() {
            const res = await userLogin(this.login_form)
            // console.log("res")
            console.log(res)
            this.$store.commit('user/setUserInfo', {
                token: res.token,
                role: this.login_form.role,
                ...(res.vendor_id ? { vendorId: res.vendor_id } : {}),
                ...(res.customer_id ? { customerId: res.customer_id } : {})
            })

            const userInfo = this.$store.getters.userInfo
            console.log(userInfo)
            if (userInfo.role == 0)
                this.$router.push('/user')
            else
                this.$router.push('/manage')
        },

        // Get CAPTCHA
        send_vercode_pre() {
            this.$refs.reg_form.validate(valid => {
                if (!valid) {
                    return;
                }
                else {
                    this.send_vercode();
                    // this.set_interval();
                }
            })
        },
        send_vercode() {
            this.$axios.request({
                method: 'POST',
                url: "/api/user/register/send_sms",
                data: {
                    telephone: this.reg_form.telephone
                }
            }).then(() => {

                this.$message({
                    message: 'Verification Code Sent Successfully',
                    type: 'success'
                })




            })
        },
        set_interval() {
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.time_count = TIME_COUNT;
                this.getcode_show = false;
                this.timer = setInterval(() => {
                    if (this.time_count > 0 && this.time_count <= TIME_COUNT) {
                        this.time_count--;
                    } else {
                        this.getcode_show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            }
        },

    }
}
</script>

<style lang="less" scoped>
.container {
    background-color: #2b4b6b;
    height: 100%;
    width: 100%;
}

.head {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: larger;
}

.login_box {
    height: 350px;
    width: 450px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.reg_box {
    height: 400px;
    width: 450px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.forget_box {
    height: 350px;
    width: 450px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.input {
    width: 350px;
    height: 50px;
    margin-left: 50px;
}

.el-form-item {
    width: 350px;
    margin-left: 50px;
}

.btns {
    text-align: center;
}

.operate {
    text-align: center;
    color: #000;
    opacity: .5;
    font-weight: 400;
    font-size: 16px;
    margin-left: 28px;
}

#op1 {
    padding-left: 15px;
    padding-right: 30px;
    border-right: 1px solid #bdb9b9;
    cursor: pointer;
}

#op2 {
    padding-left: 30px;
    padding-right: 15px;
    // border-right: 1px solid #e5e5e5;
    cursor: pointer;
}
</style>