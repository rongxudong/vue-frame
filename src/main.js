// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import StoreOption from './vuex/store';
import App from './App';
import router from './router';
import VueI18n from 'vue-i18n';
import ElementUI from 'element-ui';
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';

import Moment from 'moment';
import 'babel-polyfill';

// Vuex 依赖 Promise,如果你支持的浏览器并没有实现 Promise (比如 IE),那么你可以使用一个 polyfill 的库，例如 es6-promise。
import 'es6-promise/auto';

import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import './assets/css/_reset.css';

// font-class
import '../static/iconfont/iconfont.css';

// 引用文件(自己的)
import Rem from './assets/js/rem'
import ajax from './api/base-ajax';
import LangStorage from './assets/js/lang/local_lang';
import MyPlugin from './Global';
import enLocale from './assets/js/lang/en';
import zhLocale from './assets/js/lang/zh-cn';

// 引用js文件(插件)
import '../static/iconfont/iconfont';

// 将方法绑定到全局
Vue.prototype.$ajax = ajax;
Vue.prototype.moment = Moment;

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(MyPlugin);

// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store(StoreOption);

const messages = {
    // 将我们项目中的语言包与Element的语言包进行合并
    // 'zh_CN': Object.assign(require('./assets/js/lang/zh-cn'),zhLocale),
    // 'en': Object.assign(require('./assets/js/lang/en'),enLocale)
    zh_CN: {
        ...zhLocale,
        ...elementZhLocale
    },
    en: {
        ...enLocale,
        ...elementEnLocale
    }
}

// 国际化
const i18n = new VueI18n({
    locale: LangStorage.getLang(),  // 语言标识，后面会用做切换和将用户习惯存储到本地浏览器
    messages
});
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value) // 在注册Element时设置i18n的处理方法
});

// eslint-disable no-new
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>'
})
