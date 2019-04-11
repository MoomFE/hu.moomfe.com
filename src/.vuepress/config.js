

module.exports = {

  locales: {
    '/': {
      title: 'Hu.js',
      description: '基于 Web Components 和 Proxy 的 MVVM 框架',
      lang: 'zh-CN'
    }
  },

  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          title: '基础',
          children: [
            'installation',
            '',
            'instance',
            'syntax',
            'computed',
            'class-and-style',
            'model',
            'list',
            'events'
          ]
        },
        {
          title: '可复用性 & 组合',
          children: [
            'mixins'
          ]
        },
        {
          title: '内在',
          children: [
            'reactivity'
          ]
        }
      ]
    },
    nav: [
      {
        text: 'API',
        link: '/api/'
      },
      {
        text: '教程',
        items: [
          { text: '教程', link: '/guide/' },
          { text: '教程 - 自定义元素', link: '/guide-custom-element/' },
          { text: '教程 - 纯渲染实例', link: '/guide-render/' }
        ]
      },
      {
        text: '资源列表',
        items: [
          { text: 'GitHub 仓库', link: 'https://github.com/MoomFE/Hu' }
        ]
      }
    ]
  },

  plugins: [
    ['container', {
      type: 'demo',
      before: info => `<div class="demo">${ info }`,
      after: '</div>'
    }]
  ],

  dest: 'docs'
}