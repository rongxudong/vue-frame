<template>
    <div class="source">
        <div class="block">
            <span class="demonstration">周</span>
            <el-date-picker
                    v-model="value1"
                    type="week"
                    format="yyyy 第 WW 周"
                    placeholder="选择周">
            </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">月</span>
            <el-date-picker
                    v-model="value2"
                    type="month"
                    placeholder="选择月">
            </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">年</span>
            <el-date-picker
                    v-model="value3"
                    align="right"
                    type="year"
                    placeholder="选择年">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                value1: "",
                value2: "",
                value3: ""
            }
        }
    }
</script>

<style>
    @import "../assets/css/_variable.less";
    @import "../assets/css/_common.css";

    .source {
        padding: 0;
        display: -ms-flexbox;
        display: flex;
    }
</style>