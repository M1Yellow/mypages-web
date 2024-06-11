import {createApp} from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import md5 from 'js-md5';
import {Base64} from 'js-base64';
import GlobalConstant from '@/constant/GlobalConstant';
// 覆盖浏览器默认的 user agent stylesheet
import '@/assets/css/cover-agent-style.css';
// Element-ui 组件完整引入【全局搜索 <el- 发现用了很多组件，单个手动引入要改很多地方，暂时先完整引入】
import ElementPlus from 'element-plus';
// Element-ui 组件样式完整引入
import 'element-plus/dist/index.css';
// 自定义封装的 ElMessage
import {message} from '@/utils/resetMessage';
// markdown-it 组件依赖【在组件中单独引入】
//import MarkdownIt from 'markdown-it';
// github-markdown 样式
import 'github-markdown-css/github-markdown.css';
// 引入根元素 rem 自动调整
import '@/utils/rem';
// 引入自定义的SvgIcon组件
import SvgIcon from '@/components/SvgIcon';
import '@/assets/iconfont';
//console.log(process.env, '当前环境变量');
// 引入 mockjs 只有在 mock 模式下才会拦截
//import './mock/index.js';
if (process.env.VUE_APP_MOCK === "true") require('./mock/index.js');


/*
require和import分别使用在：
require 是赋值过程并且是运行时才执行，也就是异步加载。
require 可以理解为一个全局方法，因为它是一个方法所以意味着可以在任何地方执行。
import 是解构过程并且是编译时执行。
import 必须写在文件的顶部。

require和import的优缺点比较：
require的性能相对于import稍低，因为require是在运行时才引入模块并且还赋值给某个变量，
而import只需要依据import中的接口在编译时引入指定模块所以性能稍高。
*/


const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
//app.use(MarkdownIt);
app.component('svg-icon', SvgIcon); // 注册SvgIcon组件

// TODO 注意，mount 挂载之后，会生成 id="app" 的 div -> <div id="app" data-v-app="">，在 App.vue 组件就不用再重复加 id="app" 的 div
app.mount('#app');


// 设置全局变量
app.config.globalProperties.$md5 = md5;
app.config.globalProperties.$base64 = Base64;
app.config.globalProperties.$GlobalConstant = GlobalConstant;
app.config.globalProperties.$message = message;


// 标签栏标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
});
