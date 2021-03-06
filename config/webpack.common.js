"use strict";
const { resolve } = require("path");
const srcPath = resolve(__dirname, "../src");
const { ProgressPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
console.log("当前环境:", process.env.NODE_ENV);
const isProd = process.env.NODE_ENV === "production";
const cssLoader = [
  // fallback to style-loader in development
  isProd ? MiniCssExtractPlugin.loader : "style-loader",
  {
    // css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样。
    loader: "css-loader",
    options: {
      // 启用/禁用@import规则进行处理，控制@import的解析，默认值为true
      import: true,
      // importLoaders 选项允许你配置在 css-loader 之前有多少 loader 应用于 @imported 资源与 CSS 模块/ICSS 导入。
      importLoaders: 2,
      // 启用/禁用css模块或者icss及其配置
      modules: {
        mode: "icss",
        // 允许配置生成的本地标识符(ident)
        // 建议：开发环境使用 '[path][name]__[local]'  生产环境使用 '[hash:base64]'
        localIdentName: "[path][name]__[local]--[hash:base64:5]",
        // 允许为本地标识符名称重新定义基本的 loader 上下文。
        // localIdentContext: resolve(__dirname, "src"),
      },
      sourceMap: true,
    },
  },
  {
    //使用postcss.config.js作为配置文件
    loader: "postcss-loader",
  },
  {
    loader: "sass-loader",
    options: {
      // 引入全局scss变量
      additionalData: `
              $env: ${process.env.NODE_ENV};
              @import "sass/_var.scss";
            `,
      sassOptions: {
        includePaths: [__dirname], //基于当前目录
      },
    },
  },
];
//js ts loader
const jsLoader = [
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    include: resolve(__dirname, "../src"),
    use: [
      "babel-loader",
    ],
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules|bower_components)/,
    include: resolve(__dirname, "../src"),
    use: [

      "babel-loader",
      "ts-loader",
    ],
  },
];

// 插件
function handlePlugin() {
  const plugins = [
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../public/index.html"),
      favicon: resolve(__dirname, "../public/video.ico"), //指定网站图标
      title: "cli",
      filename: "index.html",
      inject: "head",
      chunks: ["index"],
      minify: {
        // removeTagWhitespace: true,
        // collapseWhitespace: true
      },
    }),
  ];
  //webpack V5 hash改为fullhash ，不然会提示 [DEP_WEBPACK_TEMPLATE_PATH_PLUGIN_REPLACE_PATH_VARIABLES_HASH]的警告
  isProd &&
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "static/style/[name][fullhash:4].css",
      })
    );
  return plugins;
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: resolve(srcPath, "index.tsx"),
  },
  output: {
    path: resolve(__dirname, "../dist"),
    filename: "js/[name].build.js",
    publicPath: "/",
  },
  // 用来设置引用模块
  resolve: {
    //可以不加后缀就可以引用
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    //路由重命名
    alias: {
      "@": srcPath,
    },
  },
  externals: {
    Player: "xgplayer",
  },
  //警告 webpack 的性能提示
  performance: {
    hints: "warning",
    //入口起点的最大体积
    maxEntrypointSize: 50000000,
    //生成文件的最大体积
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js");
    },
  },

  module: {
    // 将缺失的导出提示成错误而不是警告
    strictExportPresence: true,
    rules: [
      ...jsLoader,
      {
        oneOf: [
          {
            test: /\.(css|scss)$/,
            use: cssLoader,
          },
          {
            test: /\.(png|jpg|gif|jpeg|svg)$/,
            type: "asset",
            exclude: /(asstes\/icon)/,
            //解析
            parser: {
              //转base64的条件
              dataUrlCondition: {
                maxSize: 8 * 1024, // 8kb
              },
            },
            generator: {
              //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
              filename: "static/images/[name].[hash:6][ext]",
              //打包后对资源的引入，文件命名已经有static了
              publicPath: "/",
            },
          },
          {
            test: /\.html$/,
            loader: "html-loader",
            options: {
              esModule: false,
            },
          },
          // webpack5 中不使用url-loader
          // {
          //   test: /\.(png|jpg|gif|jpeg|svg)$/,
          //   loader: "url-loader",
          //   options: {
          //     limint: 8 * 1024,
          //     esModule: false,
          //   },
          //   exclude: /(asstes\/icon)/,
          //   type: "javascript/auto", //转换 json 为 js
          // },
          {
            test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: /(asstes\/icon)/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: handlePlugin(),
};
