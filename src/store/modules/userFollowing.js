/**
 * userFollowing 封装对象，就把它当作一个业务数据封装对象就好了
 * TODO 注意，store 中的变量，在页面刷新之后，会重置，可以结合 html 的 sessionstorage 或 localstorage 进行持久化存储
 */
const userFollowing = {
    state: {
        // 是否显示弹窗
        dialogVisible: false,
        // 弹窗标题，默认添加关注
        dialogTitle: '添加关注',
        // 弹窗类型，0-新增；1-修改，默认0
        dialogType: 0,
        // 新建用户时使用新对象
        newFollowing: {
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
        // 编辑对象原始备份，用于编辑提交后，重置原始状态
        newFollowingBack: null,
        // 视图层关注用户信息封装对象，跟页面用户对象绑定，对象内容改变，页面数据跟着改动，不用刷新
        followingItem: null,
        // 编辑时使用的用户信息封装对象，修改完成后，返回的封装对象赋值给 followingItem，实现动态更新数据
        userFollowingEdit: null
    },
    getters: {},
    mutations: {
        SET_USER_FOLLOWING_DIALOG_VISIBLE: (state, val) => {
            state.dialogVisible = val;
        },
        SET_USER_FOLLOWING_DIALOG_TITLE: (state, val) => {
            state.dialogTitle = val;
        },
        SET_USER_FOLLOWING_DIALOG_TYPE: (state, val) => {
            state.dialogType = val;
        },
        SET_USER_FOLLOWING_NEW_ID: (state, val) => {
            state.newFollowing.id = val;
        },
        SET_USER_FOLLOWING_NEW_USER_ID: (state, val) => {
            state.newFollowing.userId = val;
        },
        SET_USER_FOLLOWING_NEW_FOLLOWING_ID: (state, val) => {
            state.newFollowing.followingId = val;
        },
        SET_USER_FOLLOWING_NEW_PLATFORM_ID: (state, val) => {
            state.newFollowing.platformId = val;
        },
        SET_USER_FOLLOWING_NEW_TYPE_ID: (state, val) => {
            state.newFollowing.typeId = val;
        },
        SET_USER_FOLLOWING_NEW_USER_KEY: (state, val) => {
            state.newFollowing.userKey = val;
        },
        SET_USER_FOLLOWING_NEW_NAME: (state, val) => {
            state.newFollowing.name = val;
        },
        SET_USER_FOLLOWING_NEW_MAIN_PAGE: (state, val) => {
            state.newFollowing.mainPage = val;
        },
        SET_USER_FOLLOWING_NEW_PROFILE_PHOTO: (state, val) => {
            state.newFollowing.profilePhoto = val;
        },
        SET_USER_FOLLOWING_NEW_SIGNATURE: (state, val) => {
            state.newFollowing.signature = val;
        },
        SET_USER_FOLLOWING_NEW_IS_USER: (state, val) => {
            state.newFollowing.isUser = val;
        },
        SET_USER_FOLLOWING_NEW_SORT_NO: (state, val) => {
            state.newFollowing.sortNo = val;
        },
        SET_USER_FOLLOWING_NEW_IS_DELETED: (state, val) => {
            state.newFollowing.isDeleted = val;
        },
        SET_USER_FOLLOWING_NEW_REMARK_LIST: (state, val) => {
            state.newFollowing.remarkList = val;
        },
        SET_USER_FOLLOWING_NEW_REMARK_LIST_JSON: (state, val) => {
            state.newFollowing.remarkListJson = val;
        },
        SET_USER_FOLLOWING_VIEW_ITEM: (state, val) => {
            state.followingItem = val;
        },
        SET_USER_FOLLOWING_VIEW_EDIT: (state, val) => {
            state.userFollowingEdit = val;
        },
        SET_USER_FOLLOWING_NEW_BACK: (state, val) => {
            state.newFollowingBack = val;
        }
    },
    actions: {},
    modules: {}
}

export default userFollowing
