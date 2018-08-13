<template>
    <div class="Home-main MessageList-main">
        <div class="left bg-style">
            <div class="bottom">
                <div class="title">
                    <span>{{ $t('home.messages') }}</span>
                    <a href="#" @click="allRead">
                        <el-switch
                            v-model="allReadValue"
                            :active-text="$t('home.allRead')"
                            active-color="#dcdfe6"
                            inactive-color="#13ce66"
                            :disabled="allReadValue">
                        </el-switch>
                    </a>
                </div>
                <div class="msg-item align_items" v-for="(item, index) in DataMessageList" :key="index">
                    <div class="sign" v-if="item.read == 0"></div>
                    <div class="msg-item-left">
                        <h1>{{item.title}}</h1>
                        <p class="text_overflow">{{item.content}}</p>
                        <span>{{item.creatime | filterTime('YYYY-MM-DD HH:mm')}}</span>
                    </div>
                    <div class="msg-item-right flex_end">
                        <button type="button" class="look-btn" @click="navRoute(item)">{{ $t('home.details') }}</button>
                    </div>
                </div>
            </div>
            <div class="page-wrap">
                <el-pagination
                        class="page"
                        background
                        :page-sizes="pageSizes"
                        :page-size="messageListModel['pageSize']"
                        :current-page="pageNo"
                        :total="totalNumber"
                        layout="total, sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
//    import Pagination from '@/components/Pagination'
    import moment from 'moment';

    export default {
        data () {
            return {
                pageNo: 1, //当前页
                pageSizes: [5, 10, 15, 20],
                DataMessageList: [], //返回的结果集合
                totalNumber: 0, //数据的总数
                messageListModel: {
                    pageNum: 1,
                    pageSize: 10
                },
                allReadValue: false
            }
        },
        filters: {
            filterTime: function (value, formatString) {
                formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
                return moment(value).format(formatString);
            }
        },
        methods: {
            // 一键阅读
            allRead: function () {
                let params = {
                    messageId: '',
                    pageNum: this.messageListModel['pageNum'],
                    pageSize: this.messageListModel['pageSize']
                };
                this.$ajax.post('/api/bussiness/account/message/allHaveLook', params, res => {
                    if(res.code == 0) {
                        console.log(res.data);
                        this.DataMessageList = res.data.viewList;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            //改变每页显示数量
            handleSizeChange(val) {
                let pageSize = `${val}`;
                this.pageNo = 1;
                this.messageListModel['pageSize'] = parseInt(pageSize);
                this.$nextTick(() =>
                    this.getAndDraw(this.messageListModel)
                )
            },
            //改变页码
            handleCurrentChange(val) {
                let pageNum = `${val}`;
                this.messageListModel['pageNum'] = parseInt(pageNum);
                this.getAndDraw(this.messageListModel);
            },
            getAndDraw (params, func) {
                if( func ) {
                    this.$ajax.post('/api/bussiness/account/message/getMessageList', params, func)
                }
                else {
                    this.getMessageList(params);
                }
            },
            // 获取消息列表
            getMessageList (param) {
                this.$ajax.post('/api/bussiness/account/message/getMessageList', param, res => {
                    if( res.code == 0 ) {
                        this.DataMessageList = res.data.viewList;
                        this.totalNumber = res.data.total;
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            navRoute(item) {
                let params = {
                    messageId: item._id,
                    pageNum: this.messageListModel['pageNum'],
                    pageSize: this.messageListModel['pageSize']
                };
                this.$ajax.post('/api/bussiness/account/message/lookMessage', params, res => {
                    if(res.code === 0){
                        this.DataMessageList = res.data.viewList;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                });
                switch (item.messageType) {
                    case 1:
                        this.$router.push({
                            name: this.$t('menu.verificationOfIdentityCertificate'),
                        });
                        break;
                    case 2:
                        item.id = item.targetUrl;
                        this.$router.push({
                            name: this.$t('menu.signAgreements'),
                            query:item
                        });
                        break;
                    case 3:
                        item.id = item.targetUrl;
                        this.$router.push({
                            name: this.$t('menu.applicationDetails'),
                            query:item
                        });
                        break;
                    case 4:
                        this.$router.push({
                            name: this.$t('menu.dueDiligence'),
                        });
                        break;
                    case 5:
                        this.$router.push({
                            name: this.$t('menu.GTREvaluation'),
                        });
                        break;
                    case 6:
                        this.$router.push({
                            name: this.$t('menu.financialSupport'),
                        });
                        break;
                    case 7:
                        this.$router.push({
                            name: this.$t('menu.accountManagement'),
                        });
                        break;
                }
            },
            //获取未读的消息总数
            getMessageCount () {
                this.$ajax.post('/api/bussiness/account/message/getMessageCount', null, res => {
                    if(res.code === 0){
                        if (res.data == 0) {
                            this.allReadValue = true;
                        } else {
                            this.allReadValue = false;
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            }
        },
        created () {
            this.getMessageList(this.messageListModel);
            this.getMessageCount();
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_mixin";

    .MessageList-main .title {
        height: 38px;
        padding-bottom: 20px;
        border-bottom: 1px dashed #cccccc;
    }
    .left {
        width: 100%;
        .bottom {
            padding-top: 0;
        }
    }
</style>
