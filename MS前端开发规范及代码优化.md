# MS前端开发规范及代码优化

制定开发规范的目的

- 统一编码风格，规范，提高团队协作效率
- 在团队协作中输出可读性强，易维护，风格一致的代码


## HTML 篇

#### 启用标准模式

使用 HTML5 的 `doctype` 来启用标准模式

```html
<!DOCTYPE html>
```

#### 统一使用 UTF-8 编码

```html
<meta charset="utf-8" />
```

#### 优先使用 IE 最新版本和 Chrome

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
```

#### 移动设备添加 viewport

```html
<meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no" />
```

#### 自闭合标签无需闭合

例如： `img`， `input`， `br`， `hr` 等

```html
<img src="https://xxx.png" alt="Google" />
<br />
<input type="text" name="title" />
```

#### 使用语义化标签

html 的标签能使用语义化的，尽量使用语义化标签，避免一个页面都是 div 或者 p 标签

```html
<!-- bad -->
<div>
  <p></p>
</div>

<!-- good -->
<header></header>
<footer></footer>
```

#### 属性顺序要求

HTML 属性应该按照特定的顺序出现以保证易读性。

```
id
class
name
data-xxx
src, for, type, href
title, alt
aria-xxx, role
```

## CSS 篇

#### BEM 命名原则

- block：模块，名字单词间用 - 连接
- element：元素，模块的子元素，以 \_\_ 与 block 连接
- modifier：修饰，模块的变体，定义特殊模块，以 -- 与 block 连接

```css
/* 举个例子 */
.block__element {
}
.block--modifier {
}
```

#### 有效使用 css 选择器

选择器嵌套应少于 3 级

```css
/* bad */
.page .header .login #username input {
}

/* good */
#username input {
}
```

有效使用 css 选择器，因遵循以下原则

- 保持简单，不要使用嵌套过多过于复杂的选择器。
- 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用。
- 不要使用类选择器和 ID 选择器修饰元素标签。
- 不要为了追求速度而放弃可读性与可维护性
- 避免使用 CSS 表达式

#### 慎重选择高消耗的样式

高消耗属性在绘制前需要浏览器进行大量计算：

```
box-shadows
border-radius
transparency
transforms
CSS filters（性能杀手）
```

#### 避免重绘重排

当发生重排的时候，浏览器需要重新计算布局位置与大小，不利于性能优化。

常见引起重绘重排属性和方法

- 添加或者删除可见的 `DOM` 元素；
- 元素尺寸改变——边距、填充、边框、宽度和高度
- 内容变化，比如用户在 `input` 框中输入文字
- 浏览器窗口尺寸改变——`resize` 事件发生时
- 计算 `offsetWidth` 和 `offsetHeight` 属性
- 设置 `style` 属性的值

减少重绘重排的方法

- 使用 `transform` 替代 `top`
- 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发回流（改变了布局）
- 不要把节点的属性值放在一个循环里当成循环里的变量。
- 不要使用 `table` 布局，可能很小的一个小改动会造成整个 `table` 的重新布局
- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 `requestAnimationFrame`
- CSS 选择符从右往左匹配查找，避免节点层级过多

## Javascript 篇

#### 类型风格

尽量避免全局作用域、谨慎使用闭包
按强类型风格写代码：声明确定类型，不随意更改类型，函数返回确定类型

#### 关于命名

普通命名采用小驼峰式命名

```js
let userName = 'jack'
```

命名是复数的时候需要加 s，比如说我想声明一个数组，表示很多人的名字

```js
let names = new Array()
```

每个常量都需命名，这样更利于别人读懂含义

```js
// good
const COL_NUM = 10
let row = Math.ceil(num / COL_NUM)

// bad
let row = Math.ceil(num / 10)
```

命名需要符合语义化，如果函数命名，可以采用加上动词前缀：

- can 判断是否可执行某个动作
- has 判断是否含有某个值
- is 判断是否为某个值
- get 获取某个值
- set 设置某个值

```js
//是否可阅读
function canRead(){
   return true;
}
//获取姓名
function getName{
   return this.name
}
```

#### 关于字符串

统一使用单引号而不是双引号

```js
// bad
const name = 'jack'

// good
const name = 'jack'
```

用字符串模板而不是 '+' 来拼接字符串

```js
function sayHi(name) {
  return 'How are you, ' + name + '?'
}

