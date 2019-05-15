---
title: API
sidebar: auto
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

// 一处定义, 处处使用
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






### Hu.util
- 详细: &nbsp; 共享出来的部分内部使用的方法
``` ts
/**
 * 绑定事件
 * @param elem 绑定事件的元素对象
 * @param type 事件名称
 * @param listener 事件回调
 * @param options 事件修饰符
 */
addEvent( elem: Element, type: string, listener: function, options: boolean | {} ): void;

/**
 * 解绑事件
 * @param elem 解绑事件的元素对象
 * @param type 事件名称
 * @param listener 事件回调
 * @param options 事件修饰符
 */
removeEvent( elem: Element, type: string, listener: function, options: boolean | {} ): void;

/**
 * 触发事件
 * @param elem 触发事件的元素对象
 * @param type 事件名称
 */
triggerEvent( elem: Element, type: string ): void;

/**
 * 对象遍历方法
 *  - 和 jQuery 的 each 方法不同, 遍历过程无法通过返回 false 进行中断
 *  - 就是个普通的对象遍历方法
 * @param obj 
 * @param callback 
 */
each( obj: {}, callback: function ): void;

/**
 * 判断传入对象是否是纯粹的对象
 * @param obj 需要判断的对象
 */
isPlainObject( obj: any ): boolean;

/**
 * 判断传入对象是否是一个空对象
 * @param obj 需要判断的对象
 */
isEmptyObject( obj: any ): boolean;

/**
 * 判断传入对象是否是原始对象
 * @param obj 需要判断的对象
 */
isPrimitive( obj: any ): boolean;

/**
 * 判断传入的两个值是否相等
 *  - 用于避免 NaN !== NaN 的问题
 * @param value 需要判断的对象
 * @param value2 需要判断的对象
 */
isEqual( value, value2 ): boolean;

/**
 * 判断传入对象是否是 String 类型
 * @param obj 需要判断的对象
 */
isString( obj: any ): boolean;

/**
 * 判断传入对象是否是 Object 类型且不为 null
 * @param obj 需要判断的对象
 */
isObject( obj: any ): boolean;

/**
 * 判断传入对象是否是 Function 类型
 * @param obj 需要判断的对象
 */
isFunction( obj: any ): boolean;

/**
 * 判断传入对象是否是 Symbol 类型
 * @param obj 需要判断的对象
 */
isSymbol( obj: any ): boolean;

/**
 * 返回一个字符串 UID
 */
uid(): string;

/**
 * 创建一个可以缓存方法返回值的方法
 * @param fn 需要缓存值的方法
 */
cached( fn: ( str: string ) => any ): function;
```







## 选项 / 数据

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
- 类型: &nbsp; `Array<String> | Object`
- 限制: &nbsp; 只有自定义元素创建的实例才能发挥其作用
- 详细:

props 可以是数组或对象, 用于接收来自定义元素上属性 ( Attribute ) 的数据, props 可以是简单的数组, 或者使用对象作为替代, 对象允许配置高级选项, 如类型转换、来源属性或默认值

你可以基于对象的语法使用以下选项:
::: tip
- `attr` : 定义当前 prop 从自定义元素哪个属性名称上进行取值
- `type` : 定义当前 prop 如何从自定义元素的属性转换为实例上的属性, 可以是 `String`、`Number`、`Boolean` 等或者自定义的方法
- `default` : 定义当前 prop 的默认值, 如果在创建实例时 prop 没有被传入, 则换做用这个值, 对象或数组的默认值必须从一个工厂函数返回
:::

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
- 类型: &nbsp; `{ [key: String]: Function | { get: Function, set: Function } }`
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
- 类型: &nbsp; `{ [key: String]: Function }`
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






### globalMethods
- 类型: &nbsp; `{ [key: String]: Function }`
- 详细:

globalMethods 将被混入到 Hu 实例中. 可以直接通过 Hu 实例访问这些方法, 或者在指令表达式中使用. 方法中的 this 自动绑定为 Hu 实例

和 methods 选项不同的是, 由自定义元素创建的实例会将方法混入到自定义元素本身, 可以直接调用

