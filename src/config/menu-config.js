module.exports = [
    // {
    //     name: '首页',
    //     id: '10000',
    //     icon: 'icon-shouye',
    //     sub: []
    // },
    {
        name: '授信管理',
        id: '20000',
        icon: 'icon-jiaoyiguanli',
        sub: [
            {
                id: '20001',
                name: '签署协议',
                componentName: 'IndexLayout',
                route: '/IndexLayout'
            },
            {
                id: '20002',
                name: '授信申请',
                componentName: 'IndexContainer',
                route: '/IndexContainer'
            },
            {
                id: '20003',
                name: '授信额度申请表',
                componentName: 'FormCheckbox',
                route: '/FormCheckbox'
            },
            {
                id: '20004',
                name: '尽职调查',
                componentName: 'FormRadio',
                route: '/FormRadio'
            }
        ]
    },
    // {
    //     name: 'Form',
    //     id: '3',
    //     sub: [
    //         {
    //             id: '8',
    //             name: 'Checkbox 多选框',
    //             componentName: 'FormCheckbox'
    //         }
    //     ]
    // },
    {
        name: '客户信息',
        id: '40000',
        icon: 'icon-rongzixiangmu00',
        sub: [
            {
                id: '40001',
                name: '实名认证',
                componentName: 'IndexBanner',
                route: '/IndexBanner'
            },
            {
                id: '40002',
                name: '客户池',
                componentName: 'Hello',
                route: '/Hello'
            }
        ]
    }
]