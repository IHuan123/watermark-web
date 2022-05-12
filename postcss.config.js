// 可以require("postcss-preset-env") 引入 ，也可以直接写"postcss-preset-env" 自动引入，所有插件一样
module.exports = {
    plugins:[
        // require("postcss-preset-env"),
        'postcss-flexbugs-fixes', // 此插件用来修复flexbug的问题
        [
          'postcss-preset-env', // 包含了autoprefixer
          {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            // 规定按照哪个阶段的css来实现polyfill
            stage: 3, // 默认启用阶段2的功能
          },
        ],
        'postcss-normalize', // PostCSS归一化，可让您使用formantize.css或Sanitize.css的各个部分。
    ]
}