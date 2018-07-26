<template>
    <div class="Home-main" id="HomeVue">
        <div class="left bg-style">
            <div class="top">
                <div class="title">
                    <span>{{UseStep.title}}</span>
                </div>
                <div class="left-wrapper flex_start" style="padding-left: .18rem;">
                    <div v-for="(item, index) in UseStep.step" :key="index" class="flex_start">
                        <div class="step" @click="toService(item.route)">
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
                    <span>消息</span>
                    <a href="#" @click="goMsgList">MORE &gt;&gt;</a>
                </div>
                <div class="msg-item align_items" v-for="(item, index) in DataMessageList" :key="item.index">
                    <div class="sign" v-if="item.read == 0"></div>
                    <div class="msg-item-left">
                        <h1>{{item.title}}</h1>
                        <p class="text_overflow">{{item.content}}</p>
                        <span>{{item.creatime | filterTime('YYYY-MM-DD HH:mm')}}</span>
                    </div>
                    <div class="msg-item-right flex_end">
                        <button type="button" class="look-btn" v-on:click="navRoute(item)">查看详情</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="right bg-style">
            <div class="title" style="margin: .18rem 0;">
                <span>公告栏</span>
                <a href="#" @click="goFileList">MORE &gt;&gt;</a>
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
                        {{item.fileName}}
                    </div>
                    <div class="file-operate align_items flex_end">
                        <a class="operate look" @click="onLook(item, item.fileName)">查看</a>
                        <a class="operate upLoad" @click="onDownload(item, item.fileName)">下载</a>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="outerVisible" id="view-dialog">
            <iframe :src="previewUrl" width="100%" height="100%" id='viewPhoto'>
                This browser does not support PDFs. Please download the PDF to view it: <a :href="previewUrl">Download PDF</a>
            </iframe>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        data() {
            return {
                UseStep: {
                    title: '使用流程查看',
                    step: [
                        {
                            name: '尽职调查',
                            url: require('../assets/img/Home/step1.png'),
                            route: '/Investigate/1'
                        },
                        {
                            name: 'GTR评估',
                            url: require('../assets/img/Home/step2.png'),
                            route: '/Investigate/2'
                        },
                        {
                            name: '授信申请',
                            url: require('../assets/img/Home/step3.png'),
                            route: '/Investigate/3'
                        },
                        {
                            name: '商账管理',
                            url: require('../assets/img/Home/step4.png'),
                            route: '/Investigate/4'
                        }
                    ]
                },
                DataResList: [],
                DataMessageList: [],
                outerVisible: false,
                previewUrl: ''
            }
        },
        filters: {
            filterTime: function (value, formatString) {
                formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
                return moment(value).format(formatString);
            }
        },
        methods: {
            toService (URL) {
                this.$router.push({path: URL});
            },
            getResList () {
                let messageListModel = {
                    pageNum: 1,
                    pageSize: 15
                }
                this.$ajax.post('/api/bussiness/account/message/getFileList', messageListModel, res => {
                    if (res.code == 0) {
                        let fileExtension;
                        res.data.filesList.forEach(function (item, index) {
                            fileExtension = item.fileName.split('.').pop().toLowerCase();
                            if (fileExtension == 'doc' || fileExtension == 'docx') {
                                res.data.filesList[index].type = 1;
                            }
                            else if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif') {
                                res.data.filesList[index].type = 2;
                            }
                            else if (fileExtension == 'pdf') {
                                res.data.filesList[index].type = 3;
                            }
                            else {
                                res.data.filesList[index].type = 4;
                            }
                        })
                        this.DataResList = res.data.filesList;
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            getMessageList () {
                let params = {
                    pageNum: 1,
                    pageSize: 5
                }
                this.$ajax.post('/api/bussiness/account/message/getMessageList', params, res => {
                    if (res.code == 0) {
                        this.DataMessageList = res.data.viewList;
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            goMsgList (e) {
                e.preventDefault();
                this.$router.push({path: '/MessageList'});
            },
            goFileList (e) {
                e.preventDefault();
                this.$router.push({path: '/FileList'});
            },
            onLook (Obj, NAME) {
                this.previewUrl = this.$store.state.resUrl + Obj.url;
                let nameSuffix = Obj.fileName.split('.').pop().toLowerCase();
                if( nameSuffix === 'png' || nameSuffix === 'jpg' || nameSuffix === 'jpeg' || nameSuffix === 'gif' ) {
                    window.open(this.previewUrl, '_blank');
                }
                else if ( nameSuffix === 'pdf') {
                    this.outerVisible = true;
                }
                else {
                    this.previewUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + this.$store.state.resUrl + Obj.url;
                    this.outerVisible = true;
                }
            },
            onDownload (Obj, NAME) {
                let self = this;
                let nameSuffix = NAME.split('.').pop().toLowerCase();
                let fileUrl = this.$store.state.resUrl + Obj.url;
                if(nameSuffix === 'png' || nameSuffix === 'gif' || nameSuffix === 'jpeg' || nameSuffix === 'jpg' || nameSuffix === 'tiff') {
                    if (this.browserIsIe()) {
                        this.createIframe(fileUrl);
                    } else {
                        $(self).attr("download", fileUrl);
                        $(self).attr("href", fileUrl);
                    }
                }
                else {
                    window.open(fileUrl, '_blank');
                }
            },
            navRoute (item) {
                console.log(item.title)
                switch (item.title) {
                    case '实名认证' :
                        this.$router.push({
                            name: '实名认证',
                        });
                        break;
                    case '签署协议':
                        item.id = item.targetUrl;
                        this.$router.push({
                            name: '签署协议',
                            query:item
                        });
                        break;
                    case 'GTCP申请':
                        item.id = item.targetUrl;
                        this.$router.push({
                            name: 'GTCP申请',
                            query:item
                        });
                        break;
                    case '尽职调查':
                        this.$router.push({
                            name: '尽职调查',
                        });
                        break;
                    case 'GTR评估':
                        this.$router.push({
                            name: 'GTR评估',
                        });
                        break;
                    case '授信申请':
                        this.$router.push({
                            name: '授信申请',
                        });
                        break;
                    case '商账管理':
                        this.$router.push({
                            name: '商账管理',
                        });
                        break;
                }
            },
            //判断是否为Trident内核浏览器(IE等)函数
            browserIsIe () {
                if (!!window.ActiveXObject || "ActiveXObject" in window){
                    return true;
                }
                else{
                    return false;
                }
            },
            //创建iframe并赋值的函数,传入参数为图片的src属性值.
            createIframe (imgSrc) {
                //如果隐藏的iframe不存在则创建
                if ($("#IframeReportImg").length === 0){
                    $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" onload="downloadImg();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");
                }
                //iframe的src属性如不指向图片地址,则手动修改,加载图片
                if ($('#IframeReportImg').attr("src") != imgSrc) {
                    $('#IframeReportImg').attr("src",imgSrc);
                } else {
                    //如指向图片地址,直接调用下载方法
                    this.downloadImg();
                }
            },
            //下载图片的函数
            downloadImg () {
                //iframe的src属性不为空,调用execCommand(),保存图片
                if ($('#IframeReportImg').src != "about:blank") {
                    window.frames["IframeReportImg"].document.execCommand("SaveAs");
                }
            }
        },
        created () {
            this.getResList();
            this.getMessageList();
        },
        beforeRouteLeave (to, from, next) {
            // 设置下一个路由的 meta
            to.meta.keepAlive = true;  // 让 A 缓存，即不刷新
            next();
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    //针对ipad/平板
    @media (min-width: 768px) and (max-width: 1023px) {
        .Home-main .left .left-wrapper {
            .step-icon-wrap {
                width: 1rem;
                height: 1rem;
            }
            .step {
                margin-right: .5rem;
            }
        }
    }

    @media (min-width: 1024px) and (max-width: 1279px) {
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

    @media (min-width: 1280px) and (max-width: 1365px) {
        .Home-main .left .left-wrapper .step {
            margin-right: .6rem;
        }
    }

    @media (min-width: 1366px) and (max-width: 1439px) {
        .Home-main .left .left-wrapper .step {
            margin-right: .8rem;
        }
    }

    @media (min-width: 1440px) and (max-width: 1679px) {
        .Home-main .left .left-wrapper .step {
            margin-right: .8rem;
        }
    }
</style>
