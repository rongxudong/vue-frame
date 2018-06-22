import Vue from 'vue'
import Router from 'vue-router'

// import Basic from '@/pages/Basic'
// import IndexLayout from '@/pages/IndexLayout'
// import IndexContainer from '@/pages/IndexContainer'
// import FormCheckbox from '@/pages/FormCheckbox'
// import FormRadio from '@/pages/FormRadio'
// import IndexBanner from '@/pages/IndexBanner'
// import Hello from '@/pages/Hello'

// const IndexBanner = r => require.ensure([], () => r(require('@/pages/IndexBanner.vue')), 'chunkname1')
// const IndexContainer = r => require.ensure([], () => r(require('@/pages/IndexContainer.vue')), 'chunkname1')
// const IndexLayout = r => require.ensure([], () => r(require('@/pages/IndexLayout.vue')), 'chunkname2')
// const FormCheckbox = r => require.ensure([], () => r(require('@/pages/FormCheckbox.vue')), 'chunkname2')
// const FormRadio = r => require.ensure([], () => r(require('@/pages/FormRadio.vue')), 'chunkname3')
// const Hello = r => require.ensure([], () => r(require('@/pages/Hello.vue')), 'chunkname3')

const Basic = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/Basic.vue')
const IndexBanner = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/IndexBanner.vue')
const IndexContainer = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/IndexContainer.vue')
const IndexLayout = () => import(/* webpackChunkName: "chunkname2" */ '@/pages/IndexLayout.vue')
const FormCheckbox = () => import(/* webpackChunkName: "chunkname2" */ '@/pages/FormCheckbox.vue')
const FormRadio = () => import(/* webpackChunkName: "chunkname3" */ '@/pages/FormRadio.vue')
const Hello = () => import(/* webpackChunkName: "chunkname3" */ '@/pages/Hello.vue')

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: '总览',
            component: Basic,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/IndexLayout',
            name: '签署协议',
            component: IndexLayout
        },
        {
            path: '/IndexContainer',
            name: '授信申请',
            component: IndexContainer
        },
        {
            path: '/FormCheckbox',
            name: '授信额度申请表',
            component: FormCheckbox
        },
        {
            path: '/FormRadio',
            name: '尽职调查',
            component: FormRadio
        },
        {
            path: '/IndexBanner',
            name: '实名认证',
            component: IndexBanner,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/Hello',
            name: '客户池',
            component: Hello,
        }
    ]
})
