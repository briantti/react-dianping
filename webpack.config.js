let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let OpenBrowserPlugin = require('open-browser-webpack-plugin');


module.exports = {
    entry: path.resolve('app/index.js'),
    output: {
        path:__dirname + "/build",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  presets: ['react', 'es2015']
                }
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: 'style!css!postcss!less'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!css!postcss'
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                loader: 'url-loader?limit=5000'
            },  // 限制大小5kb
            {
                test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
                loader: 'url-loader?limit=5000'
            },// 限制大小小于5k
        ]
    },

    resolve: {
        extensions: ['', '.json', '.js', '.jsx', '.css']
    },

    postcss:[
        require('autoprefixer') //调用autoprefixer插件，例如 display: flex
    ],

    devtool: 'eval-source-map',

    devServer: {
        proxy: {
            // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
            // koa 代码在 ./mock 目录中，启动命令为 npm run mock
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        contentBase: "./build",
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    },

    plugins:[
        // html 模板插件
        new HtmlWebpackPlugin({
            template: 'app/index.tmpl.html'
        }),

        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // 打开浏览器
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ]

};