// good
function sayHi(name) {
  return `How are you, ${name}?`
}
```

#### 关于数组

用字面量赋值

```js
// bad
const items = new Array()

// good
const items = []
```

用扩展运算符做数组浅拷贝

```js
// bad
let arr = [1, 2, 3]
const len = arr.length
const copyArr = []

for (let i = 0; i < len; i += 1) {
  copyArr[i] = arr[i]
}

// good
const copyArr = [...arr]
```

用 Array.from 去将一个类数组对象转成一个数组。

```js
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 }

// bad
const arr = Array.prototype.slice.call(arrLike)

// good
const arr = Array.from(arrLike)
```

使用数组解构

```js
const arr = [1, 2, 3, 4]

// bad
const first = arr[0]
const second = arr[1]

// good
const [first, second] = arr
```

#### 关于对象

创建对象和数组推荐使用字面量，因为这不仅是性能最优也有助于节省代码量。

```js
// good
let obj = {
  name: 'Tom',
  age: 15,
  sex: '男',
}

// bad
let obj = {}
obj.name = 'Tom'
obj.age = 15
obj.sex = '男'
```

ES6 使用属性值缩写

```js
const lukeSkywalker = 'Luke Skywalker'

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
}

// good
const obj = {
  lukeSkywalker,
}
```

将属性的缩写放在对象声明的开头

```js
const anakinSkywalker = 'Anakin Skywalker'
const lukeSkywalker = 'Luke Skywalker'

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
}

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
}
```

对象浅拷贝时，更推荐使用扩展运算符 ...，而不是 Object.assign。解构赋值获取对象指定的几个属性时，推荐用 rest 运算符，也是 ...。

```js
// very bad
const original = { a: 1, b: 2 }
const copy = Object.assign(original, { c: 3 })
delete copy.a //  改变了 original

// bad
const original = { a: 1, b: 2 }
const copy = Object.assign({}, original, { c: 3 }) // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 }
const copy = { ...original, c: 3 } // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy // noA => { b: 2, c: 3 }
```

#### 关于函数

函数参数使用默认值替代使用条件语句进行赋值。

```js
// good
function createMicrobrewery(name = 'Jack') {
   ...
}

// bad
function createMicrobrewery(name) {
  const userNameName = name || 'Jack'
   ...
}
```

函数参数使用结构语法，函数参数越少越好，如果参数超过两个，要使用 ES6 的解构语法，不用考虑参数的顺序。

```js
// good
function createMenu({ title, body, buttonText, cancellable }) {
   ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true,
})

// bad
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
```

优先使用 rest 语法...，而不是 arguments

```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments)
  return args.join('')
}

// good
function concatenateAll(...args) {
  return args.join('')
}
```

把默认参数赋值放在最后

```js
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

尽量使用箭头函数

```js
// bad
;[1, 2, 3]
  .map(function (x) {
    const y = x + 1
    return x * y
  })

  [
    // good
    (1, 2, 3)
  ].map((x) => {
    const y = x + 1
    return x * y
  })
```

#### 关于模块

在非标准模块系统上使用(import/export)

```js
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide')
module.exports = AirbnbStyleGuide.es6

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide'
export default AirbnbStyleGuide.es6

// best
import { es6 } from './AirbnbStyleGuide'
export default es6
```

一个入口只 import 一次

```js
// bad
import foo from 'foo'
// … some other imports … //
import { named1, named2 } from 'foo'

// good
import foo, { named1, named2 } from 'foo'
```

在只有一个导出的模块里，用 export default 更好

```js
// bad
export function foo() {}

// good
export default function foo() {
```

#### for 循环

使用 for 循环过程中，数组的长度，使用一个变量来接收，这样有利于代码执行效率得到提高，而不是每走一次循环，都得重新计算数组长度

```js
// bad
for(var i=0;i<arr.length,i++){

}

// good
for(var i=0;i<arr.length,i++){

}
```

## Vue 篇

#### Prop 定义尽量详细。

`prop` 的定义应该尽量详细，至少需要指定其类型。

```js
// bad
props: ['status']

// good
props: {
  status: String
}

// better
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return ['syncing','synced','version-conflict','error'].indexOf(value) !== -1
    }
  }
}
```

#### v-for 遍历必须添加 key

