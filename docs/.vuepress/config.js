module.exports = {
    title: 'Hydra.js',
    description: 'A Javascript library for working with Canvas.',
    serviceWorker: true,
    base: './',
    dest: 'dist',
    themeConfig: {
        sidebar: [
            {
                title: `What's Hydra.js`,
                path:'/introduce/',
                collapsable: false,
            },
            {
                title: 'Layout',
                path:'/layout/',
                collapsable: false,
                children: [{
                    title: 'LinearLayout',
                    path:'/layout/LinearLayout'
                }]
            }, {
                title: 'Widgets',
                path:'/widgets/',
                collapsable: false
            }
        ],
        sidebarDepth: 2,
        lastUpdated: 'Last Updated'
    }
}