- 示例:
``` js
Hu.define( 'custom-element', {
  data: () => ({
    a: 1
  }),
  globalMethods:{
    plus(){
      this.a++
    }
  }
});

const custom = document.body.appendChild( document.createElement('custom-element') );
const hu = custom.$hu;

hu.a; // -> 2
hu.plus();
hu.a; // -> 3
custom.plus();
hu.a; // -> 4
```






### watch
- 类型: &nbsp; `{ [key: string]: string | Function | Object | Array }`
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
    b: 'watchB'
    // 深度监听
    c: {
      deep: true,
      handler( value, oldValue ){
        // ...
      }
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      immediate: true,
      handler( value, oldValue ){
        // ...
      }
    },
    // 监听一系列方法
    e: [
      'watchB',
      function( value, oldValue ){
        // ...
      },
      {
        handler( value, oldValue ){
          // ...
        }
      }
    ],
    // 监听 hu.e.f 的值: { g: 5 }
    'e.f': function( value, oldValue ){
      // ...
    }
  }
});

hu.a = 2; // `value: 2, oldValue: 1`
```






## 选项 / DOM

### el
- 类型: &nbsp; `String | Element`
- 限制: &nbsp; 只在由 `new` 创建的实例中遵守
- 详细:

提供一个在页面上已存在的 DOM 元素作为 Hu 实例的挂载目标. 可以是 CSS 选择器, 也可以是一个 HTMLElement 实例

在实例挂载之后, 元素可以用 hu.$el 访问

如果在实例化时存在这个选项, 实例将立即进入编译过程, 否则, 需要显式调用 hu.$mount() 手动开启编译

::: danger
和 Vue 不同的是, 挂载元素不会被 Hu 生成的 DOM 替换, 而是替换掉挂载元素的内容. 但是, 依旧不推荐挂载 root 实例到 `<html>` 或者 `<body>` 上
:::





### render
- 类型: &nbsp; `( html: () => TemplateResult ): TemplateResult | Array<TemplateResult>`
- 详细:

渲染函数允许你发挥 JavaScript 最大的编程能力, 该渲染函数接收一个 `html` 方法, 使用类似 JSX 的语法来创建 DOM

::: danger
这一部分可能是和 Vue 区别最大的地方了, Hu 使用了深度定制的 [lit-html](https://github.com/Polymer/lit-html) 来创建 DOM

相比模板语言, 它提供语义化并且可以移动的标签, 且支持多个根元素

相比 JSX 语法, 它无需通过构建工具就可以使用
:::

- 示例:
``` js
// 正常使用
render( html ){
  return html`<div>Hello world</div>`;
}

// 条件判断
render( html ){
  if( something ){
    return html`<div>Truthy</div>`;
  }else{
    return html`<div>Falsey</div>`;
  }
}

const style = html`
  <style>
    :host > div{ color: red }
  </style>
`;

// 嵌套使用, 且支持多个根元素
render( html ){
  return html`
    ${ style }
    <div>Hi ~</div>
    <div>Hello world ~</div>
  `;
}

