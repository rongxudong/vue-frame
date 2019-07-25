<template>
    <div class="apply-detail bg-style">
        <div class="align_items-center head-border">
            <div class="rectangle"></div>
            <h5 class="head-text">{{ $t('applyDetail.statusOfCreditApplication') }}</h5>
        </div>
        <h4 class="apply-status" v-if="BusinessAccountGtcpApply.status == 2">{{ $t('applyDetail.submitted') }}</h4>
        <h4 class="apply-status" v-else-if="BusinessAccountGtcpApply.status == 4">{{ $t('applyDetail.passed') }}</h4>
        <h4 class="apply-status" v-else-if="BusinessAccountGtcpApply.status == 5">{{ $t('applyDetail.terminated') }}</h4>
        <div class="align_items-center" style="height: 50px;margin-bottom: .1rem;">
            <div class="rectangle"></div>
            <h5 class="head-text">{{ $t('applyDetail.GTCPApplicationForm') }}</h5>
        </div>
        <div id="pdf" class="pdfobject-container"></div>
        <div class="align_items-center head-border" style="height: 50px;margin-top: 0.14rem;">
            <div class="rectangle"></div>
            <h5 class="head-text" style="margin-left: 0.1rem;">{{ $t('applyDetail.relatedFiles') }}</h5>
        </div>
        <div class="right-list" style="width: 450px;margin-top: 0.2rem;border: 1px solid transparent;">
            <div class="item" v-for="(item, index) in BusinessAccountGtcpApply.files" :key="index">
                <div class="file-name text_overflow">
                    <i :class="[
                                { 'icon-word':item.fileType == 1 },
                                { 'icon-JPGs':item.fileType == 2 },
                                { 'icon-pdf':item.fileType == 3 },
                                { 'icon-wenjian':item.fileType == 4 }
                                ]">
                    </i>
                    {{item.fileName}}
                </div>
                <div class="file-operate align_items flex_end">
                    <span class="operate look" @click="onLook(item, item.fileName)">{{ $t('button.check') }}</span>
                    <span class="operate upLoad" @click="onDownload(item, item.fileName)">{{ $t('button.download') }}</span>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="outerVisible" id="view-dialog">
            <iframe :src="previewUrl" width="100%" height="100%" frameborder="1" id='viewPhoto' v-show="iframeShow">
                This browser does not support PDFs. Please download the PDF to view it: <a :href="previewUrl">Download PDF</a>
            </iframe>
            <img :src="viewPhotoUrl" v-show="imgShow" class="iframe-img"/>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                orderInfo: {},
                BusinessAccountGtcpApply: {},
                outerVisible: false,
                previewUrl: '',
                viewPhotoUrl: '',
                iframeShow: true,
                imgShow: true
            }
        },
        created() {
            this.orderInfo = this.$route.query;
            this.fetchData();
        },
        watch: {},
        methods: {
            fetchData() {
                if( this.orderInfo.factoringType == '1' ) {
                    this.$ajax.get('/api/bussiness/account/order/getCustomerDetail/' + this.orderInfo.id, null, (res) => {
                        console.log(res.data)
                        if (res.code == 0) {
                            this.BusinessAccountGtcpApply = res.data;
                            setTimeout(()=>{
                                this.preViewPDF(this.BusinessAccountGtcpApply.infoPdfFile.url)
                            },500)
                        }else {
                            this.$message({
                                type:'error',
                                message:res.message
                            })
                        }
                    })
                }
                else if ( this.orderInfo.factoringType == '2' ) {
                    this.$ajax.get('/api/bussiness/account/order/getGtcpDetail/' + this.orderInfo.id, null, (res) => {
                        console.log(res)
                        if (res.code == 0) {
                            this.BusinessAccountGtcpApply = res.data;
                            setTimeout(()=>{
                                this.preViewPDF(this.BusinessAccountGtcpApply.gtcpApplyPdf.url)
                            },500)
                        }else {
                            this.$message({
                                type:'error',
                                message:res.message
                            })
                        }
                    });
                }
            },
            preViewPDF(pdfPath) {
                if (pdfPath) {
                    PDFObject.embed(this.$store.state.resUrl + pdfPath, '#pdf');
                } else {
                    this.$message({
                        type: 'error',
                        message: this.$t('applyDetail.fileError')
                    })
                }
            },
            isHaveScroll (ele, add, remove) {
                setTimeout(function () {
                    $(ele).addClass(add).removeClass(remove);
                },100)
            },
            onLook (Obj, NAME) {
                let nameSuffix = Obj.fileName.split('.').pop().toLowerCase();
                if( nameSuffix === 'png' || nameSuffix === 'jpg' || nameSuffix === 'jpeg' || nameSuffix === 'gif' ) {
                    this.previewUrl = '';
                    this.viewPhotoUrl = this.$store.state.resUrl + Obj.url;
                    this.iframeShow = false;
                    this.imgShow = true;
                    this.outerVisible = true;
                    this.isHaveScroll('#view-dialog .el-dialog .el-dialog__body', 'overflow_y_scroll', 'overflow_y_hidden');
                }
                else if ( nameSuffix === 'pdf') {
                    this.previewUrl = this.$store.state.resUrl + Obj.url;
                    this.iframeShow = true;
                    this.imgShow = false;
                    this.outerVisible = true;
                    this.isHaveScroll('#view-dialog .el-dialog .el-dialog__body', 'overflow_y_hidden', 'overflow_y_scroll');
                }
                else {
                    this.previewUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + this.$store.state.resUrl + Obj.url;
                    this.iframeShow = true;
                    this.imgShow = false;
                    this.outerVisible = true;
                    this.isHaveScroll('#view-dialog .el-dialog .el-dialog__body', 'overflow_y_hidden', 'overflow_y_scroll');
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
        }
    }
</script>


<style scoped lang="less" rel="stylesheet/less">

    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .apply-detail {
        padding: .16rem .4rem .5rem;

        .head-text,
        .apply-status {
            font-size: .15rem;
            line-height: .5rem;
            margin-left: .1rem;
            font-family: MicrosoftYaHei-Bold;
            color: rgba(88, 102, 110, 1);
            font-weight: bold;
        }
        .apply-status {
            margin-left: .3rem;
        }
        .operate:hover {
            background-color: @base;
        }
    }
    .pdfobject-container {
        height: 800px;
    }
    .rectangle {
        width: 0.06rem;
        height: 0.2rem;
        background-color: @base;
    }

    .head-border {
        border-bottom: 1px solid gray;

    }


</style>
