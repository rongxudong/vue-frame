<template>
    <div style="background-color: #ffffff;padding: 0.16rem 0 0.5rem 0">
        <div class="align_items-center head-border" style="height: 50px;margin: 0 0.5rem 0 0.4rem">
            <div class="rectangle"></div>
            <h5 class="head-text" style="margin-left: 0.1rem">授信申请状态</h5>
        </div>
        <h4 class="head-text" style="font-size: 0.15rem;margin: 0.22rem 0 0.16rem 0.65rem;" v-if="BusinessAccountGtcpApply.status == 2">审核已提交</h4>
        <h4 class="head-text" style="font-size: 0.15rem;margin: 0.22rem 0 0.16rem 0.65rem;" v-else-if="BusinessAccountGtcpApply.status == 4">审核已通过</h4>
        <h4 class="head-text" style="font-size: 0.15rem;margin: 0.22rem 0 0.16rem 0.65rem;" v-else-if="BusinessAccountGtcpApply.status == 5">审核已终止</h4>
        <div class="align_items-center" style="height: 50px;margin: 0 0.5rem 0.1rem 0.4rem">
            <div class="rectangle"></div>
            <h5 class="head-text" style="margin-left: 0.1rem">GTCP申请表</h5>
        </div>
        <div id="pdf" class="pdfobject-container" style="height: 800px;"></div>
        <div class="align_items-center head-border" style="height: 50px;margin: 0.14rem 0.5rem 0 0.4rem">
            <div class="rectangle"></div>
            <h5 class="head-text" style="margin-left: 0.1rem">相关文件</h5>
        </div>
        <div class="right-list" style="width: 450px;margin: 0.2rem 0 0 0.8rem;border: 1px solid transparent;">
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
                    <span class="operate look" @click="onLook(item.url,item.fileName)">查看</span>
                    <span class="operate upLoad" @click="onDownload()">下载</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                orderInfo: {},
                BusinessAccountGtcpApply: {}

            }
        },
        created() {
            this.orderInfo = this.$route.query;
            this.fetchData();
        },
        watch: {},
        methods: {
            fetchData() {
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
            },

            preViewPDF(pdfPath) {
                if (!PDFObject.supportsPDFs) {
                    this.$message({
                        type: 'error',
                        message: '该浏览器无法支持pdf文件'
                    })
                } else {
                    if (pdfPath) {
                        PDFObject.embed(this.$store.state.resUrl + pdfPath, '#pdf');
                    } else {
                        this.$message({
                            type: 'error',
                            message: '文件出错'
                        })
                    }
                }
            },
            onLook (url, fileType) {
                window.open(this.$store.state.resUrl + url,'_blank');
            },
            onDownload () {
                alert('2')
            }
        }
    }

</script>


<style scoped lang="less" rel="stylesheet/less">

    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .rectangle {
        width: 0.06rem;
        height: 0.2rem;
        background-color: @base;
    }

    .head-border {
        border-bottom: 1px solid gray;

    }

    .head-text {
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold;
        color: rgba(88, 102, 110, 1);
        font-weight: bold;
    }


</style>


<!--<template>-->
<!--<div>-->
<!--<p>申请详情</p>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--data() {-->
<!--return {}-->
<!--},-->
<!--created() {-->
<!--this.fetchData()-->
<!--},-->
<!--watch: {-->
<!--'': 'fetchData'-->
<!--},-->
<!--methods: {-->
<!--fetchData() {-->

<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--.container {-->

<!--}-->
<!--</style>-->
