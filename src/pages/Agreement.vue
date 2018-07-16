<template>
    <div>
        <!--<button type="button" v-on:click="test">点击</button>-->
        <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 0.1rem">
            <el-tab-pane v-for="(item,index) in agreementList" :key="index" :label="item.agreementTitle" :name="item.nameId">
                <div class="flex_direction_column" style="background-color: white">
                    <div :id="item.selectId" class="pdfobject-container" style="height: 620px;border: 1px solid #666;"></div>
                    <div class="flex_direction_column align_items-center" v-if="item.status == 3 ">
                        <el-checkbox :id="item.checkId" style="margin-top: 0.25rem" v-model="checked[index]">同意以上协议
                        </el-checkbox>
                        <div style="margin-top: 0.25rem;margin-bottom: 0.3rem">
                            <el-button type="primary" style="width: 120px" v-on:click="signAgreement(item.id)">签署</el-button>
                        </div>
                    </div>
                    <div v-else class="justify_content_center">
                        <div style="margin-top: 0.25rem;margin-bottom: 0.3rem">
                            <el-button type="primary" style="width: 140px">已完成签署</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>

    import {PDFObject} from '../assets/js/pdfobject.js'

    export default {

        data() {
            return {
                activeName: '',
                orderInfo: {},
                agreementList: [],
                checked: [],
                currentPage:0,
                isFirst:true
            }
        },
        created() {
            this.orderInfo = this.$route.query;
            this.fetchData();
        },
        methods: {
            handleClick(tab, event) {
                this.orderInfo = this.$route.query;
                this.currentPage = tab.index;
                this.preViewPDF(this.agreementList[tab.index].pdfFile);
            },
            preViewPDF(pdfPath) {
                if (!PDFObject.supportsPDFs) {
                    this.$message({
                        type: 'error',
                        message: '该浏览器无法支持pdf文件'
                    })
                } else {
                    if (pdfPath) {
                        PDFObject.embed(this.$store.state.resUrl + pdfPath, '#'+this.agreementList[this.currentPage].selectId);
                    } else {
                        this.$message({
                            type: 'error',
                            message: '文件出错'
                        })
                    }
                }
            },
            fetchData() {
                this.$ajax.post('/api/bussiness/account/order/getAgreementList?orderId=' + this.orderInfo.id, null, (res) => {
                    console.log(res)
                    if (res.code == 0) {

                        this.agreementList = res.data;
                        for (let i = 0; i < this.agreementList.length; i++) {
                            this.agreementList[i].selectId = 'selectId'+i;
                            this.agreementList[i].checkId = 'checkId'+i;
                            this.agreementList[i].nameId = 'name'+i;
                            this.checked[i] = false;
                        }

                        this.selectRecentTab();

                    } else {
                        this.$message({
                            type: error,
                            message: res.message
                        })
                    }
                });
            },
            signAgreement(agreementId) {
                if (this.checked[this.currentPage]) {
                    console.log('123');
                    this.$ajax.post('/api/bussiness/account/order/signAgreement?agreementId=' + agreementId, null,(res) => {
                        if (res.code == 0) {
                            this.$message({
                                type: 'info',
                                message: '签署成功'
                            })
                            for (let i = 0; i < res.data.length; i++) {
                                console.log(this.agreementList[i].status);
                                if (res.data[i].status == 3) {
                                    this.fetchData();
                                    return;
                                }
                            }
                            console.log("123");
                            //说明签署完了，回退到订单列表
                            this.$router.back();

                        } else {
                            this.$message({
                                type: 'error',
                                message: res.message
                            })
                        }
                    });
                } else {
                    this.$message({
                        type: 'info',
                        message: '请勾选协议'
                    })
                }
            },
            selectRecentTab(){
                for (let i = 0; i < this.agreementList.length; i++) {
                    if (this.agreementList[i].status == 3) {
                        this.activeName = this.agreementList[i].nameId;
                        setTimeout(()=>{
                            this.handleClick({index:i})
                            this.isFirst = false;
                        },1000)
                        return;
                    }
                }
                //说明签署完了，就显示第一个
                if (this.agreementList.length > 0) {
                    this.activeName = this.agreementList[0].nameId;
                    setTimeout(()=>{
                        this.handleClick({index:0})
                        this.isFirst = false;
                    },1000)
                }

            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">

    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .test {

    }


</style>

