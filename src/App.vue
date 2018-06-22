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
//                color: this.getRandColor,
            }
        },
        created () {
            Vue.myGlobalMethod();
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
                        this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                        break
                    }
                }
                if (!flag) {
                    this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name});
                    this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                }
                localStorage.setItem('currentRouteName', to.name);
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    /*@import "assets/css/_variable";*/
    /*@import "../node_modules/bootstrap/less/mixins";*/
    .el-header {
        line-height: 60px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(7, 17, 27, .15);
    }
    .el-main {
        margin-top: 5px;
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
        box-shadow: 0 2px 4px rgba(7, 17, 27, .15);
    }
    .app-wrap {
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(7, 17, 27, .15);
    }
</style>