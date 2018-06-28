<template>

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

<style lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable.less";

    .source {
        padding: 0;
        display: -ms-flexbox;
        display: flex;
    }
</style>