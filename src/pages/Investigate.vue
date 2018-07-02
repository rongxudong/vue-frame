<template>
    <div class="bg-style">
        <div class="investigate-main">
            <div class="add-serve">
                <em>您可重新创建一个新的尽职调查服务，需重新签署协议，详细情况请联系融资顾问</em>
                <span>创建新服务</span>
            </div>
            <div class="basic">
                <div class="title">尽职调查-1</div>
                <ul class="content flex_start">
                    <li v-for="(item, idx) in content" :key="idx" class="flex_start">
                        <div class="step-item">
                            <div class="img horizontal_center">
                                <img :src="item.imgUrl"/>
                            </div>
                            <div class="txt">
                                <p class="text-center">{{item.title}}</p>
                                <button>{{item.buttonTxt}}</button>
                            </div>
                        </div>
                        <div class="arrow-right-icon" v-if="idx != 4"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                loading: false,
                post: null,
                error: null,
                content: [
                    {
                        title: '认证成功',
                        imgUrl: require('../assets/img/investigate/research-step1.png'),
                        buttonTxt: '实名认证',
                        toUrl: ''
                    },
                    {
                        title: '发起尽职调查服务',
                        imgUrl: require('../assets/img/investigate/research-step2.png'),
                        buttonTxt: '请耐心等待',
                        toUrl: ''
                    },
                    {
                        title: '协议未签署',
                        imgUrl: require('../assets/img/investigate/research-step3.png'),
                        buttonTxt: '签署协议',
                        toUrl: ''
                    },
                    {
                        title: '申请未填写',
                        imgUrl: require('../assets/img/investigate/research-step4.png'),
                        buttonTxt: '填写申请',
                        toUrl: ''
                    },
                    {
                        title: '结果未反馈',
                        imgUrl: require('../assets/img/investigate/research-step5.png'),
                        buttonTxt: '查看',
                        toUrl: ''
                    }
                ]
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
//                this.error = this.post = null
//                this.loading = true
                // replace getPost with your data fetching util / API wrapper
//                this.$ajax.post(this.$route.params.id, (err, post) => {
//                    this.loading = false
//                    if (err) {
//                        this.error = err.toString()
//                    } else {
//                        this.post = post
//                    }
//                })
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .investigate-main {
        position: relative;
        min-height: calc(100vh - .45rem - 100px);
        padding: 0 20px 20px;
        .add-serve {
            position: absolute;
            top: 10px;
            right: .2rem;
            z-index: 1;
            font-size:0.13rem;
            em {
                font-style: normal;
                color: rgba(102,102,102,1);
                margin-right: .2rem;
            }
            span {
                display: inline-block;
                height: 32px;
                padding: 0 .15rem;
                line-height: 32px;
                color: #fff;
                background-color: @base;
                .common_radius(16px);
                cursor: pointer;
                &:hover {
                    .lighten-hover(@base);
                }
            }
        }
        .content {
            width: 100%;
            padding: .3rem .1rem;
            li {
                .step-item {
                    .img {
                        width: 1.48rem;
                        min-width: 100px;
                        height: 1.48rem;
                        min-height: 100px;
                        background-color: RGBA(241, 240, 245, 1);
                        .common_radius(50%);
                        img {
                            width: .8rem;
                            min-width: 54px;
                            height: .8rem;
                            min-height: 54px;
                        }
                    }
                    .txt {
                        width: 100%;
                        text-align: center;
                        p {
                            color: RGBA(102, 102, 102, 1);
                            padding: .19rem 0 .13rem;
                        }
                        button {
                            display: inline-block;
                            padding: 8px 15px;
                            color: RGBA(153, 153, 153, 1);
                            border: 1px solid RGBA(153, 153, 153, 1);
                            font-size: 13px;
                            background-color: transparent;
                            .common_radius(16px);
                            &:hover {
                                border: 1px solid @base;
                                color: @base;
                            }
                        }
                    }
                }
                .arrow-right-icon {
                    width: 1rem;
                    min-width: 70px;
                    height: 1.48rem;
                    min-height: 70px;
                    background: url("../assets/img/investigate/arrow-right.png") center no-repeat;
                }
            }
        }
    }
</style>