module.exports = {
    entry: './app.js',
    output: {
        filename: 'app-bundle.js'       
    },
    module: {  
        rules: [  
            {  
                test: /\.(css|scss)$/,  
                use: ['style-loader', 'css-loader', 'sass-loader' ] 
            },  
            {  
                test: /\.(png|jpg|gif|svg)$/,  
                use: [  
                    {  
                        loader: 'url-loader',  
                        options: {  
                            // 小于这个值的图片将被转行为base64编码的形式，且被打包到css里，而不是像其他图片一样通过http请求到浏览器
                            // 形如：url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQg...)
                            limit: '1024000'    
                        }  
                    },  
                    // {  
                    //     loader: 'file-loader',  
                    //     options: {
                    //         name: '[path][name].[ext]'
                    //     }
                    // }
                ]  
            }  
        ]  
    } 
}