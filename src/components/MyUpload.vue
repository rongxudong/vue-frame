<template>
    <el-upload
            class="avatar-uploader"
            :headers="Headers"
            :action="Action"
            :data="params"
            :name="inputName"
            :on-change="handleChange"
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
            headers: null,
            uploadId: null, //接收到的自定义的参数,
            data: null,
            onChange: Function,
            onSuccess: Function,
            beforeUpload: Function,
            accept:{
                type: String,
                default: '.jpg,.png,.jpeg,.jpeg2000,gif'
            },
            action: null
        },
        data () {
            return {
                imageUrl: '',
                inputName: this.name,
                Action: this.action,
                Headers: this.headers,
                params: this.data
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