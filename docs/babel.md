#### 为什么需要babel
* babel是一个js编译器，因为ES6在浏览器和node端的支持不好，它可以将ES6编译成兼容绝大多数的主流浏览器的ES5代码
#### 如何在本地配置babel编译环境  （demo: demos/demo-babel/babel-1）
* npm包
```
// 初始化package.json
npm init    
// 安装babel所需要的包
npm install babel-core babel-preset-es2015  babel-preset-latest babel-plugin-transform-runtime --save
```
* .babelrc文件
```
{
    "presets": [ "es2015", "latest" ],
    "plugins": [ "transform-runtime" ],
    "comments": false
}
```
* 本地使用babel命令编译ES6
```
// 安装babel工具
wl@wangli: ~/front-end/baoendemao-github/javascript-summary/demos/demo-babel $ npm install babel-cli --global

// map中的箭头函数编译成了ES5的function 
wl@wangli: ~/front-end/baoendemao-github/javascript-summary/demos/demo-babel $ babel babel-1/index.js
"use strict";

[1, 2, 3, 4].map(function (value) {
    console.log(value);
});
```
#### 如何在webpack中配置babel环境
* 在webpack中，需要对应的loader来处理js，这里ES6编译的对应loader是babel-loader。所以除了npm包和.babelrc文件，还需要在webpack.config.js添加：
```
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }, 
        ]
    }
```