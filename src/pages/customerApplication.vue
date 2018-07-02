<template>
    <div class="bg-style">
        <form class="application-main">
            <div class="basic">
                <div class="title">请选择您想申请的额度范围</div>
                <ul class="select-range">
                    <li class="item iconfont" :class="{'is-active': array['quotaRange'] == '1'}" @click="selectRange('1')">十万以上</li>
                    <li class="item iconfont" :class="{'is-active': array['quotaRange'] == '2'}" @click="selectRange('2')">十万以下</li>
                </ul>
            </div>
            <div class="basic">
                <div class="title">
                    GTCP申请表
                    <span class="btn-block">
                        <button type="button" class="btn">下 载</button>
                        <button type="button" class="btn">打 印</button>
                    </span>
                </div>
                <!--进口商-->
                <h1 class="module-title">IMPORTER INFORMATION</h1>
                <!--进口商(10万以上)列表信息-->
                <div class="input-block" v-for="(inputItem, index) in fullImporter" :key="index" v-if="array['quotaRange'] == '1'">
                    <div v-if="inputItem.sub != ''">
                        <ul class="block-top">
                            <li v-for="children in inputItem.sub" :key="children.text" :index="children.text">{{children.text}}</li>
                        </ul>
                        <ul class="block-bottom">
                            <li v-for="(children, $index) in inputItem.sub" :key="$index">
                                <input v-model="array[children.name]" :index="children.text" :name="children.name"
                                       class="formInput" type="text" placeholder="请填写" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul class="block-top">
                            <li>PRODUCTS</li>
                            <li class="creditInput text-center">CREDIT TERMS REQUEST (DAYS FROM DATE OF BILL OF LADING)</li>
                            <li>TOTAL CREDIT LINE REQUIRED</li>
                        </ul>
                        <ul class="block-bottom">
                            <li>
                                <input v-model="array['iiProducts']" name="iiProducts" class="formInput" type="text" placeholder="请填写" autocomplete="off"/>
                            </li>
                            <li class="creditInput horizontal_center">
                                <el-radio-group v-model="array['iiCreditTermsRequest']">
                                    <el-radio :label="90">90days</el-radio>
                                    <el-radio :label="120">120days</el-radio>
                                    <el-radio :label="150">150days</el-radio>
                                    <el-radio :label="null">Others</el-radio>
                                </el-radio-group>
                                <input v-show="array['iiCreditTermsRequest'] == null" v-model="array['iiCreditTermsRequest']" name="iiCreditTermsRequest"
                                       class="formInput" type="text" placeholder="请填写" autocomplete="off" style="width: 96px;margin-left: 20px;"/>
                            </li>
                            <li>
                                <input v-model="array['iiTotalCreditLineRequired']" name="iiTotalCreditLineRequired" class="formInput"
                                       type="text" placeholder="请填写" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--进口商(10万以下)列表信息-->
                <div class="input-block" v-for="inputItem in noFullImporter" :key="inputItem.id" v-if="array['quotaRange'] == '2'">
                    <div v-if="inputItem.sub != ''">
                        <ul class="block-top">
                            <li v-for="children in inputItem.sub" :key="children.text" :index="children.text">{{children.text}}</li>
                        </ul>
                        <ul class="block-bottom">
                            <li v-for="children in inputItem.sub" :key="children.text">
                                <input v-model="array[children.name]" :index="children.text" :name="children.name" class="formInput"
                                       type="text" placeholder="请填写"
                                       autocomplete="off" v-if="children.name !== 'iiTotalCreditLimitRequest'"/>
                                <div v-else>
                                    <el-radio v-model="array['iiTotalCreditLimitRequest']" label="1" border>$100,000</el-radio>
                                    <el-radio v-model="array['iiTotalCreditLimitRequest']" label="2" border>$50,000</el-radio>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul class="block-top">
                            <li>CONTACT PERSON PHONE NO.</li>
                            <li class="creditInput text-center">CREDIT TERMS REQUEST (DAYS FROM DATE OF BILL OF LADING)</li>
                            <li>CONTACT PERSON EMAIL ADDRESS</li>
                        </ul>
                        <ul class="block-bottom">
                            <li>
                                <input v-model="array['iiPhoneNo']" name="iiPhoneNo" class="formInput" type="text" placeholder="请填写"
                                       autocomplete="off"/>
                            </li>
                            <li class="creditInput horizontal_center">
                                <el-radio-group v-model="array['iiCreditTermsRequest']">
                                    <el-radio :label="60">60days</el-radio>
                                    <el-radio :label="90">90days</el-radio>
                                    <el-radio :label="null">Others</el-radio>
                                </el-radio-group>
                                <input v-show="array['iiCreditTermsRequest'] == null" v-model="array['iiCreditTermsRequest']" name="iiCreditTermsRequest"
                                       class="formInput" type="text" placeholder="请填写" autocomplete="off" style="width: 96px;margin-left: 20px;"/>
                            </li>
                            <li>
                                <input v-model="array['iiContactPerson']" name="iiContactPerson" class="formInput" type="text"
                                       placeholder="请填写" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--供应商-->
                <h1 class="module-title">SUPPLIER INFORMATION</h1>
                <!--供应商(10万以上)列表信息-->
                <div class="input-block" v-for="inputItem in fullSupplier" :key="inputItem.id" v-if="array['quotaRange'] == '1'">
                    <div v-if="inputItem.sub != ''">
                        <ul class="block-top">
                            <li v-for="children in inputItem.sub" :key="children.text" :index="children.text">{{children.text}}</li>
                        </ul>
                        <ul class="block-bottom">
                            <li v-for="children in inputItem.sub" :key="children.text">
                                <input v-model="array[children.name]" :index="children.text" :name="children.name" class="formInput" type="text" placeholder="请填写" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul class="block-top">
                            <li class="creditInput">THE DURATION OF COOPERATION WITH THIS SUPPLIER</li>
                        </ul>
                        <ul class="block-bottom">
                            <li>
                                <input v-model="array['siDurationOfCooperation']" name="siDurationOfCooperation" class="formInput" type="text" placeholder="请填写" autocomplete="off"/>
                            </li>
                        </ul>
                        <ul class="block-top" style="border-top: 1px solid #cccccc;border-bottom: none;">
                            <li class="creditInput" style="font-weight: bold;width: 100%;">If you have additional suppliers, add additional information in ‘Supplier Information Form’</li>
                        </ul>
                    </div>
                </div>
                <!--供应商(10万以下)列表信息-->
                <div class="input-block" v-for="inputItem in noFullSupplier" :key="inputItem.id" v-if="array['quotaRange'] == '2'">
                    <ul class="block-top">
                        <li v-for="children in inputItem.sub" :key="children.text" :index="children.text">{{children.text}}</li>
                    </ul>
                    <ul class="block-bottom">
                        <li v-for="children in inputItem.sub" :key="children.text">
                            <input  v-model="array[children.name]" :index="children.text" :name="children.name" class="formInput" type="text" placeholder="请填写" autocomplete="off"/>
                        </li>
                    </ul>
                </div>
                <!--其他额外供应商-->
                <h1 class="module-title">PREPARER INFORMATION</h1>
                <div class="input-block" v-for="inputItem in otherSupplier" :key="inputItem.id">
                    <ul class="block-top">
                        <li v-for="children in inputItem.sub" :key="children.text" :index="children.text">{{children.text}}</li>
                    </ul>
                    <ul class="block-bottom">
                        <li v-for="children in inputItem.sub" :key="children.text">
                            <input  v-model="array[children.name]" :index="children.text" :name="children.name" class="formInput" type="text" placeholder="请填写" autocomplete="off"/>
                        </li>
                    </ul>
                </div>
                <!--note-->
                <div class="note" v-if="array['quotaRange'] == '1'">
                    Note:
                    <p>
                        * By filling out this form, the importer (applicant) listed above agrees to the usage terms of the
                        Great Tao Purchasing Credit (GTPC) program in which information contained herein will be used for
                        application purposes towards obtaining purchasing credit for the applicant. Great Tao does not share
                            its information with any non-related parties to the GTPC program without first obtaining consent.
                    </p>
                    <p>**Exporters in the GTPC program must be a GT approved company exporting goods from China.</p>
                    <p>***Documents required for this credit:</p>
                    <p>Item1. Application form .</p>
                    <p>Item2. Copy of importer’s business license .</p>
                    <p>Item3. Copy of importer owner’s passport .</p>
                    <p>Item4. Sales contracts with supplier (At least 5 orders in the past 6 months) .</p>
                    <p>Item5. Commercial invoices and Packing lists with supplier (At least 5 orders in the past 6 months) .</p>
                    <p>Item6. Copies of B/L of sales contract related to item 4 (At least 5 orders in the past 6 months).</p>
                    <p>Item7. Customs declaration documents related to item 4 (At least 5 orders in the past 6 months).</p>
                    <p>Item8. Payment records related to item 4 (At least 5 orders in the past 6 months).</p>
                    <p>Item9. Financial statement for past 3 years and monthly statement for latest month .</p>
                    <p>Item10. Investigation Report of Credit Granting of buyer (See attachment).</p>
                </div>
                <div class="note" v-if="array['quotaRange'] == '2'">
                    Note:
                    <p>* By filling out this form, the importer (applicant) listed above agrees to the usage terms of the
                    Great Tao Purchasing Credit (GTPC) program in which information contained herein will be used for
                    application purposes towards obtaining purchasing credit for the applicant. Great Tao does not share
                        its information with any non-related parties to the GTPC program without first obtaining consent.</p>
                    <p>**Exporters in the GTPC program must be a GT approved company exporting goods from China.</p>
                    <p>*** Documents required to get the $100,000 credit limit:</p>
                    <p>Item1. Application form .</p>
                    <p>Item2. Copy of importer’s business license.</p>
                    <p>Item3. Copy of importer owner’s passport.</p>
                    <p>****Documents required to activate the $100,000 credit limit:</p>
                    <p>Item1. Sales contracts with supplier (At least 5 orders in the past 6 months) . </p>
                    <p>Item2. Commercial invoices and Packing lists with supplier (At least 5 orders in the past 6 months) . </p>
                    <p>Item3. Copies of B/L of sales contract related to item 1 (At least 5 orders in the past 6 months) .</p>
                    <p>Item4. Customs declaration documents related to item 1 (At least 5 orders in the past 6 months). </p>
                    <p>Item5. Payment records related to item 1 (At least 5 orders in the past 6 months).</p>
                    <p>Item6. Financial statement for past 3 years and monthly statement for latest month .</p>

                </div>
            </div>
            <div class="basic">
                <div class="title">相关文件上传</div>
                <div class="upload-wrap">
                    <p class="text-upload">请上传公司基本资料、贸易资料、财务资料、产品图片、公司图片以及相关视频，具体需上传的资料以顾问的要求为主</p>
                    <div class="file-upload">
                        <el-upload
                                class="upload-demo"
                                :action="this.$store.state.domain + importFileUrl"
                                :headers="myHeaders"
                                :data="upLoadData"
                                :on-change="handleChange"
                                :onError="uploadError"
                                :onSuccess="uploadSuccess"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="basic text-center">
                <button type="button" value="保存" class="save-btn" @click="saveBtn()">保 存</button>
                <button type="button" value="提交" class="submit-btn" @click="submitBtn()">提 交</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                fullImporter: [
                    {
                        id: 1,
                        sub: [
                            {
                                text: 'COMPANY NAME',
                                name: 'iiCompanyName'
                            },
                            {
                                text: 'USED COMPANY NAME',
                                name: 'iiUsedCompanyName'
                            },
                            {
                                text: 'REGISTERED ADDRESS',
                                name: 'iiRegisteredAddress'
                            },
                            {
                                text: 'PRINCIPAL / OWNER OF IMPORTER CO.',
                                name: 'iiPrincipal'
                            }
                        ]
                    },
                    {
                        id: 2,
                        sub: [
                            {
                                text: 'IMPORTER OWNER PASSPORT NO.',
                                name: 'iiPassportNo'
                            },
                            {
                                text: 'IMPORTER TAX NO.',
                                name: 'iiTaxNo'
                            },
                            {
                                text: 'IMPORTER ENTERPRISE REGISTRATION NO.',
                                name: 'iiRegistrationNo'
                            },
                            {
                                text: 'CONTACT PERSON',
                                name: 'iiContactPerson'
                            }
                        ]
                    },
                    {
                        id: 3,
                        sub: [
                            {
                                text: 'PHONE NO.',
                                name: 'iiPhoneNo'
                            },
                            {
                                text: 'EMAIL ADDRESS',
                                name: 'iiEmailAddress'
                            },
                            {
                                text: 'AVERAGE ANNUAL PURCHASE VOLUME(USD)',
                                name: 'iiPurchaseVolume'
                            },
                            {
                                text: 'AVERAGE ANNUAL SALE VOLUME(USD)',
                                name: 'iiSaleVolume'
                            }
                        ]
                    },
                    {
                        id: 4,
                        sub: []
                    },
                    {
                        id: 5,
                        sub: [
                            {
                                text: 'THE QUANTITY OF SUPPLIERS',
                                name: 'iiQuantityOfSuppliers'
                            },
                            {
                                text: 'THE MAJOR LOCATION OF SUPPLIERS',
                                name: 'iiMajorLocationOfSuppliers'
                            }
                        ]
                    }
                ],
                noFullImporter: [
                    {
                        id: 111,
                        sub: [
                            {
                                text: 'COMPANY NAME',
                                name: 'iiCompanyName'
                            },
                            {
                                text: 'USED COMPANY NAME',
                                name: 'iiUsedCompanyName'
                            },
                            {
                                text: 'MAIN IMPORTED GOODS',
                                name: 'iiMainImportedGoods'
                            },
                            {
                                text: 'IMPORTER ANNUAL PURCHASE VOLUME',
                                name: 'iiPurchaseVolume'
                            }
                        ]
                    },
                    {
                        id: 112,
                        sub: [
                            {
                                text: 'IMPORTER ANNUAL SALES VOLUME',
                                name: 'iiSaleVolume'
                            },
                            {
                                text: 'REGISTERED COMPANY ADDRESS',
                                name: 'iiRegisteredAddress'
                            },
                            {
                                text: 'PRINCIPAL / OWNER OF IMPORTER CO.',
                                name: 'iiPrincipal'
                            },
                            {
                                text: 'CONTACT PERSON',
                                name: 'iiContactPerson'
                            }
                        ]
                    },
                    {
                        id: 113,
                        sub: []
                    },
                    {
                        id: 114,
                        sub: [
                            {
                                text: 'TOTAL CREDIT LIMIT REQUEST',
                                name: 'iiTotalCreditLimitRequest'
                            }
                        ]
                    }
                ],
                fullSupplier: [
                    {
                        id: 6,
                        sub: [
                            {
                                text: 'CREDIT LINE REQUIRED',
                                name: 'siCreditLineRequired'
                            },
                            {
                                text: 'COMPANY NAME',
                                name: 'siCompanyName'
                            },
                            {
                                text: 'ORGANIZATION CODE',
                                name: 'siOrganizationCode'
                            },
                            {
                                text: 'REGISTERED ADDRESS',
                                name: 'siRegisteredAddress'
                            }
                        ]
                    },
                    {
                        id: 7,
                        sub: [
                            {
                                text: 'CONTACT PERSON',
                                name: 'siContactPerson'
                            },
                            {
                                text: 'PHONE NO.',
                                name: 'siPhoneNo'
                            },
                            {
                                text: 'EMAIL ADDRESS',
                                name: 'siEmailAddress'
                            },
                            {
                                text: 'AMOUNT OF ANNUAL PURCHASES',
                                name: 'siAmountOfAnnualPurchases'
                            }
                        ]
                    },
                    {
                        id: 8,
                        sub: [
                            {
                                text: 'THE AMOUNT OF THE LATEST ORDER',
                                name: 'siAmountOfLatestOrder'
                            },
                            {
                                text: 'PRODUCTS PURCHASED',
                                name: 'siProductsPurchased'
                            },
                            {
                                text: 'PAYMENT TERMS',
                                name: 'siPaymentTerms'
                            },
                            {
                                text: 'CREDIT TERM',
                                name: 'siCreditTerm'
                            }
                        ]
                    },
                    {
                        id: 9,
                        sub: []
                    }
                ],
                noFullSupplier: [
                    {
                        id: 10,
                        sub: [
                            {
                                text: 'COMPANY NAME',
                                name: 'siCompanyName'
                            },
                            {
                                text: 'CONTACT PERSON',
                                name: 'siContactPerson'
                            },
                            {
                                text: 'PHONE NO.',
                                name: 'siPhoneNo'
                            }
                        ]
                    }
                ],
                otherSupplier: [
                    {
                        id: 11,
                        sub: [
                            {
                                text: 'NAME',
                                name: 'piName'
                            },
                            {
                                text: 'COMPANY NAME',
                                name: 'piCompanyName'
                            },
                            {
                                text: 'POSITION',
                                name: 'piPosition'
                            },
                            {
                                text: 'PHONE NO.',
                                name: 'piPhoneNo'
                            }
                        ]
                    }
                ],
                fileList: [],
                importFileUrl: "/api/bussiness/account/order/uploadGtcpFile",
                upLoadData: {
                    orderId: 1
                },
                myHeaders: {
                    token: "b98578419cd420951a2e724f915f1dbb"
                },
                array: {
                    orderId: 1,
                    quotaRange: '1',
                    iiCompanyName: '1',
                    iiUsedCompanyName: '1',
                    iiRegisteredAddress: '1',
                    iiPrincipal: '1',
                    iiPassportNo: '1',
                    iiTaxNo: '1',
                    iiRegistrationNo: '1',
                    iiContactPerson: '1',
                    iiPhoneNo: '1',
                    iiEmailAddress: '1',
                    iiPurchaseVolume: 1050.00,
                    iiSaleVolume: 2000.00,
                    iiProducts: '1',
                    iiCreditTermsRequest: null,
                    iiTotalCreditLineRequired: 8888,
                    iiQuantityOfSuppliers: 8,
                    iiMajorLocationOfSuppliers: '1',
                    iiMainImportedGoods: '1',
                    iiTotalCreditLimitRequest: '1',
                    siCreditLineRequired: 2333,
                    siCompanyName: '1',
                    siOrganizationCode: '1',
                    siRegisteredAddress: '1',
                    siContactPerson: '1',
                    siPhoneNo: '1',
                    siEmailAddress: '1',
                    siAmountOfAnnualPurchases: 66,
                    siAmountOfLatestOrder: 9,
                    siProductsPurchased: 10000,
                    siPaymentTerms: '1',
                    siCreditTerm: '1',
                    siDurationOfCooperation: '1',
                    piName: '1',
                    piCompanyName: '1',
                    piPosition: '1',
                    piPhoneNo: '1'
                }
            }
        },
        methods: {
            // 选择申请的额度范围
            selectRange (module) {
                this.array['quotaRange'] = module;
            },
            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            // 监听文件状态改变
            handleChange(file, fileList) {
                console.log(this.array);
                console.log(file);
//                this.fileList = fileList.slice(-10);
            },
            // 删除文件之前的钩子
            beforeRemove(file, fileList) {
//                return this.$confirm(`确定移除 ${ file.fileName }？`);
                this.$confirm(`确定移除 ${ file.fileName }?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.asyncReq(file,fileList) // 在这里真正的处理图片列表
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                return false; // 这是重点,不管上面的操作结果如何都返回false
            },
            asyncReq (file,fileList) {
                // 处理图片列表
                // 远请求服务器如果成功则把fileList中要删除的file移除即可
            },
            // 保存
            saveBtn () {
                const SaveGtcpUrl = this.$store.state.domain + '/api/bussiness/account/order/saveGtcp?orderId=';
                this.$ajax.post( SaveGtcpUrl + this.array['orderId'], this.array, res => {
                    console.log(res)
                })
            },
            // 提交
            submitBtn () {
                const SubmitGtcpUrl = this.$store.state.domain + '/api/bussiness/account/order/submitGtcp?orderId=';
                this.$ajax.post( SubmitGtcpUrl + this.array['orderId'], this.array, res => {
                    this.array = res.data;
                })
            },
            // 获取之前保存的信息
            getGtcpDetail () {
                const getGtcpDetailUrl = this.$store.state.domain + '/api/bussiness/account/order/getGtcpDetail/';
                this.$ajax.get(getGtcpDetailUrl + this.array['orderId'], null, res => {
                    console.log(res.data.files)
                    this.array = res.data;
                    this.fileList = res.data.files;
                    if(!res.data.quotaRange) {
                        this.array['quotaRange'] = '1';
                    }
                })
            },
            // 上传成功后的回调
            uploadSuccess (response, file, fileList) {
                console.log('文件', file)
                console.log('上传文件', response)
                this.fileList = response.data.files;
                console.log(this.fileList)
            },
            // 上传错误
            uploadError (response, file, fileList) {
                this.$message({
                    showClose: true,
                    message: response.message
                });
            }
        },
        created　() {
            this.getGtcpDetail();
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .application-main {
        padding: 0 20px 60px;
        ul.select-range {
            padding: 30px 0;
            li.item {
                position: relative;
                display: inline-block;
                width: 156px;
                height: 56px;
                margin-right: 30px;
                color: @general-col;
                line-height: 56px;
                text-align: center;
                font-size: 16px;
                border: 1px solid @general-col;
                background-color: #fff;
                cursor: pointer;

            }
            li.is-active {
                color: @base;
                border: 1px solid @base;
                &:before {
                    content: '\e8b7';
                    position: absolute;
                    bottom: -12px;
                    right: -1px;
                    z-index: 1;
                    font-size: 32px;
                }
            }
        }
        .btn-block {
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
        }
        .btn {
            width: 140px;
            height: 40px;
            margin-left: 20px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            color: @base;
            border: 1px solid @base;
            background-color: #fff;
            .common_radius(3px);
            &:hover {
                color: #fff;
                background-color: @base;
            }
        }
        h1.module-title {
            line-height: 40px;
            font-size: 16px;
            color: @main-col;
        }
        div.input-block {
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
                    width: calc(48.7%);
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
            }
        }
        .upload-wrap {
            padding-left: 20px;
            .text-upload {
                margin: 40px 0;
            }
            .file-upload {
                width: 28%;
                min-width: 200px;
            }
        }
        .note {
            margin-bottom: 30px;
            font-weight: bold;
            p {
                line-height: 30px;
                font-weight: normal;
            }
        }
        .submit-btn,
        .save-btn {
            display: inline-block;
            width: 140px;
            height: 40px;
            margin: 50px 20px 0;
            color: #fff;
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
</style>