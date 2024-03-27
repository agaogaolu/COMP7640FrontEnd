<template>
    <div>
        <div class="header">
            Personal Information
        </div>
        <div class="body">
            <el-form ref="form" :model="form" label-width="23%" id="selectForm" :rules="form_rules">
                <el-form-item label="Original password:" prop="old_pwd">
                    <el-input v-model="form.old_pwd" type="password" show-password></el-input>
                </el-form-item>

                <el-form-item label="New password:" prop="new_pwd">
                    <el-input v-model="form.new_pwd" type="password" show-password></el-input>
                </el-form-item>

                <el-form-item label="Confirm password:" prop="check_pwd">
                    <el-input v-model="form.check_pwd" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item style="text-align:center;">
                    <el-button type="primary" @click="change()">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { msgPwdChange } from '@/api/msg'

export default {
    created() {
        // this.getdata()
    },
    data() {
        return {
            form: {
                old_pwd: '',
                new_pwd: '',
                check_pwd: '',
            },
            form_rules: {
                old_pwd: [{ required: true, message: "mandatory field", trigger: 'blur' }],
                new_pwd: [{ required: true, message: "mandatory field", trigger: 'blur' }],
                check_pwd: [{ required: true, message: "mandatory field", trigger: 'blur' }]
            }
        }
    },
    methods: {
        async changePwd() {
            const res = await msgPwdChange(this.form)
            if (res.status == 200) {
                this.$message({
                    message: res.msg,
                    type: "success"
                })
            } else {
                this.$message({
                    message: res.msg,
                    type: "error"
                })
            }
        },

        change() {

            this.$refs.form.validate(valid => {
                if (!valid)
                    return;
                else //Authentication passes before sending the request
                    if (this.form.check_pwd == this.form.new_pwd) {
                        this.changePwd()
                    }
                    else {
                        this.$message({
                            message: "New password does not match the confirmation password",
                            type: "error"
                        })
                    }
            })
        }

    },
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 10%;
    text-align: center;
    line-height: 64px;
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid #e3e3e3;
}

.body {
    width: 40%;
    /* margin: auto; */
    margin-top: 30px;
    margin-left: 30px;

}

#selectForm>>>.el-form-item__label {
    font-size: 18px;
}

span {
    font-size: 18px;
}
</style>