<template>
    <div id="app">
        <el-container>
            <el-header class="header">
                <web-header></web-header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <nav-menu></nav-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import NavMenu from '@/components/NavMenu'
    import Header from '@/components/Header'

    export default {
        name: 'app',
        created () {
            this.$http.get('topics', null, r => {
                console.log(r)
            })
        },
        components: {
            'nav-menu': NavMenu,
            'web-header': Header
        }
    }

</script>

<style>
    /*@import "./style/_reset.css";*/
    .header {
        background-color: #409EFF;
        color: #fff;
        line-height: 60px;
    }
</style>