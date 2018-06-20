<template>
    <div id="app">
        <el-container>
            <el-header :class="$style.header" :style="{backgroundColor:color}">
                <web-header></web-header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <nav-menu></nav-menu>
                </el-aside>
                <el-main>
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import NavMenu from '@/components/NavMenu'
    import Header from '@/components/Header'
    import Vue from 'vue'

    export default {
        name: 'app',
        data () {
            return {
                color: this.getRandColor,
            }
        },
        created () {
//            this.$ajax.get('topics', null, r => {
//                console.log(r)
//            })
        },
        mounted(){
            Vue.myGlobalMethod();
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
        background-color: @base;
        color: #fff;
        line-height: 60px;
        .opacity(.9);
    }
</style>