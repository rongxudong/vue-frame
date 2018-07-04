<template>
    <div class="bg-style">
        <el-form class="RealName-main" status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="135px" label-position="left">
            <div class="real-fail-wrap flex_start align_items" v-show="auditFlag == '3'">
                <img src="../assets/img/RealName/real-fail.png"/>
                <div class="fail-text">
                    <h1>抱歉，您的实名认证审核未通过，请修改后重新提交！</h1>
                    <p class="flex_start">
                        <span>失败原因：</span>
                        <span>1.手持身份证照片拍摄不符合要求<br/>2.身份证和营业执照名字不符</span>
                    </p>
                </div>
            </div>
            <div class="basic">
                <div class="title">{{ $t('personal.basicInformation') }}</div>
                <div class="basic-form">
                    <el-form-item :label="$t('personal.name')" prop="name">
                        <el-input v-model="ruleForm.name" class="input-width" type="text"
                                  :placeholder="$t('personal.placeholder')" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('personal.idCard')" prop="idCard">
                        <el-input v-model="ruleForm.idCard" class="input-width" type="text"
                                  :placeholder="$t('personal.placeholder')" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item :label="$t('personal.idPicFront')" prop="idPicFront" class="upload-flex" ref="idPicFront">
                        <!--<my-upload-->
                                <!--ref="upload"-->
                                <!--:headers="myHeaders"-->
                                <!--:action="action"-->
                                <!--:data="{ parm: 1 }"-->
                                <!--:name="nameType"-->
                                <!--:uploadId="uploadList[0].key"-->
                                <!--:onChange="handleChange"-->
                                <!--:onSuccess="handleAvatarSuccess"-->
                                <!--:beforeUpload="beforeAvatarUpload"-->
                        <!--&gt;</my-upload>-->

                        <el-upload
                                ref="upload"
                                class="avatar-uploader"
                                :headers="myHeaders"
                                :action="action"
                                :data="{ parm: 1 }"
                                :name="nameType"
                                :on-change="handleChange"
                                :show-file-list="false"
                                :on-success="idPicFrontFileSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.idPicFront" :src="ruleForm.idPicFront" class="avatar">
                            <i v-else="!ruleForm.idPicFront" class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item :label="$t('personal.idPicBehind')" prop="idPicBehind" class="upload-flex" ref="idPicBehind">
                        <el-upload
                                ref="upload"
                                class="avatar-uploader"
                                :headers="myHeaders"
                                :action="action"
                                :data="{ parm: 2 }"
                                :name="nameType"
                                :on-change="handleChange"
                                :show-file-list="false"
                                :on-success="idPicBehindFileSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.idPicBehind" :src="ruleForm.idPicBehind" class="avatar">
                            <i v-else="!ruleForm.idPicBehind" class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item :label="$t('personal.idPicHand')" prop="idPicHand" class="upload-flex" ref="idPicHand">
                        <el-upload
                                ref="upload"
                                class="avatar-uploader"
                                :headers="myHeaders"
                                :action="action"
                                :data="{ parm: 3 }"
                                :name="nameType"
                                :on-change="handleChange"
                                :show-file-list="false"
                                :on-success="idPicHandFileSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.idPicHand" :src="ruleForm.idPicHand" class="avatar">
                            <i v-else="!ruleForm.idPicHand" class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>

                        <!--<my-upload-->
                                <!--ref="upload"-->
                                <!--:headers="myHeaders"-->
                                <!--:action="action"-->
                                <!--:data="{ parm: 3 }"-->
                                <!--:name="nameType"-->
                                <!--:uploadId="uploadList[2].key"-->
                                <!--:onChange="handleChange"-->
                                <!--:onSuccess="handleAvatarSuccess"-->
                                <!--:beforeUpload="beforeAvatarUpload"-->
                        <!--&gt;</my-upload>-->
                    </el-form-item>
                </div>
            </div>
            <div class="company">
                <div class="title">{{ $t('personal.enterpriseInformation') }}</div>
                <div class="basic-form">
                    <el-form-item :label="$t('personal.businessLicense')" prop="businessLicense" class="upload-flex" ref="businessLicense">
                        <el-upload
                                ref="upload"
                                class="avatar-uploader"
                                :headers="myHeaders"
                                :action="action"
                                :data="{ parm: 4 }"
                                :name="nameType"
                                :on-change="handleChange"
                                :show-file-list="false"
                                :on-success="businessLicenseFileSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.businessLicense" :src="ruleForm.businessLicense" class="avatar">
                            <i v-else="!ruleForm.businessLicense" class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item :label="$t('personal.companyName')" prop="companyName">
                        <el-input v-model="ruleForm.companyName" class="input-width" type="text"
                                  :placeholder="$t('personal.placeholder')" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('personal.legalPerson')" prop="legalPerson">
                        <el-input v-model="ruleForm.legalPerson" class="input-width" type="text"
                                  :placeholder="$t('personal.placeholder')" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('personal.legalPersonIdCard')" prop="legalPersonIdCard">
                        <el-input v-model="ruleForm.legalPersonIdCard" class="input-width" type="text"
                                  :placeholder="$t('personal.placeholder')" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('personal.address')" prop="address">
                        <el-input v-model="ruleForm.address" type="text"
                                  :placeholder="$t('personal.placeholder')" auto-complete="off"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="text-center" style="margin-top: 45px;">
                <button type="button" class="submit-btn" @click="submitForm('ruleForm')">{{ $t('personal.submitCheck') }}</button>
            </div>
            <el-dialog
                :title="$t('personal.tips')"
                :visible.sync="dialog"
                width="30%"
                :before-close="handleClose">
                <span class="horizontal_center">
                    <i class="iconfont icon-gouxuan"></i>
                    <span style="margin-left: 15px;">{{ $t('personal.paragraphOne') }}<br>{{ $t('personal.paragraphTwo') }}
                        <em class="imp">1-2</em>{{ $t('personal.paragraphThree') }}
                    </span>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">{{ $t('personal.cancel') }}</el-button>
                    <el-button type="primary" @click="dialog = false">{{ $t('personal.ok') }}</el-button>
                </span>
            </el-dialog>
            <div class="real-icon">
                <img src="../assets/img/RealName/real-audit-success.png" v-show="auditFlag == '1'"/>
                <img src="../assets/img/RealName/real-in-review.png" v-show="auditFlag == '4'"/>
            </div>
        </el-form>
    </div>
