#### 入口文件entry和出口文件output  
* entry: 打包入口。 可以有一个或者多个。
* output: 打包生成的文件名字，以及目标输出目录。

```
// 一个entry的写法：
module.exports = {
    entry: './src/client-entry.js',
    output: {
        // 后面生成的文件名字为[name].[chunkhash].js将生成在dist目录中
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',           

        // name即是entry里的name 
        // 使用Hash来命名文件，实现文件缓存的功能。当文件内容发生变化，文件名会随之改变。
        filename: '[name].[chunkhash].js'     
    }
}

// 单页面应用
module.exports = {
    entry: {
        app: './src/client-entry.js',    // 单页面应用的入口点，不算下面的vendor
        vendor: './src/vendors.js'       // CommonsChunkPlugin提取的第三方代码
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',             
        filename: '[name].[chunkhash].js'      
    }
}

// 多页面应用
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};

```
</br>

#### 运行例子 [demo点这里](https://github.com/baoendemao/webpack-summary/tree/master/demos/demo-entry-output)

```
wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-entry-output $ ls
app-bundle.js           app.js                  webpack.config.js

wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-entry-output $ cat webpack.config.js
module.exports = {
    entry: './app.js',
    output: {
        filename: 'app-bundle.js'
    }
}

// webpack --config 指定配置文件  
// 默认的配置文件是webpack.config.js或者webpackfile.js
wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-entry-output $ webpack
Hash: da7b56faafd34e18a699
Version: webpack 4.7.0
Time: 254ms
Built at: 2018-05-05 23:59:14
        Asset       Size  Chunks             Chunk Names
app-bundle.js  587 bytes       0  [emitted]  main
Entrypoint main = app-bundle.js
[0] ./app.js 75 bytes {0} [built]


wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-entry-output $ webpack --config webpack.config.js
Hash: da7b56faafd34e18a699
Version: webpack 4.7.0
Time: 286ms
Built at: 2018-05-05 23:59:17
        Asset       Size  Chunks             Chunk Names
app-bundle.js  587 bytes       0  [emitted]  main
Entrypoint main = app-bundle.js
[0] ./app.js 75 bytes {0} [built]


wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-entry-output $ node dist/app-bundle.js
result is: 3

```
<br/>
新建index.html，导入打包好的app-bundle.js
<br/>

```
index.html: 
<body>
    <script src="./dist/app-bundle.js"></script>
</body>

wl@wangli: ~/front-end/baoendemao-github/webpack-summary/demos/demo-entry-output $ http-server
可以在控制台中看到result is: 3

```
