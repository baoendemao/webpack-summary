### webpack4的变化
#### 优势：零配置、打包速度优化
#### 新增mode字段
mode有三种取值：development, production, none。webpack根据mode的值不同，采用不同的内置默认配置。<br/>
* mode取值development，会默认开启NamedChunksPlugin和NamedModulesPlugin
```
// webpack.development.config.js
module.exports = {
+ mode: 'development'
- plugins: [
-   new webpack.NamedModulesPlugin(),
-   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
- ]
}
```

* mode取值production，会默认开启FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin和UglifyJsPlugin

```
// webpack.production.config.js
module.exports = {
+  mode: 'production',
-  plugins: [
-    new UglifyJsPlugin(/* ... */),
-    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
-    new webpack.optimize.ModuleConcatenationPlugin(),
-    new webpack.NoEmitOnErrorsPlugin()
-  ]
}
```

* mode取值none

```
// webpack.custom.config.js
module.exports = {
+  mode: 'none',
-  plugins: [
-  ]
}
```

* 配置方法
    * 在npm的scripts里直接"webpack --mode development"
    * 在webpack的config文件里： mode: "development"

#### 需要单独安装webpack-cli

```
// 错误信息：
One CLI for webpack must be installed. These are recommended choices, delivered as separate packages

// 解决：
npm install webpack-cli --save-dev
```