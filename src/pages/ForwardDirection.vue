<template>
    <div class="bg-style">
        <div class="forward-main">
            <div class="basic">
                <div class="title">基本信息</div>
                <div class="content">
                    <div class="input-block" v-for="inputItem in basic" :key="inputItem.id">
                        <ul class="block-top">
                            <li v-for="(children, $index) in inputItem.sub" :key="$index">{{children.text}}</li>
                        </ul>
                        <ul class="block-bottom">
                            <li v-for="(children, $index) in inputItem.sub" :key="$index">
                                <input v-if="children.placeholder" v-model="array[children.name]" :name="children.name" class="formInput"
                                       type="text" :placeholder="children.placeholder" autocomplete="off"/>
                                <input v-else v-model="array[children.name]" :name="children.name" class="formInput"
                                       type="text" :placeholder="$t('realName.placeholder')" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                    <div class="input-block">
                        <ul class="block-top">
                            <li class="creditInput">授信情况</li>
                            <li class="creditInput">对外担保情况</li>
                        </ul>
                        <ul class="block-bottom">
                            <li class="creditInput">授信机构共
                                <input v-model="array['creditNumber']" name="creditNumber" :placeholder="$t('realName.placeholder')" class="formInput width100" type="text" autocomplete="off"/>家；总授信额度
                                <input v-model="array['creditAmount']" name="creditAmount" :placeholder="$t('realName.placeholder')" class="formInput width100" type="text" autocomplete="off"/>万元
                            </li>
                            <li class="creditInput">担保户数
                                <input v-model="array['guaranteeNumber']" name="guaranteeNumber" :placeholder="$t('realName.placeholder')" class="formInput width100" type="text" autocomplete="off"/>家，对外担保金额
                                <input v-model="array['guaranteeAmount']" name="guaranteeAmount" :placeholder="$t('realName.placeholder')" class="formInput width100" type="text" autocomplete="off"/>万元
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="basic">
                <div class="title">贸易信息</div>
                <div class="content">
                    <div class="input-block">
                        <ul class="block-top">
                            <li>主营产品或服务</li>
                            <li>出口资质</li>
                            <li>买家数量</li>
                            <li>买家数量</li>
                        </ul>
                        <ul class="block-bottom">
                            <li>
                                <input v-model="array['mainProducts']" name="mainProducts" class="formInput" type="text"
                                       :placeholder="$t('realName.placeholder')" autocomplete="off"/>
                            </li>
                            <li class="align_items-center">
                                <el-radio-group v-model="array['haveExportQualification']">
                                    <el-radio label="1">具有</el-radio>
                                    <el-radio label="2">不具有</el-radio>
                                </el-radio-group>
                            </li>
                            <li class="align_items-center">
                                国内：<input v-model="array['domesticBuyerNumber']" name="domesticBuyerNumber" :placeholder="$t('realName.placeholder')" class="formInput width100" type="text" autocomplete="off"/>家
                            </li>
                            <li class="align_items-center">
                                国外：<input v-model="array['foreignBuyerNumber']" name="foreignBuyerNumber" :placeholder="$t('realName.placeholder')" class="formInput width100" type="text" autocomplete="off"/>家
                            </li>
                        </ul>
                    </div>
                    <div class="input-block">
                        <ul class="block-top">
                            <li class="creditInput">年均销售额</li>
                            <li class="creditInput">年均销售额</li>
                        </ul>
                        <ul class="block-bottom">
                            <li class="creditInput">
                                内销<input v-model="array['domesticSales']" name="domesticSales" class="formInput width100" type="text"
                                          :placeholder="$t('realName.placeholder')" autocomplete="off"/>
                                万元/年，赊销占比
                                    <input v-model="array['domesticChargeSales']" name="domesticChargeSales" class="formInput width100" type="text"
                                           :placeholder="$t('realName.placeholder')" autocomplete="off"/>%
                            </li>
                            <li class="creditInput">
                                外销<input v-model="array['exportSales']" name="exportSales" class="formInput width100" type="text"
                                         :placeholder="$t('realName.placeholder')" autocomplete="off"/>
                                万美元/年，赊销占比
                                    <input v-model="array['exportChargeSales']" name="exportChargeSales" class="formInput width100" type="text"
                                           :placeholder="$t('realName.placeholder')" autocomplete="off"/>%
                            </li>
                        </ul>
                    </div>
                    <div class="input-block">
                        <ul class="block-top">
                            <li class="creditInput">年均采购额</li>
                            <li>供应商数量</li>
                            <li>物流合作商</li>
                        </ul>
                        <ul class="block-bottom">
                            <li class="creditInput align_items-center">
                                采购<input v-model="array['purchaseAmount']" name="purchaseAmount" class="formInput width100" type="text"
                                          :placeholder="$t('realName.placeholder')" autocomplete="off"/>
                                万元/年，赊销占比
                                <input v-model="array['purchaseChargeAmount']" name="purchaseChargeAmount" class="formInput width100" type="text"
                                       :placeholder="$t('realName.placeholder')" autocomplete="off"/>%
                            </li>
                            <li class="align_items-center">
                                国内：<input v-model="array['supplierNumber']" name="supplierNumber" class="formInput width100" type="text"
                                       :placeholder="$t('realName.placeholder')" autocomplete="off"/>家
                            </li>
                            <li>
                                <input v-model="array['logisticsPartner']" name="logisticsPartner" class="formInput" type="text"
                                       :placeholder="$t('realName.placeholder')" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                    <div class="input-block">
                        <ul class="block-top">
                            <li>产品质量</li>
                            <li>离岸账户</li>
                            <li>代理出口</li>
                            <li>中间商</li>
                        </ul>
                        <ul class="block-bottom mg15">
                            <li>
                                <el-radio-group v-model="array['haveQualityProblem']">
                                    <el-radio label="1">曾出现过质量问题</el-radio>
                                    <el-radio label="2">未出现过质量问题</el-radio>
                                </el-radio-group>
                            </li>
                            <li>
                                <el-radio-group v-model="array['haveOffshoreAccounts']">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </li>
                            <li>
                                <el-radio-group v-model="array['isAgentExport']">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </li>
                            <li>
                                <el-radio-group v-model="array['isMiddlemen']">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </li>
                        </ul>
                    </div>
                    <div class="input-block">
                        <ul class="block-top">
                            <li class="creditInput">是否已投保保险</li>
                            <li class="creditInput">是否有保险报损记录</li>
                        </ul>
                        <ul class="block-bottom">
                            <li class="creditInput align_items-center">
                                <el-radio-group v-model="array['haveInsured']">
                                    <el-radio label="1">是
                                        <span v-if="haveInsuredShow">
                                            （请选择具体险种）：
                                            <el-radio-group v-model="array['insuranceType']">
                                                <el-radio label="出口信用险">出口信用险</el-radio>
                                                <el-radio label="货运险">货运险</el-radio>
                                                <el-radio label="财产险">财产险</el-radio>
                                                <el-radio label="其他">其他</el-radio>
                                            </el-radio-group>
                                        </span>
                                    </el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </li>
                            <li class="creditInput">
                                <el-radio-group v-model="lossAmountShow">
                                    <el-radio label="1">是
                                        <span v-if="lossAmountShow == '1'">
                                            ，累计报损
                                            <input v-model="array['lossAmount']" name="lossAmount" class="formInput width100" type="text"
                                                   :placeholder="$t('realName.placeholder')" autocomplete="off"/>万美元
                                        </span>
                                    </el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="basic">
                <div class="title">其他事项：（包括但不限于贸易合同如何签订、卖家对买家的付款评价等）</div>
                <div class="content">
                    <el-input type="textarea" v-model="array['otherMatters']"></el-input>
                    <span class="statement">
                        声明：因我司与上述拟授信买家贸易往来，特委托浙江大道保理有限公司对买家进行资信和
                        双方历史贸易进行调查评估，我司承诺以上内容真实有效，如有虚假隐瞒，本人承担一切责任。
                    </span>
                </div>
            </div>
            <div class="basic">
                <div class="title">拟授信买家清单</div>
                <div class="content">
                    <div class="table-head justify_content align_items-center">
                        <span class="table-tip">（货币单位：万美元）</span>
                        <el-button size="small" type="primary" icon="el-icon-edit" @click="addRow">添加一条</el-button>
                    </div>
                    <el-table
                            stripe
                            border
                            fit
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                v-for="(column, index) in columns"
                                :align="column.align"
                                :label="column.label"
                                :width="column.width"
                                :key="index">
                            <template slot-scope="scope">
                                <div v-if="column.type == 'input'">
                                    <el-input v-model="scope.row[column.prop]" style="width: 100%;"></el-input>
                                </div>
                                <span v-else="column.type == 'text'">
                                    {{(scope.$index + 1)}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                align="center"
                                prop="filesList"
                                :label="$t('button.operation')"
                                min-width="100">
                            <template slot-scope="scope">
                                <el-button type="danger" size="mini" @click="delRow(scope.$index, tableData)" round>{{ $t('button.delete') }}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="basic mt15">
                <div class="title">{{ $t('customerApplication.title') }}</div>
                <div class="upload-wrap">
                    <p class="text-upload">{{ $t('customerApplication.uploadTips') }}</p>
                    <div class="file-upload">
                        <el-upload
                                class="upload-demo"
                                :action="actions"
                                :headers="myHeaders"
                                :data="upLoadData"
                                :on-change="handleChange"
                                :on-error="uploadError"
                                :on-success="uploadSuccess"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :before-upload="beforeUpload"
                                :file-list="fileList">
                            <el-button size="small" type="primary">{{ $t('customerApplication.uploadBtn') }}</el-button>
                            <div slot="tip" class="el-upload__tip">{{ $t('customerApplication.uploadTypeTips') }}</div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="basic text-center">
                <button type="button" class="save-btn" @click="saveBtn()">{{ $t('dialog.save') }}</button>
                <button type="button" class="submit-btn" @click="submitBtn()">{{ $t('dialog.submit') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                basic: [
                    {
                        id: 1,
                        sub: [
                            {
                                text: '总额度需求',
                                name: 'demandAmount',
                                placeholder: '单位为（万美元）',
                                rowspan: 1
                            },
                            {
                                text: '申请企业名称',
                                name: 'companyName',
                                rowspan: 1
                            },
                            {
                                text: '申请企业英文名称',
                                name: 'companyEnglishName',
                                rowspan: 1
                            },
                            {
                                text: '实际经营地址',
                                name: 'businessAddress',
                                rowspan: 1
                            }
                        ]
                    },
                    {
                        id: 2,
                        sub: [
                            {
                                text: '联系人',
                                name: 'contactPerson',
                                rowspan: 1
                            },
                            {
                                text: '联系方式',
                                name: 'contactMethod',
                                rowspan: 1
                            },
                            {
                                text: '员工人数',
                                name: 'employeesAmount',
                                rowspan: 1
                            },
                            {
                                text: '办公面积',
                                name: 'officeSpace',
                                rowspan: 1
                            }
                        ]
                    }
                ],
                array: {
                    orderId: null,
                    businessAddress: '',
                    companyName: '',
                    companyEnglishName: '',
                    contactPerson: '',
                    contactMethod: '',
                    creditNumber: '',
                    creditAmount: '',
                    auditDate: '',
                    demandAmount: '',
                    otherMatters: '',
                    domesticBuyerNumber: 0,
                    domesticSales: '',
                    domesticChargeSales: '',
                    employeesAmount: '',
                    exportSales: '',
                    exportChargeSales: '',
                    foreignBuyerNumber: 0,
                    guaranteeNumber: '',
                    guaranteeAmount: '',
                    haveExportQualification: '',
                    haveInsured: '',
                    haveQualityProblem: '',
                    haveOffshoreAccounts: '',
                    isAgentExport: '',
                    isMiddlemen: '',
                    insuranceType: '',
                    logisticsPartner: '',
                    lossAmount: '',
                    mainProducts: '',
                    officeSpace: '',
                    purchaseAmount: '',
                    purchaseChargeAmount: '',
                    supplierNumber: ''
                },
                haveInsuredShow: false,
                lossAmountShow: null,
                tableData: [
                    {
                        demandAmount: '',
                        creditCompanyName: '',
                        country: '',
                        address: '',
                        contactPhone: '',
                        exportProducts: '',
                        cooperationStartTime: '',
                        averageAnnualTurnover: '',
                        payMethod: '',
                        paymentDays: '',
                        contractAmount: '',
                        haveInsured: '',
                        haveApprovedQuota: '',
                        isAssignedClaim: '',
                        isInformFinancing: ''
                    }
                ],
                columns: [
                    {
                        align: 'center',
                        prop: 'serialNumber',
                        label: '序号',
                        width: '80',
                        type: 'text'
                    },
                    {
                        align: 'center',
                        prop: 'demandAmount',
                        label: '分额度需求',
                        width: '120',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'creditCompanyName',
                        label: '拟授信买家名称',
                        width: '150',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'country',
                        label: '国别/地区',
                        width: '120',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'address',
                        label: '详细地址',
                        width: '180',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'contactPhone',
                        label: '联系电话',
                        width: '120',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'exportProducts',
                        label: '出口产品',
                        width: '120',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'cooperationStartTime',
                        label: '合作起始时间',
                        width: '150',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'averageAnnualTurnover',
                        label: '年均交易额',
                        width: '120',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'payMethod',
                        label: '付款方式',
                        width: '120',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'paymentDays',
                        label: '账期',
                        width: '120',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'contractAmount',
                        label: '当前合同金额',
                        width: '150',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'haveInsured',
                        label: '是否已投保出口信用险',
                        width: '180',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'haveApprovedQuota',
                        label: '是否已批限额',
                        width: '120',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'isAssignedClaim',
                        label: '能否转让债权',
                        width: '120',
                        type: 'input'
                    },
                    {
                        align: 'center',
                        prop: 'isInformFinancing',
                        label: '能否告知买家融资事宜',
                        width: '180',
                        type: 'input'
                    }
                ],
                actions: this.$store.state.baseUrl + "/api/bussiness/account/order/uploadCustomerFile",
                upLoadData: {
                    orderId: null
                },
                myHeaders: {
                    token: this.$store.state.token
                },
                fileList: []
            }
        },
        computed: {
            haveInsured () {
                return this.array.haveInsured
            }
        },
        watch: {
            haveInsured (newValue, oldValue) {
                if (newValue == 2) {
                    this.haveInsuredShow = false;
                } else {
                    this.haveInsuredShow = true;
                }
            }
        },
        methods: {
            // 监听文件状态改变
            handleChange(file, fileList) {
                // console.log(file)
            },
            // 上传错误
            uploadError (response, file, fileList) {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: response.message
                });
            },
            // 上传成功后的回调
            uploadSuccess (response, file, fileList) {
                console.log(response)
                if(response.code == 0){
                    this.fileList = this.File(response.data.filesList);
                    this.$message({
                        showClose: true,
                        type: 'success',
                        message: response.message
                    });
                } else {
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: response.message
                    });
                }
            },
            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 删除文件之前的钩子
            beforeRemove(file, fileList) {
                this.$confirm(this.$t('customerApplication.sureToRemove') + ` ${ file.name }?`, this.$t('dialog.tips'), {
                    confirmButtonText: this.$t('dialog.ok'),
                    cancelButtonText: this.$t('dialog.cancel'),
                    type: 'warning'
                }).then(() => {
                    this.asyncReq(file,fileList) // 在这里真正的处理图片列表
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('customerApplication.deleted')
                    });
                });
                return false; // 这是重点,不管上面的操作结果如何都返回false
            },
            // 图片上传时，文件类型大小等判断
            beforeUpload(file) {
//                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 50;
                if (!isLt2M) {
                    this.$message.error(this.$t('customerApplication.messageErrorSize'));
                }
                return isLt2M;
            },
            // 远请求服务器如果成功则把fileList中要删除的file移除即可
            asyncReq (file,fileList) {
                this.$ajax.post('/api/bussiness/account/order/deleteCustomerFile?fileId=' + file.id + '&orderId=' + this.array['orderId'], null, res => {
                    console.log(res.data)
                    if(res.data){
                        this.fileList = this.File(res.data.filesList);
                    }
                })
            },
            // 用户保存客户信息
            saveBtn: function () {
                if( this.array.infoPdfFile ) {
                    delete this.array.infoPdfFile
                }
                if(this.lossAmountShow == 0) {
                    this.array['lossAmount'] = 0;
                }
                for( let i = 0; i < this.tableData.length; i ++ ) {
                    this.tableData[i].serialNumber = i+1;
                }
                let jsonData = {
                    'businessAccountCreditBuyerLists': this.tableData,
                    'businessAccountCustomerInfo': this.array
                }
                this.$ajax.post('/api/bussiness/account/order/saveCustomerInfo?orderId=' + this.array['orderId'], jsonData, res => {
                    if(res.code === 0){
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            //用户提交客户信息
            submitBtn: function () {
                if( this.array.infoPdfFile ) {
                    delete this.array.infoPdfFile
                }
                if(this.lossAmountShow == 0) {
                    this.array['lossAmount'] = 0;
                }
                for( let i = 0; i < this.tableData.length; i ++ ) {
                    this.tableData[i].serialNumber = i+1;
                }
                let jsonData = {
                    'businessAccountCreditBuyerLists': this.tableData,
                    'businessAccountCustomerInfo': this.array
                }
                this.$ajax.post('/api/bussiness/account/order/submitCustomer?orderId=' + this.array['orderId'], jsonData, res => {
                    if(res.code === 0){
                        this.$router.push({path: '/Investigate/' + this.$route.query.orderType});
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            getGtcpDetail () {
                this.$ajax.get('/api/bussiness/account/order/getCustomerDetail/' + this.array['orderId'], null, res => {
                    if( res.code == 0 ) {
                        let getDetail = res.data;
                        if( getDetail ) {
                            this.array = getDetail;
                            this.fileList = this.File(getDetail.filesList);
                            this.tableData = getDetail.buyerList;
                            if(parseFloat(this.array.lossAmount) > 0) {
                                this.lossAmountShow = '1';
                            } else {
                                this.lossAmountShow = '0';
                            }
                        } else {

                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            handleCurrentChange (val) {
                this.currentRow = val;
                console.log(val.date,val.name,val.address)
            },
            addRow () {
                let _data = {
                    demandAmount: '',
                    creditCompanyName: '',
                    country: '',
                    address: '',
                    contactPhone: '',
                    exportProducts: '',
                    cooperationStartTime: '',
                    averageAnnualTurnover: '',
                    payMethod: '',
                    paymentDays: '',
                    contractAmount: '',
                    haveInsured: '',
                    haveApprovedQuota: '',
                    isAssignedClaim: '',
                    isInformFinancing: ''
                }
                this.tableData.push(_data);
            },
            delRow (index, rows) {
                rows.splice(index, 1);
            },
            File (Array) {
                let list = [];
                Array.forEach(function (val,index,array) {
                    let item = {
                        'id': val.id,
                        'name': val.fileName,
                        'url': val.url
                    }
                    list.push(item);
                })
                return list;
            }
        },
        mounted () {
            this.array['orderId'] = this.$route.query.id;
            this.upLoadData['orderId'] = this.$route.query.id;
            this.getGtcpDetail();
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .forward-main {
        width: 100%;
        padding: 0 20px 60px;
        .submit-btn,
        .save-btn {
            display: inline-block;
            width: 140px;
            height: 40px;
            margin: 50px 20px 0;
            color: #fff;
            font-size: 14px;
            border: none;
            .common_radius(3px);
        }
        .submit-btn {
            background-color: @base;
            &:hover {
                .lighten-hover(@base);
            }
        }
        .save-btn {
            background-color: @Success;
            &:hover {
                .lighten-hover(@Success);
            }
        }
    }
    .upload-wrap {
        width: 100%;
        margin-top: 40px;
        .text-upload {
            width: 100%;
        }
        .file-upload {
            width: 100%;
            max-width: 480px;
            min-width: 200px;
            margin-top: 40px;
        }
    }
    .content {
        width: 100%;
        margin-top: 20px;
        .statement {
            line-height: 36px;
            font-size: 14px;
            color: #303133;
        }
        .table-head {
            width: 100%;
            line-height: .53rem;
            padding: 0 .2rem;
            background-color: #ECF1F5;
            span.table-tip {
                font-size: 12px;
                color: #999;
            }
        }
    }
    div.input-block {
        width: 100%;
        margin-bottom: 20px;
        border: 1px solid #cccccc;
        ul.block-top,
        ul.block-bottom {
            display: flex;
            justify-content: flex-start;
            width: 100%;
            padding: 0 20px;
            li {
                width: 23.5%;
                margin: 10px .75%;
                text-align: left;
            }
            li.creditInput {
                width: 48.7%;
            }
        }
        ul.block-top {
            border-bottom: 1px solid #cccccc;
            li {
                line-height: 26px;
                font-size: 13px;
                color: @main-col;
            }
        }
        input.formInput {
            display: inline-block;
            width: 100%;
            min-width: 125px;
            line-height: 46px;
            padding-left: 10px;
            font-size: 14px;
            .placeholder(@minor-col);
            border: 1px solid rgba(153, 153, 153, 1);
        }
        input.width100 {
            max-width: 100px;
            min-width: 100px;
            margin: 0 10px;
            line-height: 32px;
        }
    }
</style>