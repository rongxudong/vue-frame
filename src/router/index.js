import Vue from 'vue'
import Router from 'vue-router'
import Basic from '@/pages/Basic'

const IndexBanner = r => require.ensure([], () => r(require('@/pages/IndexBanner.vue')), 'chunkname1')
const IndexContainer = r => require.ensure([], () => r(require('@/pages/IndexContainer.vue')), 'chunkname1')
const IndexLayout = r => require.ensure([], () => r(require('@/pages/IndexLayout.vue')), 'chunkname1')
const FormCheckbox = r => require.ensure([], () => r(require('@/pages/FormCheckbox.vue')), 'chunkname2')
const FormRadio = r => require.ensure([], () => r(require('@/pages/FormRadio.vue')), 'chunkname3')
const Hello = r => require.ensure([], () => r(require('@/pages/Hello.vue')), 'chunkname3')

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
            component: Basic,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/IndexBanner',
            name: 'IndexBanner',
            component: IndexBanner,
            meta: {
                keepAlive: true // 需要被缓存
            }
        },
        {
            path: '/IndexLayout',
            name: 'IndexLayout',
            component: IndexLayout
        },
        {
            path: '/Hello',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/IndexContainer',
            name: 'IndexContainer',
            component: IndexContainer
        },
        {
            path: '/FormCheckbox',
            name: 'FormCheckbox',
            component: FormCheckbox
        },
        {
            path: '/FormRadio/:id',
            name: 'FormRadio',
            component: FormRadio
        }
    ]
})
