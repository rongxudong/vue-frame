<template>
    <div class="Home-main">
        <div class="right bg-style">
            <div class="title" style="margin: .18rem 0;">
                <span>公告栏</span>
                <!--<a href="#">MORE &gt;&gt;</a>-->
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
                        <span class="operate look" @click="onLook(item.url,item.fileName)">查看</span>
                        <span class="operate upLoad" @click="onDownload()">下载</span>
                    </div>
                </div>
            </div>
            <div style="width: 100%;">

            </div>
            <div class="page-wrap">
                <pagination
                        :page-sizes="pageSizes"
                        :page-size="messageListModel['pageSize']"
                        :total="totalNumber"
                        :size-change="handleSizeChange"
                        :current-change="handleCurrentChange"
                >
                </pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import pagination from '@/components/Pagination'

    export default {
        data () {
            return {
                DataResList: [],
                pageSizes: [10, 20],
                totalNumber: 0,
                messageListModel: {
                    pageNum: 1,
                    pageSize: 10
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(val);
            },
            handleCurrentChange(val) {
                console.log(val);
                this.messageListModel['pageNum'] = val;
            },
            getResList () {
                this.$ajax.post('/api/bussiness/account/message/getFileList', this.messageListModel, res => {
                    if( res.code == 0 ) {
                        let fileExtension;
                        res.data.filesList.forEach(function (item, index) {
                            fileExtension = item.fileName.split('.').pop().toLowerCase();
                            if( fileExtension == 'doc' || fileExtension == 'docx' ) {
                                res.data.filesList[index].type = 1;
                            }
                            else if( fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif') {
                                res.data.filesList[index].type = 2;
                            }
                            else if( fileExtension == 'pdf' ) {
                                res.data.filesList[index].type = 3;
                            }
                            else {
                                res.data.filesList[index].type = 4;
                            }
                        })
                        this.totalNumber = res.data.total;
                        console.log(this.totalNumber);
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
            onLook (url, fileType) {
                window.open(this.$store.state.resUrl + url, '_blank');
            },
            onDownload () {

            }
        },
        mounted() {

        },
        created () {
            this.getResList();
        },
        components: {
            pagination,
        },
        watch: {
            messageListModel: 'getResList'
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .right {
        width: 100%;
        .right-list .item {
            padding-right: .2rem;
            background-color: #ffffff;
            &:hover {
                background-color: #f5f5f5;
            }
        }
    }
</style>