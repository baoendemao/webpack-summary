* 入口文件entry和出口文件output
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
* 模块module
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