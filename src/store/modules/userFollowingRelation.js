/**
 * userFollowingRelation 封装对象
 */
const userFollowingRelation = {
    state: {
        // 是否显示弹窗
        dialogVisible: false,
        // 弹窗标题，默认添加关注
        dialogTitle: '变更分组',
        // 弹窗类型，0-新增；1-修改，默认0
        dialogType: 0,
        // 新建用户时使用新对象
        newFollowingRelation: {
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
            // 是否删除，默认 false
            isDeleted: false
        },
        // 编辑对象原始备份，用于编辑提交后，重置原始状态
        newRelationBack: null,
        // 视图层信息封装对象，跟页面用户对象绑定，对象内容改变，页面数据跟着改动，不用刷新
        relationItem: null,
        // 编辑时使用的封装对象，修改完成后，返回的封装对象赋值给 relationItem，实现动态更新数据。【修改分类需要刷新页面】
        userFollowingRelationEdit: null
    },
    getters: {},
    mutations: {
        SET_USER_FOLLOWING_RELATION_DIALOG_VISIBLE: (state, val) => {
            state.dialogVisible = val;
        },
        SET_USER_FOLLOWING_RELATION_DIALOG_TITLE: (state, val) => {
            state.dialogTitle = val;
        },
        SET_USER_FOLLOWING_RELATION_DIALOG_TYPE: (state, val) => {
            state.dialogType = val;
        },
        SET_USER_FOLLOWING_RELATION_NEW_ID: (state, val) => {
            state.newFollowingRelation.id = val;
        },
        SET_USER_FOLLOWING_RELATION_NEW_USER_ID: (state, val) => {
            state.newFollowingRelation.userId = val;
        },
        SET_USER_FOLLOWING_RELATION_NEW_FOLLOWING_ID: (state, val) => {
            state.newFollowingRelation.followingId = val;
        },
        SET_USER_FOLLOWING_RELATION_NEW_PLATFORM_ID: (state, val) => {
            state.newFollowingRelation.platformId = val;
        },
        SET_USER_FOLLOWING_RELATION_NEW_TYPE_ID: (state, val) => {
            state.newFollowingRelation.typeId = val;
        },
        SET_USER_FOLLOWING_RELATION_NEW_SORT_NO: (state, val) => {
            state.newFollowingRelation.sortNo = val;
        },
        SET_USER_FOLLOWING_RELATION_NEW_IS_DELETED: (state, val) => {
            state.newFollowingRelation.isDeleted = val;
        },
        SET_USER_FOLLOWING_RELATION_VIEW_ITEM: (state, val) => {
            state.relationItem = val;
        },
        SET_USER_FOLLOWING_RELATION_VIEW_EDIT: (state, val) => {
            state.userFollowingRelationEdit = val;
        },
        SET_USER_FOLLOWING_RELATION_NEW_BACK: (state, val) => {
            state.newRelationBack = val;
        }
    },
    actions: {},
    modules: {}
}

export default userFollowingRelation
