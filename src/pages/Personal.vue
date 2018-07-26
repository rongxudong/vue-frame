<template>
    <div class="box-container justify_content_center align_items-center flex_direction_column">

        <div class="flex_direction_row">
            <div>
                <h3 style="margin: 45px 0 0 0">头像</h3>
                <h3 style="margin: 100px 0 0 0">账号</h3>
                <h3 style="margin: 100px 0 0 0">真实姓名</h3>
            </div>

            <div style="margin: 0 0 0 50px">
                <img class="img-head"  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532520426978&di=fd6b3f143842f34b796fb85536e0b78f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0117e2571b8b246ac72538120dd8a4.jpg%401280w_1l_2o_100sh.jpg" alt="头像">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :headers="myHeaders"
                    :action="action"
                    :on-success="onUploadSuccess"
                    :on-error="onUploadError"
                    :show-file-list="false"
                    :auto-upload="true">
                    <el-button style="margin: 10px 0 0 0" type="primary" slot="trigger">更改头像</el-button>
                </el-upload>
                <h3 style="margin: 127px 0 0 0">师傅被妖怪抓走了</h3>
                <el-button style="margin: 10px 0 0 0" type="primary">去实名认证</el-button>
            </div>
        </div>
        <el-button style="margin: 50px 0 0 0" type="danger">退出登录</el-button>

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
                action: this.$store.state.baseUrl + "/api/bussinessAccount/yqq/uploadPic",
            }
        },
        methods: {
            onUploadSuccess(response, file, fileList) {
                console.log('success = response ='+response);
                console.log('success = file ='+file);
                console.log('success = fileList ='+fileList);

            },
            onUploadError(err, file, fileList) {
                console.log('err = err ='+err);
                console.log('err = file ='+file);
                console.log('err = fileList ='+fileList);
            }
        },
        created() {
            // this.url = this.$store.resUrl+localStorage.getItem('user').photo;
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
        width: 100px;
        height: 100px;
        border-radius: 50px;
        display: block;
    }


</style>
