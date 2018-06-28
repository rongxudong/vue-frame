module.exports = [
    {
        name: '授信管理',
        id: '20000',
        icon: 'icon-anquan',
        sub: [
            {
                id: '20001',
                name: '签署协议',
                componentName: 'Agreement',
                route: '/Agreement'
            },
            {
                id: '20002',
                name: '授信申请',
                componentName: 'CreditApplication',
                route: '/CreditApplication'
            },
            {
                id: '20003',
                name: '授信额度申请表',
                componentName: 'QuotaApplicationForm',
                route: '/QuotaApplicationForm'
            },
            {
                id: '20004',
                name: '尽职调查',
                componentName: 'Investigate',
                route: '/Investigate'
            },
            {
                id: '20005',
                name: '客户申请',
                componentName: 'customerApplication',
                route: '/customerApplication'
            }
        ]
    },
    {
        name: '客户信息',
        id: '40000',
        icon: 'icon-yonghuming',
        sub: [
            {
                id: '40001',
                name: '实名认证',
                componentName: 'RealName',
                route: '/RealName'
            },
            {
                id: '40004',
                name: '客户池',
                componentName: 'CustomerPool',
                route: '/CustomerPool'
            }
        ]
    }
]