<template>
    <div class="agreement-main">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
            <el-tab-pane v-for="(item,index) in agreementList" :key="index" :label="item.agreementTitle" :name="item.nameId">
                <div class="ag-content flex_direction_column">
                    <div :id="item.selectId" class="sign-am-pdf"></div>

                    <div class="justify_content_center sign-btn-wrap" v-if="item.status == 4">
                        <div>
                            <el-button type="primary" style="width: 140px">{{ $t('agreement.alreadySigned') }}</el-button>
                        </div>
                    </div>
                    <div class="flex_direction_column align_items-center sign-btn-wrap" v-else>
                        <el-checkbox :id="item.checkId" style="margin-bottom: 0.25rem" v-model="checked[index]">{{ $t('agreement.agreeOnAgreementsAbove') }}</el-checkbox>
                        <div>
                            <el-button type="primary" style="width: 120px" v-on:click="signAgreement(item.id)">{{ $t('agreement.sign') }}</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

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
        watch: {
            $route(to , from){
                console.log()
                if (to.name == '签署协议'){
                    this.orderInfo = this.$route.query;
                    this.fetchData();
                }
            }
        },
        methods: {
            handleClick(tab, event) {
                this.orderInfo = this.$route.query;
                this.currentPage = tab.index;
                this.preViewPDF(this.agreementList[tab.index].pdfFile);
            },
            preViewPDF(pdfPath) {
                if (pdfPath) {
                    PDFObject.embed(this.$store.state.resUrl + pdfPath, '#'+this.agreementList[this.currentPage].selectId);
                } else {
                    this.$message({
                        type: 'error',
                        message: this.$t('applyDetail.fileError')
                    })
                }
            },
            fetchData() {
                this.$ajax.post('/api/bussiness/account/order/getAgreementList?orderId=' + this.orderInfo.id, null, (res) => {
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
                            type: 'error',
                            message: res.message
                        })
                    }
                });
            },
            signAgreement(agreementId) {
                if (this.checked[this.currentPage]) {
                    this.$ajax.post('/api/bussiness/account/order/signAgreement?agreementId=' + agreementId, null,(res) => {
                        if (res.code == 0) {
                            this.$message({
                                type: 'success',
                                message: this.$t('agreement.success')
                            })
                            for (let i = 0; i < res.data.length; i++) {
                                if (res.data[i].status == 3) {
                                    this.fetchData();
                                    return;
                                }
                            }
                            //说明签署完了，到订单列表
                            if (this.orderInfo.orderType) {
                                let path = '/Investigate/'+this.orderInfo.orderType
                                this.$router.push({
                                    path:path,
                                })
                            }else {
                                this.$router.push({
                                    path:'/Investigate/1',
                                })
                            }

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
                        message: this.$t('agreement.pleaseChooseAgreement')
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

    .agreement-main {
        .sign-am-pdf {
            width: 100%;
            height: 620px;
        }
        .sign-btn-wrap {
            margin: .5rem 0 .3rem;
        }
    }
    .ag-content {
        padding: 20px;
        background-color: #fff;
    }
</style>

