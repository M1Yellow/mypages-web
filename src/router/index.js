import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta:{
      title:"MyPages 我的主页我定义"
    },
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/home/index")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
