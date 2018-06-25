<template>
    <el-pagination
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
            pageSizes: {
                type: Array,
                required: true
            },
            pageSize: {
                type: Number,
                required: true
            },
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

<style>
</style>