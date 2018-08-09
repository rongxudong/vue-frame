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
// const IndexLayout = r => require.ensure([], () => r(require('@/pages/Agreement.vue')), 'chunkname2')
// const FormRadio = r => require.ensure([], () => r(require('@/pages/Investigate.vue')), 'chunkname3')
// const Hello = r => require.ensure([], () => r(require('@/pages/CustomerPool.vue')), 'chunkname3')

const Home = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/Home.vue')
const Agreement = () => import(/* webpackChunkName: "chunkname2" */ '@/pages/Agreement.vue')
const Investigate = () => import(/* webpackChunkName: "chunkname3" */ '@/pages/Investigate.vue')
const CustomerPool = () => import(/* webpackChunkName: "chunkname3" */ '@/pages/CustomerPool.vue')
const ApplyDetail = () => import(/* webpackChunkName: "chunkname3" */ '@/pages/ApplyDetail.vue')

const customerApplication = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/customerApplication.vue')
const RealName = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/RealName.vue')
const Password = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/Password.vue')
const Personal = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/Personal.vue')

const FileList = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/FileList.vue')
const MessageList = () => import(/* webpackChunkName: "chunkname1" */ '@/pages/MessageList.vue')

Vue.use(Router);

let zhRouter = [
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        name: '总览',
        component: Home
    },
    {
        path: '/Investigate',
        name: '授信管理',
        component: Investigate,
        children: [
            {
                path: '1',
                name: '尽职调查',
                component: Investigate
            },
            {
                path: '2',
                name: 'GTR评估',
                component: Investigate
            },
            {
                path: '3',
                name: '融资授信',
                component: Investigate
            },
            {
                path: '4',
                name: '商账管理',
                component: Investigate
            }
        ]
    },
    {
        path: '/Agreement',
        name: '签署协议',
        component: Agreement,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/customerApplication',
        name: '客户申请',
        component: customerApplication
    },
    {
        path: '/ApplyDetail',
        name: '申请详情',
        component: ApplyDetail,
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
    },
    {
        path: '/FileList',
        name: '公告列表',
        component: FileList,
    },
    {
        path: '/MessageList',
        name: '消息列表',
        component: MessageList,
    },
    {
        path: '/personal',
        name: '个人资料',
        component: Personal,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/password',
        name: '修改密码',
        component: Password,
    }
];
let enRouter = [
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        name: 'Overview',
        component: Home
    },
    {
        path: '/Investigate',
        name: 'Credit Management',
        component: Investigate,
        children: [
            {
                path: '1',
                name: 'Due Diligence',
                component: Investigate
            },
            {
                path: '2',
                name: 'GTR Evaluation',
                component: Investigate
            },
            {
                path: '3',
                name: 'Financial Support',
                component: Investigate
            },
            {
                path: '4',
                name: 'Account Management',
                component: Investigate
            }
        ]
    },
    {
        path: '/Agreement',
        name: '签署协议',
        component: Agreement,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/customerApplication',
        name: '客户申请',
        component: customerApplication
    },
    {
        path: '/ApplyDetail',
        name: '申请详情',
        component: ApplyDetail,
    },
    {
        path: '/RealName',
        name: 'Verification of Identity Certificate',
        component: RealName,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/personal',
        name: 'Personal details',
        component: Personal,
        meta: {
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: '/password',
        name: 'Password change',
        component: Password,
    },
    {
        path: '/CustomerPool',
        name: '客户池',
        component: CustomerPool,
    },
    {
        path: '/FileList',
        name: '公告列表',
        component: FileList,
    },
    {
        path: '/MessageList',
        name: '消息列表',
        component: MessageList,
    }
];

let localLang = window.localStorage.getItem('user_lang');
// alert(localLang)
if (localLang === 'en') {

} else {

}

let routerList = zhRouter;

export default new Router({
    routes: routerList
})
