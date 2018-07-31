<template>
    <div class="bg-style" style="min-width: 880px">
        <div class="investigate-main">
            <div class="basic">
                <div class="title process-title line">{{this.serviceTitle[this.serviceType]}}服务流程</div>
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
                <div class="title process-title line">服务信息</div>
                <div class="search-container flex_direction_column">
                    <div class="flex_direction_row container-head-bg">
                        <img class="image-search" src="../assets/img/investigate/search-icon.png" alt="搜索">
                        <h1 class="text-head" style="margin-left: 0.12rem">筛选查询</h1>
                    </div>
                    <div class="flex_direction_column" style="height: 100%">
                        <div class="align_items-center" style="height: 50%;width: 100%">
                            <div class="flex_direction_row ">
                                <h1 class="align-self-center text-head" style="margin-left: 0.25rem;min-width: 61px">发起时间:</h1>
                                <el-date-picker
                                    style="margin-left: 0.25rem"
                                    v-model="data"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                            <div class="flex_direction_row">
                                <h1 class="align-self-center text-head" style="margin-left: 0.25rem;min-width: 61px">调查对象:</h1>
                                <el-input
                                    style="margin-left: 0.25rem;min-width: 2rem"
                                    placeholder="请输入内容"
                                    v-model="QueryOrderListModel.userCompanyName"
                                    clearable>
                                </el-input>
                            </div>
                            <div class="align_content">
                                <h1 class="align-self-center text-head" style="margin-left: 0.25rem;min-width: 80px;">申请表状态:</h1>
                                <el-select v-model="QueryOrderListModel.applyStatus" placeholder="请选择" style="margin-left: 0.25rem">
                                    <el-option
                                        v-for="item in applyStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="align_items-center" style="height: 50%;width: 100%">
                            <div class="flex_direction_row ">
                                <h1 class="align-self-center text-head" style="margin-left: 0.25rem;min-width: 61px">支付状态:</h1>
                                <el-select v-model="QueryOrderListModel.agreementStatus" placeholder="请选择" style="margin-left: 0.25rem">
                                    <el-option
                                        v-for="item in payStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="flex_direction_row">
                                <h1 class="align-self-center text-head" style="margin-left: 0.25rem;min-width: 61px">协议状态:</h1>
                                <el-select v-model="QueryOrderListModel.payStatus" placeholder="请选择" style="margin-left: 0.25rem">
                                    <el-option
                                        v-for="item in agreementStatus"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button type="primary" round style="margin-left: 0.25rem" v-on:click="this.fetchData">查询</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="basic">
                <div class="table-container flex_direction_column">
                    <div class="flex_direction_row container-head-bg">
                        <img class="image-search" src="../assets/img/investigate/tips.png" alt="搜索">
                        <h1 class="text-head flex-1" style="margin-left: 0.12rem;">您可重新创建一个新的{{this.serviceTitle[this.serviceType]}}服务，需重新签署协议，详细情况请联系融资顾问</h1>
                        <el-button type="primary" size="small" style="margin-right: 0.2rem" @click="showDialog">创建新服务</el-button>
                    </div>
                    <el-table
                        border
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            align="center"
                            label="序号"
                            type="index"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="orderType_str"
                            label="服务类型"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="createdDate"
                            label="发起时间"
                            width="170">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="userCompanyName"
                            label="调查对象"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="协议状态"
                            width="180">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.agreementStatus_str}}</span>
                                <el-button
                                    v-if="scope.row.btnVisible"
                                    style="margin-left: 0.1rem"
                                    size="mini"
                                    type="primary"
                                    @click="navRoute('签署协议', scope.row)">{{ scope.row.btnDesc}}</el-button>
                            </template>
                        </el-table-column>
                        <!--prop="agreementTitle"-->
                        <el-table-column
                            align="center"
                            label="协议"
                            width="180">
                            <template slot-scope="scope" v-if="scope.row.agreementTitle.length > 0">
                                <el-popover trigger="hover" placement="top">
                                    <p v-for="(item,index) in scope.row.agreementTitle">协议{{index + 1}}: {{item}}</p>
                                    <div slot="reference">
                                        <el-tag size="medium">{{ scope.row.agreementTitle }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="applyStatus_str"
                            label="申请表状态"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="date"
                            label="申请表操作"
                            width="130">
                            <template slot-scope="scope">
                                <el-button
                                    v-if="scope.row.applyStatusBtnVisible"
                                    style="margin-left: 0.1rem"
                                    size="mini"
                                    type="primary"
                                    @click="navRoute('申请', scope.row)">{{ scope.row.applyStatusBtnDesc}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="payStatus_str"
                            label="金额支付"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="filesList"
                            label="结果反馈">
                            <template slot-scope="scope">
                                <ul>
                                    <li v-for="item in scope.row.filesList">
                                        <a v-bind:href="'http://image.financegt.com'+item.url" style="color: #2fa8fd">{{item.fileName}}</a>
                                    </li>
                                </ul>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="justify-content-center" style="width: 100%;margin-top: 0.2rem">
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
                    {title: '签署协议', imgUrl: require('../assets/img/investigate/step1.png'), toUrl: ''},
                    {title: '填写申请表', imgUrl: require('../assets/img/investigate/step2.png'), toUrl: ''},
                    {title: '金额支付', imgUrl: require('../assets/img/investigate/step3.png'), toUrl: ''},
                    {title: '结果反馈', imgUrl: require('../assets/img/investigate/step4.png'), toUrl: ''}
                ],
                applyStatus: [
                    {value: '1', label: '未提交'},
                    {value: '2', label: '已提交待审核'},
                    {value: '3', label: '已审核驳回'},
                    {value: '4', label: '已审核通过'},
                    {value: '5', label: '已审核终止'},
                    {value: '6', label: '已审核通过并已上传尽调调查资料'}
                ],
                agreementStatus: [
                    {value: '1', label: '未编辑'},
                    {value: '2', label: '未审核'},
                    {value: '3', label: '未签署'},
                    {value: '4', label: '已签署'}

                ],
                payStatus: [
                    {value: '1', label: '已付款'},
                    {value: '2', label: '未付款'}
                ],
                tableData: [],
                data: '',
                total: 0,
                QueryOrderListModel:{
                    orderType:1,
                    beginDate:'',
                    endDate:'',
                    userCompanyName:'',
                    applyStatus:'',
                    payStatus:'',
                    agreementStatus:'',
                    pageSize:5,
                    pageNum:1
                },
                pickerOptions: {
                    onPick(obj) {
                        if (obj.maxDate && obj.minDate) {
                            that.QueryOrderListModel.endDate = this.moment(obj.maxDate).format('YYYY-MM-DD');
                            that.QueryOrderListModel.beginDate = this.moment(obj.minDate).format('YYYY-MM-DD');
                        }
                    },
                },
                serviceTitle:['占位','尽职调查','GTR评估','授信申请','商账管理'],
                serviceType:1,
            }
        },
        created () {
            this.serviceType = this.$route.path.split('/')[2];

            this.QueryOrderListModel.orderType = this.$route.path.split('/')[2];
            this.fetchData();
        },
        watch: {
            $route(){
                this.serviceType = this.$route.path.split('/')[2];
                this.QueryOrderListModel.orderType = this.$route.path.split('/')[2];
                this.fetchData();
            },
        },
        methods: {
            fetchData () {
                this.$ajax.post('/api/bussiness/account/order/getOrderList', this.QueryOrderListModel, res => {
                    const arrayData = [];
                    if (res.data.list){
                        this.total = res.data.total;
                        for (let i = 0;i < res.data.list.length;i++){
                            let tableData = res.data.list[i];
                            if (tableData.orderType == 1){
                                tableData.orderType_str = '尽职调查';
                            }else if (tableData.orderType == 2){
                                tableData.orderType_str = 'GTR评估';
                            }else if (tableData.orderType == 3){
                                tableData.orderType_str = '授信申请';
                            }else if (tableData.orderType == 4){
                                tableData.orderType_str = '商账管理';
                            }

                            if (tableData.agreementStatus == 1){
                                tableData.agreementStatus_str = '未编辑';
                                tableData.btnVisible = false;
                            }else if (tableData.agreementStatus == 2){
                                tableData.agreementStatus_str = '未审核';
                                tableData.btnVisible = false;
                            }else if (tableData.agreementStatus == 3){
                                tableData.agreementStatus_str = '未签署';
                                tableData.btnVisible = true;
                                tableData.btnDesc = '签署';
                            }else if (tableData.agreementStatus == 4){
                                tableData.agreementStatus_str = '已签署';
                                tableData.btnVisible = true;
                                tableData.btnDesc = '查看';
                            }

                            if (tableData.payStatus == 1){
                                tableData.payStatus_str = '已支付';
                            }else if (tableData.payStatus == 2){
                                tableData.payStatus_str = '未支付';
                            }

                            if (tableData.applyStatus == 1){
                                tableData.applyStatus_str = '未提交';
                            }else if (tableData.applyStatus == 2){
                                tableData.applyStatus_str = '审核中';
                            }else if (tableData.applyStatus == 3){
                                tableData.applyStatus_str = '已驳回';
                            }else if (tableData.applyStatus == 4){
                                tableData.applyStatus_str = '已通过';
                            }else if (tableData.applyStatus == 5){
                                tableData.applyStatus_str = '已终止';
                            }else if (tableData.applyStatus == 6){
                                tableData.applyStatus_str = '已通过';
                            }
                            //----------------------------------------------------
                            if (tableData.applyStatus  == 1 || tableData.applyStatus  == 3){
                                if (tableData.agreementStatus == 1 || tableData.agreementStatus == 2 || tableData.agreementStatus == 3){
                                    tableData.applyStatusBtnVisible = false;
                                } else {
                                    tableData.applyStatusBtnVisible = true;
                                    tableData.applyStatusBtnDesc = '填写';
                                }
                            } else {
                                tableData.applyStatusBtnVisible = true;
                                tableData.applyStatusBtnDesc = '查看';
                            }
                            //----------------------------------------------------
                            arrayData.push(tableData)
                        }
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
                this.$confirm('创建新服务后，将重新签署协议，并且服务将立即开启请与融资顾问确认后，再创建服务', '提示', {
                    confirmButtonText: '创建服务',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$ajax.post('/api/bussiness/account/order/creatNewOrder?orderType='+this.serviceType, null, (res)=>{
                        if (res.code == 0){
                            this.$message({
                                type: 'success',
                                message: '创建成功!'
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
                if ('签署协议' == name){
                    this.$router.push({
                        name: name,
                        query: query
                    });
                }
                if ('申请' == name){
                    if (query.applyStatusBtnDesc == '查看'){
                        this.$router.push({
                            name: '申请详情',
                            query:query
                        });
                    }
                    if (query.applyStatusBtnDesc == '填写'){
                        this.$router.push({
                            name: '客户申请',
                            query:query
                        });
                    }
                }

            },
        }
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .investigate-main {
        position: relative;
        min-height: calc(~'100vh - .45rem - 100px');
        min-height: -ms-calc(~'100vh - .45rem - 100px');
        min-height: -moz-calc(~'100vh - .45rem - 100px');
        min-height: -webkit-calc(~'100vh - .45rem - 100px');
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
    }
    .search-container{
        width: 100%;
        height: 1.92rem;
        border: 1px solid @4th-border-col;
        border-radius: 5px;
        margin-top: 0.25rem;
    }
    .table-container{
        width: 100%;
        border: 1px solid @4th-border-col;
        border-radius: 5px;
        margin-top: 0.25rem;
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
        .align_items
    }

</style>
