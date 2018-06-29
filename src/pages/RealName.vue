<template>
    <div class="bg-style">
        <form class="RealName-main">
            <div class="real-fail-wrap flex_start align_items" v-show="array['auditFlag'] == '3'">
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
                    <div class="input-item">
                        <label>{{ $t('personal.name') }}</label>
                        <input v-model="array['name']" type="text" class="input-style" name="name" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.idCard') }}</label>
                        <input v-model="array['idCard']" type="text" class="input-style" name="idCard" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="upload-flex">
                        <label>{{ $t('personal.idPicFront') }}</label>
                        <span>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :auto-upload="false"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </span>
                    </div>
                    <div class="upload-flex">
                        <label>{{ $t('personal.idPicBehind') }}</label>
                        <span>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :auto-upload="false"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </span>
                    </div>
                    <div class="upload-flex">
                        <label>{{ $t('personal.idPicHand') }}</label>
                        <span>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :auto-upload="false"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </span>
                    </div>
                </div>
            </div>
            <div class="company">
                <div class="title">{{ $t('personal.enterpriseInformation') }}</div>
                <div class="basic-form">
                    <div class="upload-flex">
                        <label>{{ $t('personal.businessLicense') }}</label>
                        <span>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :auto-upload="false"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </span>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.companyName') }}</label>
                        <input v-model="array['companyName']" type="text" class="input-style" name="companyName" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.legalPerson') }}</label>
                        <input v-model="array['legalPerson']" type="text" class="input-style" name="legalPerson" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.legalPersonIdCard') }}</label>
                        <input v-model="array['legalPersonIdCard']" type="text" class="input-style" name="legalPersonIdCard" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.address') }}</label>
                        <input v-model="array['address']" type="text" class="input-style special" name="address" :placeholder="$t('personal.placeholder')"/>
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 45px;">
                <button class="submit-btn" @click="onSubmit()">{{ $t('personal.submitCheck') }}</button>
            </div>
            <el-dialog
                :title="$t('personal.tips')"
                :visible.sync="dialog"
                width="30%"
                :before-close="handleClose">
                <span class="horizontal_center">
                    <i class="iconfont icon-gouxuan"></i>
                    <span style="margin-left: 15px;">{{ $t('personal.paragraphOne') }}<br>{{ $t('personal.paragraphTwo') }}<em class="imp">1-2</em>{{ $t('personal.paragraphThree') }}</span>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialog = false">{{ $t('personal.cancel') }}</el-button>
                    <el-button type="primary" @click="dialog = false">{{ $t('personal.ok') }}</el-button>
                </span>
            </el-dialog>
            <div class="real-icon">
                <img src="../assets/img/RealName/real-audit-success.png" v-show="array['auditFlag'] == '1'"/>
                <img src="../assets/img/RealName/real-in-review.png" v-show="array['auditFlag'] == '4'"/>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                dialog: false,
                array: {
                    name: '',
                    idCard: '',
                    idPicFront: '',
                    idPicBehind: '',
                    idPicHand: '',
                    businessLicense: '',
                    companyName: '',
                    legalPerson: '',
                    legalPersonIdCard: '',
                    address: '',
                    auditFlag: '3',
                }
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSubmit() {
                this.dialog = true;
            },
            handleClose(done) {
                this.dialog = false;
            }
        },
        created () {

        },
        components: {

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
                    font-family: 'MicrosoftYaHei-Bold';
                    color: rgba(196,132,26,1);
                    margin: 20px 0 8px;
                }
                .flex_start span {
                    font-size: .13rem;
                    line-height: .32rem;
                }
            }
        }
        .icon-gouxuan {
            font-size: 48px;
            color: @Success;
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