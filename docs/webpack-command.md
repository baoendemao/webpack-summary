* webpack -h
* webpack -v 查看webpack的版本
    * 在工程项目中，如何查看node_modules中安装的webpack的具体版本信息，因为package.json中对应的版本信息不具体，可以在 "scripts"字段中临时添加npm命令"webpack-version": "webpack -v", 之后通过"npm run webpack-version"这条命令来查看具体的webpack版本信息。
* webpack --config 指定配置文件  
    * 打包，在配置文件中指定entry和output
    * 默认的配置文件是webpack.config.js或者webpackfile.js
* webpack --watch
    * 检测文件系统的变化
* webpack-dev-server
    * 启动本地服务
    * 和webpack --watch一样的功能，需要使用npm安装
    ```
    npm install webpack-dev-server --save-dev

    可以在package.json中配置scripts，通过npm run dev来启动：
        "dev": "webpack-dev-server --hot --config build/webpack.config.js --progress ",
        
    其中--progress是指webpack打包的进度， --hot是指模块热更新。
    ```
    * webpack.config.js的配置
    ```
    devServer: {
        inline: true,
        progress: true,
        port: 9097,
        historyApiFallback: true,
        compress: true, 
        proxy: {         // 远程接口代理, 设置反向代理，解决跨域
            '/api': {
                target: 'http://xx.xx.xx.xx:xxxx',
                pathRewrite: {'^/api' : ''}
            }
        }
    },
    ```

