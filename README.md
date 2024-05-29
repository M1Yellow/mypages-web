## 简介
`mypages-web` 为 `mypages` 的前端项目，基于 Vue 3 + ElementPlus 实现。

后端项目 👉 **[mypages](https://github.com/M1Yellow/mypages)**



<br>

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



<br>

### 项目演示
在线体验地址：https://www.m1yellow.cn/mypages

效果预览图：👇
<br/>
![mypages-web-preview](./public/images/mypages-web-preview.gif)



<br>

### 技术应用
| 技术          | 说明         | 官网                                                                               |
|-------------|------------|----------------------------------------------------------------------------------|
| Node.js     | 前端环境       | [https://nodejs.org/](https://nodejs.org/)                                       |
| Vue         | 前端框架       | [https://vuejs.org/](https://vuejs.org/)                                         |
| Vuex        | 全局状态框架     | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)                               |
| Vue-router  | 路由框架       | [https://router.vuejs.org/](https://router.vuejs.org/)                           |
| ElementPlus | 前端UI框架     | [https://element-plus.gitee.io/](https://element-plus.gitee.io/)                 |
| Axios       | 前端HTTP框架   | [https://github.com/axios/axios](https://github.com/axios/axios)                 |
| Js-cookie   | Cookie管理工具 | [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie) |



<br>

## 部署运行
1. 安装 Node.js 环境
2. 克隆项目到本地后，IDEA/VSCode 选择项目文件夹打开
3. **项目根目录**（注意不是磁盘根目录）下的 `.env.*` 文件为各个环境的配置文件，接口地址需自行修改
4. 命令行执行 `npm install`，下载项目依赖
5. 命令行执行 `npm run dev`，以开发环境运行项目，需要访问后端项目接口
6. 命令行执行 `npm run local`，以本地环境运行项目，直接加载本地图片和 json 数据
7. 命令行执行 `npm run build`，项目构建打包到项目根目录下的 `mypages-web` 文件夹
8. Nginx/Tomcat 部署 `mypages-web`，具体配置细节可以自行搜索 `Vue项目部署` 相关博客资料


<br>
