// 详细配置参考：https://cli.vuejs.org/zh/config/

//const webpack = require('webpack');
module.exports = {
  publicPath: "/", // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: "dist", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: "", //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  pages: {
    //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      //除了 entry 之外都是可选的
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    //subpage: 'src/subpage/main.js'
  },
  lintOnSave: true, // 是否在保存的时候检查
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件，如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  css: {
    extract: true, // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: false, // 是否为 CSS 开启 source map，设置为 true 之后可能会影响构建的性能。
    loaderOptions: {}, // css预设器配置项
    requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
  },
  devServer: {
    // 环境配置
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {
      // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
      "/api": {
        target: "<url>",
        ws: true,
        changeOrigin: true
      },
      "/foo": {
        target: "<other_url>"
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
  },
  /*
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ]
  },
  */
  pluginOptions: {
    // 第三方插件配置
    // ...
  }
};
