/**
 * 用户登录数据封装对象
 */

import * as MUTATION_TYPES from '@/constant/mutationTypes';

const userLogin = {
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
        // 是否显示弹窗
        dialogVisible: false,
        // 弹窗标题
        dialogTitle: '登录',
        // 弹窗类型，这里不用这个属性
        dialogType: 0,
        // 新数据对象
        instance: {
            // 用户id
            userId: null,
            // 用户名
            userName: '',
            // 用户密码
            password: '',
            // 图形验证码
            code: '',
        },
        viewItem: null,

    },
    // 类似于 Vue 中的计算属性，根据其他 getter 或 state 计算返回值。
    getters: {
        getVisibleState(state) {
            return state.dialogVisible;
        },
    },
    // 一组方法，是改变 store 中状态的执行者，只能是同步操作。
    // TODO 注意，mutations 中的属性不能跟其他 mutations 同名，整个 store 相当于一个类，mutations 中的事件类型 (type) 相当于类中的属性，属性自然不能重名
    mutations: {
        [MUTATION_TYPES.SET_USER_LOGIN_DIALOG_VISIBLE](state, val) {
            state.dialogVisible = val;
        },
        [MUTATION_TYPES.SET_USER_LOGIN_DIALOG_TITLE](state, val) {
            state.dialogTitle = val;
        },
        [MUTATION_TYPES.SET_USER_LOGIN_DIALOG_TYPE](state, val) {
            state.dialogType = val;
        },
        [MUTATION_TYPES.SET_USER_LOGIN_INSTANCE](state, val) {
            state.instance = val;
        },
        [MUTATION_TYPES.SET_USER_LOGIN_INSTANCE_USER_ID](state, val) {
            state.instance.userId = val;
        },
        [MUTATION_TYPES.SET_USER_LOGIN_INSTANCE_USER_NAME](state, val) {
            state.instance.userName = val;
        },
        [MUTATION_TYPES.SET_USER_LOGIN_INSTANCE_PASSWORD](state, val) {
            state.instance.password = val;
        },
        [MUTATION_TYPES.SET_USER_LOGIN_INSTANCE_CODE](state, val) {
            state.instance.code = val;
        },
        [MUTATION_TYPES.SET_USER_LOGIN_VIEW_ITEM](state, val) {
            state.viewItem = val;
        },
    },
    // 一组方法，其中可以包含异步操作。
    actions: {
        setDialogVisible({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_LOGIN_DIALOG_VISIBLE, val);
        },
        setDialogTitle({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_LOGIN_DIALOG_TITLE, val);
        },
        setDialogType({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_LOGIN_DIALOG_TYPE, val);
        },
        setInstance({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_LOGIN_INSTANCE, val);
        },
        setInstanceUseId({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_LOGIN_INSTANCE_USER_ID, val);
        },
        setInstanceUserName({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_LOGIN_INSTANCE_USER_NAME, val);
        },
        setInstancePassword({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_LOGIN_INSTANCE_PASSWORD, val);
        },
        setInstanceCode({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_LOGIN_INSTANCE_CODE, val);
        },
        setViewItem({commit}, val) {
            commit(MUTATION_TYPES.SET_USER_LOGIN_VIEW_ITEM, val);
        },
    },
    // 嵌套模块
    modules: {}
}

export default userLogin
