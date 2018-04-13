<template>
    <div>
        <el-carousel indicator-position="outside" height="500px" :interval="5000">
            <el-carousel-item v-for="item in banner" :key="item.id">
                <img :src="item.image"/>
            </el-carousel-item>
        </el-carousel>
        <div class="pic"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                banner: [
                    { id:'1', image: 'https://img.mukewang.com/5abcc39c00018fd009360316.jpg' },
                    { id:'2', image: 'https://img.mukewang.com/5ac4a7940001a9aa09360316.jpg' },
                    { id:'3', image: 'https://img.mukewang.com/5acecbcd00019e0b09360316.jpg' },
                    { id:'4', image: 'https://img.mukewang.com/5ac3142b000166ec09360316.jpg' },
                    { id:'5', image: 'https://img.mukewang.com/5ac4a754000113f009360316.jpg' },
                    { id:'6', image: 'https://img.mukewang.com/5acde54700014ee509360316.jpg' }
                ]
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable.less";
    @import "../assets/css/_common.css";

    #xdd {
        .text_overflow;
    }
    .el-carousel__item img {
        object-fit: cover;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: @base-blue;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>