---
title: API
---

## 全局 API

### Hu.define
- 用法: &nbsp; `Hu.define( name, options )`
- 参数:
  - `{ String } name`
  - `{ Object } options`
- 详细: &nbsp; 方法可用于定义一个全局的自定义元素
<!-- - 参考:  -->






### Hu.observable
- 用法: &nbsp; `Hu.observable( object )`
- 参数:
  - `{ Object } object`
- 详细:

方法会返回一个可响应的对象代理 ( 观察者对象 ), Hu 内部会用它来处理 `data` 函数返回的对象

返回的可响应的对象代理可以直接用于渲染函数和计算属性内, 并且会在发生改变时触发相应的更新, 而对源对象直接进行修改将是不可响应的

也可以作为最小化的跨组件状态存储器

- 示例:
``` html
<div id="app"></div>
```

``` js
const state = Hu.observable({
  count: 0
});

new Hu({
  el: '#app',
  render( html ){
    return html`
      <div @click=${ this.add }>Count is: ${ state.count }</div>
    `;
  },
  methods: {
    add(){
      state.count++
    }
  }
});
```






### Hu.html
- 用法: &nbsp; ``` Hu.html`<div></div>` ```
- 详细: 方法用于创建 `TemplateResult` 模板
- 示例:
``` js
const app = document.getElementById('app');
const result = Hu.html`
  <div>Hello world</div>
`;

// 在 Hu.render 中使用
Hu.render( result, app )

// 在 new Hu 创建的实例中使用
new Hu({
  el: app,
  render( html ){// html === Hu.html
    return result;
  }
});

// 在 Hu.define 创建的自定义元素中使用
Hu.define( 'custom-element', {
  render( html ){// html === Hu.html
    return result;
  }
});
```





### Hu.render
- 用法: &nbsp; `Hu.render( result, container )`
- 参数:
  - `{ TemplateResult } result`
  - `{ Element } container`
- 详细:

方法可以在不借助使用 `new Hu` 或 `Hu.define` 的情况下, 渲染一个 HTML 片段

- 示例:
``` js
const app = document.getElementById('app');
let name = '张三';

// 正常使用
Hu.render(
  Hu.html`<div>${ name }</div>`,
  app
);

// 另一种使用方式
Hu.render( div )`
  <div>${ name }</div>
`;
```






### Hu.nextTick
- 用法: &nbsp; `Hu.nextTick( callback, context )`
- 参数:
  - `{ Function } callback`
  - `{ Object } context`
- 详细:

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM

- 示例:
``` js
// 修改数据
hu.msg = 'Hello';
// DOM 还没有更新
Hu.nextTick(function(){
  // DOM 更新了
});

// 作为一个 Promise 使用
Hu.nextTick().then(function(){
  // DOM 更新了
});
```






### Hu.noConflict
- 用法: &nbsp; `Hu.noConflict()`
- 详细: &nbsp; 释放 window.Hu 的控制权, 还原到定义 Hu 之前






### Hu.version
- 详细: &nbsp; 提供字符串形式的 Hu 安装版本号