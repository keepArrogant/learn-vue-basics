## `JS`模块化

### JavaScript原始功能

- 在网页开发的早期，`js`制作作为一种脚本语言，做一些简单的表单验证或动画实现等，那个时候代码还是很少的。
  - 那个时候的代码是怎么写的呢？直接将代码写在<script>标签中即可
- 随着`ajax`异步请求的出现，慢慢形成了前后端的分离
  - 客户端需要完成的事情越来越多，代码量也是与日俱增。
  - 为了应对代码量的剧增，我们通常会将代码组织在多个js文件中，进行维护。
  - 但是这种维护方式，依然不能避免一些灾难性的问题
- 比如全局变量同名问题
- 另外，这种代码的编写方式对`js`文件的依赖顺序几乎是强制性的
  - 但是当`js`文件过多，比如有十几个的时候，弄清楚它们的顺序是一件比较困难的事情。
  - 而且即使你弄清楚顺序了，也不能避免上面出现的这种尴尬问题的发生。

### 匿名函数的解决方案

- 我们可以使用匿名函数来解决函数重名的问题

  - 在js文件中，我们使用匿名函数

    ```javascript
    (function(){
        var flag = true;
    })()
    ```

- 但是如果我们希望在`main.js`文件中用到flag，应该如何处理呢？
  - 显然，另外一个文件中不容易使用，因为flag是一个局部变量

### 使用模块作为出口

- 我们可以使用将需要暴露到外面的变量，使用一个模块作为出口，什么意思呢？

  ```javascript
  var ModuleA = (function(){
      // 1.定义一个对象
      var obj = {}
      // 2.在对象内部添加变量和方法
      obj.flag = true
      obj.myFunc = function(info){
          console.log(info);
      }
      // 3.将对象返回
      return obj
  })()
  ```

  ```javascript
  if(ModuleA.flag) {
      console.log('我调用了ModuleA的变量');
  }
  ModuleA.myFunc('我来修改它,嘻嘻');
  console.log(ModuleA);
  ```

- 我们做了什么事情呢？
  - 非常简单，在匿名函数内部，定义一个对象。
  - 给对象添加各种需要暴露到外面的属性和方法(不需要暴露的直接定义即可)。
  - 最后将这个对象返回，并且在外面使用了一个`ModuleA`接受
- 接下来，我们在`main.js`中怎么使用呢？
  - 我们只需要使用属于自己模块的属性和方法即可
- 这就是模块最基础的封装

- 常见的模块化规范：
  - `CommonJS 、AMD、CMD，也有ES6的Modules`

### `CommonJS`

- 模块化有两个核心：导出和导入

- `CommonJS`的导出：

  ```javascript
  module.exports = {
      flag: true,
      test(a,b){
          return a + b
      }
  }
  ```

- `CommonJS`的导入：

  ```javascript
  //Common模块
  let {flag, test} = require('moduleA');
  
  //等同于
  let _mA = require('moduleA');
  let flag = _mA.flag;
  let test = _mA.test;
  ```

### export基本使用

- export指令用于导出变量，比如下面的代码：

  ```javascript
  // info.js
  export let name = 'why'
  export let age = 18
  export let height = 1.88
  ```

- 上面的代码还有另外一种写法：

  ```javascript
  // info.js
  let name = 'why'
  let age = 18
  let height = 1.88
  export{name, age, height}
  ```

#### 导出函数或类

- 上面我们主要是输出变量，也可以输出函数或者类

  ```javascript
  export function test(content) {
      console.log(content);
  }
  export class Person{
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }
      run() {
          console.log(this.name + '在奔跑');
      }
  }
  ```

  ```javascript
  function test(content) {
      console.log(content);
  }
  class Person{
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }
      run() {
          console.log(this.name + '在奔跑');
      }
  }
  export {test, Person}
  ```

### `export default`

- 某些情况下，一个模块中包含某个的功能，我们并不希望给这个功能命名，而是让导入者可以自己来命名

  - 这个时候就可以使用`export default`

    ```javascript
    //info.js
    export default function() {
        console.log('default function')
    }
    ```

- 我们来到`main.js`中，这样使用就可以了

  - 这里的`myFunc`是我自己命名的

    ```javascript
    import myFunc from './info.js'
    
    myFunc()
    ```

- 另外，需要注意：

  - `export default`在同一个模块中，不允许同时存在多个。

### `import`使用

- 我们使用export指令导出了模块对外提供的接口，下面我们就可以通过`import`命令来加载对应的这个模块了。

- 首先，我们需要在HTML代码中引入两个`JS`文件，并且类型需要设置为`module`

  ```javascript
  <script src="info.js" type="module"></script>
  <script src="main.js" type="module"></script>
  ```

- import指令用于导入模块中的内容，比如`main.js`的代码

  ```javascript
  import {name, age, height} from "./info.js"
  console.log(name, age, height)
  ```

- 如果我们希望某个模块中所有的信息都导入，一个个导入显然有些麻烦：

  - 通过*可以导入模块中的所有的export变量

  - 但是通常情况下我们需要给*起一个别名，方便后续的使用

    ```javascript
    import * as info from './info.js'
    console.log(info.name, info.age, info.height, info.friends)
    ```

    