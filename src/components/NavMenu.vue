<template>
    <el-menu
        class="el-menu-vertical-demo"
        :default-active="$route.path"
        :router='true'
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        @select="selectItems"
        background-color="#2c323e"
        text-color="#afb8c1"
        active-text-color="#2fa8fd">
        <el-menu-item index="/">
            <i class="iconfont icon-shouye1"></i>
            <span slot="title">{{ $t('menu.overview') }}</span>
        </el-menu-item>
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
            <template slot="title">
                <i class="iconfont" :class="item.icon"></i>
                <span v-text="item.name"></span>
            </template>
            <el-menu-item-group v-for="sub in item.sub" :key="sub.route" v-if="item.sub">
                <el-menu-item :index="sub.route" v-text="sub.name">
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
    import zhMenu from '@/config/zh-menu-config'
    import enMenu from '@/config/en-menu-config'

    export default {
        data() {
            return {
                menu: []
            }
        },
        computed: {
            options() {
                return this.$store.state.options;
            },
            listenLanguage () {
                return this.$store.state.isLanguage
            }
        },
        watch: {
            listenLanguage: function (a, b) {
                const routeName = localStorage.getItem('currentRouteName');
            }
        },
        mounted() {
            const routePath = localStorage.getItem('currentRoutePath');
            const routeName = localStorage.getItem('currentRouteName');
            if (routePath !== '/') {
                this.$store.commit('add_tabs', {route: '/', name: this.$t('menu.overview')});
                if(routePath != null){
                    this.$store.commit('add_tabs', {route: routePath, name: routeName});
                }
                this.$store.commit('set_active_index', this.$route.path);
            } else {
                this.$store.commit('add_tabs', {route: '/', name: this.$t('menu.overview')});
                this.$store.commit('set_active_index', '/');
                this.$router.push('/');
            }
        },
        methods: {
            handleOpen(key, keyPath) {

            },
            handleClose(key, keyPath) {

            },
            selectItems(index, indexPath) {
                localStorage.setItem('currentRoutePath', index);
            },
            changeMenu () {
                this.$store.commit('set_language', this.$i18n.locale);
                switch (this.$store.state.isLanguage) {
                    case 'zh_cn':
                        this.menu = zhMenu;
                        break;
                    case 'en':
                        this.menu = enMenu;
                        break;
                    default:
                        this.menu = zhMenu;
                }
            }
        },
        created() {
            this.changeMenu();
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../assets/css/_variable";

    .el-menu-vertical-demo {
        width: 100%;
        border-right: none;
    }

    .el-menu .iconfont {
        font-size: 16px;
        margin-right: 15px;
        color: #afb8c1;
    }

    .el-menu-item-group__title {
        padding: 0;
    }

    .el-submenu .el-menu-item {
        height: 36px;
        padding-left: 55px !important;
        padding-right: 20px !important;
        line-height: 36px;
        background-color: #232832 !important;
    }

    .is-opened .el-submenu__title {
        background-color: #232832 !important;
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
        color: @base !important;
    }

    //针对ipad/平板
    @media (min-width: 768px) and (max-width: 1023px) {
        .el-menu .iconfont {
            margin-right: 10px;
        }
        .el-submenu .el-menu-item {
            padding-left: 50px!important;
        }
    }

    @media (min-width: 1024px) and (max-width: 1279px) {
        .el-menu .iconfont {
            margin-right: 10px;
        }
        .el-submenu .el-menu-item {
            padding-left: 50px!important;
        }
    }
</style>
