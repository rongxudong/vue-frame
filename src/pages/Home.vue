<template>
    <div class="Home-main justify_content">
        <div class="left">
            <div class="top bg-style">
                <div class="title">
                    <span>使用查看流程</span>
                </div>
                <div class="left-wrapper justify_content">
                    <div class="step">
                        <span class="step-icon">
                            <i class="iconfont icon-shimingrenzheng"></i>
                        </span>
                        <p>实名认证</p>
                    </div>
                    <i class="iconfont icon-jiantou2"></i>
                    <div class="step">
                        <span class="step-icon">
                            <i class="iconfont icon-ERP_xieyibianhao"></i>
                        </span>
                        <p>签署协议</p>
                    </div>
                    <i class="iconfont icon-jiantou2"></i>
                    <div class="step">
                        <span class="step-icon">
                            <i class="iconfont icon-shenqingqiyerenzheng"></i>
                        </span>
                        <p>授信申请</p>
                    </div>
                    <i class="iconfont icon-jiantou2"></i>
                    <div class="step">
                        <span class="step-icon">
                            <i class="iconfont icon-yijianfankui"></i>
                        </span>
                        <p>反馈结果</p>
                    </div>
                </div>
            </div>
            <div class="bottom bg-style">
                <div class="title">
                    <span>信息</span>
                    <b class="iconfont all-read" @click="allRead()">全部标记为已读</b>
                    <a href="#" class="iconfont">更多</a>
                </div>
                <div class="left-wrapper">
                    <el-row :gutter="20" class="msg-item align_items" v-for="(item, index) in DataMessageList" :key="item.index">
                        <div class="sign" v-if="item.type == 0"></div>
                        <el-col :span="19">
                            <div class="grid-content bg-purple">
                                <h1>{{item.title}}</h1>
                                <p class="text_overflow">{{item.content}}</p>
                                <span>{{item.date}}</span>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple">
                                <button type="button" class="look-btn">查看</button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="title">
                <span>公告栏</span>
                <a href="#" class="iconfont">更多</a>
            </div>
            <div class="right-list">
                <el-row :gutter="0" class="item" v-for="(item, index) in DataResList" :key="item.index">
                    <el-col :span="16">
                        <div class="grid-content bg-purple text_overflow">
                            <i class="iconfont" :class="[
                                { 'icon-word':item.type == 1 },
                                { 'icon-JPGs':item.type == 2 },
                                { 'icon-pdf':item.type == 3 },
                                { 'icon-ELXs':item.type == 4 },
                                { 'icon-wenjian':item.type == 5 }
                                ]">
                            </i>
                            {{item.title}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple justify_content_center">
                            <span class="operate" @click="onLook()">
                                <i class="iconfont icon-chakan"></i>
                                <em>查看</em>
                            </span>
                            <span class="operate" @click="onDownload()">
                                <i class="iconfont icon-xiazai"></i>
                                <em>下载</em>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                DataResList: [],
                DataMessageList: []
            }
        },
        methods: {
            getResList () {
                this.$ajax.get('HomeRes', null, r => {
                    this.DataResList = r.data.resList;
                })
            },
            getMessageList () {
                this.$ajax.get('HomeRes', null, r => {
                    this.DataMessageList = r.data.messageList;
                })
            },
            allRead () {
                for(var j = 0; j < this.DataMessageList.length; j++) {
                    this.DataMessageList[j].type = 1;
                }
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
        .left,
        .right {
            width: 49%;
        }
        .left {
            .top,
            .bottom {
                padding: 30px 20px;
            }
            .left-wrapper {
                width: 100%;
                padding: 25px 0 10px;
                .step {
                    width: 15%;
                    text-align: center;
                    .step-icon {
                        display: inline-block;
                        width: 48px;
                        height: 48px;
                        line-height: 48px;
                        .common_radius(50%);
                        border: 1px solid @1st-border-col;
                        background-color: transparent;
                        i {
                            font-size: 24px;
                            color: @less-col;
                        }
                    }
                    p {
                        color: @main-col;
                        margin-top: 20px;
                        font-size: 12px;
                    }
                }
                i.icon-jiantou2 {
                    color: @less-col;
                    font-size: 40px;
                    vertical-align: bottom;
                }
            }
            .bottom {
                margin-top: 15px;
                .left-wrapper {
                    .msg-item {
                        position: relative;
                        margin: 9px 0;
                        padding-left: 30px;
                        .sign {
                            position: absolute;
                            left: 23px;
                            top: 10px;
                            z-index: 1;
                            width: 8px;
                            height: 8px;
                            background-color: @Danger;
                            .common_radius(50%);
                        }
                        h1 {
                            font-weight: normal;
                            margin: 8px 0 7px;
                        }
                        p {
                            margin: 3px 0;
                        }
                        span {
                            font-size: 12px;
                            color: @minor-col;
                        }
                        .look-btn {
                            width: 60px;
                            height: 26px;
                            line-height: 26px;
                            font-size: 12px;
                            color: @main-col;
                            text-align: center;
                            border: 1px solid #797979;
                            background-color: #fff;
                            .common_radius(4px);
                            cursor: pointer;
                            &:hover {
                                color: #fff;
                                background-color: #797979;
                            }
                        }
                    }
                }
            }
        }
        .right {
            padding: 30px 20px;
            .common_radius(3px);
            .bg-style;
            .right-list {
                width: 100%;
                padding: 25px 0 15px;
                .item {
                    width: 100%;
                    line-height: 40px;
                    padding: 0 20px;
                    cursor: pointer;
                    color: @main-col;
                    &:hover {
                        background-color: #e4e7ed;
                    }
                    i {
                        margin-right: 6px;
                        font-size: 24px;
                    }
                    .icon-word {
                        color: @base;
                    }
                    .icon-JPGs {
                        color: @Danger;
                    }
                    .icon-pdf {
                        color: @Danger;
                    }
                    .icon-ELXs {
                        color: @Success;
                    }
                    .icon-wenjian {
                        color: @Warning;
                    }
                    .operate {
                        margin: 0 10px;
                        font-size: 12px;
                        i {
                            font-size: 14px;
                        }
                        em {
                            font-style: normal;
                        }
                    }
                }
            }
        }
        .title {
            position: relative;
            overflow: hidden;
            color: @main-col;
            padding-left: 15px;
            height: 18px;
            line-height: 18px;
            span {
                float: left;
                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                    width: 4px;
                    height: 18px;
                    background-color: @Danger;
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
                color: @general-col;
                font-size: 12px;
                &:after {
                    content: '\e616';
                    font-size: 14px;
                    font-weight: bold;
                }
                &:hover {
                    text-decoration: none;
                }
            }
        }
    }
    @media (max-width: 1280px) {
        .Home-main .right .right-list .item .operate {
            em {
                display: none;
            }
        }
        .Home-main .left .bottom .left-wrapper .msg-item {
            padding-left: 20px;
            .sign {
                left: 15px;
            }
        }
    }
</style>