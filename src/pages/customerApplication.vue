<template>
    <div class="bg-style">
        <div class="application-main">
            <div class="basic" v-show="serveOrderType != 4 && serveOrderType != 1">
                <div class="title">请选择您想申请的额度范围</div>
                <ul class="select-range">
                    <li class="item iconfont" :class="{'is-active': array['quotaRange'] == '1'}" @click="selectRange('1')">十万以上</li>
                    <li class="item iconfont" :class="{'is-active': array['quotaRange'] == '2'}" @click="selectRange('2')">十万以下</li>
                </ul>
            </div>
            <div class="basic">
                <div class="title">
                    GTCP申请表
                    <!--<span class="btn-block">-->
                        <!--<button type="button" class="btn">下 载</button>-->
                        <!--<button type="button" class="btn">打 印</button>-->
                    <!--</span>-->
                </div>
                <!--进口商-->
                <h1 class="module-title">IMPORTER INFORMATION</h1>
                <!--进口商(10万以上)列表信息-->
                <div class="input-block" v-for="(inputItem, index) in fullImporter" :key="index" v-if="array['quotaRange'] == '1'">
                    <div v-if="inputItem.sub != ''">
                        <ul class="block-top">
                            <li v-for="(children, $index) in inputItem.sub" :key="$index">{{children.text}}</li>
                        </ul>
                        <ul class="block-bottom">
                            <li v-for="(children, $index) in inputItem.sub" :key="$index">
                                <div v-if="children.name == 'iiCompanyName'" class="select-suffix">
                                    <input v-model="array['iiCompanyName']" name="iiCompanyName" class="formInput" type="text"
                                           :placeholder="$t('personal.placeholder')" autocomplete="off"/>
                                    <el-select
                                            class="suffix"
                                            v-model="array['iiCompanyNameSuffix']"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="后缀名"
                                            :remote-method="remoteMethod"
                                            :loading="loading">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <input v-else v-model="array[children.name]" :name="children.name" class="formInput"
                                       type="text" :placeholder="$t('personal.placeholder')" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul class="block-top">
                            <li>PRODUCTS</li>
                            <li class="creditInput text-center" v-show="serveOrderType != 4">CREDIT TERMS REQUEST (DAYS FROM DATE OF BILL OF LADING)</li>
                            <li v-show="serveOrderType != 4">TOTAL CREDIT LINE REQUIRED</li>
                        </ul>
                        <ul class="block-bottom">
                            <li>
                                <input v-model="array['iiProducts']" name="iiProducts" class="formInput" type="text"
                                       :placeholder="$t('personal.placeholder')" autocomplete="off"/>
                            </li>
                            <li class="creditInput horizontal_center" v-show="serveOrderType != 4">
                                <el-radio-group v-model="array['iiCreditTermsRequest']">
                                    <el-radio :label="90">90days</el-radio>
                                    <el-radio :label="120">120days</el-radio>
                                    <el-radio :label="150">150days</el-radio>
                                    <el-radio :label="Others">Others</el-radio>
                                </el-radio-group>
                                <input v-if="array['iiCreditTermsRequest'] != 90 && array['iiCreditTermsRequest'] != 120
                                 && array['iiCreditTermsRequest'] != 150"
                                       v-on:blur="change(array['iiCreditTermsRequest'])"
                                       v-model="array['iiCreditTermsRequest']" name="iiCreditTermsRequest" class="formInput"
                                       type="text" :placeholder="$t('personal.placeholder')" autocomplete="off" style="width: 96px;margin-left: 20px;"/>
                            </li>
                            <li v-show="serveOrderType != 4">
                                <input v-model="array['iiTotalCreditLineRequired']" name="iiTotalCreditLineRequired" class="formInput"
                                       type="text" :placeholder="$t('personal.placeholder')" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--进口商(10万以下)列表信息-->
                <div class="input-block" v-for="inputItem in noFullImporter" :key="inputItem.id" v-if="array['quotaRange'] == '2'">
                    <div v-if="inputItem.sub != ''">
                        <ul class="block-top">
                            <li v-for="(children, $index) in inputItem.sub" :key="$index">{{children.text}}</li>
                        </ul>
                        <ul class="block-bottom">
                            <li v-for="(children, $index) in inputItem.sub" :key="$index">
                                <div v-if="children.name == 'iiCompanyName'" class="select-suffix">
                                    <input v-model="array['iiCompanyName']" name="iiCompanyName" class="formInput" type="text"
                                           :placeholder="$t('personal.placeholder')" autocomplete="off"/>
                                    <el-select
                                            class="suffix"
                                            v-model="array['iiCompanyNameSuffix']"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="后缀名"
                                            :remote-method="remoteMethod"
                                            :loading="loading">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <input v-else-if="children.name !== 'iiTotalCreditLimitRequest'" v-model="array[children.name]" :name="children.name"
                                       class="formInput" type="text" :placeholder="$t('personal.placeholder')" autocomplete="off"/>
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
                                <input v-model="array['iiPhoneNo']" name="iiPhoneNo" class="formInput" type="text" :placeholder="$t('personal.placeholder')"
                                       autocomplete="off"/>
                            </li>
                            <li class="creditInput horizontal_center">
                                <el-radio-group v-model="array['iiCreditTermsRequest']">
                                    <el-radio :label="60">60days</el-radio>
                                    <el-radio :label="90">90days</el-radio>
                                    <el-radio :label="Others">Others</el-radio>
                                </el-radio-group>
                                <input v-show="array['iiCreditTermsRequest'] != 60 && array['iiCreditTermsRequest'] != 90" v-model="array['iiCreditTermsRequest']" v-on:blur="change(array['iiCreditTermsRequest'])"
                                       name="iiCreditTermsRequest" class="formInput" type="text" :placeholder="$t('personal.placeholder')" autocomplete="off" style="width: 96px;margin-left: 20px;"/>
                            </li>
                            <li>
                                <input v-model="array['iiEmailAddress']" name="iiEmailAddress" class="formInput" type="text"
                                       :placeholder="$t('personal.placeholder')" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--供应商-->
                <h1 class="module-title" v-show="serveOrderType != 4 && serveOrderType != 1">SUPPLIER INFORMATION</h1>
                <!--供应商(10万以上)列表信息-->
                <div class="input-block" v-for="inputItem in fullSupplier" :key="inputItem.id" v-if="array['quotaRange'] == '1'">
                    <div v-if="inputItem.sub != ''">
                        <ul class="block-top">
                            <li v-for="children in inputItem.sub" :key="children.text">{{children.text}}</li>
                        </ul>
                        <ul class="block-bottom">
                            <li v-for="children in inputItem.sub" :key="children.text">
                                <input v-model="array[children.name]" :name="children.name" class="formInput"
                                       type="text" :placeholder="$t('personal.placeholder')" autocomplete="off"/>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul class="block-top">
                            <li class="creditInput">THE DURATION OF COOPERATION WITH THIS SUPPLIER</li>
                        </ul>
                        <ul class="block-bottom">
                            <li>
                                <input v-model="array['siDurationOfCooperation']" name="siDurationOfCooperation"
                                       class="formInput" type="text" :placeholder="$t('personal.placeholder')" autocomplete="off"/>
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
                        <li v-for="children in inputItem.sub" :key="children.text">{{children.text}}</li>
                    </ul>
                    <ul class="block-bottom">
                        <li v-for="children in inputItem.sub" :key="children.text">
                            <input  v-model="array[children.name]" :name="children.name" class="formInput" type="text"
                                    :placeholder="$t('personal.placeholder')" autocomplete="off"/>
                        </li>
                    </ul>
                </div>
                <!--其他额外供应商-->
                <h1 class="module-title" v-show="serveOrderType != 4 && serveOrderType != 1">PREPARER INFORMATION</h1>
                <div class="input-block" v-for="inputItem in otherSupplier" :key="inputItem.id">
                    <ul class="block-top">
                        <li v-for="children in inputItem.sub" :key="children.text" :index="children.text">{{children.text}}</li>
                    </ul>
                    <ul class="block-bottom">
                        <li v-for="children in inputItem.sub" :key="children.text">
                            <input  v-model="array[children.name]" :name="children.name" class="formInput" type="text"
                                    :placeholder="$t('personal.placeholder')" autocomplete="off"/>
                        </li>
                    </ul>
                </div>
                <!--note-->
                <div class="note" v-if="array['quotaRange'] == '1'" v-show="serveOrderType != 4 && serveOrderType != 1">
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
            <div class="basic" v-show="serveOrderType != 1">
                <div class="title">相关文件上传</div>
                <div class="upload-wrap">
                    <p class="text-upload">请上传公司基本资料、贸易资料、财务资料、产品图片、公司图片以及相关视频，具体需上传的资料以顾问的要求为主</p>
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
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png、word、pdf、xlsx等相关文件，且不超过50M</div>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="basic text-center">
                <button type="button" value="保存" class="save-btn" @click="saveBtn()">保 存</button>
                <button type="button" value="提交" class="submit-btn" @click="submitBtn()">提 交</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                options: [],
                list: [],
                loading: false,
                Others: 0,
                states: [
                    "AB", "a.d.", "AG", "A.G", "APS",
                    "A/S", "bd", "BHD", "BV", "B.V.",
                    "CO", "CO.,LTD", "Corp.", "d.o.o.", "EIRL",
                    "est", "FZC、FZCO", "FZE", "GmbH", "Inc",
                    "JSC", "k.k.", "Lda", "LLC", "LLP",
                    "LTD", "Ltda", "Mfy", "NV", "N.V.",
                    "OJSC", "OY", "PLC", "Pte.", "Pte、PVT",
                    "PT、TBK", "PTY", "SA", "S.A. de C.V.", "S.A.R.L.",
                    "SDN BHD", "S.P.A.", "SP.Z.O.O", "SRL", "S.R.L.",
                    "S.R.O", "S.R.O.", "TIC", "Y.K"
                ],
                fullImporter: [
                    {
                        id: 1,
                        sub: [
                            {
                                text: 'COMPANY NAME',
                                name: 'iiCompanyName',
                                management: true
                            },
                            {
                                text: 'USED COMPANY NAME',
                                name: 'iiUsedCompanyName',
                                management: true
                            },
                            {
                                text: 'REGISTERED ADDRESS',
                                name: 'iiRegisteredAddress',
                                management: true
                            },
                            {
                                text: 'PRINCIPAL / OWNER OF IMPORTER CO.',
                                name: 'iiPrincipal',
                                management: true
                            }
                        ]
                    },
                    {
                        id: 2,
                        sub: [
                            {
                                text: 'IMPORTER OWNER PASSPORT NO.',
                                name: 'iiPassportNo',
                                management: true
                            },
                            {
                                text: 'IMPORTER TAX NO.',
                                name: 'iiTaxNo',
                                management: true
                            },
                            {
                                text: 'IMPORTER ENTERPRISE REGISTRATION NO.',
                                name: 'iiRegistrationNo',
                                management: true
                            },
                            {
                                text: 'CONTACT PERSON',
                                name: 'iiContactPerson',
                                management: true
                            }
                        ]
                    },
                    {
                        id: 3,
                        sub: [
                            {
                                text: 'PHONE NO.',
                                name: 'iiPhoneNo',
                                management: true
                            },
                            {
                                text: 'EMAIL ADDRESS',
                                name: 'iiEmailAddress',
                                management: true
                            },
                            {
                                text: 'AVERAGE ANNUAL PURCHASE VOLUME(USD)',
                                name: 'iiPurchaseVolume',
                                management: true
                            },
                            {
                                text: 'AVERAGE ANNUAL SALE VOLUME(USD)',
                                name: 'iiSaleVolume',
                                management: true
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
                                name: 'iiQuantityOfSuppliers',
                                management: false
                            },
                            {
                                text: 'THE MAJOR LOCATION OF SUPPLIERS',
                                name: 'iiMajorLocationOfSuppliers',
                                management: false
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
                actions: this.$store.state.baseUrl + "/api/bussiness/account/order/uploadGtcpFile",
                upLoadData: {
                    orderId: null
                },
                myHeaders: {
                    token: this.$store.state.token
                },
                array: {
                    orderId: null,
                    quotaRange: null,
                    iiCompanyName: null,
                    iiCompanyNameSuffix: null,
                    iiUsedCompanyName: null,
                    iiRegisteredAddress: null,
                    iiPrincipal: null,
                    iiPassportNo: null,
                    iiTaxNo: null,
                    iiRegistrationNo: null,
                    iiContactPerson: null,
                    iiPhoneNo: null,
                    iiEmailAddress: null,
                    iiPurchaseVolume: null,
                    iiSaleVolume: null,
                    iiProducts: null,
                    iiCreditTermsRequest: 0,
                    iiTotalCreditLineRequired: null,
                    iiQuantityOfSuppliers: null,
                    iiMajorLocationOfSuppliers: null,
                    iiMainImportedGoods: null,
                    iiTotalCreditLimitRequest: null,
                    siCreditLineRequired: null,
                    siCompanyName: null,
                    siOrganizationCode: null,
                    siRegisteredAddress: null,
                    siContactPerson: null,
                    siPhoneNo: null,
                    siEmailAddress: null,
                    siAmountOfAnnualPurchases: null,
                    siAmountOfLatestOrder: null,
                    siProductsPurchased: null,
                    siPaymentTerms: null,
                    siCreditTerm: null,
                    siDurationOfCooperation: null,
                    piName: null,
                    piCompanyName: null,
                    piPosition: null,
                    piPhoneNo: null
                }
            }
        },
        mounted() {
            this.list = this.states.map(item => {
                return { value: item, label: item };
            });
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.options = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            // 获取iiCreditTermsRequest的变化
            change(value) {
                if(this.array['quotaRange'] === '1'){
                    if(value == 90 || value == 120 || value == 150) {
                        this.$message({
                            type: 'error',
                            message: '请输入其他的天数'
                        });
                        this.Others = 0;
                        this.array['iiCreditTermsRequest'] = 0;
                    } else {
                        this.Others = value;
                    }
                } else {
                    if(value == 60 || value == 90) {
                        this.$message({
                            type: 'error',
                            message: '请输入其他的天数'
                        });
                        this.Others = 0;
                        this.array['iiCreditTermsRequest'] = 0;
                    } else {
                        this.Others = value;
                    }
                }

            },
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
//                console.log(file);
            },
            beforeUpload(file) {
//                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 50;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 50MB!');
                }
                return isLt2M;
            },
            // 删除文件之前的钩子
            beforeRemove(file, fileList) {
                this.$confirm(`确定移除 ${ file.name }?`, '提示', {
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
            // 远请求服务器如果成功则把fileList中要删除的file移除即可
            asyncReq (file,fileList) {
                this.$ajax.post('/api/bussiness/account/order/deleteGtcpFile?fileId=' + file.id + '&orderId=' + this.array['orderId'], null, res => {
                    if(res.data){
                        this.fileList = this.File(res.data.files);
                    }
                })
            },
            // 保存
            saveBtn () {
                if( this.array.files ) {
                    delete this.array.files
                }
                if( this.array.gtcpApplyPdf ) {
                    delete this.array.gtcpApplyPdf
                }
                this.$ajax.post( '/api/bussiness/account/order/saveGtcp?orderId=' + this.array['orderId'], this.array, res => {
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
            // 提交
            submitBtn () {
                if( this.array.files ) {
                    delete this.array.files
                }
                if( this.array.gtcpApplyPdf ) {
                    delete this.array.gtcpApplyPdf
                }
                this.$ajax.post( '/api/bussiness/account/order/submitGtcp?orderId=' + this.array['orderId'], this.array, res => {
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
            // 获取之前保存的信息
            getGtcpDetail () {
                this.$ajax.get('/api/bussiness/account/order/getGtcpDetail/' + this.array['orderId'], null, res => {
                    if( res.code == 0 ) {
                        let getDetail = res.data;
                        if(!getDetail) {
                            this.array['quotaRange'] = '1';
                        } else {
                            this.array = getDetail;
                            this.fileList = this.File(getDetail.files);
                            if(!this.array['quotaRange']) {
                                this.array['quotaRange'] = '1';
                            }
                            let getLabelNum = this.array['iiCreditTermsRequest'];
                            let getQuotaRange = this.array['quotaRange'];
                            if( getQuotaRange == '1') {
                                if( getLabelNum != 90 && getLabelNum != 120 && getLabelNum != 150 && getLabelNum != null) {
                                    this.Others = getLabelNum;
                                } else {
                                    this.Others = 0;
                                    this.array['iiCreditTermsRequest'] = 0;
                                }
                            }
                            else {
                                if( getLabelNum != 60 && getLabelNum != 90 && getLabelNum != null) {
                                    this.Others = getLabelNum;
                                } else {
                                    this.Others = 0;
                                    this.array['iiCreditTermsRequest'] = 0;
                                }
                            }
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                })
            },
            // 上传成功后的回调
            uploadSuccess (response, file, fileList) {
                console.log(response)
                console.log(file)
                if(response.code == 0){
                    this.fileList = this.File(response.data.files);
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
            // 上传错误
            uploadError (response, file, fileList) {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: response.message
                });
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
        created　() {
            this.array['orderId'] = this.$route.query.id;
            this.upLoadData['orderId'] = this.$route.query.id;
            this.serveOrderType = this.$route.query.orderType;
            if( this.serveOrderType == 1) {
                this.fullImporter = [
                    {
                        id: 1,
                        sub: [
                            {
                                text: 'COMPANY NAME',
                                name: 'iiCompanyName',
                                management: true
                            },
                            {
                                text: 'REGISTERED ADDRESS',
                                name: 'iiRegisteredAddress',
                                management: true
                            },
                            {
                                text: 'PHONE NO.',
                                name: 'iiPhoneNo',
                                management: true
                            },
                            {
                                text: 'EMAIL ADDRESS',
                                name: 'iiEmailAddress',
                                management: true
                            }
                        ]
                    }
                ];
                this.fullSupplier = [];
                this.otherSupplier = [];
            }
            else if( this.serveOrderType == 4 ) {
                this.fullImporter = [
                    {
                        id: 1,
                        sub: [
                            {
                                text: 'COMPANY NAME',
                                name: 'iiCompanyName',
                                management: true
                            },
                            {
                                text: 'USED COMPANY NAME',
                                name: 'iiUsedCompanyName',
                                management: true
                            },
                            {
                                text: 'REGISTERED ADDRESS',
                                name: 'iiRegisteredAddress',
                                management: true
                            },
                            {
                                text: 'PRINCIPAL / OWNER OF IMPORTER CO.',
                                name: 'iiPrincipal',
                                management: true
                            }
                        ]
                    },
                    {
                        id: 2,
                        sub: [
                            {
                                text: 'IMPORTER OWNER PASSPORT NO.',
                                name: 'iiPassportNo',
                                management: true
                            },
                            {
                                text: 'IMPORTER TAX NO.',
                                name: 'iiTaxNo',
                                management: true
                            },
                            {
                                text: 'IMPORTER ENTERPRISE REGISTRATION NO.',
                                name: 'iiRegistrationNo',
                                management: true
                            },
                            {
                                text: 'CONTACT PERSON',
                                name: 'iiContactPerson',
                                management: true
                            }
                        ]
                    },
                    {
                        id: 3,
                        sub: [
                            {
                                text: 'PHONE NO.',
                                name: 'iiPhoneNo',
                                management: true
                            },
                            {
                                text: 'EMAIL ADDRESS',
                                name: 'iiEmailAddress',
                                management: true
                            },
                            {
                                text: 'AVERAGE ANNUAL PURCHASE VOLUME(USD)',
                                name: 'iiPurchaseVolume',
                                management: true
                            },
                            {
                                text: 'AVERAGE ANNUAL SALE VOLUME(USD)',
                                name: 'iiSaleVolume',
                                management: true
                            }
                        ]
                    },
                    {
                        id: 4,
                        sub: []
                    }
                ];
                this.fullSupplier = [];
                this.otherSupplier = [];
            }
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
                    width: 48.7%;
                }
                .select-suffix {
                    position: relative;
                    border: 1px solid rgba(153, 153, 153, 1);
                    input {
                        padding-right: @width-pr;
                        border: none;
                    }
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
</style>
