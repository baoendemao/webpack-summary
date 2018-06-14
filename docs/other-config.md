* devtool: 'source-map'
    * webpack将文件打包成一个个的bundle, 如果某个文件出错，将很难去追踪到底是哪一行出错。source-map解决了这一问题, 可以直接在控制台追踪到源代码的出错行。
* target 默认为web
```
target: node     // webpack将会在nodejs的环境中编译，主要在server端的config文件中配置
```
