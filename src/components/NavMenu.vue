<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu
                    class="el-menu-vertical-demo"
                    router
                    unique-opened
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">

                <el-submenu v-for="item in menu" :index="item.id" :key="item.id">
                    <template slot="title">
                        <span v-text="item.name"></span>
                    </template>
                    <el-menu-item-group class="over-hide" v-for="sub in item.sub" :key="sub.componentName">
                        <el-menu-item :index="sub.componentName" v-text="sub.name">
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

            </el-menu>
            <div>
                <i class="iconfont icon-eye"></i><router-link to="/FormRadio/1234">FormRadio</router-link>
                <router-link to="/IndexBanner">IndexBanner</router-link>
                <router-link to="/Hello">Hello</router-link>
            </div>
        </el-col>
    </el-row>
</template>

<style scoped>
    .over-hide{
        overflow: hidden;
    }
</style>

<script>
    import menu from '@/config/menu-config'
    import Icon from '../../node_modules/vue-icon-font/src/IconFont.vue'

    export default {
        components: {Icon},
        data () {
            return {
                menu: menu
            }
        },
        methods: {
            handleOpen (key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>