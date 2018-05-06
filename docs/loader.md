#### css-loader  [demo点这里](https://github.com/baoendemao/webpack-summary/tree/master/demos/demo-loader)
* 使得webpack可以识别css来打包
* css-loader可以解析css文件中的@import，来实现在入口文件app.js中require css文件的功能，

#### style-loader
* style-loader将所有的计算好的样式加入自创建的style标签，并放到页面的header中。

#### file-loader
* 如果不使用file-loader，样式中的background引入会找不到图片，file-loader可以帮助解决诸如此类的url解析引入的问题。

#### url-loader
* url-loader封装了file-loader，因此可以只指定url-loader来处理图片。除了具备file-loader的功能，并且可以指定options，小于limit值的图片将被转为base64编码的形式，并打包到css中，而不是像其他图片一样通过Http请求到浏览器，减少了Http请求数。

#### sass-loader
* 加载sass或者scss文件，并编译成css

#### postcss-loader和autoprefixer

```
npm install autoprefixer postcss-loader --save

{
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: (loader) => [
            require('autoprefixer')()    // 自动添加浏览器前缀
        ]
    }
}

```