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
                        <a class="operate look" @click="onLook(item, item.fileName)">查看</a>
                        <a class="operate upLoad" @click="onDownload(item, item.fileName)">下载</a>
                    </div>
                </div>
            </div>
            <div class="page-wrap">
                <el-pagination
                        class="page"
                        background
                        :page-sizes="pageSizes"
                        :page-size="fileListModel['pageSize']"
                        :current-page="pageNo"
                        :total="totalNumber"
                        layout="total, sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog :visible.sync="outerVisible" id="view-dialog">
            <iframe :src="previewUrl" width="100%" height="100%" frameborder="1" id='viewPhoto' v-show="iframeShow">
                This browser does not support PDFs. Please download the PDF to view it: <a :href="previewUrl">Download PDF</a>
            </iframe>
            <img :src="viewPhotoUrl" width="100%" v-show="imgShow"/>
        </el-dialog>
    </div>
</template>

<script>
//    import pagination from '@/components/Pagination'

    export default {
        data () {
            return {
                pageNo: 1, //当前页
                pageSizes: [10, 15, 20, 30, 50],
                DataResList: [], //返回的结果集合
                totalNumber: 0, //数据的总数
                fileListModel: {
                    pageNum: 1,
                    pageSize: 10
                },
                outerVisible: false,
                previewUrl: '',
                viewPhotoUrl: '',
                iframeShow: true,
                imgShow: true
            }
        },
        methods: {
            //改变每页显示数量
            handleSizeChange(val) {
                let pageSize = `${val}`;
                this.pageNo = 1;
                this.fileListModel['pageSize'] = parseInt(pageSize);
                this.$nextTick(() =>
                    this.getAndDraw(this.fileListModel)
                )
            },
            //改变页码
            handleCurrentChange(val) {
                let pageNum = `${val}`;
                this.fileListModel['pageNum'] = parseInt(pageNum);
                this.getAndDraw(this.fileListModel);
            },
            getAndDraw (params, func) {
                if( func ) {
                    this.$ajax.post('/api/bussiness/account/message/getFileList', params, func)
                }
                else {
                    this.getResList(params);
                }
            },
            getResList (param) {
                this.$ajax.post('/api/bussiness/account/message/getFileList', param, res => {
                    if( res.code == 0 ) {
                        let fileExtension;
                        res.data.filesList.forEach(function (item, index) {
                            fileExtension = item.fileName.split('.').pop().toLowerCase();
                            if( fileExtension === 'doc' || fileExtension === 'docx' ) {
                                res.data.filesList[index].type = 1;
                            }
                            else if( fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'gif') {
                                res.data.filesList[index].type = 2;
                            }
                            else if( fileExtension === 'pdf' ) {
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
                    this.totalNumber = res.data.total;
                })
            },
            onLook (Obj, NAME) {
                let nameSuffix = Obj.fileName.split('.').pop().toLowerCase();
                if( nameSuffix === 'png' || nameSuffix === 'jpg' || nameSuffix === 'jpeg' || nameSuffix === 'gif' ) {
                    this.previewUrl = '';
                    this.viewPhotoUrl = this.$store.state.resUrl + Obj.url;
                    this.iframeShow = false;
                    this.imgShow = true;
                    this.outerVisible = true;
                }
                else if ( nameSuffix === 'pdf') {
                    this.previewUrl = this.$store.state.resUrl + Obj.url;
                    this.iframeShow = true;
                    this.imgShow = false;
                    this.outerVisible = true;
                }
                else {
                    this.previewUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + this.$store.state.resUrl + Obj.url;
                    this.iframeShow = true;
                    this.imgShow = false;
                    this.outerVisible = true;
                }
            },
            onDownload (Obj, NAME) {
                let nameSuffix = NAME.split('.').pop().toLowerCase();
                let fileUrl = this.$store.state.resUrl + Obj.url;
                if(nameSuffix === 'png' || nameSuffix === 'gif' || nameSuffix === 'jpeg' || nameSuffix === 'jpg' || nameSuffix === 'tiff') {
                    if(this.$MyBrowser() === 'Chrome' || this.$MyBrowser() === '360' || this.$MyBrowser() === 'Opera') {
                        this.$Opera360Download(fileUrl);
                    }
                    else if (this.$MyBrowser() === 'FF' || this.$MyBrowser() === 'IE'){
                        this.$ChromeFfIedownload(fileUrl);
                    }
                    else {
                        this.$Opera360Download(fileUrl);
                    }
                }
                else if(nameSuffix === 'pdf') {
                    if(this.$MyBrowser() === '360') {
                        this.$Opera360Download(fileUrl);
                    }
                    else {
                        this.$ChromeFfIedownload(fileUrl);
                    }
                }
                else if (nameSuffix === 'doc' || nameSuffix === 'docx' || nameSuffix === 'xlsx' || nameSuffix === 'xls') {
                    if(this.$MyBrowser() === '360' || this.$MyBrowser() === 'Opera' || this.$MyBrowser() === 'Chrome') {
                        this.$Opera360Download(fileUrl);
                    }
                    else if (this.$MyBrowser() === 'FF' || this.$MyBrowser() === 'IE'){
                        this.$ChromeFfIedownload(fileUrl);
                    }
                    else {
                        this.$Opera360Download(fileUrl);
                    }
                }
                else {
                    window.open(fileUrl, '_blank');
                }
            }
        },
        created () {
            this.getResList(this.fileListModel);
        },
//        components: {
//            pagination,
//        },
        watch: {
            fileListModel: 'getResList'
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