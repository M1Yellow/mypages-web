/**
 * userOpinion 封装对象
 */

import * as MUTATION_TYPES from '@/constant/mutationTypes';

const userOpinion = {
    namespaced: true,
    state: {
        // 是否显示弹窗
        dialogVisible: false,
        // 弹窗标题
        dialogTitle: '新增观点',
        // 弹窗类型，0-新增；1-修改，默认0
        dialogType: 0,
        // 新建用户时使用新对象
        instance: {
            // 用户关系表id
            id: null,
            // 用户id
            userId: null,
            // 平台id
            platformId: null,
            // 观点类型id
            opinionType: null,
            // 观点内容
            opinionContent: null,
            // 页面显示优先级，由低到高：1-10，默认5
            sortNo: 5,
        },
        // 用于保存页面显示对象的引用，便于动态绑定更新
        viewItem: null,
    },
    getters: {},
    mutations: {
        [MUTATION_TYPES.SET_USER_OPINION_DIALOG_VISIBLE](state, val) {
            state.dialogVisible = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_DIALOG_TITLE](state, val) {
            state.dialogTitle = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_DIALOG_TYPE](state, val) {
            state.dialogType = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_INSTANCE](state, val) {
            state.instance = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_INSTANCE_ID](state, val) {
            state.instance.id = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_INSTANCE_USER_ID](state, val) {
            state.instance.userId = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_INSTANCE_PLATFORM_ID](state, val) {
            state.instance.platformId = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_INSTANCE_OPINION_TYPE](state, val) {
            state.instance.opinionType = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_INSTANCE_OPINION_CONTENT](state, val) {
            state.instance.opinionContent = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_INSTANCE_SORT_NO](state, val) {
            state.instance.sortNo = val;
        },
        [MUTATION_TYPES.SET_USER_OPINION_VIEW_ITEM](state, val) {
            state.viewItem = val;
        },
    },
    actions: {
        setDialogVisible({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_DIALOG_VISIBLE, val);
        },
        setDialogTitle({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_DIALOG_TITLE, val);
        },
        setDialogType({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_DIALOG_TYPE, val);
        },
        setInstance({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_INSTANCE, val);
        },
        setInstanceId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_INSTANCE_ID, val);
        },
        setInstanceUserId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_INSTANCE_USER_ID, val);
        },
        setInstancePlatformId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_INSTANCE_PLATFORM_ID, val);
        },
        setInstanceOpinionType({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_INSTANCE_OPINION_TYPE, val);
        },
        setInstanceOpinionContent({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_INSTANCE_OPINION_CONTENT, val);
        },
        setInstanceSortNo({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_INSTANCE_SORT_NO, val);
        },
        setViewItem({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_OPINION_VIEW_ITEM, val);
        },
    },
    modules: {}
}

export default userOpinion
