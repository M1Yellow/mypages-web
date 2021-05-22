/**
 * userFollowing 封装对象，就把它当作一个业务数据封装对象就好了
 * TODO 注意，store 中的变量，在页面刷新之后，会重置，可以结合 html 的 sessionstorage 或 localstorage 进行持久化存储
 */

import * as MUTATION_TYPES from '@/constant/mutationTypes';

const userFollowing = {
    /**
     * TODO 用命名空间即可解决在模块中 getters 和 actions 命名重复冲突
     * 外部调用模块中 mutations、getters、actions 中方法的时候，要加上模块名
     * this.$store.commit("userInfo/setUserInfo", userInfo)
     * 外部调用 actions 中的方法，加上模块名
     * this.$store.dispatch('moduleB/moduleBAction', params);
     * 外部获取属性时同样加上模块名
     * this.$store.state.userInfo.userName
     */
    namespaced: true,
    // 包含了 store 中存储的各个状态，state 中的变量属性可以跟其他 state 中的属性同名
    state: {
        // 修改组件 key 值，以达到重新渲染组件的目的
        changeAddFollowingDialogKey: null,
        // 是否显示弹窗
        dialogVisible: false,
        // 弹窗标题
        dialogTitle: '添加关注',
        // 弹窗类型，0-新增；1-修改，默认0
        dialogType: 0,
        // 是否显示分组类型
        isShowFollowingType: false,
        // 新建用户时使用新对象
        instance: {
            // 用户关系表id
            id: null,
            // 用户id
            userId: null,
            // 关注用户表id
            followingId: null,
            // 平台id
            platformId: null,
            // 类型id
            typeId: null,
            // 用户来源平台的id或标识
            userKey: null,
            // 用户名
            name: null,
            // 用户主页
            mainPage: null,
            // 头像文件路径
            profilePhoto: null,
            // 个性签名
            signature: null,
            // 是否为用户
            isUser: true,
            // 页面显示优先级，由低到高：1-10，默认5
            sortNo: 5,
            // 是否删除，默认 false
            isDeleted: false,
            // 关联用户标签列表
            remarkList: [],
            // 关联用户标签列表json格式
            remarkListJson: null
        },
        // 用于保存页面显示对象的引用，便于动态绑定更新
        // TODO 注意，这里需要存的是 userFollowingItem，包含 userFollowing 和 userFollowingRemarkList
        //  因为添加/编辑用户信息，包含的元素有点多，一个页面同时可以操作用户信息、标签信息、头像
        viewItem: null,

    },
    // 类似于 Vue 中的计算属性，根据其他 getter 或 state 计算返回值。
    getters: {},
    // 一组方法，是改变 store 中状态的执行者，只能是同步操作。
    // TODO 注意，mutations 中的属性不能跟其他 mutations 同名，整个 store 相当于一个类，mutations 中的事件类型 (type) 相当于类中的属性，属性自然不能重名
    mutations: {
        [MUTATION_TYPES.SET_CHANGE_ADD_FOLLOWING_DIALOG_KEY](state, val) {
            state.changeAddFollowingDialogKey = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_DIALOG_VISIBLE](state, val) {
            state.dialogVisible = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_DIALOG_TITLE](state, val) {
            state.dialogTitle = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_DIALOG_TYPE](state, val) {
            state.dialogType = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_IS_SHOW_FOLLOWING_TYPE](state, val) {
            state.isShowFollowingType = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE](state, val) {
            state.instance = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_ID](state, val) {
            state.instance.id = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_USER_ID](state, val) {
            state.instance.userId = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_FOLLOWING_ID](state, val) {
            state.instance.followingId = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_PLATFORM_ID](state, val) {
            state.instance.platformId = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_TYPE_ID](state, val) {
            state.instance.typeId = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_USER_KEY](state, val) {
            state.instance.userKey = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_NAME](state, val) {
            state.instance.name = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_MAIN_PAGE](state, val) {
            state.instance.mainPage = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_PROFILE_PHOTO](state, val) {
            state.instance.profilePhoto = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_SIGNATURE](state, val) {
            state.instance.signature = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_IS_USER](state, val) {
            state.instance.isUser = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_SORT_NO](state, val) {
            state.instance.sortNo = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_REMARK_LIST](state, val) {
            state.instance.remarkList = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_REMARK_LIST_JSON](state, val) {
            state.instance.remarkListJson = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_VIEW_ITEM](state, val) {
            state.viewItem = val;
        },

    },
    // 一组方法，其中可以包含异步操作。
    actions: {
        setChangeAddFollowingDialogKey({commit}, val) {
            commit(MUTATION_TYPES.SET_CHANGE_ADD_FOLLOWING_DIALOG_KEY, val);
        },
        setDialogVisible({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_DIALOG_VISIBLE, val);
        },
        setDialogTitle({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_DIALOG_TITLE, val);
        },
        setDialogType({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_DIALOG_TYPE, val);
        },
        setIsShowFollowingType({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_IS_SHOW_FOLLOWING_TYPE, val);
        },
        setInstance({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE, val);
        },
        setInstanceId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_ID, val);
        },
        setInstanceUserId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_USER_ID, val);
        },
        setInstanceFollowingId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_FOLLOWING_ID, val);
        },
        setInstancePlatformId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_PLATFORM_ID, val);
        },
        setInstanceTypeId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_TYPE_ID, val);
        },
        setInstanceUserKey({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_USER_KEY, val);
        },
        setInstanceName({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_NAME, val);
        },
        setInstanceMainPage({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_MAIN_PAGE, val);
        },
        setInstanceProfilePhoto({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_PROFILE_PHOTO, val);
        },
        setInstanceSignature({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_SIGNATURE, val);
        },
        setInstanceIsUser({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_IS_USER, val);
        },
        setInstanceRemarkList({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_REMARK_LIST, val);
        },
        setInstanceRemarkListJson({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_REMARK_LIST_JSON, val);
        },
        setInstanceSortNo({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_INSTANCE_SORT_NO, val);
        },
        setViewItem({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_VIEW_ITEM, val);
        },
    },
    // 嵌套模块
    modules: {}
}

export default userFollowing
