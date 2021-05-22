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
        path: "/",
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
        path: "/:catchAll(.*)", // vue 3
        meta: {
            title: "404 Not Found",
            keepAlive: true
        },
        component: NotFound
    }
];

/*
const scrollBehavior = function(to, from, savedPosition) {
  //console.log('to: ', to);
  //console.log('from: ', from);
  if (savedPosition) {
    return new Promise((resolve, reject) => { // 异步滚动
      setTimeout(() => {
        resolve(savedPosition)
      }, 500);
    });
  } else {
    return { x: 0, y: 0 }
  }
};
*/


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