在列表数据进行遍历渲染时，需要为每一项 `item` 设置唯一 `key` 值，方便 Vue.js 内部机制精准找到该条列表数据。当 `state` 更新时，新的状态值和旧的状态值对比，较快地定位到 `diff` 。

```html
<!-- bad -->
<ul>
  <li v-for="todo in todos">{{ todo.text }}</li>
</ul>

<!-- good -->
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

#### v-if 和 v-for 不要用在同一个元素上。

`v-for` 比 `v-if` 优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候。

```html
<!-- bad -->
<ul>
  <li v-for="user in users" v-if="shouldShowUsers" :key="user.id">{{ user.name }}</li>
</ul>

<!-- good -->
<ul v-if="shouldShowUsers">
  <li v-for="user in users" :key="user.id">{{ user.name }}</li>
</ul>
```

#### 组件的 data 必须是一个函数

JS 中的实例是通过构造函数来创建的，每个构造函数可以 new 出很多个实例，那么每个实例都会继承原型上的方法或属性。Vue 的 data 数据其实是 Vue 原型上的属性，数据存在于内存当中。

同一个组件被复用多次，会创建多个实例。这些实例用的是同一个构造函数，如果 data 是一个对象的话。那么所有组件都共享了同一个对象。为了保证组件的数据独立性，要求每个组件必须通过 data 函数返回一个对象作为组件的状态，这样每复用一次组件，就会返回一份新的 data。

```js
// bad
Vue.component('some-comp', {
  data: {
    foo: 'bar',
  },
})

