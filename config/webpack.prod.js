"use strict"
const { merge } = require('webpack-merge'); //引入配置文件合并工具
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); webpack V5支持不友好（改为css-minimizer-webpack-plugin）
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserJSPlugin = require("terser-webpack-plugin");
const common = require('./webpack.common.js'); //引入公共配置
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

//优化
// 除了生成 test.bundle.js，index.bundle.js 和 tools.bundle.js 之外，还生成了一个 runtime.bundle.js 文件。
const optimization = {
    moduleIds: 'deterministic',
    // 要在一个 HTML 页面上使用多个入口时，还需设置 optimization.runtimeChunk: 'single'
    runtimeChunk: 'single',  //运行时文件单独打包
    splitChunks: {
        // runtime 为了运行mian.js所要提供的代码。
        // node_modules venders 全局的
        // common模块间的 admin.js 和 index.js
        // self自身的
        cacheGroups: {
            vendor: {
                priority: 10, // 该配置项是设置处理的优先级，数值越大越优先处理
                minSize: 0, /* 如果不写 0，由于 React 文件尺寸太小，会直接跳过 */
                test: /[\\/]node_modules[\\/]/, // 为了匹配 /node_modules/ 或 \node_modules\
                name: 'vendors', // 文件名
                minChunks: 1,//同一个文件至少被多少个入口引用了
                chunks: 'all',  // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
                // 这三行的整体意思就是把两种加载方式的来自 node_modules 目录的文件打包为 vendors.xxx.js
                // 其中 vendors 是第三方的意思
            },
            common: {
                priority: 5,
                minSize: 0, 
                name: 'common',
                minChunks: 2, 
                chunks: 'all',  
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        },
    },

    // 这个新特性可以让我们来标识我们的代码有没有副作用。
    // sideEffects:true,
    // splitChunks: {
    //     // all 表示同步加载和异步加载，async 表示异步加载，initial 表示同步加载
    //     chunks: 'all',
    // }
}

module.exports = merge(common, {
    optimization: {
        ...optimization,
        // css-minimizer-webpack-plugin 这个插件用于压缩打包好的bundle文件的css代码，
        // terser-webpack-plugin 这个插件用于压缩打包好的bundle文件的js代码
        minimizer: [
            new TerserJSPlugin({}),
            new CssMinimizerPlugin({})
        ],//js压缩混稀
        // 合并模块
        concatenateModules:true,
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false },
            analyzerPort: 8118
        }),
    ]
});