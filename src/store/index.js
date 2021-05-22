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

我们可以用公司举个例子：公司有个仓库
1.State（公司的仓库）
2.Getter（只能取出物品，包装一下，不能改变物品任何属性）
3.Mutations（仓库管理员，只有他可以直接存储到仓库）
4.Action（公司的物料采购员，负责从外面买东西和接货， 要往仓库存东西，告诉仓库管理员要存什么）

非常要注意的地方：只要刷新或者退出浏览器，仓库清空。

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
        globalProperties,
        userFollowing,
        userFollowingRelation,
        userFollowingType,
        userOpinion,
        userLogin,
    }
});
