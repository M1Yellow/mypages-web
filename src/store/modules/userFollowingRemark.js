/**
 * userFollowingRemark 封装对象
 */
const userFollowingRemark = {
    state: {
        // 是否显示弹窗
        dialogVisible: false,
        // 表id
        id: null,
        // 用户id
        userId: null,
        // 关注用户id
        followingId: null,
        // 标签名称
        labelName: null,
        // 页面显示优先级，由低到高：1-10，默认5
        sortNo: 5,
        // 是否删除，默认 false
        isDeleted: false
    },
    getters: {},
    mutations: {
        SET_USER_FOLLOWING_REMARK_DIALOG_VISIBLE: (state, val) => {
            state.dialogVisible = val;
        },
        SET_USER_FOLLOWING_REMARK_ID: (state, val) => {
            state.id = val;
        },
        SET_USER_FOLLOWING_REMARK_USER_ID: (state, val) => {
            state.userId = val;
        },
        SET_USER_FOLLOWING_REMARK_FOLLOWING_ID: (state, val) => {
            state.followingId = val;
        },
        SET_USER_FOLLOWING_REMARK_LABEL_NAME: (state, val) => {
            state.labelName = val;
        },
        SET_USER_FOLLOWING_REMARK_SORT_NO: (state, val) => {
            state.sortNo = val;
        },
        SET_USER_FOLLOWING_REMARK_IS_DELETED: (state, val) => {
            state.isDeleted = val;
        }
    },
    actions: {},
    modules: {}
}

export default userFollowingRemark
