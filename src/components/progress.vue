<template>
    <div :progress="progress"> 进度条 </div>
</template>

<script>
    export default {
        props: ['number'],
        data() {
            return {
                progress: this.number
            }
        },
        mounted () {
            console.log(this.progress); // => 30,90
        }
    }
</script>

<style>
</style>