// 更多示例, 还在编辑中
```






### styles
- 类型: &nbsp; `string | string[]`
- 限制: &nbsp; 只在自定义元素创建的实例下可用
- 详细:

指定自定义元素的样式, 在使用 polyfill 的环境下, 可以解决样式无法生效的问题






## 选项 / 生命周期钩子

### beforeCreate
- 类型: &nbsp; `Function`
- 详细:

实例初始化后被调用, 计算属性 computed 和数据监听 watch 初始化之前被调用






### created
- 类型: &nbsp; `Function`
- 详细:

实例创建完成后被调用. 但是挂载还未开始, 使用 `new` 创建的实例 `$el` 属性目前不可见 ( 由自定义元素创建的实例 `$el` 属性始终是可见的 )






### beforeMount
- 类型: &nbsp; `Function`
- 详细:

首次挂载开始之前被调用, 相关的 `render` 函数还未被调用






### mounted
- 类型: &nbsp; `Function`
- 详细:

首次挂载之后被调用, 使用 `new` 创建的实例 `$el` 属性已经可见 ( 由自定义元素创建的实例 `$el` 属性始终是可见的 ), `$el` 的内容已经被渲染的结果替换






### beforeDestroy
- 类型: &nbsp; `Function`
- 详细:

实例销毁之前调用. 在这一步, 实例仍然完全可用






### destroyed
- 类型: &nbsp; `Function`
- 详细:

实例销毁后调用. 调用后, 实例上的计算属性 / watch 监听数据都会被解绑, 所有的事件监听器会被移除






### connected
- 类型: &nbsp; `Function`
- 限制: 只在自定义元素创建的实例下可用
- 详细:

自定义元素被添加到文档流, 此时实例完全可用






### adopted
- 类型: &nbsp; `Function`
- 限制:
  - 只在自定义元素创建的实例下可用
  - 在使用 polyfill 的环境下不可用
- 详细:

自定义元素被移动到新文档时调用, 此时实例完全可用






### disconnected
- 类型: &nbsp; `Function`
- 限制: 只在自定义元素创建的实例下可用
- 详细:

自定义元素被从文档流移除, 此时实例完全可用






## 选项 / 组合

### mixins
- 类型: &nbsp; `Array<Object>`
- 详细:

`mixins` 选项接受一个混入对象的数组. 这些混入实例对象可以像正常的实例对象一样包含选项, 他们将会以一定的逻辑与当前实例对象进行合并. 举例: 如果你的混入包含一个生命周期回调而实例本身也包含一个, 那么两个回调都会被调用

- 示例:
``` js
const mixin = {
  created(){
    // 混入对象的生命周期回调会在实例自身的生命周期回调之前被调用
    console.log( 1 );
  }
};

const hu = new Hu({
  mixins: [ mixin ],
  created(){
    console.log( 2 );
  }
});
// => 1
// => 2
```






## 实例属性

### hu.$el
- 类型: &nbsp; `Element | ShadowRoot`
- 只读
- 详细:

Hu 实例使用的根 DOM 元素<br>
在由自定义元素创建的实例中, 则是当前实例的阴影根 ( ShadowRoot ) 节点






### hu.$customElement
- 类型: &nbsp; `Element`
- 限制: &nbsp; 只在由自定义元素创建的实例中可用
- 只读
- 详细

Hu 实例的自定义元素节点






### hu.$props
- 类型: &nbsp; `Object`
- 详细:

当前组件接收到的 props 对象, Hu 实例代理了对其 props 对象属性的访问






### hu.$data
- 类型: &nbsp; `Object`
- 详细:

Hu 实例观察的数据对象, Hu 实例代理了对其 data 对象属性的访问






### hu.$methods
- 类型: &nbsp; `Object`
- 详细:

Hu 实例的方法对象, Hu 实例代理了对其 methods 对象属性的访问






### hu.$computed
- 类型: &nbsp; `Object`
- 详细:

Hu 实例的计算属性对象, Hu 实例代理了对其 computed 对象属性的访问






### hu.$options
- 类型: &nbsp; `Object`
- 只读
- 详细:

当前 Hu 实例初始化选项, 需要在初始化选项中包含自定义属性时会有用处

- 示例:
``` js
new Hu({
  customOption: 'foo',
  created(){
    console.log( this.$options.customOption ) // => 'foo'
  }
});
```






### hu.$info
- 类型: &nbsp; `Object`
- 只读
- 详细:

当前 Hu 实例信息选项, 包含了当前实例的各种信息及状态:
::: tip
- `name` : 当前自定义元素的名称 | 当前实例的名称
- `isMounted` : 标识当前实例的首次挂载是否已完成
- `isCustomElement` : 标识当前实例是否是自定义元素
- `isConnected` : 标识当前自定义元素是否在文档流中 ( 如果是使用 `new` 创建的实例, 则作用和 isMounted 一致 )
:::






### hu.$refs
- 类型: &nbsp; `Object`
- 只读
- 详细:

一个持有注册过 ref 引用特性的所有 DOM 元素的对象






## 实例方法 / 数据

### hu.$watch
- 用法: &nbsp; `hu.$watch( expOrFn, callback, [ options ] )`
- 参数:
  - `{ String | Function } expOrFn`
  - `{ Function | Object } callback`
  - `{ Object } [ options ]`
    - `{ Boolean } deep`
    - `{ Boolean } immediate`
- 返回值: &nbsp; `{ Function } unWatch`
- 详细:

观察 Hu 实例变化的一个表达式或计算属性函数. 回调函数得到的参数为新值和旧值. 表达式只接受监督的键路径. 对于更复杂的表达式, 可以用一个函数取代

::: danger
注意: 在变异 ( 不是替换 ) 对象或数组时, 旧值将与新值相同, 因为它们的引用指向同一个对象 / 数组. Hu 不会保留变异之前值的副本
:::

- 示例:
``` js
// 键路径
hu.$watch( 'a.b.c', function( newValue, oldValue ){
  // 做点什么
});

