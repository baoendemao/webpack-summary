### webpack4

#### 优势：零配置、打包速度优化
通过这次webpack的升级（从webpack 2.7.0升级到了 webpack 4.12.0），
client端的打包时间从31991ms减小到了13311ms，server端的打包时间从11344ms减小到了9371ms。
本篇文章主要介绍webpack4的变化以及在webpack4的升级过程中遇到的问题。

#### node版本
webpack4将不再支持node4, 最低支持的node版本为6.11.5
#### js不再是唯一的webpack可处理的类型
webpack4支持5种模块类型：<br/>
* javascript/auto: webpack 4之前支持的默认类型，支持所有的JS模块系统：CommonJS、AMD、ESM
* javascript/esm: EcmaScript 模块，在其他的模块系统中不可用，默认为.mjs文件
* javascript/dynamic: 仅支持 CommonJS & AMD，EcmaScript模块不可用
* json: 可通过 require 和 import 导入的 JSON 格式的数据，默认为 .json 的文件
* webassembly/experimental: WebAssembly 模块，处于试验阶段，默认为.wasm的文件


#### webpack4新增mode字段
mode有三种取值：development, production, none。webpack根据mode的值不同，采用不同的内置默认配置。<br/>
* mode取值development，会默认开启NamedChunksPlugin和NamedModulesPlugin
```
// webpack.development.config.js
module.exports = {
  mode: 'development'
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

* mode取值production，会默认开启FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin和UglifyJsPlugin

```
// webpack.production.config.js
module.exports = {
   mode: 'production',
   plugins: [
     new UglifyJsPlugin(/* ... */),
     new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
     new webpack.optimize.ModuleConcatenationPlugin(),
     new webpack.NoEmitOnErrorsPlugin()
   ]
}
```

* mode取值none

```
// webpack.custom.config.js
module.exports = {
   mode: 'none',
   plugins: [
   ]
}
```

* 配置方法
    * 在npm的scripts里直接"webpack --mode development"
    * 在webpack的config文件里： mode: "development"

* 如果没有设置mode为development或者production， 会报错：
```
错误信息
WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
```


#### 需要单独安装webpack-cli
* 在webpack4中，webpack-cli不作为webpack的依赖了，需要单独分别安装webpack和webpack-cli

```
// 升级webpack4的过程中如果不安装webpack-cli，会报出错误信息：
One CLI for webpack must be installed. These are recommended choices, delivered as separate packages

// 解决：
npm install webpack-cli --save-dev
```
#### extract-text-webpack-plugin
* 现在没有支持webpack4的稳定版本，如果要升级webpack4，需要安装其next版本
```
// 错误信息
xxx.vue ： Module parse failed: Unexpected token (96:1)
You may need an appropriate loader to handle this file type.

// 解决：使用 4.0 beta 版，npm install --save-dev extract-text-webpack-plugin@next
const ExtractTextPlugin = require('extract-text-webpack-plugin');
if (process.env.NODE_ENV === 'production') {
    // 配置loader
    vueConfig.loaders = [{      
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'vue-style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }
    ],

    // 配置plugins
    config.plugins.push(
        new ExtractTextPlugin({filename: 'styles.[hash].css'})
    )
};

```
#### 不需要特别指定UglifyJsPlugin 
```
// 错误信息
Error: webpack.optimize.UglifyJsPlugin has been removed, please use config.optimization.minimize instead.
```
只要在生产环境下，指定mode是production会自动压缩：script里指定 "build": "webpack --mode production"

#### style-loader报错
```
// 错误信息
style-loader Error in beforeCreate hook: "ReferenceError: window is not defined
```
style-loader换成vue-style-loader

#### res.sendFile报错
```
// 错误信息
 GMT express deprecated res.sendfile: Use res.sendFile instead at server.js:113:21


解决方法：
    res.status(500).sendfile(resolve('./assets/error/500.html'));
改成
    res.status(500).sendFile(resolve('./assets/error/500.html'));

```

#### System.import() 报错
```
// 错误信息
 System.import() is deprecated and will be removed soon. Use import() instead.

// 解决方法
const Detail = process.BROWSER ? () => System.import('./views/xxx/detail.vue') : require('./views/xxx/detail.vue');
改成：
const Detail = process.BROWSER ? () =>  import('./views/xxx/detail.vue').then(m => m.default) : require('./views/xxx/detail.vue').default;
```

#### background的background-gradient报错
```
// 错误信息
(Emitted value instead of an instance of Error) autoprefixer: xxx.vue:61:5: Gradient has outdated direction syntax. New syntax is like `to left` instead of `right`.

解决方法：

    background: linear-gradient(left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 30%);
改成：
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 30%);
```

#### 不允许省略-loader扩展名
```
// 错误信息
ERROR in ./xxx.vue
Module not found: Error: Can't resolve 'style' in 'yyy.com'
BREAKING CHANGE: It's no longer allowed to omit the '-loader' suffix when using loaders.
                 You need to specify 'style-loader' instead of 'style',
                 see https://webpack.js.org/migrate/3/#automatic-loader-module-name-extension-removed
 @ ./xxx.vue 4:0-84
 @ ./node_modules/_babel-loader@7.1.4@babel-loader/lib!./node_modules/_vue-loader@15.2.4@vue-loader/lib??vue-loader-options!./src/views/index/index.vue?vue&type=script&lang=js
 @ ./src/views/index/index.vue?vue&type=script&lang=js
 @ ./src/views/index/index.vue
 @ ./src/router.js
 @ ./src/app.js
 @ ./src/client-entry.js
 @ multi webpack-hot-middleware/client ./src/client-entry.js


