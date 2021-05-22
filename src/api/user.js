import request from '@/utils/request'

//import qs from 'qs';

/**
 * vue 中 post 请求报 400 的解决
 * axios 默认使用 application/json 格式来提交数据，而 Postman 请求格式是 application/x-www-form-urlencoded，
 * 现在需要在前端改变请求数据的格式，使用 qs 插件（npm install qs -S）
 * qs 模块是安装 axios 模块的时候就有的，不用另行安装，通过 import 引入即可使用。
 *
 * 需要注意的是 get 传参，需要使用的 key 是 params。post 传参，使用的 key 必须是 data。
 *
 */


/**
 * 用户登录
 * @param params
 * @returns {AxiosPromise}
 */
export function login(params) {
    return request({
        url: '/user/login',
        method: 'post',
        data: params
    });
}


/**
 * 用户登出
 * @param params
 * @returns {AxiosPromise}
 */
export function logout(params) {
    return request({
        url: '/user/logout',
        method: 'post',
        data: params
    });
}


/**
 * 获取用户详细信息
 * @param params userId（必须）、userName（可选）
 * @returns {AxiosPromise}
 */
export function getUserDetail(params) {
    return request({
        url: '/user/detail',
        method: 'get',
        params: params
    });
}


/**
 * 新增或修改关注用户
 * @param params
 * @returns {AxiosPromise}
 */
export function addFollowing(params) {
    return request({
        url: '/following/add',
        method: 'post',
        // 简单的文件上传，不用自己在 header 中加 content-type，头部会自动加好
        //headers: { 'content-type': 'multipart/form-data;boundary=' + new Date().getTime() },
        //headers: { 'content-type': 'application/json;charset=UTF-8' },
        //data: qs.stringify(params)
        //data: params instanceof FormData ? params : qs.stringify(params)
        //data: JSON.stringify(params)
        // 瞎配置半天，还是原本好用，组件会根据传参类型自动配置 header 中的参数
        data: params
    });
}

/**
 * 获取关注用户分页列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getUserFollowingListPage(params) {
    return request({
        url: '/following/list',
        method: 'get',
        params: params
    });
}

/**
 * 同步关注用户信息
 * @param params
 * @returns {AxiosPromise}
 */
export function syncFollowingInfo(params) {
    return request({
        url: '/following/syncOne',
        method: 'get',
        params: params
    });
}

/**
 * 批量同步关注用户信息
 * @param params
 * @returns {AxiosPromise}
 */
export function syncFollowingInfoBatch(params) {
    return request({
        url: '/following/syncBatch',
        method: 'get',
        params: params
    });
}

/**
 * 变更关注用户分组
 * @param params
 * @returns {AxiosPromise}
 */
export function changType(params) {
    return request({
        url: '/following-relation/add',
        method: 'post',
        data: params
    });
}

/**
 * 获取用户平台列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getPlatformList(params) {
    return request({
        url: '/platform/list',
        method: 'get',
        params: params
    });
}

/**
 * 获取用户类型列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getTypeList(params) {
    return request({
        url: '/type/list',
        method: 'get',
        params: params
    });
}

/**
 * 移除关注用户
 * @param params
 * @returns {AxiosPromise}
 */
export function removeFollowing(params) {
    return request({
        url: '/following/removeRelation',
        method: 'get',
        params: params
    });
}

/**
 * 新增或修改观点
 * @param params
 * @returns {AxiosPromise}
 */
export function addOpinion(params) {
    return request({
        url: '/opinion/add',
        method: 'post',
        data: params
    });
}

/**
 * 移除观点
 * @param params
 * @returns {AxiosPromise}
 */
export function removeOpinion(params) {
    return request({
        url: '/opinion/remove',
        method: 'get',
        params: params
    });
}

/**
 * 新增或修改类型
 * @param params
 * @returns {AxiosPromise}
 */
export function addType(params) {
    return request({
        url: '/type/add',
        method: 'post',
        data: params
    });
}

/**
 * 移除类型
 * @param params
 * @returns {AxiosPromise}
 */
export function removeType(params) {
    return request({
        url: '/type/remove',
        method: 'get',
        params: params
    });
}
