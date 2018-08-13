<template>
    <div id="app">
        <el-container>
            <el-header>
                <web-header></web-header>
            </el-header>
            <el-container class="app-container" :class="this.$store.state.isHeaderMenuActive ? 'isAsideOpen': ''">
                <el-aside class="aside">
                    <nav-menu></nav-menu>
                </el-aside>
                <el-main>
                    <div class="main-shadow" @click="closeMenuBurgerBtn"></div>
                    <el-tabs
                            class="main-tab"
                            v-model="activeIndex"
                            type="card"
                            closable
                            @tab-click="tabClick"
                            v-if="options.length"
                            @tab-remove="tabRemove">
                        <el-tab-pane
                                v-for="(item, index) in options"
                                :key="item.route"
                                :label="item.name"
                                :name="item.route">
                        </el-tab-pane>
                    </el-tabs>
                    <div class="app-wrap">
                        <keep-alive>
                            <router-view v-if="$route.meta.keepAlive"></router-view>
                        </keep-alive>
                        <router-view v-if="!$route.meta.keepAlive"></router-view>
                    </div>
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
            return {}
        },
        beforeCreate () {
            localStorage.setItem('user_lang', this.$i18n.locale);
            localStorage.setItem("User_token", process.env.NODE_ENV == 'development' ? 'c9b37ccef1c4579f35447c7629f931d4' : $.cookie('bl_sid'));
            this.$store.state.token = localStorage.getItem("User_token");

            let baseUrl = 'http://account.financegt.com'
            let domain = document.domain;
            if (domain.indexOf('dev') != -1) {
                baseUrl = 'http://account.dev.financegt.com';
            }
            if (domain.indexOf('stage') != -1) {
                baseUrl = 'http://account.stage.financegt.com';
            }
            if (domain.indexOf('kf') != -1) {
                baseUrl = 'http://account.dev.financegt.com';
            }
            //http://192.168.50.18:8081
            //http://192.168.50.11:8081
            localStorage.setItem("baseUrl", process.env.NODE_ENV == 'development' ? 'http://account.dev.financegt.com' : baseUrl);
            // localStorage.setItem("baseUrl", process.env.NODE_ENV == 'development' ? 'http://192.168.50.11:8081' : baseUrl);
            this.$store.state.baseUrl = localStorage.getItem("baseUrl");

            this.$ajax.get('/api/user/'+this.$store.state.token, null, res => {
                if (res.code === 0 && res.data) {
                    this.$store.commit('set_user', res.data);
                    this.$store.commit('set_avatar_img', res.data.photo);
                } else {
                    if(res.message === "未登录") {
//                        document.location.replace(this.$store.state.baseUrl.replace('account.', '') + '/user/login');
                    }
                }
            })
        },
        mounted () {
            let location = document.location;
            let tag = '';

            if (location.search){
                tag = location.search.split('=')[1];
            }
            if (tag == 'RealName'){
                this.$router.push({
                    path:'/RealName',
                })
            }else if (tag == 'MessageList'){
                this.$router.push({
                    path:'/MessageList',
                })
            }else if (tag == 'Investigate'){
                this.$router.push({
                    path:'/Investigate/1',
                })
            }
            //修改浏览器地址
            let stateObject = {};
            let title = "";
            let newUrl = "http://" + window.location.host + "/baZy";
            history.pushState(stateObject,title,newUrl);
        },
        components: {
            'nav-menu': NavMenu,
            'web-header': Header
        },
        methods: {
            // tab切换时，动态的切换路由
            tabClick (tab) {
                localStorage.setItem('currentRoutePath', this.activeIndex);
                let path = this.activeIndex;
                // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
//                if (this.activeIndex === '/userInfo') {
//                    path = this.activeIndex + '/' + this.$store.state.userInfo.name;
//                }
                this.$router.push({path: path});
            },
            tabRemove (targetName) {
                // 首页不可删除
                if(targetName == '/') {
                    return;
                }
                this.$store.commit('delete_tabs', targetName);
                if (this.activeIndex === targetName) {
                    // 设置当前激活的路由
                    if (this.options && this.options.length >= 1) {
                        this.$store.commit('set_active_index', this.options[this.options.length-1].route);
                        this.$router.push({path: this.activeIndex});
                    } else {
                        this.$router.push({path: '/'});
                    }
                }
            },
            closeMenuBurgerBtn () {
                this.$store.commit('set_header_menu');
            }
        },
        computed: {
            options () {
                return this.$store.state.options;
            },
            activeIndex: {
                get () {
                    return this.$store.state.activeIndex;
                },
                set (val) {
                    this.$store.commit('set_active_index', val);
                }
            }
        },
        watch: {
            '$route'(to) {
                let flag = false;
                for (let option of this.options ) {
                    if (option.route === to.fullPath) {
                        flag = true;
//                        this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                        this.$store.commit('set_active_index', to.fullPath);
                        break
                    }
                }
                if (!flag) {
//                    this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
//                    this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                    this.$store.commit('add_tabs', {route: to.fullPath, name: to.name});
                    this.$store.commit('set_active_index', to.fullPath);
                }
                localStorage.setItem('currentRouteName', to.name);
                localStorage.setItem('currentRoutePath', to.fullPath);
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    /*@import "assets/css/_variable";*/
    @import "assets/css/_mixin";
    @import "assets/css/_common";

    //Home.vue
    .el-tabs--card>.el-tabs__header {
        border-bottom: none;
        .el-tabs__nav {
            border: none;
            line-height: 0\9;
        }
    }
    .main-tab .el-tabs__item.is-active {
        height: 40px;
        line-height: 40px;
        line-height: 40px\9;
        vertical-align: top;
        color: #000!important;
        background-color: #ffffff!important;
        .border-bottom-radius(0);
    }
    .main-tab .el-tabs__item {
        margin-right: 8px;
        height: 34px;
        line-height: 34px;
        vertical-align: top;
        color: #fff;
        background-color: RGBA(182, 194, 202, 1)!important;
        .border-top-radius(5px);
        .border-bottom-radius(5px);
        .common_box_shadow(0 2px 4px rgba(7, 17, 27, .15));
        &:hover {
            color: #000!important;
        }
    }


    .el-header {
        line-height: 60px;
        background-color: #fff;
        .common_box_shadow(0 2px 4px rgba(7, 17, 27, .15));
    }
    .el-main {
        display:block;
        width: 87.5%;
        min-height: 100%;
        margin-top: 5px;
        padding: 20px .35rem;
        background-color: #f7f5fb;
        .box-sizing(border-box);
    }
    .el-main .el-tabs__header {
        margin: 0;
    }
    .el-main .el-tabs__item {
        background-color: #fff;
        border-bottom-color: #dcdfe6!important;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        border-bottom-color: transparent!important;
    }
    .el-main .el-tabs__content {
        background-color: #fff;
        .common_box_shadow(0 2px 4px rgba(7, 17, 27, .15));
    }
    #app .app-wrap {
        width: 100%;
        /*height: 100%;*/
        height: calc(~'100% - 40px');
        height: -ms-calc(~'100% - 40px');
        height: -moz-calc(~'100% - 40px');
        height: -webkit-calc(~'100% - 40px');
    }
    //针对ipad/平板
    @media (min-width: 768px) and (max-width: 1279px) {
        .app-container {
            position: relative;
            width: 100%;
            .aside {
                .flex_start;
                position: absolute;
                top: 0;
                left: -200px;
                z-index: 11;
                min-height: 100%;
                .transition(all 200ms cubic-bezier(0,.995,.99,1));
            }
            .el-main {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10;
                width: 100%;
                .transition(all 200ms cubic-bezier(0,.995,.99,1));
            }
        }
        .isAsideOpen {
            overflow: hidden;
            .aside {
                left: 0;
                .transition(all 200ms cubic-bezier(0,.995,.99,1));
            }
            .el-main {
                left: 200px;
                .transition(all 200ms cubic-bezier(0,.995,.99,1));
            }
            .main-shadow {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 100;
                width: 100%;
                height: 100%;
                background-color: rgba(7,17,27,.1);
            }
        }
    }

    /*@media (min-width: 1024px) and (max-width: 1279px) {*/
        /**/
    /*}*/
</style>
