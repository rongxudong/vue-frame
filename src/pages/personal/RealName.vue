<template>
    <div class="bg-style">
        <form class="RealName-main">
            <div class="basic">
                <div class="title">{{ $t('personal.basicInformation') }}</div>
                <div class="basic-form">
                    <div class="input-item">
                        <label>{{ $t('personal.name') }}</label>
                        <input type="text" class="input-style" name="userName" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.idCard') }}</label>
                        <input type="text" class="input-style" name="IdCard" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.frontPhoto') }}</label>
                        <span>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
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
                        <label>{{ $t('personal.reversePhoto') }}</label>
                        <span>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
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
                        <label>{{ $t('personal.handheldPhoto') }}</label>
                        <span>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
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
                    <div class="input-item">
                        <label>{{ $t('personal.businessLicense') }}</label>
                        <span>
                            <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
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
                        <input type="text" class="input-style" name="companyName" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.legalRepresentative') }}</label>
                        <input type="text" class="input-style" name="legalRepresentative" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.legalPersonCard') }}</label>
                        <input type="text" class="input-style" name="legalIdCard" :placeholder="$t('personal.placeholder')"/>
                    </div>
                    <div class="input-item">
                        <label>{{ $t('personal.place') }}</label>
                        <input type="text" class="input-style special" name="place" :placeholder="$t('personal.placeholder')"/>
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
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                dialog: false
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
    @import "../../assets/css/_variable";
    @import "../../assets/css/_mixin";

    .RealName-main {
        padding: 20px 75px 65px;
        .icon-gouxuan {
            font-size: 48px;
            color: @Success;
        }
        em.imp {
            margin: 0 3px;
            color: @Danger;
            font-weight: bold;
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
        cursor: pointer;
        &:hover {
            .lighten-hover(@base);
        }
    }
</style>