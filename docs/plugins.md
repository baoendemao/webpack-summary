#### 常用plugins插件
* CommonsChunkPlugin
    * 提取公用代码，而不是每次加载一个页面，再重新加载
    * 用法
    ```
    module.exports = {
        // 多个entry的情况，业务代码和第三方
        entry: {
            app: './src/client-entry.js',
            vendor: ['vue', 'vue-router', 'vuex','vuex-router-sync', 'axios', 'es6-promise']
        },        
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/dist/',
            filename: '[name].[chunkhash].js'     
        },
        plugins: [
            // 会把所有入口文件的公共代码第三方库提取出来,生成一个vendor.js, 因为第三方库不经常变动
            new webpack.optimize.CommonsChunkPlugin({   
                name: 'vendor',
                minChunks: Infinity    // 表示webpack生成的代码也打包到vendor.js里
            })
        ]
    }
    
    // 支持new 多个CommonsChunkPlugin， 分别抽取打包到不同的文件中
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({   
            name: 'vendor',
            minChunks: (module, count) => (  // 引用 2 次以上的模块才打包到vendor.js
                count >= 2
            ),

        }),
        new webpack.optimize.CommonsChunkPlugin({   
            
        }),
        ...
    ]
    ```
* extract-text-webpack-plugin 
    * 从bundle中提取公共文本，如提取css， 生成单独的文件
* UglifyJsPlugin
    * 压缩JS， 打包后的体积变得更小
```
new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
    }
})
```