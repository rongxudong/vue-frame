module.exports = [
    {
        name: 'Investigate',
        id: '20000',
        icon: 'icon-anquan',
        sub: [
            {
                id: '20004',
                name: 'Due Diligence',
                componentName: 'Investigate',
                route: '/Investigate/1'
            },
            {
                id: '20006',
                name: 'GTR Evaluation',
                componentName: 'Investigate',
                route: '/Investigate/2'
            },
            {
                id: '20002',
                name: 'Financial Support',
                componentName: 'Investigate',
                route: '/Investigate/3'
            },
            {
                id: '20007',
                name: 'Account Management',
                componentName: 'Investigate',
                route: '/Investigate/4'
            },
        ]
    },
    {
        name: 'Personal',
        id: '40000',
        icon: 'icon-yonghuming',
        sub: [
            {
                id: '40001',
                name: 'Certification',
                componentName: 'RealName',
                route: '/RealName'
            },
            {
                id: '40002',
                name: 'Personal Details',
                componentName: 'Personal',
                route: '/Personal'
            },
            {
                id: '40003',
                name: 'Password Change',
                componentName: 'Password',
                route: '/Password'
            }
        ]
    }
]
