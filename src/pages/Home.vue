<template>
    <div class="Home-main">
        <div class="left bg-style">
            <div class="top">
                <div class="title">
                    <span>{{UseStep.title}}</span>
                </div>
                <div class="left-wrapper flex_start" style="padding-left: .18rem;">
                    <div v-for="(item, index) in UseStep.step" :key="index" class="flex_start">
                        <div class="step">
                            <div class="step-icon-wrap horizontal_center">
                                <img :src="item.url"/>
                            </div>
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="title">
                    <span>信息</span>
                    <a href="#">MORE &gt;&gt;</a>
                </div>
                <div class="msg-item align_items" v-for="(item, index) in DataMessageList" :key="item.index">
                    <div class="sign" v-if="item.type == 0"></div>
                    <div class="msg-item-left">
                        <h1>{{item.title}}</h1>
                        <p class="text_overflow">{{item.content}}</p>
                        <span>{{item.date}}</span>
                    </div>
                    <div class="msg-item-right flex_end">
                        <button type="button" class="look-btn">查看详情</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="title" style="margin: .18rem 0;">
                <span>公告栏</span>
                <a href="#">MORE &gt;&gt;</a>
            </div>
            <div class="right-list">
                <div class="item" v-for="(item, index) in DataResList" :key="item.index">
                    <div class="file-name text_overflow">
                        <i :class="[
                                { 'icon-word':item.type == 1 },
                                { 'icon-JPGs':item.type == 2 },
                                { 'icon-pdf':item.type == 3 },
                                { 'icon-wenjian':item.type == 4 }
                                ]">
                        </i>
                        {{item.title}}
                    </div>
                    <div class="file-operate align_items flex_end">
                        <span class="operate look" @click="onLook()">查看</span>
                        <span class="operate upLoad" @click="onDownload()">下载</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                UseStep: {
                    title: '使用流程查看',
                    step: [
                        {
                            name: '尽职调查',
                            url: require('../assets/img/Home/step1.png')
                        },
                        {
                            name: 'GTR评估',
                            url: require('../assets/img/Home/step2.png')
                        },
                        {
                            name: '授信申请',
                            url: require('../assets/img/Home/step3.png')
                        },
                        {
                            name: '商账管理',
                            url: require('../assets/img/Home/step4.png')
                        }
                    ]
                },
                DataResList: [],
                DataMessageList: []
            }
        },
        methods: {
            getResList () {
                this.$ajax.get('/api/HomeRes', null, r => {
                    this.DataResList = r.data.data.resList;
                })
            },
            getMessageList () {
                this.$ajax.get('/api/HomeRes', null, r => {
                    this.DataMessageList = r.data.data.messageList;
                })
            },
            onLook () {
                window.open('https://www.baidu.com','_blank');
            },
            onDownload () {
                alert('2')
            }
        },
        created () {
            this.getResList();
            this.getMessageList();
        },
        beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta
            to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
            next();
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";
    @import "../assets/css/_common";

    .Home-main {
        width: 100%;
        .justify_content;
        .left {
            float: left;
            width: 62%;
            min-width: 320px;
            padding: .3rem 20px;
            .border-bottom-radius(5px);
            border-top-right-radius: 5px;
            .bottom {
                padding-top: 30px;
                .msg-item {
                    position: relative;
                    padding: 10px 0;
                    margin-left: .24rem;
                    border-bottom: 1px solid RGBA(27, 160, 208, .14);
                    .msg-item-left {
                        float: left;
                        width: 80%;
                    }
                    .msg-item-right {
                        float: left;
                        width: 20%;
                    }
                    .sign {
                        position: absolute;
                        left: -19px;
                        top: 16px;
                        z-index: 1;
                        width: 8px;
                        height: 8px;
                        background-color: @Danger;
                        .common_radius(50%);
                    }
                    h1 {
                        font-size: 15px;
                        color: rgba(50,50,50,1);
                        line-height: 23px;
                    }
                    p {
                        width: 100%;
                        height: 18px;
                        font-size: .14rem;
                        line-height: 18px;
                    }
                    span {
                        display: inline-block;
                        margin-top: 7px;
                        font-size: .13rem;
                        color: @minor-col;
                    }
                    .look-btn {
                        width: 0.88rem;
                        min-width: 60px;
                        height: 30px;
                        line-height: 30px;
                        font-size: .14rem;
                        color: rgba(44,151,255,1);
                        text-align: center;
                        border: 1px solid rgba(44,151,255,1);
                        background-color: #fff;
                        .common_radius(15px);
                        &:hover {
                            color: #fff;
                            background-color: rgba(44,151,255,1);
                        }
                    }
                }
                .msg-item:last-of-type {
                    border-bottom: none;
                }
            }
            .left-wrapper {
                width: 100%;
                padding: .32rem 0 .48rem;
                border-bottom: 1px solid RGBA(182, 194, 202, .4);
                .step {
                    margin-right: 1rem;
                    text-align: center;
                }
                .step-icon-wrap {
                    width: 1.34rem;
                    min-width: 100px;
                    height: 1.34rem;
                    min-height: 100px;
                    text-align: center;
                    background:rgba(241,240,245,1);
                    .common_radius(50%);
                    img {
                        display: inline-block;
                        width: .8rem;
                        min-width: 60px;
                        height: .8rem;
                        min-height: 60px;
                    }
                }
                p {
                    color: @main-col;
                    margin-top: .22rem;
                    font-size: .16rem;
                }
            }
        }
        .right {
            float: right;
            width: 36.25%;
            min-width: 320px;
            padding: .15rem .32rem;
            .common_radius(5px);
            .bg-style;
            .right-list {
                width: 100%;
                padding: .1rem 0;
                border-top: 1px solid RGBA(182, 194, 202, .4);
                .item {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    cursor: pointer;
                    color: @main-col;
                    .file-name {
                        float: left;
                        width: 70%;
                        height: .44rem;
                        min-height: 42px;
                        padding-left: .48rem;
                        line-height: 42px;
                    }
                    .file-operate {
                        float: left;
                        width: 30%;
                        height: 42px;
                        line-height: 42px;
                    }
                    i {
                        position: absolute;
                        top: .14rem;
                        left: .04rem;
                        width: 22px;
                        height: 22px;
                    }
                    .icon-word {
                        background: url("../assets/img/Home/file-word.png") no-repeat center left;
                    }
                    .icon-JPGs {
                        background: url("../assets/img/Home/file-photo.png") no-repeat center left;
                    }
                    .icon-pdf {
                        background: url("../assets/img/Home/file-pdf.png") no-repeat center left;
                    }
                    /*.icon-ELXs {*/
                        /*background: url("../assets/img/Home/file-word.png") no-repeat center left;*/
                    /*}*/
                    .icon-wenjian {
                        background: url("../assets/img/Home/file-txt.png") no-repeat center left;
                    }
                    .operate {
                        display: inline-block;
                        width: 56px;
                        height: 26px;
                        line-height: 26px;
                        text-align: center;
                        margin-left: .08rem;
                        font-size: .13rem;
                        .common_radius(13px);
                        &:hover {
                            color: #fff;
                        }
                    }
                    span.look {
                        color: RGBA(46, 170, 253, 1);
                        border: 1px solid RGBA(46, 170, 253, 1);
                        &:hover {
                            background-color: RGBA(46, 170, 253, 1);
                        }
                    }
                    span.upLoad {
                        color: RGBA(84, 190, 117, 1);
                        border: 1px solid RGBA(84, 190, 117, 1);
                        &:hover {
                            background-color: RGBA(84, 190, 117, 1);
                        }
                    }
                }
            }
        }
        .title {
            position: relative;
            overflow: hidden;
            color: #58666E;
            padding-left: 20px;
            height: 18px;
            line-height: 18px;
            font-size: .16rem;
            font-weight: bold;
            span {
                float: left;
                &:before {
                    content: '';
                    position: absolute;
                    left: 6px;
                    top: 0;
                    z-index: 1;
                    width: 4px;
                    height: 16px;
                    font-size: .16rem;
                    background-color: #2C97FF;
                    .common_radius(2px);
                }
            }
            .all-read {
                margin-left: 30px;
                font-size: 12px;
                color: @minor-col;
                cursor: pointer;
                &:before {
                    content: '\e671';
                }
            }
            a {
                float: right;
                color: RGBA(153, 153, 153, 1);
                font-size: 12px;
                &:hover {
                    text-decoration: none;
                    color: @base;
                }
            }
        }
    }
    @media (max-width: 1280px) {
        .Home-main {
            display: block;
            .left {
                clear: none;
                width: 100%;
            }
            .right {
                clear: none;
                width: 100%;
                margin-top: 30px;
            }
        }
    }
</style>