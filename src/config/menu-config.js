module.exports = [
    {
        name: '授信管理',
        id: '20000',
        icon: 'icon-anquan',
        sub: [
            {
                id: '20004',
                name: '尽职调查',
                componentName: 'Investigate',
                route: '/Investigate?type=1'
            },
            {
                id: '20006',
                name: 'GTR评估',
                componentName: 'Investigate',
                route: '/Investigate?type=2'
            },
            {
                id: '20002',
                name: '授信申请',
                componentName: 'Investigate',
                route: '/Investigate?type=3'
            },
            {
                id: '20007',
                name: '商账管理',
                componentName: 'Investigate',
                route: '/Investigate?type=4'
            },

        ]
    },
    {
        name: '个人信息',
        id: '40000',
        icon: 'icon-yonghuming',
        sub: [
            {
                id: '40001',
                name: '实名认证',
                componentName: 'RealName',
                route: '/RealName'
            },
        ]
    }
]
