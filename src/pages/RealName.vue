<template>
    <div>
        <Pagination :pageSizes="pageSizes" :pageSize="pageSize" :totalNum="totalNum"></Pagination>
    </div>
</template>

<script>
    import PaginationCpt from '@/components/Pagination'
    export default {
        data () {
            return {
                pageSizes: [100, 200, 300, 400],
                pageSize: 100,
                totalNum: 400
            }
        },
        methods: {

        },
        created () {

        },
        components: {
            'Pagination': PaginationCpt
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    /*@import "../assets/css/_variable";*/
    /*@import "../assets/css/_mixin";*/
    /*@import "../assets/css/_common.css";*/

    /*#xdd {
        .text_overflow;
    }
    .el-carousel__item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: @base;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }*/
</style>