// 生成 mutations 方法
function generate(name) {
    return function (state, value) {
        state[name] = value || state[name];
    }
}

const options = {

    // 多页面共享数据
    state: {
        message: '',
        options: [],
        activeIndex: '',
        activeDate: '',
        resUrl: 'http://image.financegt.com',

        token: '',
        baseUrl: '',
        user: {},
        avatarImg: ''
    },

    // 操作
    actions: {},

    // 数据变更
    mutations: {
        // 添加tabs
        add_tabs (state, data) {
            state.options.push(data);
            console.log(state.options)
        },
        // 删除tabs
        delete_tabs (state, route) {
            let index = 0;
            for (let option of state.options) {
                if (option.route === route) {
                    break;
                }
                index++;
            }
            state.options.splice(index, 1);
        },
        // 设置当前激活的tab
        set_active_index (state, index) {
            state.activeIndex = index;
        },
        // 设置头像
        set_avatar_img (state, url) {
            state.avatarImg = null;
            state.avatarImg = url;
        },
        // 获取用户信息
        set_user (state, info) {
            state.user = null;
            state.user = info;
        }
    }
}

// 为每个 state 字段生成对应的 mutations 方法
Object.keys(options.state).forEach((key) => {
    options.mutations[key] = generate(key);
});

export default options;
