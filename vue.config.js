// 详细配置参考：https://cli.vuejs.org/zh/config/

//const webpack = require('webpack');
module.exports = {
    publicPath: "/mypages", // TODO 部署二级路径项目时配置
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
            title: 'mypages',
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
        requireModuleExtension: true, // 启用 CSS modules for all css / pre-processor files.
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 16, // 换算基数
                        unitPrecision: 5, // 允许REM单位增长到的十进制数字，小数点后保留的位数。
                        propList: ['*'], // 哪些需要进行px转rem
                        //exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                        //selectorBlackList: ['.van'], // 要忽略并保留为px的选择器，'.van': vant ui; 'weui-': .weui-button
                        mediaQuery: false,  //（ 布尔值）允许在媒体查询中转换px。
                        //minPixelValue: 2 // 最小转换，如低于这个值，不会转换为 rem
                    })
                ]
            }
        }
    },
    // 开发环境配置，只在本地开发环境生效
    devServer: {
        //host: "localhost",
        //host: require('ip').address(),
        host: '0.0.0.0',
        port: process.env.VUE_APP_SERVER_PORT,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
        proxy: {
            // 配置跨域
            [process.env.VUE_APP_CROS_API]: {
                target: process.env.VUE_APP_SERVER_API,
                ws: true,
                changeOrigin: true, // 设置允许跨域
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
    },
};
