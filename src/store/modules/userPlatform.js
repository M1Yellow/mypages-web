/**
 * userPlatform 封装对象
 */
const userPlatform = {
    state: {
        // 是否显示弹窗
        dialogVisible: false,
        // 平台关系表id
        id: null,
        // 用户id
        userId: null,
        // 平台表id
        platformId: null,
        // 平台名称
        name: null,
        // 平台英文名称
        nameEn: null,
        // 平台主页
        mainPage: null,
        // 平台logo
        platformLogo: null,
        // 平台长logo
        platformLongLogo: null,
        // 页面显示优先级，由低到高：1-10，默认5
        sortNo: 5,
        // 是否删除，默认 false
        isDeleted: false
    },
    getters: {},
    mutations: {
        SET_USER_PLATFORM_DIALOG_VISIBLE: (state, val) => {
            state.dialogVisible = val;
        },
        SET_USER_PLATFORM_ID: (state, val) => {
            state.id = val;
        },
        SET_USER_PLATFORM_USER_ID: (state, val) => {
            state.userId = val;
        },
        SET_USER_PLATFORM_PLATFORM_ID: (state, val) => {
            state.platformId = val;
        },
        SET_USER_PLATFORM_NAME: (state, val) => {
            state.name = val;
        },
        SET_USER_PLATFORM_NAME_EN: (state, val) => {
            state.nameEn = val;
        },
        SET_USER_PLATFORM_MAIN_PAGE: (state, val) => {
            state.mainPage = val;
        },
        SET_USER_PLATFORM_PLATFORM_LOGO: (state, val) => {
            state.platformLogo = val;
        },
        SET_USER_PLATFORM_PLATFORM_LONG_LOGO: (state, val) => {
            state.platformLongLogo = val;
        },
        SET_USER_PLATFORM_SORT_NO: (state, val) => {
            state.sortNo = val;
        },
        SET_USER_PLATFORM_IS_DELETED: (state, val) => {
            state.isDeleted = val;
        }
    },
    actions: {},
    modules: {}
}

export default userPlatform
