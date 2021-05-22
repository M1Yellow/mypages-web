/**
 * 全局参数状态缓存
 */

import * as MUTATION_TYPES from '@/constant/mutationTypes';

const globalProperties = {
    namespaced: true,
    state: {
        // 排序优先级
        sortValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        // 用户对应的平台列表
        platformList: [],
        // 用户对应的分类类型列表
        typeList: [],
    },
    getters: {},
    mutations: {
        [MUTATION_TYPES.SET_GLOBAL_PROPERTIES_SORT_VALUES](state, val) {
            state.sortValues = val;
        },
        [MUTATION_TYPES.SET_GLOBAL_PROPERTIES_PLATFORM_LIST](state, val) {
            state.platformList = val;
        },
        [MUTATION_TYPES.SET_GLOBAL_PROPERTIES_TYPE_LIST](state, val) {
            state.typeList = val;
        },
    },
    actions: {
        setGlobalSortValues({commit}, val) {
            commit(MUTATION_TYPES.SET_GLOBAL_PROPERTIES_SORT_VALUES, val);
        },
        setGlobalPlatformList({commit}, val) {
            commit(MUTATION_TYPES.SET_GLOBAL_PROPERTIES_PLATFORM_LIST, val);
        },
        setGlobalTypeList({commit}, val) {
            commit(MUTATION_TYPES.SET_GLOBAL_PROPERTIES_TYPE_LIST, val);
        },
    },
    modules: {}
}

export default globalProperties