// 函数
hu.$watch(
  function(){
    // 表达式 `this.a + this.b` 每次得出一个不同的结果时
    // 处理函数都会被调用
    // 这就像监听一个未被定义的计算属性
    return this.a + this.b;
  },
  function( newValue, oldValue ){
    // 做点什么
  }
);
```

`hu.$watch` 返回一个取消观察函数, 用来停止触发回调
``` js
var unWatch = hu.$watch( 'a', callback );
// 取消观察
unWatch();
```

- 选项: deep

为了发现对象内部值的变化, 可以在选项参数中指定 `deep: true`

::: danger
和 Vue 不同的是, 如果你要监听一个数组内部的变动, 也需要添加 `deep: true`
:::

``` js
hu.$watch( 'someObject', callback, {
  deep: true
});

hu.someObject.nestedValue = 123;
// 回调会被触发
```

- 选项: immediate

在选项参数中指定 `immediate: true` 将立即以表达式的当前值触发回调
``` js
hu.$watch( 'a', callback, {
  immediate: true
});
```






## 实例方法 / 事件

### hu.$on
- 用法: &nbsp; `hu.$on( event, callback )`
- 参数:
  - `{ string | Array<string> } event`
  - `{ Function } callback`
- 详细:

监听当前实例上的自定义事件. 事件可以由 hu.$emit 触发. 回调函数会接收所有传入事件触发函数的额外参数

- 示例:
``` js
hu.$on('test', function (msg) {
  console.log( msg )
});

hu.$emit( 'test', 'hi' );
// => "hi"
```






### hu.$once
- 用法: &nbsp; `hu.$once( event, callback )`
- 参数:
  - `{ string } event`
  - `{ Function } callback`
- 详细:

监听一个当前实例上的自定义事件, 但是只触发一次, 在第一次触发之后移除监听器






### hu.$off
- 用法: &nbsp; `hu.$off([ event, callback ])`
- 参数:
  - `{ string | Array<string> } event`
  - `{ Function } callback`
- 详细:

  移除自定义事件监听器
  - 如果没有提供参数, 则移除所有的事件监听器
  - 如果只提供了事件, 则移除该事件所有的监听器
  - 如果同时提供了事件与回调, 则只移除这个回调的监听器






### hu.$emit
- 用法: &nbsp; `hu.$emit( event, [ ...args ] )`
- 参数:
  - `{ string } event`
  - `[ ...args ]`
- 详细:

触发当前实例上的事件, 附加参数都会传给监听器回调






## 实例方法 / 生命周期

### hu.$mount
- 用法: &nbsp; `hu.$mount( elementOrSelector )`
- 参数:
  - `{ Element | string } elementOrSelector`
- 返回值: &nbsp; `hu` - 实例自身
- 限制: &nbsp; 只在由 `new` 创建的实例中可用
- 详细:

如果 Hu 实例在实例化时没有收到 el 选项, 则它处于 "未挂载" 状态, 没有关联的 DOM 元素. 可以使用 hu.$mount() 手动地挂载一个未挂载的实例

这个方法返回实例自身, 因而可以链式调用其它实例方法

- 示例:
``` js
// 创建实例, 但是未挂载实例到文档中
const hu = new Hu({
  render( html ){
    return html`<div>Hello!</div>`;
  }
});

