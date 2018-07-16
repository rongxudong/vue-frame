<template>
    <div>
        <p>申请详情</p>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        created() {
            this.fetchData()
        },
        watch: {
            '': 'fetchData'
        },
        methods: {
            fetchData() {

            }
        }
    }
</script>

<style>
    .container {

    }
</style>
