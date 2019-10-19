module.exports = {
    title: 'Hydra.js',
    description: 'A Javascript library for working with Canvas.',
    serviceWorker: true,
    themeConfig: {
        sidebar: [
            {
                title: 'Guide',
                path:'/first/',
                collapsable: false,
                children: [{
                    title: 'start',
                    path:'/first/a/',
                }]
            },
            {
                title: '起步',
                path:'/second/',
                collapsable: false
            }
        ],
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    }
}