// 挂载到 #app
hu.$mount('#app');
```






### hu.$forceUpdate
- 用法: &nbsp; `hu.$forceUpdate()`
- 详细:

迫使 Hu 实例立即重新渲染






### hu.$nextTick
- 用法: &nbsp; `hu.$nextTick([ callback ])`
- 参数:
  - `{ Function } [ callback ]`
- 详细:

将回调延迟到下次 DOM 更新循环之后执行. 在修改数据之后立即使用它, 然后等待 DOM 更新. 它跟全局方法 `Hu.nextTick` 一样, 不同的是回调的 this 自动绑定到调用它的实例上

如果没有提供回调, 则返回一个 Promise

- 示例:
``` js
new Hu({
  // ...
  methods: {
    doSomethingElse(){
      // ...
    },
    example(){
      // 修改数据
      this.message = 'changed';
      // DOM 还没有更新
      this.$nextTick(function{
        // DOM 现在更新了
        // `this` 绑定到当前实例
        this.doSomethingElse();
      });
    }
  }
});
```






### hu.destroy
- 用法: &nbsp; `hu.$destroy()`
- 详细:

完全销毁一个实例, 移除所有计算属性和 watch 监听, 解绑它的全部指令及事件监听器<br>
触发 `beforeDestroy` 和 `destroyed` 的钩子






## 自定义元素属性

### custom.$hu
- 只读
- 详细

自定义元素和自定义元素对应的 hu 实例的映射

- 示例:
``` js
Hu.define( 'custom-element', {
  // ...
});

// 自定义元素
const custom = document.createElement('custom-element');
// 自定义元素对应的 hu 实例
const hu = custom.$hu;
```






## 自定义元素方法

### custom.$on
- 用法: &nbsp; `custom.$on( event, callback )`
- 参数:
  - `{ string | Array<string> } event`
  - `{ Function } callback`
- 只读
- 详细:

实例 [$on](#hu-on) 方法的映射






### custom.$once
- 用法: &nbsp; `custom.$once( event, callback )`
- 参数:
  - `{ string } event`
  - `{ Function } callback`
- 只读
- 详细:

实例 [$once](#hu-once) 方法的映射






### custom.$off
- 用法: &nbsp; `custom.$off([ event, callback ])`
- 参数:
  - `{ string | Array<string> } event`
  - `{ Function } callback`
- 只读
- 详细:

实例 [$off](#hu-emit) 方法的映射






## 基础指令

### .prop
- 参数: &nbsp; `prop`
- 预期: &nbsp; `any`
- 详细:

用于动态地绑定 DOM 属性 ( property ), 属性名由参数指定

- 示例:
``` js
html`<div .title=${ 'value' }></div>`;

div.title; // => 'value'
```






### ?attr
- 参数: &nbsp; `attr`
- 预期: &nbsp; `Boolean`
- 详细:

若属性值为 [Truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy) 则保留 DOM 属性, 否则移除 DOM 属性, 属性名由参数指定

- 示例:
``` js
// 保留 DOM 属性
html`<input ?readonly=${ true } />`;
input.hasAttribute('readonly'); // true;

// 移除 DOM 属性
html`<input ?readonly=${ false } />`;
input.hasAttribute('readonly'); // false;
```






### @event
- 参数: &nbsp; `event`
- 预期: &nbsp; `Function`
- 修饰符:
  - `.stop` - 调用 `event.stopPropagation()`
  - `.prevent` - 调用 `event.preventDefault()`
  - `.capture` - 添加事件侦听器时使用 capture 模式
  - `.passive` - 添加事件侦听器时使用 passive 模式
  - `.once` - 只触发一次回调
  - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调
  - `.left` - 只当点击鼠标左键时触发
  - `.middle` - 只当点击鼠标中键时触发
  - `.right` - 只当点击鼠标右键时触发
  - `.ctrl` - `系统修饰键`, 只当按下 `ctrl` 时触发
  - `.alt` - `系统修饰键`, 只当按下 `alt` 时触发
  - `.shift` - `系统修饰键`, 只当按下 `shift` 时触发
  - `.meta` - `系统修饰键`, 只当按下 `meta` 时触发
  - `.exact` - 控制由精确的 `系统修饰键` 组合时触发
- 详细:

绑定事件监听器, 事件类型由参数指定

- 参数:
``` js
function doSomething( event ){
  // ...
}

// 方法处理器
html`<button @click=${ doSomething }></button>`;

// 停止冒泡
html`<button @click.stop=${ doSomething }></button>`;

