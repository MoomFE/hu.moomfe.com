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

在下次 DOM 更新循环结束之后执行延迟回调. 在修改数据之后立即使用这个方法, 获取更新后的 DOM

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






## 选项 - 数据

### data
- 类型: &nbsp; `Object | Function`
- 限制: &nbsp; 定义自定义元素只接受 Function
- 详细: &nbsp;

Hu 实例的数据对象, Hu 会使用 [Hu.observable](#hu-observable) 将对象转为观察者对象, 从而使之能够响应数据变化

实例创建之后, 可以通过 `hu.$data` 访问该实例完整数据对象, Hu 实例也代理了 `data` 对象上所有的属性, 因此访问 `hu.a` 等价于访问 `hu.$data.a`

以 `$` 开头的属性**不会**被 Hu 实例代理, 因为它们可能和 Hu 内置的属性、API 方法冲突. 但是你依旧可以使用如 `hu.$data.$a` 的方式访问这些属性

当一个**自定义元素**被定义, `data` 必须声明为一个返回数据对的函数, 因为自定义元素可能被用来创建多个实例. 如果 `data` 仍然是一个纯粹的对象, 则所有的实例将**共享引用**同一个数据对象 ! 通过提供 `data` 函数, 每次创建一个新实例后, 我们能够调用 `data` 函数, 从而返回初始数据的一个全新副本数据对象

- 示例:
``` js
const data = { a: 1 };

// 创建一个实例
const hu = new Hu({
  data
});

hu.a; // -> 1
hu.$data.a; // -> 1
hu.$data === data // -> false

Hu.define( 'custom-element', {
  // 定义自定义元素时, data 属性必须为一个函数
  data(){
    // this 将会是当前实例
    return {
      data: 1
    };
  },
  // 你也可以使用箭头表达式
  data: () => ({
    data: 1
  })
});
```






### props
- 类型: &nbsp; `Array<string> | Object`
- 限制: &nbsp; 只有自定义元素创建的实例才能发挥其作用
- 详细:

props 可以是数组或对象, 用于接收来自定义元素上属性 ( Attribute ) 的数据, props 可以是简单的数组, 或者使用对象作为替代, 对象允许配置高级选项, 如类型转换、来源属性或默认值

你可以基于对象的语法使用以下选项:
- `attr`: 定义当前 prop 从自定义元素哪个属性名称上进行取值
- `type`: 定义当前 prop 如何从自定义元素的属性转换为实例上的属性, 可以是 `String`、`Number`、`Boolean` 等或者自定义的方法
- `default`: 定义当前 prop 的默认值, 如果在创建实例时 prop 没有被传入, 则换做用这个值, 对象或数组的默认值必须从一个工厂函数返回

- 示例:
``` js
// 简单语法
Hu.define( 'custom-element', {
  props: [ 'size', 'myMessage' ]
});

// 对象语法
Hu.define( 'custom-element', {
  props: {
    // 类型转换
    size: Number,
    // 类型转换 + 默认值 + 来源属性
    myMessage: {
      type: String,
      default: '',
      attr: 'message'// 若不设置, 将会从 my-message 上进行取值
    }
  }
});
```






### computed
- 类型: `{ [key: String]: Function | { get: Function, set: Function } }`
- 详细:

计算属性将被混入到 Hu 实例中. 所有 getter 和 setter 的 this 上下文自动地绑定为 Hu 实例

注意如果你为一个计算属性使用了箭头函数, 则 this 不会指向这个组件的实例, 不过你仍然可以将其实例作为函数的第一个参数来访问

``` js
computed: {
  aDouble: hu => hu.a * 2
}
```

计算属性的结果会被缓存, 除非依赖的响应式属性变化才会重新计算. 注意, 如果某个依赖 ( 比如非响应式属性 ) 在实例范畴之外, 则计算属性是不会被更新的

- 示例:
``` js
const hu = new Hu({
  data: {
    a: 1
  },
  computed: {
    // 仅读取
    aDouble(){
      return this.a * 2;
    },
    // 读取和设置
    aPlus: {
      get(){
        return this.a + 1
      },
      set( value ){
        this.a = value - 1;
      }
    }
  }
});

hu.aPlus;   // -> 2
hu.aPlus = 3;
hu.a;       // -> 2
hu.aPlus;   // -> 3
hu.aDouble; // -> 4
```






### methods
- 类型: `{ [key: String]: Function }`
- 详细:

methods 将被混入到 Hu 实例中. 可以直接通过 Hu 实例访问这些方法, 或者在指令表达式中使用. 方法中的 this 自动绑定为 Hu 实例

- 示例:
``` js
const hu = new Hu({
  data: {
    a: 1
  },
  methods:{
    plus(){
      this.a++
    }
  }
});

hu.a; // -> 2
hu.plus();
hu.a; // -> 3
```






### watch
- 类型: `{ [key: string]: string | Function | Object | Array }`
- 详细:

一个对象, 键是需要观察的表达式, 值是对应回调函数. 值也可以是方法名, 或者包含选项的对象. Hu 实例将会在实例化时调用 $watch(), 遍历 watch 对象的每一个属性

- 示例:
``` js
const hu = new Hu({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  methods: {
    watchB( value, oldValue ){
      // ...
    }
  },
  watch: {
    // 回调函数方式
    a( value, oldValue ){
      console.log(`value: ${ value }, oldValue: ${ oldValue }`);
    },
    // 方法名
    // b: 'watchB'
    // 未完待续...
  }
});

```