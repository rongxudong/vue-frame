<template>
    <div class="personal-main flex_direction_column bg-style pd50">
        <el-form label-width="142px" label-position="left">
            <el-form-item :label="$t('personal.profilePhoto')" class="img-head-wrap">
                <img class="img-head" :src="imgDataUrl"/>
                <my-upload field="file"
                           @crop-success="cropSuccess"
                           @crop-upload-success="cropUploadSuccess"
                           @crop-upload-fail="cropUploadFail"
                           v-model="show"
                           :width="84"
                           :height="84"
                           :langType="getLangType"
                           :url="action"
                           :params="params"
                           :headers="myHeaders"
                           img-format="png">
                </my-upload>
                <el-button style="margin-top: 15px;" type="primary" size="small" @click="toggleShow">{{ $t('personal.changeProfilePhoto') }}</el-button>
            </el-form-item>
            <el-form-item :label="$t('personal.accountNo')">
                <p class="text-content">{{username}}</p>
            </el-form-item>
            <el-form-item :label="$t('personal.authenticName')">
                <p v-if="$store.state.user.baIdentifyStatus == 1">{{baName}}</p>
                <el-button size="small" type="primary" v-else @click="navRealName">{{ $t('personal.realNameAuthentication') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import myUpload from 'vue-image-crop-upload';

    export default {
        data() {
            return {
                imgDataUrl: require('../assets/img/Home/default-avatar-img.png'),
                action: this.$store.state.baseUrl + "/api/bussiness/account/user/uploadPic",
                params: null,
                myHeaders: {
                    token: this.$store.state.token
                },
                show: false,
                username: null,
                baName: null,
                getLangType: null
            }
        },
        components: {
            'my-upload': myUpload
        },
        methods: {
            toggleShow () {
                this.show = !this.show;
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field){
//                console.log('-------- crop success --------');
//                console.log(imgDataUrl);
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
//                console.log('-------- upload success --------');
                console.log(jsonData);
//                console.log('field: ' + field);
                this.$store.commit('set_avatar_img', jsonData.data);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            },
            navRealName() {
                this.$router.push({
                    path:'/RealName',
                })
            },
            getAvatarImg () {
                this.imgDataUrl = this.$store.state.resUrl + this.$store.state.avatarImg;
                this.username = this.$store.state.user.username;
                this.baName = this.$store.state.user.baName;
            }
        },
        computed: {
            user () {
                return this.$store.state.user
            },
            avatarImg () {
                return this.$store.state.avatarImg
            },
            listenLanguage () {
                return this.$store.state.isLanguage
            }
        },
        watch: {
            user: function (a, b) {
                this.username = a.username;
                this.baName = a.baName;
            },
            avatarImg: function(a, b) {
                this.imgDataUrl = this.$store.state.resUrl + a;
            },
            listenLanguage: function (a, b) {
                switch (a) {
                    case 'zh_CN':
                        this.getLangType = 'zh';
                        break;
                    case 'en':
                        this.getLangType = 'en';
                        break;
                    default:
                        this.getLangType = 'zh';
                }
            }
        },
        created () {
            setTimeout(()=>{
                this.getAvatarImg();
            },1000);
            switch (this.$store.state.isLanguage) {
                case 'zh_CN':
                    this.getLangType = 'zh';
                    break;
                case 'en':
                    this.getLangType = 'en';
                    break;
                default:
                    this.getLangType = 'zh';
            }
        },
//        beforeRouteLeave(to, from, next) {
//            // 设置下一个路由的 meta
//            to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
//            next();
//        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../assets/css/_mixin";
    .personal-main {
        width: 100%;
        height: 100%;
        background-color: #fff;
        .img-head-wrap .el-form-item__label {
            margin-top: 22px;
        }
    }
    .pd50 {
        padding: 50px;
    }
    .img-head {
        width: 84px;
        height: 84px;
        .common_radius(100%);
        display: block;
    }
    .text-title{
        font-size: 14px;
        color: RGBA(102, 102, 102, 1);
        font-family: MicrosoftYaHei;
    }
    .text-content{
        font-size: 14px;
        color: #666666;
        font-family: MicrosoftYaHei;
    }
</style>
