if( typeof window !== 'undefined' ){
  [
    '/hu/hu.polyfill.async.config.js',
    '/hu/hu.polyfill.async.js'
  ].forEach( src => {
    var script = document.createElement('script');
        script.src = src;

    document.head.appendChild( script );
  });
}


export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.ignoredElements = [
    /^custom-/
  ];
}