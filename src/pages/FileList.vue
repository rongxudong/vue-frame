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
                        <span class="operate look" @click="onLook()">查看</span>
                        <span class="operate upLoad" @click="onDownload()">下载</span>
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
                DataResList: []
            }
        },
        methods: {
            getResList () {
                let messageListModel = {
                    pageNum: 1,
                    pageSize: 15
                }
                this.$ajax.post('/api/bussiness/account/message/getFileList', messageListModel, res => {
                    if( res.code == 0 ) {
                        let fileExtension;
                        res.data.forEach(function (item, index) {
                            fileExtension = item.fileName.split('.').pop().toLowerCase();
                            if( fileExtension == 'doc' || fileExtension == 'docx' ) {
                                res.data[index].type = 1;
                            }
                            else if( fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' || fileExtension == 'gif') {
                                res.data[index].type = 2;
                            }
                            else if( fileExtension == 'pdf' ) {
                                res.data[index].type = 3;
                            }
                            else {
                                res.data[index].type = 4;
                            }
                        })
                        this.DataResList = res.data;
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            }
        },
        created () {
            this.getResList();
        },
        components: {
            'pagination': Pagination
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