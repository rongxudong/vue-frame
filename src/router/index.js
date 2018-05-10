import Vue from 'vue'
import Router from 'vue-router'
// import IndexContainer from '@/pages/IndexContainer'
// import IndexLayout from '@/pages/IndexLayout'
// import IndexBanner from '@/pages/IndexBanner'
// import FormCheckbox from '@/pages/FormCheckbox'
// import FormRadio from '@/pages/FormRadio'
import Basic from '@/pages/Basic'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Basic'
        },
        {
            path: '/Basic',
            name: 'Basic',
            component: Basic// 懒加载
        },
        {
            path: '/IndexBanner',
            name: 'IndexBanner',
            component: resolve => require(['@/pages/IndexBanner'], resolve)
        },
        {
            path: '/Hello',
            name: 'Hello',
            component: resolve => require(['@/pages/Hello'], resolve)
        },
        // {
        // 动态路径参数 以冒号开头
        //     path: '/content/:id',
        //     name: 'Content',
        //     component: Content
        // },
        {
            path: '/IndexContainer',
            name: 'IndexContainer',
            component: resolve => require(['@/pages/IndexContainer'], resolve)
        },
        {
            path: '/IndexLayout',
            name: 'IndexLayout',
            component: resolve => require(['@/pages/IndexLayout'], resolve)
        },
        {
            path: '/FormCheckbox',
            name: 'FormCheckbox',
            component: resolve => require(['@/pages/FormCheckbox'], resolve)
        },
        {
            path: '/FormRadio/:id',
            name: 'FormRadio',
            component: resolve => require(['@/pages/FormRadio'], resolve)
        }
    ]
})
