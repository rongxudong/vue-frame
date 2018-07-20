<template>
    <div class="Home-main">
        <div class="left bg-style">
            <div class="bottom">
                <div class="title">
                    <span>消息列表</span>
                    <!--<a href="#" @click="goMsgList">MORE &gt;&gt;</a>-->
                </div>
                <div class="msg-item align_items" v-for="(item, index) in DataMessageList" :key="item.index">
                    <div class="sign" v-if="item.type == 0"></div>
                    <div class="msg-item-left">
                        <h1>{{item.title}}</h1>
                        <p class="text_overflow">{{item.content}}</p>
                        <span>{{item.date}}</span>
                    </div>
                    <div class="msg-item-right flex_end">
                        <button type="button" class="look-btn" v-on:click="navRoute(item)">查看详情</button>
                    </div>
                </div>
            </div>
            <div class="page-wrap">
                <pagination :pageSizes="[10, 20]" :pageSize="20" :totalNum="60"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'

    export default {
        data () {
            return {
                DataMessageList: []
            }
        },
        methods: {
            getMessageList () {
                let params = {
                    pageNum: 1,
                    pageSize: 5
                }
                this.$ajax.post('/api/bussiness/account/message/getMessageList', params, res => {
                    if( res.code == 0 ) {
                        this.DataMessageList = res.data;
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
            }
        },
        created () {
            this.getMessageList();
        },
        components: {
            'pagination': Pagination
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .left {
        width: 100%;
        .bottom {
            padding-top: 0;
        }
    }
</style>
