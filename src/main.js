import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 初始化覆盖浏览器默认的 user agent stylesheet
import './assets/css/init-argent-css.css';
// Element-ui 组件依赖
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// markdown-it 组件依赖
import VueMarkdownIt from 'vue3-markdown-it';
import 'github-markdown-css/github-markdown.css';
//import 'highlight.js/styles/github.css';
//import $ from 'jquery';
// 引入 mockjs 只有在 mock 模式下才会拦截
//import '../mock/index.js';
if (process.env.VUE_APP_MOCK === "true") require('../mock/index.js');

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueMarkdownIt);
app.mount('#app');

router.beforeEach((to,from,next) =>{
    if(to.meta.title){
        document.title = to.meta.title
    }
    next();
});
