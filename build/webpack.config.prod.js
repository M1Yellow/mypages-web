const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');


// 读取公共配置文件
const dotenv = require('dotenv');
const env = dotenv.config({
  path: path.resolve(__dirname, '../.env'), // 配置文件路径
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
  // 性能优化
  optimization: {
    usedExports: true, // tree shaking，移除不需要的代码，生产环境会自动配置
    //nodeEnv: false, // webpack 不自动设置 NODE_ENV，在 DefinePlugin 中配置
    // 代码分离，将重复代码从打包的最终文件 main.js 中分离出来，避免重复加载，浪费性能
    // https://juejin.cn/post/7006650476158517256
    // https://webpack.docschina.org/plugins/split-chunks-plugin/
    runtimeChunk: 'single', // 为每个入口添加一个只含有 runtime 的额外 chunk
    splitChunks: {
      chunks: 'all', // 同步 or 异步，async是异步
      minSize: 20000, // 如果模块大小小于这个值，则不会被分割 20k
      minRemainingSize: 0, // 最小可保存大小，开发模式下为 0，其他情况下等于 minSize，一般不用手动配置
      minChunks: 1, // 如果模块被引用次数小于这个值，则不会被分割
      maxAsyncRequests: 30, // 异步模块，一次最多被加载的次数
      maxInitialRequests: 30, // 入口模块最多被加载的次数
      enforceSizeThreshold: 50000, // 强制分割的大小阈值 50k
      cacheGroups: { // 缓存组
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const allChunksNames = chunks.map((item) => item.name).join('~');
            let packageName = `${cacheGroupKey}-${allChunksNames}`;
            try {
              packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]; // Cannot read properties of null (reading '1')
            } catch (e) {
              // ignore
            }
            return `${packageName.replace('@', '')}`;
          }
        },
      },
    },
  },
});