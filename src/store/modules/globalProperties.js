/**
 * 全局参数配置
 */
const globalProperties = {
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
        SET_GLOBAL_PROPERTIES_SORT_VALUES: (state, val) => {
            state.sortValues = val;
        },
        SET_GLOBAL_PROPERTIES_PLATFORM_LIST: (state, val) => {
            state.platformList = val;
        },
        SET_GLOBAL_PROPERTIES_TYPE_LIST: (state, val) => {
            state.typeList = val;
        },
    },
    actions: {},
    modules: {}
}

export default globalProperties
