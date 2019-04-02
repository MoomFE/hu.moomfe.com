

module.exports = {

  locales: {
    '/': {
      title: 'Hu.js',
      description: '基于 Web Components 和 Proxy 的 MVVM 框架',
      lang: 'zh-CN'
    }
  },

  themeConfig: {
    sidebar: 'auto',
    nav: [
      {
        text: 'API',
        link: '/api/'
      },
      {
        text: '教程',
        items: [
          { text: '创建一个 Hu 实例', link: '' },
          { text: '创建一个自定义元素', link: '' },
          { text: '创建纯渲染实例', link: '' }
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