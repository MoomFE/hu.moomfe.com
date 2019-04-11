---
title: 介绍
---

## Hu.js 是什么
Hu 是一套用于构建用户界面的渐进式框架, 基于 Web Components 和 Proxy 的 MVVM 框架, 使用了和 Vue 相似的 API, 大大减少了学习成本, 定义的组件可以在任何类库及框架中使用, 便于与第三方库或既有项目整合


## 声明式渲染
Hu.js 的核心是一个采用直观的模板字面量来声明式地将数据渲染进 DOM 的系统
``` html
<div id="app-1"></div>
```
``` js
var app = new Hu({
  el: '#app-1',
  data: {
    message: 'Hello Hu !'
  },
  render( html ){
    return html`<p>${ this.message }</p>`;
  }
});
```
::: demo
<div id="app-1"></div>
<script>
var app = new Hu({
  el: '#app-1',
  data: {
    message: 'Hello Hu !'
  },
  render( html ){
    return html`<div>${ this.message }</div>`;
  }
});
</script>
:::
我们已经成功创建了第一个 Hu 应用 ! Hu 在背后做了大量工作, 现在数据和 DOM 已经被建立了关联, 所有东西都是响应式的, 我们要怎么确认呢? 打开你的浏览器的 JavaScript 控制台 ( 就在这个页面打开 ), 并修改 app.message 的值, 你将看到上例相应地更新

除了文本插值, 我们还可以像这样来绑定元素特性
``` html
<div id="app-2"></div>
```
``` js
var app2 = new Hu({
  el: '#app-2',
  data: {
    message: `页面加载于 ${ ( new Date ).toLocaleString() }`
  },
  render( html ){
    return html`
      <div title=${ this.message }>
        鼠标悬停几秒钟查看此处动态绑定的提示信息 !
      </div>
    `;
  }
});
```
::: demo
<div id="app-2"></div>
<script>
var app2 = new Hu({
  el: '#app-2',
  data: {
    message: `页面加载于 ${ ( new Date ).toLocaleString() }`
  },
  render( html ){
    return html`
      <div title=${ this.message }>
        鼠标悬停几秒钟查看此处动态绑定的提示信息 !
      </div>
    `;
  }
});
</script>
:::
你可能发现了, 不管是文本内容还是元素属性, 都是通过 `${ .. }` 插值的方式进行绑定的, 这就是基于模板字面量的特性