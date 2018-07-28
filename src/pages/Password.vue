<template>
    <div class="box-container bg-style justify_content_center align_items-center flex_direction_column">

        <div>
            <el-input
                style="width: 250px"
                class="input"
                placeholder="原密码"
                v-model="businessAccountResetPasswordModel.oldPassword"
                clearable>
            </el-input>
        </div>
        <div>
            <el-input
                style="width: 250px;margin-top: 17px"
                class="input"
                placeholder="新密码"
                v-model="businessAccountResetPasswordModel.newPassword"
                clearable>
            </el-input>
        </div>
        <div>
            <el-input
                style="width: 250px;margin-top: 17px"
                class="input"
                placeholder="确认新密码"
                v-model="businessAccountResetPasswordModel.newPasswordAgain"
                clearable>
            </el-input>
        </div>
        <el-button style="margin: 50px 0 0 0;width: 250px;" type="primary" v-on:click="changePassword">修改</el-button>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                businessAccountResetPasswordModel:{
                    newPassword: '',
                    newPasswordAgain: '',
                    oldPassword: '',
                },
            }
        },
        methods: {
            changePassword() {
                if (!this.businessAccountResetPasswordModel.oldPassword) {
                    this.$message({
                        type: 'error',
                        message: '请输入原密码'
                    })
                    return;
                }
                if (!this.businessAccountResetPasswordModel.newPassword) {
                    this.$message({
                        type: 'error',
                        message: '请输入新密码'
                    })
                    return;
                }
                if (!this.businessAccountResetPasswordModel.newPasswordAgain) {
                    this.$message({
                        type: 'error',
                        message: '请输入确认新密码'
                    })
                    return;
                }
                if (this.businessAccountResetPasswordModel.newPasswordAgain !== this.businessAccountResetPasswordModel.newPassword) {
                    this.$message({
                        type: 'error',
                        message: '两次密码不一致'
                    })
                    return;
                }
                this.$ajax.post('/api/bussiness/account/user/updatePassword',this.businessAccountResetPasswordModel,(res)=>{
                    if (res.code == 0){
                        this.$alert('修改成功！', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.businessAccountResetPasswordModel.oldPassword = '';
                                this.businessAccountResetPasswordModel.newPasswordAgain = '';
                                this.businessAccountResetPasswordModel.newPassword = '';
                            }
                        });
                    } else {
                        this.$message({
                            type:'error',
                            message:res.message
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    .box-container {
        background-color: white;
        width: 100%;
        height: 100%;
    }

    .input-password {
        margin: 0 0 0 30px;
    }

    .title {
        width: 150px;
    }

</style>