解决方法：           
{ test: /\.scss$/, loader: 'style!css!autoprefixer!sass'},改为：加上loader不简写
在配置loader时，官方不再允许省略-loader扩展名，loader的配置写法上将逐步趋于严谨。

 module: {
   rules: [
            { test: /\.vue$/, loader: 'vue-loader' }, 
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}, 
            { test: /\.scss$/, use: [
                {loader: 'vue-style-loader'}, 
                {loader: 'css-loader'}, 
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: (loader) => [
                            require('autoprefixer')({
                                browsers: ['last 3 versions']
                            })  
                        ]
                    }
                },
                {loader: 'sass-loader'}
            ]},
```

#### Cannot find module 'which'
```
// 错误信息
Error: Cannot find module 'which'
    at Function.Module._resolveFilename (module.js:543:15)
    at Function.Module._load (module.js:470:25)
    at Module.require (module.js:593:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> 
    at Module._compile (module.js:649:30)
    at Object.Module._extensions..js (module.js:660:10)
    at Module.load (module.js:561:32)
    at tryModuleLoad (module.js:501:12)
    at Function.Module._load (module.js:493:3)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! xxxx.com dev: `cross-env NODE_ENV=development APP_CONF=dev node server`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the xxx.com dev script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

```
解决方法：删除node_modules，重新install

#### CommonsChunkPlugin在webpack4中被移除
webpack4移除的4个plugin分别是：CommonsChunkPlugin，UglifyjsWebpackPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin。CommonsChunkPlugin改用optimization.splitChunks和optimization.runtimeChunk替代。
```
解决方法：
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'})
改成
    new webpack.optimize.SplitChunksPlugin({
        cacheGroups: {
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            },
            //打包重复出现的代码
            vendor: {
                chunks: 'initial',
                minChunks: 2,
                maxInitialRequests: 5, // The default limit is too small to showcase the effect
                minSize: 0, // This is example is too small to create commons chunks
                name: 'vendor'
            },
            //打包第三方类库
            commons: {
                name: "commons",
                chunks: "initial",
                minChunks: Infinity
            }
        }
    }),
    new webpack.optimize.RuntimeChunkPlugin({
        name: "manifest"
    }),
```

#### NoErrorsPlugin不再支持
```
// 错误信息
TypeError: webpack.NoErrorsPlugin is not a constructor
```
修改成： new webpack.NoEmitOnErrorsPlugin()

#### vue-loader
```
// 错误信息
vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
```
webpack4推荐使用了最新版本的vue-loader（"vue-loader": "^15.0.10"），但是15版本的vue-loader需要在webapck config文件中设置VueLoaderPlugin插件，否则会报上面的错误。

解决方法：
```
const VueLoaderPlugin = require('vue-loader');

module.exports = {
    ...
    plugins: [
        // 添加VueLoaderPlugin，以响应vue-loader
        new VueLoaderPlugin()
  ],
    ...
}
```