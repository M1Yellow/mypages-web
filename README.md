# mypages-web

## 前言
该项目为前后端分离项目的前端部分，后端项目`mypages`地址：[点我试试](https://github.com/M1Yellow/mypages) 。


## 项目介绍
`mypages-web`是一个聚合多社交平台主页的前端项目，基于 Vue 3 + ElementPlus 实现。
主要为用户提供可在首页自定义添加社交平台、关注用户、观点看法的业务功能，支持检查用户内容更新及同步用户昵称、签名和头像等功能。


## 目录结构
```
mypages-web -- 项目目录
├── mock -- 模拟后台数据
│   ├── demo -- 样例
│   ├── json -- 数据
│   ├── modules -- 功能模块
│   ├── index.js -- 主配置
│   └── util.js -- 配置工具
├── public -- 公共资源，浏览器地址栏可访问
│   ├── css
│   ├── images
│   ├── json
│   ├── favicon.ico
│   └── index.html
├── src -- 项目资源目录
│   ├── api -- 后台接口目录
│   ├── assets -- 项目内资源目录
│   ├── components -- 组件目录
│   ├── minxins
│   ├── router -- 路由配置
│   ├── store -- 全局状态（变量）存储
│   ├── utils -- 工具类
│   ├── views -- 视图目录
│   ├── App.vue -- 主入口
│   └── main.js -- 主配置
├── .browserslistrc
├── .env -- 在所有的环境中被载入，及全局公共配置
├── .env.development -- 开发环境配置
├── .env.local -- 在所有的环境中被载入，但会被 git 忽略，可注释为不忽略
├── .env.production -- 生产环境配置
├── .env.test -- 测试环境配置
├── .eslintrc.js
├── babel.config.js
├── Dockerfile -- 构建 docker 镜像的文件
├── LICENSE -- 开源协议文件
├── nginx.conf -- nginx 配置文件
├── package-lock.json
├── package.json -- vue 打包配置
├── README.md
└── vue.config.js -- vue 全局配置文件

```

### 项目演示
在线体验地址：<br>

效果预览图：<br>
<img src="https://dd-static.jd.com/ddimg/jfs/t1/164324/3/18381/1292383/607610d7Edca019c3/9dddfac21cf8606e.png" alt="mypages-web 效果预览图" title="mypages-web-preview-long.png" />

### 技术应用
技术 | 说明 | 官网
----|----|----
Node.js | 前端环境 | [https://nodejs.org/](https://nodejs.org/)
Vue | 前端框架 | [https://vuejs.org/](https://vuejs.org/)
Vuex | 全局状态框架 | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)
Vue-router | 路由框架 | [https://router.vuejs.org/](https://router.vuejs.org/)
ElementPlus | 前端UI框架 | [https://element-plus.gitee.io/](https://element-plus.gitee.io/)
Axios | 前端HTTP框架 | [https://github.com/axios/axios](https://github.com/axios/axios)
Js-cookie | Cookie管理工具 | [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie)


## 部署运行
1. 安装 Node.js 环境
2. 克隆项目到本地后，在 IDEA 菜单栏点`File-Open`选择项目目录，打开项目
3. 根目录下的`.env.*` 文件为各个环境的配置文件，主要配置全局变量，包括全局域名配置和后端接口地址
4. 在 IDEA Terminal 中运行命令：`npm install`，下载项目依赖
5. 在 IDEA Terminal 中运行命令：`npm run serve`，以开发环境运行项目，需要访问后端项目接口
6. 在 IDEA Terminal 中运行命令：`npm run local`，以本地环境运行项目，直接加载本地图片和 json 数据
