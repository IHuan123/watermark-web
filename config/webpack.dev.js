"use strict"
const { resolve } = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
module.exports = merge(common, {
    devtool: "source-map", //控制台提示信息映射
    devServer: {
        client: {
            // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            overlay: true,
            // 在浏览器中以百分比显示编译进度。
            progress: false,
            // 告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。
            reconnect: true,

        },
        static: {
            directory: resolve(__dirname, '../dist'),
            publicPath: '/',
            // watch: true,
        },
        port: 4000,
        historyApiFallback: {
            disableDotRule: true
        },
        proxy: { //反向代理，根据需求自行修改
            '/api':{
                target:"http://localhost:9000",
                pathRewrite:{ '/api':''}
            }
        },
        // open: true,  //自动打开浏览器
        compress: true, //压缩
        /**
         * 注意：webpack5 当配置entry有多个入口时，热更新会有问题
         * 解决：设置  optimization: {runtimeChunk: 'single'},可以解决
         */
        hot: true, //让webpackDevServer开启热更新功能
    },
    optimization: {runtimeChunk: 'single'},
    plugins: []
})