// 阻止默认行为
html`<button @click.prevent=${ doSomething }></button>`;

// 串联修饰符
html`<button @click.stop.prevent=${ doSomething }></button>`;

// 点击回调只会触发一次
html`<button @click.once=${ doSomething }></button>`;

// 系统修饰键
// 点击时, ctrl 是按下的
html`<button @click.ctrl=${ doSomething }></button>`;

// 精确控制系统修饰键
// 点击时, 四个系统修饰键内只有 ctrl 是按下的
html`<button @click.ctrl.exact=${ doSomething }></button>`;
```






### :name
- 参数: &nbsp; `name`
- 预期: &nbsp; 按不同指令而不同
- 详细:

拥有高级功能的指令, 指令名称由参数指定. 详见 [功能指令](#功能指令)






## 功能指令

### :class
- 预期: &nbsp; `String | Array | Object`
- 详细:

操作元素的 class 列表是数据绑定的一个常见需求, `:class` 做了专门的增强, 表达式结果的类型除了字符串之外, 还可以是对象或数组

#### 对象语法
我们可以传给 `:class` 一个对象, 以动态地切换 class:
``` js
html`<div :class=${{ active: isActive }}></div>`
```
上面的语法表示 `active` 这个 class 存在与否将取决于数据属性 `isActive` 的 [truthiness](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)

你可以在对象中传入更多属性来动态切换多个 class. 此外, `:class` 指令也可以与普通的 class 属性共存
``` js
var isActive = true;
var hasError = false;

html`
  <div
    class="static"
    :class=${{ active: isActive, 'text-danger': hasError }}
  ></div>
`
```

结果将渲染为
```js
<div class="static active"></div>
```

绑定的数据对象不必内联定义在模板里
```js
const classes = {
  active: true,
  'text-danger': false
};

// 渲染的结果和上面一样
html`<div class="static" :class=${ classes }></div>`;
```

我们也可以在这里绑定一个返回对象的计算属性. 这是一个常用且强大的模式
``` js
new Hu({
  data: {
    isActive: true,
    error: null
  },
  computed: {
    classes(){
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      };
    }
  },
  render( html ){
    return html`
      <div class="static" :class=${ this.classes }></div>
    `;
  }
});
```

#### 数组语法
我们可以把一个数组传给 `:class`, 以应用一个 class 列表
``` js
var activeClass = 'active';
var errorClass = 'text-danger';

html`<div :class=${[ activeClass, errorClass ]}></div>`;
```

如果你也想根据条件切换列表中的 class, 可以用三元表达式
``` js
html`<div :class=${[ isActive ? activeClass : '', errorClass ]}></div>`;
```

不过, 当有多个条件 class 时这样写有些繁琐. 所以在数组语法中也可以使用对象语法
``` js
html`<div :class=${[ { activeClass: isActive }, errorClass ]}></div>`;
```






### :style
- 预期: &nbsp; `String | Array | Object`
- 详细:

操作元素的 style 内联样式是数据绑定的一个常见需求, `:style` 做了专门的增强, 表达式结果的类型除了字符串之外, 还可以是对象或数组.

#### 对象语法
`:style` 的对象语法十分直观 -- 看着非常像 CSS, 但其实是一个 JavaScript 对象. CSS 属性名可以用驼峰式 ( camelCase ) 或短横线分隔 ( kebab-case, 记得用单引号括起来 ) 来命名
``` js
var activeColor = 'red';
var fontSize = 30;

html`<div :style=${{ color: activeColor, fontSize: fontSize + 'px' }}></div>`
```

直接绑定到一个样式对象通常更好，这会让模板更清晰
``` js
var styleObject = {
  color: 'red',
  fontSize: '13px'
};

html`<div :style=${ styleObject }></div>`
```

同样的, 对象语法常常结合返回对象的计算属性使用

#### 数组语法
`:style` 的数组语法可以将多个样式对象应用到同一个元素上

``` js
html`<div :style=${[ baseStyles, overridingStyles ]}></div>`
```






### :model
- 预期: &nbsp; 随表单控件类型不同而不同
- 限制:
  - `<input>`
  - `<select>`
  - `<textarea>`
- 详细:

在表单控件上创建双向绑定, 可以将控件的值与观察者对象进行绑定

- 示例:
``` js
const div = document.createElement('div');
const hu = new Hu({
  el: div,
  data: {
    value: ''
  },
  render( html ){
    return html`
      <input ref="input" :model=${[ this, 'value' ]}>
    `;
  }
});

