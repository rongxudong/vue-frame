<template>
    <el-upload
            class="avatar-uploader"
            action="#"
            :name="inputName"
            :on-change="handleChange"
            :auto-upload="false"
            :accept="accept"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    export default {
        name: 'MyUpload',
        props:{
            name: null,
            uploadId: null, //接收到的自定义的参数
            onChange: Function,
            onSuccess: Function,
            beforeUpload: Function,
            accept:{
                type: String,
                default: '.jpg,.png,.jpeg,.jpeg2000,gif'
            }
        },
        data () {
            return {
                imageUrl: '',
                inputName: this.name
            }
        },
        methods:{
            handleChange (file, fileList) {
                this.imageUrl = file.url;
                this.onChange(...arguments,this.uploadId)
            },
            handleAvatarSuccess () {
                this.onSuccess(...arguments,this.uploadId)
            },
            beforeAvatarUpload () {
                this.beforeUpload(...arguments,this.uploadId)
            }
        }
    }
</script>

<style>
</style>