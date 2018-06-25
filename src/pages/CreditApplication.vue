<template>
    <div class="source">
        <div class="block">
            <span class="demonstration">{{$t('indexContainer.week')}}</span>
            <el-date-picker
                    v-model="value1"
                    type="week"
                    format="yyyy 第 WW 周"
                    :placeholder="$t('indexContainer.placeholderWeek')">
            </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">{{$t('indexContainer.month')}}</span>
            <el-date-picker
                    v-model="value2"
                    type="month"
                    :placeholder="$t('indexContainer.placeholderMonth')">
            </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">{{$t('indexContainer.year')}}</span>
            <el-date-picker
                    v-model="value3"
                    align="right"
                    type="year"
                    :placeholder="$t('indexContainer.placeholderYear')">
            </el-date-picker>
        </div>
        <!--<goods :list.sync="list"></goods>-->
    </div>
</template>

<script>
//    import goods from '@/components/goods'
    export default {
        data () {
            return {
                value1: "",
                value2: "",
                value3: "",
                list: [
                    {name:'xx', progress: 30},
                    {name:'bb', progress: 90},
                ]
            }
        },
//        components: {
//            'goods': goods
//        }
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