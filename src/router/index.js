import {createRouter, createWebHistory} from "vue-router";
import Login from '@/views/login/index';
import Home from '@/views/home/index';
import NotFound from '@/views/404/index';

const routes = [
    {
        name: "login",
        path: "/login",
        meta: {
            title: "登录",
            keepAlive: false // 不需要缓存
        },
        component: Login
    },
    {
        name: "home",
        path: "/mypages", // TODO 二级目录
        meta: {
            title: "MyPages 我的主页我定义",
            keepAlive: true
        },
        component: Home
    },
    //{path: '/:catchAll(.*)', redirect: '/'},
    {
        name: "404",
        //path: "*", // vue 2 的写法
        //path: "/:catchAll(.*)", // Cannot GET /mypages-web，匹配不到这里
        path: '/:pathMatch(.*)*',
        //path: "/:notFound",
        meta: {
            title: "404 Not Found",
            keepAlive: true
        },
        component: NotFound
    }
];


const router = createRouter({
    history: createWebHistory(),
    //history: createWebHistory(process.env.BASE_URL), // 如果没有在vue.config.js里面设置publicPath；那么process.env.BASE_URL默认就是根路径 ：/ 
    routes
});

export default router;
