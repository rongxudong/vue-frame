<template>
    <el-pagination
            class="page"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizesObj"
            :page-size="pageSizeNumber"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNumber">
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
            totalNum: {
                type: Number,
                required: true
            }
        },
        data () {
            return {
                currentPage: 1,
                pageSizesObj: this.pageSizes,
                pageSizeNumber: this.pageSize,
                totalNumber: this.totalNum,
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    .page {
        display: inline-block;
    }
</style>