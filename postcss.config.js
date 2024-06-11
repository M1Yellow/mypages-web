// postcss-loader 会自动加载
module.exports = {
    plugins: [
        require('postcss-pxtorem')({
            rootValue: 16, // 换算基数，16px=1rem。结果为：设计稿元素尺寸/16，比如元素宽320px，最终页面会换算成 20rem
            unitPrecision: 5, // 允许REM单位增长到的十进制数字，小数点后保留的位数。
            propList: ['*'], // TODO 哪些需要进行px转rem。项目本身、UI组件
            //exclude: /(node_module)/, // 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            //exclude: /node_modules/i, // 不处理node_modules文件夹下的内容
            //selectorBlackList: ['.van'], // 要忽略并保留为px的选择器，'.van': vant ui; 'weui-': .weui-button
            mediaQuery: false,  //（ 布尔值）允许在媒体查询中转换px。
            //minPixelValue: 2 // 最小转换，如低于这个值，不会转换为 rem
        })
    ]
}