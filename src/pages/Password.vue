<template>
    <div class="psd-main bg-style justify_content_center align_items-center flex_direction_column">
        <el-input
            class="input w250"
            :placeholder="$t('password.oldPassword')"
            v-model="businessAccountResetPasswordModel.oldPassword"
            clearable>
        </el-input>
        <el-input
            style="margin-top: 17px"
            class="input w250"
            :placeholder="$t('password.newPassword')"
            v-model="businessAccountResetPasswordModel.newPassword"
            clearable>
        </el-input>
        <el-input
            style="margin-top: 17px"
            class="input w250"
            :placeholder="$t('password.confirmPassword')"
            v-model="businessAccountResetPasswordModel.newPasswordAgain"
            clearable>
        </el-input>
        <el-button class="w250" style="margin: 50px 0 0 0;" type="primary" v-on:click="changePassword">{{ $t('password.change') }}</el-button>
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
                        message: this.$t('password.enterOriginalPassword')
                    })
                    return;
                }
                if (!this.businessAccountResetPasswordModel.newPassword) {
                    this.$message({
                        type: 'error',
                        message: this.$t('password.enterNewPassword')
                    })
                    return;
                }
                if (!this.businessAccountResetPasswordModel.newPasswordAgain) {
                    this.$message({
                        type: 'error',
                        message: this.$t('password.enterNewRepassword')
                    })
                    return;
                }
                if (this.businessAccountResetPasswordModel.newPasswordAgain !== this.businessAccountResetPasswordModel.newPassword) {
                    this.$message({
                        type: 'error',
                        message: this.$t('password.passwordDoesntMatch')
                    })
                    return;
                }
                if (this.businessAccountResetPasswordModel.oldPassword === this.businessAccountResetPasswordModel.newPassword) {
                    this.$message({
                        type: 'error',
                        message: this.$t('password.enterNewOldPassword')
                    })
                    return;
                }
                this.$ajax.post('/api/bussiness/account/user/updatePassword',this.businessAccountResetPasswordModel,(res)=>{
                    if (res.code == 0){
                        this.$alert(this.$t('password.success'), this.$t('dialog.tips'), {
                            confirmButtonText: this.$t('dialog.ok'),
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
    .psd-main {
        width: 100%;
        height: 100%;
        padding: 50px;
        .w250 {
            width: 250px;
        }
    }

    .input-password {
        margin: 0 0 0 30px;
    }

    .title {
        width: 150px;
    }
</style>
