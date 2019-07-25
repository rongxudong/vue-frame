<template>
    <el-pagination
            class="page"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPageNumber"
            :page-sizes="pageSizesObj"
            :page-size="pageSizeNumber"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalDataNumber">
    </el-pagination>
</template>

<script>
    export default {
        props: {
            //每页显示个数选择器的选项设置
            pageSizes: {
                type: Array,
                required: true
            },
            //每页显示条目个数
            pageSize: {
                type: Number,
                required: true
            },
            //总条目数
            total: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            },
            sizeChange: Function,
            currentChange: Function,
            uploadId: null, //接收到的自定义的参数,
        },
        data () {
            return {
                currentPageNumber: this.currentPage,
                pageSizesObj: this.pageSizes,
                pageSizeNumber: this.pageSize,
                totalDataNumber: this.total,
            }
        },
        methods: {
            handleSizeChange(val) {
                this.sizeChange(...arguments, this.currentPage, this.uploadId)
            },
            handleCurrentChange(val) {
                this.currentChange(...arguments, this.currentPage, this.uploadId)
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .page {
        display: inline-block;
    }
</style>