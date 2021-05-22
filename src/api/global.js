import sessionStorageUtil from "@/utils/sessionStorageUtil";
import GlobalConstant from '@/constant/GlobalConstant'
import {getPlatformList, getTypeList, getUserDetail} from "@/api/user";


/**
 * 加载用户详细信息
 * @param userId 必选
 * @param userName 可选
 */
export function getUserInfoDetail(userId, userName) {
    if (!userId) {
        return null;
    }

    // 先从缓存获取
    let cacheKey = GlobalConstant.USER_LOGIN_SUCCESS_DETAIL_INFO_CACHE_DATA_KEY + userId;
    let userInfoDetail = sessionStorageUtil.get(cacheKey);
    if (userInfoDetail) {
        return userInfoDetail;
    }

    // 封装请求参数
    let params = {
        userId: userId,
        userName: userName
    }
    if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> getUserInfoDetail params:", JSON.stringify(params));
    }
    // 请求接口
    getUserDetail(params).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
            console.log(">>>> getUserInfoDetail response:", JSON.stringify(res));
        }
        if (res.code === 200) {
            userInfoDetail = res.data;
            if (userInfoDetail) {
                // 存入缓存
                let cacheKey = GlobalConstant.USER_LOGIN_SUCCESS_DETAIL_INFO_CACHE_DATA_KEY + userId;
                sessionStorageUtil.set(cacheKey, userInfoDetail);
            }
        }
    }).catch(e => {
        if (process.env.VUE_APP_ENV !== "prod") {
            console.log(e);
        }
    });

    return userInfoDetail;

}


/**
 * 获取用户平台列表
 * @param userId
 */
export function getUserPlatformList(userId) {

    if (!userId) {
        return null;
    }

    // TODO 先从缓存获取
    let cacheKey = GlobalConstant.USER_PLATFORM_LIST_CACHE_KEY + userId;
    let platformList = sessionStorageUtil.get(cacheKey);
    if (platformList && platformList.length > 0) {
        return platformList;
    }

    let params = {
        userId: userId
    }
    if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> getPlatformList params:", JSON.stringify(params));
    }
    getPlatformList(params).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
            console.log(">>>> getPlatformList response:", JSON.stringify(res));
        }
        if (res.code === 200) {
            platformList = res.data;
            // TODO 存入 sessionStorage，当用户新增或修改类型成功之后，刷新这个值
            if (platformList && platformList.length > 0) {
                sessionStorageUtil.set(cacheKey, platformList);
            }
        }
    }).catch(e => {
        if (process.env.VUE_APP_ENV !== "prod") {
            console.log(e);
        }
    });

    return platformList;
}

/**
 * 获取用户类型列表
 * @param userId
 * @param platformId
 */
export function getUserFollowingTypeList(userId, platformId) {

    if (!userId || !platformId) {
        return null;
    }

    // TODO 先从缓存获取
    let cacheKey = GlobalConstant.USER_TYPE_LIST_CACHE_KEY + userId + "_" + platformId;
    let typeList = sessionStorageUtil.get(cacheKey);
    if (typeList && typeList.length > 0) {
        //console.log(">>>> typeList cached:", JSON.stringify(typeList));
        return typeList;
    }

    let params = {
        userId: userId,
        platformId: platformId
    }
    if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> getTypeList params:", JSON.stringify(params));
    }
    getTypeList(params).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
            console.log(">>>> getTypeList response:", JSON.stringify(res));
        }
        if (res.code === 200) {
            typeList = res.data;
            // TODO 存入 sessionStorage，当用户新增或修改类型成功之后，刷新这个值
            if (typeList && typeList.length > 0) {
                sessionStorageUtil.set(cacheKey, typeList);
            }
        }
    }).catch(e => {
        if (process.env.VUE_APP_ENV !== "prod") {
            console.log(e);
        }
    });

    return typeList;
}

/**
 * 退出登录
 * @returns {boolean}
 */
export function logout() {
    let cacheKey = GlobalConstant.USER_LOGIN_SUCCESS_CACHE_DATA_KEY;
    //sessionStorageUtil.del(cacheKey);
    sessionStorageUtil.clear();
    return true;
}
