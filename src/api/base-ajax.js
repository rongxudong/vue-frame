import { Message } from 'element-ui';
// 引用axios
import axios from 'axios';

// 配置API接口地址 (http://account.dev.financegt.com  http://192.168.50.18:8081)
let root = 'http://192.168.50.18:8081',
// let root = '',
    cancel ,
    promiseArr = {};
// 自定义判断元素类型JS
function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
    for (let key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

    //添加一个请求拦截器
axios.interceptors.request.use(config=> {
    // 配置config
    config.headers.Accept = 'application/json';
    config.headers.token = 'a9ff3905186d7b154c3f624862569551';

    // config.headers.System = 'vue';
        // let token = Vue.localStorage.get('token');
        // if(token){
        //     config.headers.Token = token;
        // }
    //在请求发出之前进行一些操作
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    }
    else {
        promiseArr[config.url] = cancel
    }
    return config
}, err=> {
    Message.error({
        showClose: true,
        message: '请求超时!'
    });
    return Promise.resolve(err)
})

//添加一个响应拦截器
axios.interceptors.response.use(response => {
    //在这里对返回的数据进行处理
    if (response.status && response.status == 200 && response.data.status == 'error') {
        Message.error({
            showClose: true,
            message: response.data.msg
        });
        return;
    }
    return response;
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求'
                break;
            case 401:
                err.message = '未授权，请重新登录'
                break;
            case 403:
                err.message = '拒绝访问'
                break;
            case 404:
                err.message = '请求错误,未找到该资源'
                break;
            case 405:
                err.message = '请求方法未允许'
                break;
            case 408:
                err.message = '请求超时'
                break;
            case 500:
                err.message = '服务器端出错'
                break;
            case 501:
                err.message = '网络未实现'
                break;
            case 502:
                err.message = '网络错误'
                break;
            case 503:
                err.message = '服务不可用'
                break;
            case 504:
                err.message = '网络超时'
                break;
            case 505:
                err.message = 'http版本不支持该请求'
                break;
            default:
                err.message = '连接错误' + err.response.status
        }
    }
    else {
        err.message = "连接到服务器失败"
    }
    Message.error({
        showClose: true,
        message: err.message
    });
    return Promise.resolve(err.response)
})

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios (method, url, params, success, failure) {
    if (params) {
        params = filterNull(params)
    }
    axios({
        // 请求方法,默认get方法
        method: method,
        // 请求的url,例如url: '/user/12345'
        url: url,
        // 相对路径：域名
        baseURL: root,
        // 要发送的自定义标头
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        // 请求所要发送的数据,例如data: {firstName: 'Fred',lastName: 'Flintstone'}
        data: method === 'POST' || method === 'PUT' ? params : null,
        // 随请求一起发送的URL参数,例如params: {ID: 12345}
        params: method === 'GET' || method === 'DELETE' ? params : null,
        // 指定请求超时前的毫秒数,如果请求花费的时间超过“timeout”，则请求将被中止
        timeout: 5000,
        // 表示是否存在跨站点访问控制请求
        withCredentials: false,
        // 表示服务器将使用的数据类型,选项“arrayBuffer”、“blob”、“document”、“json”、“text”、“stream;默认为JSON
        responseType: 'json',
        // 表示用于解码响应的编码
        responseEncoding: 'utf8',
        // 定义http响应内容的最大大小(以允许的字节为单位)
        maxContentLength: 2000,
        // 最大重定向数,如果设置为0，则不会遵循重定向，默认为5。
        maxRedirects: 5
    })
    // then时进行response数据处理
    .then(function (res) {
        // if (res.data.success === true) {
        //     if (success) {
        //         success(res.data)
        //     }
        // }
        if (success) {
            success(res)
        }
    })
}

// 返回在vue模板中的调用接口
export default {
    get: function (url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return apiAxios('POST', url, params, success, failure)
    },
    put: function (url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete: function (url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    }
}
