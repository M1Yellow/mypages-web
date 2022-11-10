import {createStore} from "vuex";
import globalProperties from "@/store/modules/globalProperties";
import userFollowing from "@/store/modules/userFollowing";
import userFollowingRelation from "@/store/modules/userFollowingRelation";
import userFollowingType from "@/store/modules/userFollowingType";
import userOpinion from "@/store/modules/userOpinion";
import userLogin from "@/store/modules/userLogin";

/*
Vuex 是一个针对 Vue.js 开发的状态管理模式。说简单点儿就是一个工具，可以管理（修改或设置）所有组件用到的数据，
而不需要借助之前的 event bus 或者 props 在组件间传值。

可以用公司举个例子：公司有个仓库
1.State（公司的仓库）
2.Getter（只能取出物品，包装一下，不能改变物品任何属性）
3.Mutations（仓库管理员，只有他可以直接存储到仓库）
4.Action（公司的物料采购员，负责从外面买东西和接货， 要往仓库存东西，告诉仓库管理员要存什么）

注意：只要刷新或者退出浏览器，State存储的参数属性值会重置为默认。

Vuex 使用场景：
大型单页应用程序，存在多组件共享数据的时候，需要用到。

https://www.huaweicloud.com/articles/cc0a347194136c4acf1933fb9f3be939.html

*/
export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        globalProperties, //全局参数
        userFollowing, //新增、修改用户弹窗，多用户共用
        userFollowingRelation, //变更分组弹窗，多用户共用
        userFollowingType, //新增、修改用户类型弹窗，多场景共用
        userOpinion, //新增、修改观点弹窗，多个用户共用
        userLogin, //登录弹窗，多场景共用（没登陆、会话超时）
    }
});