hu.value = '1';
hu.$nextTick(() => {
  hu.$ref.input.value;// -> '1'

  hu.value = '2';
  hu.$nextTick(() => {
    hu.$ref.input.value;// -> '2'
  });
});
```






### :show
- 预期: &nbsp; `any`
- 详细:

根据表达式之真假值, 切换元素的 display CSS 属性






### :text
- 预期: &nbsp; `any`
- 详细:

更新元素的 `textContent`






### :html
- 预期: &nbsp; `any`
- 详细:

更新元素的 `innerHTML`, 如果需要更新部分的 `innerHTML`, 可以使用 [unsafe](#html-unsafe) 指令方法

::: danger
- 内容将按照普通 HTML 直接进行插入, 不会对内容进行其他编译
- 在网站上动态渲染任意 HTML 是非常危险的, 因为容易导致 XSS 攻击<br>
- 只在可信内容上使用 unsafe, 永不用在用户提交的内容上
:::






## 指令方法

### html.repeat
- 用法: &nbsp; `html.repeat( item, key, template )`
- 参数:
  - `{ T[] } item`
  - `{ string | ((T) => string) } key`
  - `{ ( item: T, index: number, items: T[] ) => TemplateResult } template`
- 详细:

渲染数组时使用, 若数组发生变动, 将基于 key 的变化重新排列元素顺序而不是替换元素

- 示例:
``` js
const arr = [
  { id: '1', value: 'q' },
  { id: '2', value: 'w' },
  { id: '3', value: 'e' }
]

Hu.render( div )`
  <div>${
    Hu.html.repeat( arr, 'id', ( data, index, arr ) => {
      return Hu.html`<span>${ data.id }: ${ data.value }</span>`;
    })
  }</div>
`;
```






### html.unsafe
- 用法: &nbsp; `html.unsafe( value )`
- 参数:
  - `{ string } value`
- 详细:

将内容按普通 HTML 不转义直接插入到当前位置, 如果需要更新完整的的 `innerHTML`, 也可以使用 [html](#html) 功能指令

::: danger
- 内容将按照普通 HTML 直接进行插入, 不会对内容进行其他编译
- 在网站上动态渲染任意 HTML 是非常危险的, 因为容易导致 XSS 攻击<br>
- 只在可信内容上使用 unsafe, 永不用在用户提交的内容上
:::

- 示例:
``` js
const unsafeHTML = `<span>unsafeHTML</span>`;

Hu.render( div )`
  <div>${
    Hu.html.unsafe( unsafeHTML )
  }</div>
`;
```






### html.bind
- 用法: &nbsp; `html.bind( obj, name )`
- 参数:
  - `{ object } obj`
  - `{ string | number | symbol } name`
- 详细:

将元素属性或内容与观察者对象的目标对象绑定, 若观察者对象的目标对象更新, 元素属性也会更新

::: tip
- 和常规绑定相比, 若是使用此方法绑定的元素属性或内容, 变量更新时可以不触发整体重新渲染
- 纯渲染实例可以使用此方法达到和常规绑定一样的体验
- 和常规绑定一样, 观察者对象的目标对象更新后, 属性值会在下一 tick 进行更新, 可以使用 nextTick 方法获取更新后的值
:::

- 示例:
``` js
new Hu({
  data: {
    classes: 'bar'
  },
  render( html ){
    // 可复用
    const bindClasses = html.bind( this, 'classes' );

    // 1. 使用 bind 绑定的写法
    // 若 classes 发生改变, render 方法不会被重新运行, 而是单独更新绑定的位置
    return html`
      <div class=${ bindClasses }>${ bindClasses }</div>
    `;

    // 2. 使用常规绑定的写法
    // 若 classes 发生改变, render 方法会被重新运行以达到更新的目的
    return html`
      <div class=${ this.classes }>${ this.classes }</div>
    `;
  }
});
```





<br>
<br>
<br>
<br>
<br>
<br>