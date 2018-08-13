<template>
    <div class="bg-style">
        <div class="investigate-main">
            <div class="basic">
                <div class="title process-title line">{{this.serviceTitle[this.serviceType]}}&nbsp;{{$t('investigate.procedure')}}</div>
                <ul class="content flex_start">
                    <li v-for="(item, idx) in content" :key="idx" class="flex_start">
                        <div class="step-item">
                            <div class="img horizontal_center">
                                <img :src="item.imgUrl"/>
                            </div>
                            <div class="txt">
                                <p class="text-center">{{item.title}}</p>
                            </div>
                        </div>
                        <div class="arrow-right-icon" v-if="idx != 3"></div>
                    </li>
                </ul>
            </div>
            <div class="basic">
                <div class="title process-title line">{{ $t('investigate.serviceInformation') }}</div>
                <div class="search-container flex_direction_column">
                    <div class="flex_direction_row container-head-bg">
                        <img class="image-search" src="../assets/img/investigate/search-icon.png">
                        <h1 class="text-head" style="margin-left: 0.12rem;">{{ $t('investigate.filterQuery') }}</h1>
                    </div>
                    <div class="flex_direction_column">
                        <div class="filter-query flex_start" :class="isLanguage == 'en' ? 'en-input' : ''">
                            <div class="flex_direction_row mg17">
                                <h1 class="align-self-center text-head input-mg">{{ $t('investigate.dateOfApplication') }}:</h1>
                                <el-date-picker
                                    style="width: 265px;"
                                    v-model="data"
                                    type="daterange"
                                    :range-separator="$t('investigate.to')"
                                    :start-placeholder="$t('investigate.startTime')"
                                    :end-placeholder="$t('investigate.endTime')"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                            <div class="flex_direction_row mg17">
                                <h1 class="align-self-center text-head input-mg">{{ $t('investigate.object') }}:</h1>
                                <el-input
                                    class="amStatus"
                                    :placeholder="$t('investigate.pleaseEnterTheContent')"
                                    v-model="QueryOrderListModel.respondent"
                                    clearable>
                                </el-input>
                            </div>
                            <div class="align_content mg17">
                                <h1 class="align-self-center text-head input-mg">{{ $t('investigate.stateOfApplication') }}:</h1>
                                <el-select v-model="QueryOrderListModel.applyStatus" :placeholder="$t('investigate.pleaseSelect')" class="amStatus">
                                    <el-option
                                        v-for="item in applyStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="flex_direction_row mg17">
                                <h1 class="align-self-center text-head input-mg">{{ $t('investigate.stateOfPayment') }}:</h1>
                                <el-select v-model="QueryOrderListModel.payStatus" :placeholder="$t('investigate.pleaseSelect')" class="payStatus">
                                    <el-option
                                            v-for="item in payStatus"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="flex_direction_row mg17">
                                <h1 class="align-self-center text-head input-mg">{{ $t('investigate.stateOfAgreement') }}:</h1>
                                <el-select v-model="QueryOrderListModel.agreementStatus" :placeholder="$t('investigate.pleaseSelect')" class="amStatus">
                                    <el-option
                                            v-for="item in agreementStatus"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button class="mg17" type="primary" round style="margin-left: 0.2rem;" @click="this.fetchData">
                                {{ $t('investigate.submit') }}
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="basic">
                <div class="table-container flex_direction_column">
                    <div class="flex_direction_row container-head-bg">
                        <img class="image-search" src="../assets/img/investigate/tips.png">
                        <h1 class="text-head flex-1" style="margin-left: 0.12rem;">
                            {{$t('investigate.tipHeaderPart')}}&nbsp;{{this.serviceTitle[this.serviceType]}}.&nbsp;
                            {{$t('investigate.tipFooterPart')}}
                        </h1>
                        <el-button type="primary" size="small" style="margin-right: 0.2rem" @click="showDialog">
                            {{$t('investigate.createANewService')}}
                        </el-button>
                    </div>
                    <el-table
                        border
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            align="center"
                            prop="id"
                            :label="$t('investigate.orderID')"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="orderType_str"
                            :label="$t('investigate.typeOfService')"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="createdDate"
                            :label="$t('investigate.dateOfSubmit')"
                            width="170">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="respondent"
                            :label="$t('investigate.serviceObj')"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            :label="$t('investigate.statusOfAgreements')"
                            width="180">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px;">{{ scope.row.agreementStatus_str}}</span>
                                <el-button
                                    v-if="scope.row.btnVisible"
                                    style="margin-left: 0.1rem;"
                                    size="mini"
                                    type="primary"
                                    @click="navRoute($t('menu.signAgreements'), scope.row)">{{ scope.row.btnDesc }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            :label="$t('investigate.agreements')"
                            width="180">
                            <template slot-scope="scope" v-if="scope.row.agreementTitle.length > 0">
                                <el-popover trigger="hover" placement="top">
                                    <p v-for="(item, index) in scope.row.agreementTitle">{{ $t('investigate.agreement') }}{{index + 1}}: {{item}}</p>
                                    <div slot="reference">
                                        <el-tag size="medium">{{ scope.row.agreementTitle }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="applyStatus_str"
                            :label="$t('investigate.statusOfApplication')"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="date"
                            :label="$t('investigate.applicationFormOperation')"
                            width="130">
                            <template slot-scope="scope">
                                <el-button
                                    v-if="scope.row.applyStatusBtnVisible"
                                    style="margin-left: 0.1rem;"
                                    size="mini"
                                    type="primary"
                                    @click="navRoute($t('investigate.application'), scope.row)">{{ scope.row.applyStatusBtnDesc }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="payStatus_str"
                            :label="$t('investigate.amountOfPayment')"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            align="center"
                            prop="filesList"
                            :label="$t('investigate.feedback')"
                            min-width="150">
                            <template slot-scope="scope">
                                <ul>
                                    <li v-for="item in scope.row.filesList">
                                        <el-button type="primary" @click="auditReportDialog(item.url)" v-if="serviceType == 4">
                                            {{item.fileName}}
                                        </el-button>
                                        <a v-bind:href="'http://image.financegt.com'+item.url" style="color: #2fa8fd" target="_blank" v-else>
                                            {{item.fileName}}
                                        </a>
                                    </li>
                                </ul>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="justify-content-center" style="width: 100%;margin-top: 0.2rem;">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="QueryOrderListModel.pageNum"
                        :page-size="QueryOrderListModel.pageSize"
                        layout="prev, pager, next, jumper"
                        :total=total>
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog
                :title="$t('investigate.accountManagementAuditReport')"
                :visible.sync="dialogVisible"
                width="70%">
            <span v-html="reportContent" id="reportContent"></span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">{{ $t('dialog.ok') }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

    export default {
        data () {
            let that = this;
            return {
                loading: false,
                post: null,
                error: null,
                content: [
                    {title: this.$t('investigate.signTheAgreement'), imgUrl: require('../assets/img/investigate/step1.png'), toUrl: ''},
                    {title: this.$t('investigate.submitAnApplication'), imgUrl: require('../assets/img/investigate/step2.png'), toUrl: ''},
                    {title: this.$t('investigate.payTheApplicationFee'), imgUrl: require('../assets/img/investigate/step3.png'), toUrl: ''},
                    {title: this.$t('investigate.getDDReport'), imgUrl: require('../assets/img/investigate/step4.png'), toUrl: ''}
                ],
                applyStatus: [
                    {value: '1', label: this.$t('selectApplyStatus.uncommitted')},
                    {value: '2', label: this.$t('selectApplyStatus.waitingForAudit')},
                    {value: '3', label: this.$t('selectApplyStatus.rejected')},
                    {value: '4', label: this.$t('selectApplyStatus.passed')},
                    {value: '5', label: this.$t('selectApplyStatus.terminated')}
                ],
                agreementStatus: [
                    {value: '1', label: this.$t('selectAgreementStatus.unedited')},
                    {value: '2', label: this.$t('selectAgreementStatus.unreviewed')},
                    {value: '3', label: this.$t('selectAgreementStatus.unsigned')},
                    {value: '4', label: this.$t('selectAgreementStatus.signed')}
                ],
                payStatus: [
                    {value: '1', label: this.$t('selectPayStatus.paid')},
                    {value: '2', label: this.$t('selectPayStatus.unpaid')}
                ],
                tableData: [],
                data: '',
                total: 0,
                QueryOrderListModel:{
                    orderType: 1,
                    beginDate: '',
                    endDate: '',
                    respondent: '',
                    applyStatus: '',
                    payStatus: '',
                    agreementStatus: '',
                    pageSize: 5,
                    pageNum: 1
                },
                pickerOptions: {
                    onPick(obj) {
                        if (obj.maxDate && obj.minDate) {
                            that.QueryOrderListModel.endDate = this.moment(obj.maxDate).format('YYYY-MM-DD');
                            that.QueryOrderListModel.beginDate = this.moment(obj.minDate).format('YYYY-MM-DD');
                        }
                    }
                },
                serviceTitle: ['',this.$t('menu.dueDiligence'),this.$t('menu.GTREvaluation'),
                    this.$t('menu.financialSupport'),this.$t('menu.accountManagement')],
                serviceType: 1,
                reportContent: '',
                dialogVisible: false,
                isLanguage: this.$store.state.isLanguage
            }
        },
        created () {
            this.serviceType = this.$route.path.split('/')[2];
            this.QueryOrderListModel.orderType = this.$route.path.split('/')[2];
            this.fetchData();
        },
        computed: {
            listenLanguage () {
                return this.$store.state.isLanguage
            }
        },
        watch: {
            $route(){
                this.serviceType = this.$route.path.split('/')[2];
                this.QueryOrderListModel.orderType = this.$route.path.split('/')[2];
                this.fetchData();
            },
            listenLanguage: function (a, b) {
                this.isLanguage = a;
            }
        },
        methods: {
            fetchData () {
                this.$ajax.post('/api/bussiness/account/order/getOrderList', this.QueryOrderListModel, res => {
                    const arrayData = [];
                    if (res.code == 0 && res.data.list){
                        this.total = res.data.total;
                        for (let i = 0;i < res.data.list.length;i++){
                            let tableData = res.data.list[i];
                            if (tableData.orderType == 1){
                                tableData.orderType_str = this.$t('menu.dueDiligence');
                            }else if (tableData.orderType == 2){
                                tableData.orderType_str = this.$t('menu.GTREvaluation');
                            }else if (tableData.orderType == 3){
                                tableData.orderType_str = this.$t('menu.dueDiligence');
                            }else if (tableData.orderType == 4){
                                tableData.orderType_str = this.$t('menu.accountManagement');
                            }

                            if (tableData.agreementStatus == 1){
                                tableData.agreementStatus_str = this.$t('selectAgreementStatus.unedited');
                                tableData.btnVisible = false;
                            }else if (tableData.agreementStatus == 2){
                                tableData.agreementStatus_str = this.$t('selectAgreementStatus.unreviewed');
                                tableData.btnVisible = false;
                            }else if (tableData.agreementStatus == 3){
                                tableData.agreementStatus_str = this.$t('selectAgreementStatus.unsigned');
                                tableData.btnVisible = true;
                                tableData.btnDesc = this.$t('agreement.sign');
                            }else if (tableData.agreementStatus == 4){
                                tableData.agreementStatus_str = this.$t('selectAgreementStatus.signed');
                                tableData.btnVisible = true;
                                tableData.btnDesc = this.$t('button.check');
                            }

                            if (tableData.payStatus == 1){
                                tableData.payStatus_str = this.$t('selectPayStatus.paid');
                            }else if (tableData.payStatus == 2){
                                tableData.payStatus_str = this.$t('selectPayStatus.unpaid');
                            }

                            if (tableData.applyStatus == 1){
                                tableData.applyStatus_str = this.$t('selectApplyStatus.uncommitted');
                            }else if (tableData.applyStatus == 2){
                                tableData.applyStatus_str = this.$t('selectApplyStatus.shortAuditing');
                            }else if (tableData.applyStatus == 3){
                                tableData.applyStatus_str = this.$t('selectApplyStatus.shortRejected');
                            }else if (tableData.applyStatus == 4){
                                tableData.applyStatus_str = this.$t('selectApplyStatus.shortPassed');
                            }else if (tableData.applyStatus == 5){
                                tableData.applyStatus_str = this.$t('selectApplyStatus.shortTerminated');
                            }else if (tableData.applyStatus == 6){
                                tableData.applyStatus_str = this.$t('selectApplyStatus.shortPassed');
                            }
                            //----------------------------------------------------
                            if (tableData.applyStatus  == 1 || tableData.applyStatus  == 3){
                                if (tableData.agreementStatus == 1 || tableData.agreementStatus == 2 || tableData.agreementStatus == 3){
                                    tableData.applyStatusBtnVisible = false;
                                } else {
                                    tableData.applyStatusBtnVisible = true;
                                    tableData.applyStatusBtnDesc = this.$t('investigate.fillIn');
                                }
                            } else {
                                tableData.applyStatusBtnVisible = true;
                                tableData.applyStatusBtnDesc = this.$t('button.check');
                            }
                            //----------------------------------------------------
                            arrayData.push(tableData);
                        }
                    }
                    if (res.code != 0){
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                    this.tableData = arrayData;
                })
            },
            handleCurrentChange(curPage){
                this.QueryOrderListModel.pageNum = curPage;
                this.fetchData();
            },
            showDialog() {
                const that = this;
                this.$confirm(this.$t('investigate.newDialogService'), this.$t('dialog.tips'), {
                    confirmButtonText: this.$t('investigate.createAService'),
                    cancelButtonText: this.$t('dialog.cancel'),
                    type: 'info'
                }).then(() => {
                    this.$ajax.post('/api/bussiness/account/order/creatNewOrder?orderType='+this.serviceType, null, (res)=>{
                        if (res.code == 0){
                            this.$message({
                                type: 'success',
                                message: this.$t('investigate.createSuccessMessage')
                            });
                            that.fetchData();
                        }else {
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    })
                });
            },
            navRoute(name,query){
                if (this.$t('menu.signAgreements') == name){
                    this.$router.push({
                        name: name,
                        query: query
                    });
                }
                if (this.$t('investigate.application') == name){
                    if (query.applyStatusBtnDesc == this.$t('button.check')){
                        this.$router.push({
                            name: this.$t('menu.applicationDetails'),
                            query: query
                        });
                    }
                    if (query.applyStatusBtnDesc == this.$t('investigate.fillIn')){
                        if(query.payStatus == '1') {
                            this.$router.push({
                                name: this.$t('menu.customerApplication'),
                                query: query
                            });
                        } else if (query.payStatus == '2') {
                            this.$message({
                                type: 'warning',
                                message: this.$t('investigate.unpaidMessage')
                            });
                        }
                    }
                }
            },
            auditReportDialog (orderId) {
                this.$ajax.post('/api/bussiness/account/order/getBusinessManageHtml/' + orderId, null, res => {
                    this.reportContent = res.data;
                    this.dialogVisible = true;
                    setTimeout(function () {
                        $('#reportContent button').css('display','none');
                        $('#reportContent input.layui-input,textarea.layui-textarea').addClass('layui-disabled').attr('disabled', 'true');
                    }, 100);
                })
            }
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .investigate-main {
        position: relative;
        min-height: calc(~'100vh - 145px');
        min-height: -ms-calc(~'100vh - 145px');
        min-height: -moz-calc(~'100vh - 145px');
        min-height: -webkit-calc(~'100vh - 145px');
        padding: 0 20px 20px;
        .line {
            border-bottom: 1px solid #ccc!important;
        }
        .process-title {
            font-size: 16px;
            font-family: MicrosoftYaHei-Bold;
            color: rgba(88,102,110,1);
            font-weight: bold;
        }
        .add-serve {
            position: absolute;
            top: 10px;
            right: .2rem;
            z-index: 1;
            font-size:0.13rem;
            em {
                font-style: normal;
                color: rgba(102,102,102,1);
                margin-right: .2rem;
            }
            span {
                display: inline-block;
                height: 32px;
                padding: 0 .15rem;
                line-height: 32px;
                color: #fff;
                background-color: @base;
                .common_radius(16px);
                cursor: pointer;
                &:hover {
                    .lighten-hover(@base);
                }
            }
        }
        .content {
            width: 100%;
            padding: .3rem .1rem;
            li {
                .step-item {
                    .img {
                        width: 1.48rem;
                        min-width: 100px;
                        height: 1.48rem;
                        min-height: 100px;
                        background-color: RGBA(54, 170, 236, 1);
                        .common_radius(50%);
                        img {
                            width: .8rem;
                            min-width: 60px;
                            height: .8rem;
                            min-height: 60px;
                        }
                    }
                    .txt {
                        width: 100%;
                        text-align: center;
                        p {
                            color: RGBA(102, 102, 102, 1);
                            padding: .19rem 0 .13rem;
                            font-size: .14rem;
                        }
                    }
                }
                .arrow-right-icon {
                    width: 1rem;
                    min-width: 70px;
                    height: 1.48rem;
                    min-height: 70px;
                    background: url("../assets/img/investigate/arrow-right.png") center no-repeat;
                }
            }
        }
        .filter-query {
            width: 100%;
            min-height: 40px;
            padding-right: .2rem;
            flex-direction: row;
            flex-wrap: wrap;
            .input-mg {
                min-width: 85px;
                margin-left: 0.2rem;
            }
        }
        .mg17 {
            margin: 17px 0;
        }
        .amStatus {
            width: 195px;
        }
    }
    .search-container,
    .table-container {
        width: 100%;
        margin-top: 0.25rem;
        border: 1px solid @4th-border-col;
        .common_radius(5px);
    }
    .container-width-100{
        width: 100%;
    }
    .image-search{
        width: 0.18rem;
        height: 0.18rem;
        margin-left: 0.2rem;
    }
    .text-head{
        font-size: 0.14rem;
        color: @general-col;
    }
    .container-head-bg{
        background-color: #ECF1F5;
        height: 0.53rem;
        .align_items;
    }
    //针对ipad/平板
    @media (min-width: 768px) and (max-width: 1023px) {
        .investigate-main {
            .content li .step-item .img {
                width: 100px;
                height: 100px;
            }
            .mg17 {
                margin: 10px 0;
            }
            .payStatus {
                width: 265px;
            }
        }
    }

    @media (min-width: 1024px) and (max-width: 1279px) {
        .investigate-main {
            .mg17 {
                margin: 12px 0;
            }
            .payStatus {
                width: 265px;
            }
        }
    }

    @media (min-width: 1280px) and (max-width: 1365px) {
        .investigate-main {
            .mg17 {
                margin: 12px 0;
            }
        }
    }

    @media (min-width: 1366px) and (max-width: 1439px) {
        .investigate-main {
            .mg17 {
                margin: 12px 0;
            }
        }
    }

    @media (min-width: 1440px) and (max-width: 1679px) {

    }
    @media (min-width: 1680px) and (max-width: 1919px) {

    }
    @media (min-width: 1920px) {

    }
</style>
