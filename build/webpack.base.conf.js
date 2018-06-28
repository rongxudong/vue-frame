'use strict'
const webpack = require("webpack")
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

// const createLintingRule = () => ({
//     test: /\.(js|vue)$/,
//     loader: 'eslint-loader',
//     enforce: 'pre',
//     include: [resolve('src'), resolve('test')],
//     options: {
//       formatter: require('eslint-friendly-formatter'),
//       emitWarning: !config.dev.showEslintErrorsInOverlay
//     }
// })

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        // webpack输出的目标文件夹路径（例如：/dist）
        path: config.build.assetsRoot,
        // webpack输出bundle文件命名格式，基于文件的md5生成Hash名称的script来防止缓存
        filename: '[name].js',
        // webpack编译输出的发布路径(判断是正式环境或者开发环境等)
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
        })
    ],
    resolve: {
        // 自动解析确定的拓展名,使导入模块时不带拓展名
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            // ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                // query是对loader做额外的选项配置,关于query 仅由于兼容性原因而存在。请使用 options 代替。
                options: {
                    limit: 10000,//图片小于10000字节时以base64的方式引用
                    name: utils.assetsPath('img/[name].[hash:7].[ext]') //文件名为name.7位hash值.拓展名
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
