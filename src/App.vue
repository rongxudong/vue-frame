<template>
    <div id="app">
        <el-container>
            <el-header>
                <web-header></web-header>
            </el-header>
            <el-container>
                <el-aside width="12.5%" style="min-width: 200px;">
                    <nav-menu></nav-menu>
                </el-aside>
                <el-main>
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
                                :key="item.name"
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
            return {

            }
        },
        created () {
            Vue.myGlobalMethod();

        },
        mounted(){
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
            var stateObject = {};
            var title = "";
            var newUrl = "http://" + window.location.host + "/baZy";
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
                    if (option.name === to.name) {
                        flag = true;
//                        this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                        this.$store.commit('set_active_index', to.path);
                        break
                    }
                }

                if (!flag) {
//                    this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
//                    this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                    this.$store.commit('add_tabs', {route: to.path, name: to.name});
                    this.$store.commit('set_active_index', to.path);
                }
                localStorage.setItem('currentRouteName', to.name);
                localStorage.setItem('currentRoutePath', to.path);
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
        }
    }
    .main-tab .el-tabs__item.is-active {
        height: 40px;
        line-height: 40px;
        vertical-align: top;
        color: #000!important;
        background-color: #ffffff!important;
        .border-bottom-radius(0);
    }
    .main-tab .el-tabs__item {
        margin-right: 8px;
        height: 34px;
        line-height: 34px;
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
        margin-top: .05rem;
        padding: .2rem .35rem;
        background-color: #f7f5fb;
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
</style>
