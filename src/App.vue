<template>
    <div id="app">
        <el-container>
            <el-header :class="$style.header">
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
//            this.$http.get('topics', null, r => {
//                console.log(r)
//            })
        },
        components: {
            'nav-menu': NavMenu,
            'web-header': Header
        }
    }

</script>

<style module lang="less" rel="stylesheet/less">
    @import "assets/css/_variable";
    @import "../node_modules/bootstrap/less/mixins";
    .header {
        background-color: @base-blue;
        color: #fff;
        line-height: 60px;
        .opacity(.9);
    }
</style>