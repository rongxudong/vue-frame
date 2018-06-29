<template>
    <el-menu
            class="el-menu-vertical-demo"
            :default-active="$route.path"
            router
            unique-opened
            @open="handleOpen"
            @close="handleClose"
            @select="selectItems"
            background-color="#2c323e"
            text-color="#afb8c1"
            active-text-color="#2fa8fd">
        <el-menu-item index="/">
            <i class="iconfont icon-shouye1"></i>
            <span slot="title">总览</span>
        </el-menu-item>
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
            <template slot="title">
                <i class="iconfont" :class="item.icon"></i>
                <span v-text="item.name"></span>
            </template>
            <el-menu-item-group class="over-hide" v-for="sub in item.sub" :key="sub.route" v-if="item.sub">
                <el-menu-item :index="sub.route" v-text="sub.name">
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!--<input type="text" onkeydown="this.onkeyup();" onkeyup="this.size=(this.value.length>4?this.value.length:4);" size="4" style="background-color: red;padding: 0 10px;">-->
    </el-menu>
</template>

<script>
    import menu from '@/config/menu-config'

    export default {
        data () {
            return {
                menu: menu
            }
        },
        created () {

        },
        computed: {
            options () {
                return this.$store.state.options;
            }
        },
        mounted () {
            const routePath = localStorage.getItem('currentRoutePath');
            const routeName = localStorage.getItem('currentRouteName');
            if (routePath !== '/') {
                this.$store.commit('add_tabs', { route: '/', name: '总览' });
                this.$store.commit('add_tabs', { route: routePath , name: routeName });
                this.$store.commit('set_active_index', this.$route.path);
            } else {
                this.$store.commit('add_tabs', { route: '/', name: '总览' });
                this.$store.commit('set_active_index', '/');
                this.$router.push('/');
            }
        },
        methods: {
            handleOpen (key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath)
            },
            selectItems(index){
                localStorage.setItem('currentRoutePath', index);
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";

    .over-hide{
        overflow: hidden;
    }
    .el-menu-vertical-demo {
        height: 100%;
        min-height: calc(100vh - 60px);
    }
    .el-menu .iconfont {
        font-size: 16px;
        margin-right: 20px;
        color: #afb8c1;
    }
    .el-menu-item-group__title {
        padding: 0;
    }
    .el-submenu .el-menu-item {
        height: 36px;
        padding-left: 60px!important;
        padding-right: 20px!important;
        line-height: 36px;
        background-color: #232832!important;
    }
    .is-opened .el-submenu__title {
        background-color: #232832!important;
    }
    .is-opened .el-submenu__title:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 3px;
        height: 100%;
        background-color: @base;
    }
    .is-opened i {
        color: @base!important;
    }
</style>