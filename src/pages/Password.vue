<template>
    <div>
        密码
    </div>
</template>

<script>
    export default {
        data () {
            return {
//                params: [
//                    { "id":"1", "image": "https://img.mukewang.com/5abcc39c00018fd009360316.jpg" },
//                    { "id":"2", "image": "https://img.mukewang.com/5ac4a7940001a9aa09360316.jpg" },
//                    { "id":"3", "image": "https://img.mukewang.com/5acecbcd00019e0b09360316.jpg" },
//                    { "id":"4", "image": "https://img.mukewang.com/5ac3142b000166ec09360316.jpg" },
//                    { "id":"5", "image": "https://img.mukewang.com/5ac4a754000113f009360316.jpg" },
//                    { "id":"6", "image": "https://img.mukewang.com/5acde54700014ee509360316.jpg" }
//                ]
                params: {
                    row: []
                },
                imgUrl: ""
            }
        },
        methods: {
            getBannerList () {
                this.$ajax.get('banner', null, r => {
                    this.params.row = r.data.bannerList;
                    this.imgUrl = this.params.row[3].image;
                })
            }
        },
        created () {
            this.getBannerList();
        },
        beforeRouteEnter(to, from, next) {
            console.log(to.meta.keepAlive)
            next();
        },
        components: {
            'img-elem': {
                data (){
                    return {
                        defaultCover: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2423595334,4074539958&fm=27&gp=0.jpg"
                    }
                },
                props: ['data'],
                render: function (createElement, context) {
                    return createElement('img',{
                        attrs: {
                            src: this.data //后台返回的图片
                        },
                        on: {
                            'error': () => {
                                this.imgUrl = this.defaultCover //本地的默认图片重新赋值
                            }
                        }
                    }, this.$slots.default)
                }
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    #xdd {
        .text_overflow;
    }
    .el-carousel__item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: @base;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>