// good
Vue.component('some-comp', {
  data: function () {
    return {
      foo: 'bar',
    }
  },
})
```

#### 组件模板应该书写简洁

组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。

```js
// bad
{
  { 
    fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
 }

//  good
//  在模板中
{{ normalizedFullName }}
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

#### 指令缩写

```html
<!-- bad -->
<input v-bind:value="newTodoText" :placeholder="newTodoInstructions" v-on:input="onInput" />
<!-- good -->
<input :value="newTodoText" :placeholder="newTodoInstructions" @input="onInput" />
```

#### 组件名为多个单词

我们开发过程中自定义的组件的名称需要为多个单词，这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。

```js
// good
Vue.component('todo-item', {
  // ...
})
export default {
  name: 'TodoItem',
  // ...
}

// bad
Vue.component('todo', {
  // ...
})

export default {
  name: 'Todo',
  // ...
}
```

#### 多个属性进行分行

在 JavaScript 中，用多行分隔对象的多个属性是很常见的最佳实践，因为这样更易读。

```html
<!-- good -->
<MyComponent foo="a" bar="b" baz="c" />

<!-- bad -->
<MyComponent foo="a" bar="b" baz="c" />
```

#### 元素特性的顺序

原生属性放前面，指令其次，传参和方法放最后

```
  - class, id, ref
  - name, data-*, src, alt, for, type, href, value, max, min
  - title, placeholder, aria-*, role
  - required, readonly, disabled
  - v-model, v-for, key, v-if, v-show, v-bind,:
  - foo="a" bar="b" baz="c"
```

#### 关于组件内样式

为组件样式设置作用域

```css
/* bad  */
<style>
.btn-close {
  background-color: red;
}
</style>

/* good  */
<style scoped>
.button-close {
  background-color: red;
}
</style>
```

若要改变第三方组件库的样式，需要加上顶级作用域。

```css
/* bad */
.ivu-input {
  width: 254px !important;
}

/* good */
.customerForm .ivu-input {
  width: 254px !important;
}
/* .customerForm为当前组件的顶级dom  */
```

#### 关于组件结构

组件结构遵循从上往下 template，script，style 的结构。

```html
<template>
  <div></div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped></style>
```

script 部分各方法成员遵循以下顺序放置。

```
- name
- components
- props
- data
- methods
- computed
- watch
- created
- mounted
- update
```

#### 清除定时器或者事件监听

由于项目中有些页面难免会碰到需要定时器或者事件监听。但是在离开当前页面的时候，定时器如果不及时合理地清除，会造成业务逻辑混乱甚至应用卡死的情况，这个时就需要清除定时器事件监听，即在页面卸载（关闭）的生命周期函数里，清除定时器。

```js
methods:{
  resizeFun () {
    this.tableHeight = window.innerHeight - document.getElementById('table').offsetTop - 128
  },
  setTimer() {
    this.timer = setInterval(() => { })
  },
  clearTimer() {
        clearInterval(this.timer)
    this.timer = null
    }
},
mounted() {
  this.setTimer()
  window.addEventListener('resize', this.resizeFun)
},
beforeDestroy() {
  window.removeEventListener('resize', this.resizeFun)
  this.clearTimer()
}
```

#### 路由懒加载

Vue 是单页面应用，可能会有很多的路由引入 ，这样使用 webpcak 打包后的文件很大，当进入首页时，加载的资源过多，页面会出现白屏的情况，不利于用户体验。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这样就更加高效了。

```js
{
  path: '/Home',
  component: () => import('@/views/Home.vue')
}
```

#### 职责单一

任何时候尽量是的一个函数就做一件事情，而不是将各种逻辑全部耦合在一起，提高单个函数的复用性和可读性。比如：每个页面都会在加载完成时进行数据的请求并展示到页面。

```js
// bad
methods: {
  getList1() {
    // to do ...
  },
  getList2() {
    // to do ...
  }
},
created() {
  this.getList1()
  this.getList2()
},

// good
methods: {
  // 将全部的请求行为聚合在init函数中
  init() {
    this.getList1()
    this.getList2()
  },
  getList1() {
    // to do ...
  },
  getList2() {
    // to do ...
  }
},
created() {
  this.init();
},
```

#### 第三方 UI 组件按需引入

我们在项目中使用的第三方 UI 组件，如果我们直接引入整个组件库，会导致项目的体积太大，我们可以借助 babel-plugin-component ，然后可以只引入需要的组件，以达到减小项目体积的目的。以下为项目中引入 vant 为例：

1、首先，安装 babel-plugin-component

```js
npm install babel-plugin-component -D
```

2、修改 .babelrc

```js
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

3、引入部分组件：

```js
import Vue from 'vue'
import { Button } from 'vant'

Vue.use(Button)
```

## 图片篇：

#### 使用恰当的图片格式。

- jpg：适用于内容图片多为照片之类的。
- png：适用于而饰图片，通常更适合用无损压缩。
- gif： 基本上除了 gif 动画外不要使用。
- webP：大大减小图片的体积，但是移动端有兼容性问题。

#### 使用雪碧图

雪碧图，`CSS Sprites`，国内也叫 CSS 精灵，是一种 CSS 图像合成技术，主要用于小图片显示。

雪碧图的优点是把诸多小图片合成一张大图，利用`backround-position`属性值来确定图片呈现的位置，这样就能减少 http 请求，到达性能优化的效果。

#### 使用 iconfont

`iconfont`(字体图标)，即通过字体的方式展示图标，多用于渲染图标、简单图形、特殊字体等。

使用 `iconfont` 时，由于只需要引入对应的字体文件即可，这种方法可有效减少 HTTP 请求次数，而且一般字体体积较小，所以请求传输数据量较少。与直接引入图片不同，`iconfont` 可以像使用字体一样，设置大小、颜色及其他样式，且不存在失真的情况。

#### 图片懒加载

图片懒加载的原理就是暂时不设置图片的 `src` 属性，而是将图片的 `url` 隐藏起来，比如先写在 `data-src` 里面，等某些事件触发的时候(比如滚动到底部，点击加载图片)再将图片真实的 `url` 放进 `src` 属性里面，从而实现图片的延迟加载。

```js
function lazyload() {
  var images = document.getElementsByTagName('img')
  var len = images.length
  var n = 0 //存储图片加载到的位置，避免每次都从第一张图片开始遍历
  return function () {
    var seeHeight = document.documentElement.clientHeight
    for (var i = n; i < len; i++) {
      if (images[i].getBoundingClientRect().top < seeHeight) {
        //方法二: 当图片的视口top出现在视口中
        if (images[i].getAttribute('src') === 'images/default.jpg') {
          images[i].src = images[i].getAttribute('data-src')
        }
        n = n + 1
      }
    }
  }
}
```

vue 项目可以 `vue-lazyload` 插件实现图片懒加载

`main.js` 中全局引入：

```js
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/img/error.jpg'),
  loading: require('./assets/img/homePage_top.jpg'),
  attempt: 2,
})
```

页面中使用

```html
<li v-for="(item,index) in imgList">
  <img v-lazy="item" alt="" />
</li>
```
