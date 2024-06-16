const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');


// 使用 dotenv 设置环境变量，注意 dotenv 调用应该尽量靠前，在使用 process.env 之前调用
// https://juejin.cn/post/6917794798732574733
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
console.log(">>>> 公共环境变量.env:\n", env);

// 读取【开发环境】配置文件
const envDev = dotenv.config({
  path: path.resolve(__dirname, '../.env.development'),
}).parsed;
console.log(">>>> 开发环境变量.env.development:\n", envDev);

// 配置合并，同名属性会覆盖
const envConfig = {...env, ...envDev};
//console.log(">>>> 当前环境变量:\n", process.env);
// mode 配置会自动设置 NODE_ENV，删除 NODE_ENV 属性，防止 DefinePlugin 属性冲突警告
delete envConfig.NODE_ENV;


module.exports = merge(baseConfig, {
  mode: 'development', // 会自动设置 process.env.NODE_ENV='development'
  // https://webpack.js.org/configuration/devtool/#development
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: process.env.VUE_APP_SERVER_PORT,
    hot: true, // 热模块替换/热加载，默认true
    //historyApiFallback: true, // 解决history路由404问题
    //historyApiFallback: { index: '/catharsist/'},
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
      'process.env': JSON.stringify(envConfig), // TODO 一定要先看官方文档啊！！！就添加 JSON.stringify 的事，到处找资料，坑了一天！
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
      cacheGroups: {
        vendor: { // cacheGroupKey
          test: /[\\/]node_modules[\\/]/,
          /*
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          */
          // https://segmentfault.com/a/1190000040006212
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
        
        /*
        // 包括整个应用程序中 node_modules 的所有代码。
        vendor: {
          name: "vendor",
          chunks: "all",
          priority: 20, // 优先级
          test: /[\\/]node_modules[\\/]/
        },
        // 包括入口（entry points）之间所有共享的代码
        commons: {
          name: "commons",
          chunks: "initial",
          priority: 10,
          minSize: 0,
          // 至少被两个chunk共享才分离
          minChunks: 2
        }
        */
      },
    },
  },
});