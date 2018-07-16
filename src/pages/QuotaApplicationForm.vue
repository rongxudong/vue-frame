<template>
    <div>
        {{ createTime | time }}
        <button @click='getGlobal()'>调用全局过滤器</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    export default {
        data () {
            return {
                createTime: 1466248396
            }
        },
        methods: {
            getGlobal() {
//                const te = Vue.filter('time');
//                console.log(this.createTime)
//                this.createTime = te(this.createTime);
            }
        },
        created () {
//            const myFilter = this.formatDate;
//            const myFilter = Vue.filter('format-date')
            console.log(this.$route.params.id)

        },
        mounted () {
        }
    }
</script>

<style>
</style>
