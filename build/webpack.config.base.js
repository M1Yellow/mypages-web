const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


// https://webpack.js.org/configuration/
module.exports = {
  entry: { // 入口起点
    index: path.resolve(__dirname, '../src/main.js'),
  },
  // build 构建打包输出
  output: {
    //publicPath: '',
    publicPath: '/mypages', // TODO 部署二级路径项目时配置，注意，配置 /mypages/ 的话必须全匹配才能访问
    filename: 'assets/js/[name]-[contenthash:8].js', // bundle捆绑好的最终文件命名，name contenthash为webpack提供的变量
    path: path.resolve(__dirname, '../mypages-web'), // 编译生成的文件存放地址
    clean: true, // 清除构建输出目录，5.20.0+ 才可以使用
    chunkFilename: 'assets/js/chunk-[name]-[contenthash:8].js', // 非初始化chunk数据块文件命名，默认 [id].js
  },
  // https://webpack.docschina.org/configuration/node/
  node: {
    //fs: 'empty', // webpack 5 不支持这样写了，在下方 resolve fallback 中添加
    //net: 'empty',
    //tls: 'empty',
  },
  resolve: {
    // 不被打包输出的文件
    extensions: ['.js', '.json', '.vue'], // 省略拓展名，默认值为 ['.wasm', '.mjs', '.js', '.json']
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    fallback: {
      fs: false,
      path: false,
    },
  },
  module: {
    rules: [
      // vue文件
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      // 图片文件
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/,
        type: "asset", // asset/resource
        generator: {
          filename: "assets/images/[name]-[hash][ext]",
        },
      },
      // 字体文件
      {
        test: /\.(eot|svg|ttf|woff2?|)$/,
        type: "asset", // asset/inline、asset/resource
        generator: {
          filename: "assets/fonts/[name]-[hash][ext]",
        },
      },
      // 文本文件
      {
        test: /\.(txt|xml)$/i,
        type: "asset", // asset/source
        generator: {
          filename: "assets/[name]-[hash][ext]",
        },
      },
      {
        //test: /\.(css|scss|sass)$/,
        test: /\.(sa|sc|c)ss$/,
        use: [ // 由下往上调用执行
          MiniCssExtractPlugin.loader, // 将 CSS 提取到单独的文件中
          //'style-loader', // 开发环境不处理，加快响应速度
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        generator: {
          filename: 'assets/css/[name]-[contenthash:8].css',
          chunkFilename: 'assets/css/chunk-[name]-[contenthash:8].css',
        },
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        generator: {
          filename: 'assets/js/[name]-[contenthash:8].js',
          chunkFilename: 'assets/js/chunk-[name]-[contenthash:8].js',
        },
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    //new CleanWebpackPlugin(), // webpack5 之前的清理方式
    new HtmlWebpackPlugin({
      template: 'src/assets/index.html', // 主页模板文件，路径相对项目根目录
      filename: 'index.html', // 主页文件名称
      title: 'mypages', // html title
      inject: true
    }),
    new VueLoaderPlugin(),
    //new ProgressBarPlugin(), // 控制台编译可查看到进度
    new MiniCssExtractPlugin({ // webpack 5 生产环境打包自动压缩，不用配置
      filename: 'assets/css/[name]-[contenthash:8].css',
      chunkFilename: 'assets/css/chunk-[name].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      // from后的路径是相对于项目的根目录，to后的路径是相对于打包后的dist目录，不写就是dist目录
      //patterns: [{from: path.resolve(__dirname, "../public"), to: path.resolve(__dirname, "assets")}],
      patterns: [{from: path.resolve(__dirname, "../public/favicon.ico")}],
    }),
    // 解决控制台警告提示：Feature flags __VUE_OPTIONS_API__ ...
    new webpack.DefinePlugin({
      // 是否开启 options API，学习Vue3之后我们知道，以前我们学习vue主要是options语法，Vue3新增了setup语法（推荐）
      __VUE_OPTIONS_API__: true,
      // 生产环境是否支持DEVTOOLS
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    }),
    // 压缩成 .gz 文件【测试环境不会压缩】
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ],
}
