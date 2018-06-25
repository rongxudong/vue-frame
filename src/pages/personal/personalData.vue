<template>
    <div class="bg-style">
        <form class="personalData-main">
            <div class="basic">
                <div class="title">企业信息</div>
                <div class="basic-form">
                    <!--<div class="input-item">-->
                        <!--<label>请上传营业执照</label>-->
                        <!--<span>-->
                            <!--<el-upload-->
                                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                    <!--list-type="picture-card"-->
                                    <!--:on-preview="handlePictureCardPreview"-->
                                    <!--:on-remove="handleRemove">-->
                            <!--<i class="el-icon-plus"></i>-->
                            <!--</el-upload>-->
                            <!--<el-dialog :visible.sync="dialogVisible">-->
                                <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                            <!--</el-dialog>-->
                        <!--</span>-->
                    <!--</div>-->
                    <div class="input-item">
                        <label>账号</label>
                        <input type="text" class="input-style" name="legalIdCard" disabled/>
                    </div>
                    <div class="input-item">
                        <label>真实姓名</label>
                        <input type="text" class="input-style" name="legalIdCard" disabled/>
                    </div>
                    <div class="input-item">
                        <label>企业名称</label>
                        <input type="text" class="input-style" name="legalIdCard"/>
                    </div>
                    <div class="input-item">
                        <label>企业地址</label>
                        <input type="text" class="input-style" name="companyPlace"/>
                    </div>
                </div>
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
    .personalData-main {
        padding: 20px 75px 65px;
    }
</style>