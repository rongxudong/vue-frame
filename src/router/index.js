import Vue from 'vue'
import Router from 'vue-router'

// import Basic from '@/pages/Basic'
// import IndexLayout from '@/pages/IndexLayout'
// import IndexContainer from '@/pages/IndexContainer'
// import FormCheckbox from '@/pages/FormCheckbox'
// import FormRadio from '@/pages/FormRadio'
// import IndexBanner from '@/pages/IndexBanner'
// import Hello from '@/pages/Hello'

// const IndexBanner = r => require.ensure([], () => r(require('@/pages/RealName.vue')), 'chunkname1')
// const IndexContainer = r => require.ensure([], () => r(require('@/pages/CreditApplication.vue')), 'chunkname1')
// const IndexLayout = r => require.ensure([], () => r(require('@/pages/Agreement.vue')), 'chunkname2')
// const FormCheckbox = r => require.ensure([], () => r(require('@/pages/QuotaApplicationForm.vue')), 'chunkname2')
// const FormRadio = r => require.ensure([], () => r(require('@/pages/Investigate.vue')), 'chunkname3')
// const Hello = r => require.ensure([], () => r(require('@/pages/CustomerPool.vue')), 'chunkname3')

const Home = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/Home.vue')
const CreditApplication = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/CreditApplication.vue')
const Agreement = () => import(/* webpackChunkName: "chunkname2" */ '@/pages/Agreement.vue')
const QuotaApplicationForm = () => import(/* webpackChunkName: "chunkname2" */ '@/pages/QuotaApplicationForm.vue')
const Investigate = () => import(/* webpackChunkName: "chunkname3" */ '@/pages/Investigate.vue')
const CustomerPool = () => import(/* webpackChunkName: "chunkname3" */ '@/pages/CustomerPool.vue')

const customerApplication = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/customerApplication.vue')
const RealName = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/RealName.vue')

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
            component: Home,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/Agreement',
            name: '签署协议',
            component: Agreement
        },
        {
            path: '/CreditApplication',
            name: '授信申请',
            component: CreditApplication
        },
        {
            path: '/QuotaApplicationForm',
            name: '授信额度申请表',
            component: QuotaApplicationForm
        },
        {
            path: '/Investigate',
            name: '尽职调查',
            component: Investigate
        },
        {
            path: '/customerApplication',
            name: '客户申请',
            component: customerApplication,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/RealName',
            name: '实名认证',
            component: RealName,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/CustomerPool',
            name: '客户池',
            component: CustomerPool,
        }
    ]
})
