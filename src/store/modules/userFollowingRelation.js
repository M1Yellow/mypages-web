import * as MUTATION_TYPES from "@/constant/mutationTypes";

/**
 * userFollowingRelation 封装对象
 */
const userFollowingRelation = {
    namespaced: true,
    state: {
        // 是否显示弹窗
        dialogVisible: false,
        // 弹窗标题
        dialogTitle: '变更分组',
        // 弹窗类型，0-新增；1-修改，默认0
        dialogType: 0,
        // 实体参数封装
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
            // 页面显示优先级，由低到高：1-10，默认5
            sortNo: 5,
        },
        // 视图层信息封装对象，跟页面用户对象绑定，对象内容改变，页面数据跟着改动，不用刷新
        viewItem: null,
    },
    getters: {},
    mutations: {
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_DIALOG_VISIBLE](state, val) {
            state.dialogVisible = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_DIALOG_TITLE](state, val) {
            state.dialogTitle = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_DIALOG_TYPE](state, val) {
            state.dialogType = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE](state, val) {
            state.instance = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_ID](state, val) {
            state.instance.id = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_USER_ID](state, val) {
            state.instance.userId = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_FOLLOWING_ID](state, val) {
            state.instance.followingId = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_PLATFORM_ID](state, val) {
            state.instance.platformId = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_TYPE_ID](state, val) {
            state.instance.typeId = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_SORT_NO](state, val) {
            state.instance.sortNo = val;
        },
        [MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_VIEW_ITEM](state, val) {
            state.viewItem = val;
        },
    },
    actions: {
        setDialogVisible({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_DIALOG_VISIBLE, val);
        },
        setDialogTitle({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_DIALOG_TITLE, val);
        },
        setDialogType({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_DIALOG_TYPE, val);
        },
        setInstance({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE, val);
        },
        setInstanceId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_ID, val);
        },
        setInstanceUserId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_USER_ID, val);
        },
        setInstanceFollowingId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_FOLLOWING_ID, val);
        },
        setInstancePlatformId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_PLATFORM_ID, val);
        },
        setInstanceTypeId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_TYPE_ID, val);
        },
        setInstanceSortNo({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_INSTANCE_SORT_NO, val);
        },
        setViewItem({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_FOLLOWING_RELATION_VIEW_ITEM, val);
        },
    },
    modules: {}
}

export default userFollowingRelation
