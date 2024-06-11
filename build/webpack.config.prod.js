const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// 读取公共配置文件
const dotenv = require('dotenv');
const env = dotenv.config({
  path: path.resolve(__dirname, '../.env'), // 配置文件路径
  encoding: 'utf8', // 编码方式，默认utf8
  debug: false, // 是否开启debug，默认false
  override: true, // 是否覆盖原有属性，默认true
}).parsed;
if (!env) {
  console.log('配置文件加载失败');
  process.exit(1); // 退出程序
}

// 读取【生产环境】配置文件
const envProd = dotenv.config({
  path: path.resolve(__dirname, '../.env.production'),
}).parsed;

// 配置合并，同名属性会覆盖
const envConfig = {...env, ...envProd};
// mode 配置会自动设置 NODE_ENV，删除 NODE_ENV 属性，防止 DefinePlugin 属性冲突警告
delete envConfig.NODE_ENV;


module.exports = merge(baseConfig, {
  mode: 'production', // 会自动设置 process.env.NODE_ENV='production'
  // https://webpack.js.org/configuration/devtool/#production
  //devtool: false,
  devtool:  'nosources-source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ // 由下往上调用执行
          MiniCssExtractPlugin.loader, // 生产环境会自动压缩，不用额外配置
          //'style-loader', // 开发环境不处理，加快响应速度
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
        generator: {
          filename: 'css/[name]-[contenthash:8].css',
          chunkFilename: 'css/chunk-[name]-[contenthash:8].css',
        },
      },
    ],
  },
  devServer: {
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: process.env.VUE_APP_SERVER_PORT,
    hot: true, // 热模块替换/热加载，默认true
    //historyApiFallback: true, // 解决history路由404问题
    open: true, // 配置自动启动浏览器
    //compress: true, // 开启 gzip 压缩
    proxy: [
      {
        context: process.env.VUE_APP_CROS_API,
        target: process.env.VUE_APP_SERVER_API,
        ws: true, // proxy websockets
        changeOrigin: true, // 设置允许跨域
        secure: false, // 默认情况下不接受将请求转发到https的api服务器上，如果希望支持，可以设置为false
        pathRewrite: {
          /*
          这个重写不可省略！因为真正请求的地址并不含 /api
          当在浏览器控制台中看到请求的地址为：http://localhost:8080/api/data/getdata 时，因为重写了 /api，
          所以实际上访问的地址是：http://x.x.x.x:x/data/getdata
          */
          //'^/api': ''
          ['^' + process.env.VUE_APP_CROS_API]: ''
        }
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envConfig),
    }),
  ],
});