</template>

<script>
    import MyUpload from '@/components/MyUpload'

    export default {
        data () {
            return {
                dialogVisible: false,
                dialog: false,
                auditFlag: '3',
                myHeaders: {
                    token: "a9ff3905186d7b154c3f624862569551"
                },
                action: this.$store.state.domain + "/api/bussinessAccount/yqq/uploadPic",
                nameType: 'file',
                ruleForm: {
                    name: null,
                    idCard: null,
                    companyName: null,
                    legalPerson: null,
                    legalPersonIdCard: null,
                    address: null,
                    idPicFront: null,
                    idPicBehind: null,
                    idPicHand: null,
                    businessLicense: null
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
                    ],
                    idCard: [
                        { required: true, message: '请输入有效证件号码', trigger: 'blur' },
//                        {
//                            validator: function (rule, value, callback) {
//                                let cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//                                if (!cP.test(value)) {
//                                    callback(new Error('身份证号码格式不正确！'))
//                                } else {
//                                    callback();
//                                }
//                            }, trigger: 'blur'
//                        }
                    ],
                    idPicFront: [
                        { required: true, message: '请输入证件正面照片', trigger: 'blur' }
                    ],
                    idPicBehind: [
                        { required: true, message: '请输入证件反面照片', trigger: 'blur' }
                    ],
                    idPicHand: [
                        { required: true, message: '请输入手持证件照片', trigger: 'blur' }
                    ],
                    businessLicense: [
                        { required: true, message: '请输入营业执照', trigger: 'blur' }
                    ],
                    companyName: [
                        { required: true, message: '请输入公司全称', trigger: 'blur' }
                    ],
                    legalPerson: [
                        { required: true, message: '请输入法定代表人', trigger: 'blur' }
                    ],
                    legalPersonIdCard: [
                        { required: true, message: '请输入法人证件号', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入住所地', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleChange(file, fileList) {
//                this.$refs.upload.clearFiles();
//                this.$refs.upload.uploadFiles.push(file);
//                this.ruleForm[ele] = file;
            },
            idPicFrontFileSuccess(res, file, fileList) {
                this.ruleForm.idPicFront = URL.createObjectURL(file.raw);
                this.$refs.idPicFront.clearValidate();
            },
            idPicBehindFileSuccess(res, file, fileList) {
                this.ruleForm.idPicBehind = URL.createObjectURL(file.raw);
                this.$refs.idPicBehind.clearValidate();
            },
            idPicHandFileSuccess(res, file, fileList) {
                this.ruleForm.idPicHand = URL.createObjectURL(file.raw);
                this.$refs.idPicHand.clearValidate();
            },
            businessLicenseFileSuccess(res, file, fileList) {
                this.ruleForm.businessLicense = URL.createObjectURL(file.raw);
                this.$refs.businessLicense.clearValidate();
            },
            beforeAvatarUpload(file, ele) {
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';

                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isGIF && !isPNG && !isBMP) {
                    this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post( '/api/bussinessAccount/yqq/userIdentity', this.ruleForm, res => {
                            console.log(res);
                            this.$message({
                                type: 'info',
                                message: res.data.message
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            findUserIdentityStatus () {
                this.$ajax.get('/api/bussinessAccount/yqq/findUserIdentityStatus', null, res => {
                    console.log(res);
                })
            },
            handleClose(done) {
                this.dialog = false;
            }
        },
        created () {
            this.findUserIdentityStatus();
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";
    @import "../assets/css/_mixin";

    .RealName-main {
        position: relative;
        padding: .2rem .3rem .65rem;
        .real-fail-wrap {
            width: 100%;
            margin-bottom: .1rem;
            img {
                width: 126px;
                height: 126px;
            }
            .fail-text {
                width: 60%;
                margin-left: .2rem;
                h1 {
                    font-size: 16px;
                    line-height: 22px;
                    font-family: 'MicrosoftYaHei-Bold';
                    color: rgba(196,132,26,1);
                    margin: 17px 0 5px;
                }
                .flex_start span {
                    font-size: 13px;
                    line-height: 21px;
                }
            }
        }

        em.imp {
            margin: 0 3px;
            color: @Danger;
            font-weight: bold;
        }
        .real-icon {
            position: absolute;
            top: 113px;
            left: 65%;
            z-index: 1;
            width: 1.54rem;
            min-width: 120px;
            height: 1.54rem;
            min-height: 120px;
            img {
                .object_fit_img;
            }
        }
    }
    .submit-btn {
        display: inline-block;
        width: 140px;
        height: 40px;
        background-color: @base;
        border: none;
        .common_radius(3px);
        font-size: 16px;
        color: #fff;
        &:hover {
            .lighten-hover(@base);
        }
    }
</style>
