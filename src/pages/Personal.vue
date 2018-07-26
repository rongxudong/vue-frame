<template>
    <div class="box-container flex_direction_column">

        <div class="flex_direction_row" style="margin-left: 100px">
            <div>
                <h3 class="text-title" style="margin: 100px 0 0 0">头像</h3>
                <h3 class="text-title" style="margin: 124px 0 0 0">账号</h3>
                <h3 class="text-title" style="margin: 100px 0 0 0">真实姓名</h3>
            </div>

            <div style="margin: 0 0 0 50px">
                <img class="img-head" :src="url" alt="头像">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :headers="myHeaders"
                    :action="action"
                    :on-success="onUploadSuccess"
                    :on-error="onUploadError"
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                    :auto-upload="true">
                    <el-button style="margin: 15px 0 0 0" type="primary" plain slot="trigger" size="medium">更改头像</el-button>
                </el-upload>
                <h3 class="text-content" style="margin: 40px 0 0 0">{{$store.state.user.username}}</h3>
                <h3 style="margin: 100px 0 0 0" v-if="$store.state.user.identifyStatus == 1">
                    {{$store.state.user.name}}</h3>
                <el-button size="small" style="margin: 90px 0 0 0" type="primary" v-else v-on:click="navRealName">去实名认证</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                url: '',
                myHeaders: {
                    token: this.$store.state.token
                },
                action: this.$store.state.baseUrl + "/api/bussiness/account/user/uploadPic",
            }
        },
        methods: {
            navRealName() {
                this.$router.push({
                    path:'/RealName',
                })
            },
            // logout() {
            //     this.$alert('确认退出！', '提示', {
            //         confirmButtonText: '确定',
            //         callback: action => {
            //             this.$ajax.post('/api/bussiness/account/user/logout', null, res => {
            //                 if (res.code == 0) {
            //                     document.location.replace(this.$store.state.baseUrl.replace('account.', ''));
            //                 } else {
            //                     this.$message({
            //                         type: 'error',
            //                         message: res.message
            //                     })
            //                 }
            //             })
            //
            //         }
            //     })
            // },
            onUploadSuccess(response, file, fileList) {
                if (response.code == 0) {
                    this.$alert('修改头像成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$store.state.user.photo = response.data;
                            this.url = this.$store.state.resUrl + this.$store.state.user.photo;

                        }
                    })
                }

            },
            onUploadError(err, file, fileList) {
                console.log('err = err =' + JSON.stringify(err));
                console.log('err = file =' + file);
                console.log('err = fileList =' + fileList);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 2MB!');
                    return false;
                }
                if (isJPG) {
                    return true
                }
                if (isPNG) {
                    return true
                }
                this.$message.error('请上传png或者jpg格式的头像')
                return false;
            }
        },
        created() {
            this.url = this.$store.state.resUrl + this.$store.state.user.photo;

        }
    }
</script>

<style lang="less" rel="stylesheet/less">

    .box-container {
        background-color: white;
        width: 100%;
        height: 780px;

    }

    .img-head {
        width: 84px;
        height: 84px;
        border-radius: 42px;
        display: block;
        margin-top: 65px;
    }
    .text-title{
        font-size: 15px;
        color: #666666;
        font-family: MicrosoftYaHei;
    }
    .text-content{
        font-size: 14px;
        color: #666666;
        font-family: MicrosoftYaHei;
    }


</style>
