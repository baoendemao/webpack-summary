* 入口文件entry和出口文件output
    * entry: 打包入口
    * output: 打包生成的文件名字，以及生成路径

```

module.exports = {
    entry: './src/client-entry.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js'       
    }
}

```
</br>

* 模块module
    * webpack将每个文件都作为模块，如js，css，png等，但是webpack只认识javascript，所以其他的资源需要对应的loader来处理。 
    如scss对应的loader是sass-loader，图片对应的loader是url-loader，es6对应的loader是babel-loader。
    这些loader都会在webpack打包之前，对相应的资源进行编译处理，且这些loader需要配置在module.rules属性里：

```

module.exports = {
    module: {
        rules: [
            // node_modules第三方文件不需要babel-loader编译, 所以使用exclude排除
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },   
            { test: /\.scss$/, loader: 'style!css!autoprefixer!sass'},
            { test: /\.(png|jpg|gif|svg)$/, loader: 'url', options: { limit: 10000, name: '[name].[ext]?[hash]' } }
        ]
    }
}

```

* 插件plugins
    * 常用插件
        * CommonsChunkPlugin    提取 chunks 之间共享的通用模块
    * 插件定义在plugins属性里

    ```
    module.exports = {
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
            })
        ]
    }
    

    ```