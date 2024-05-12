import localStorageUtil from "@/utils/localStorageUtil";
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
    let userInfoDetail = localStorageUtil.get(cacheKey);
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
                localStorageUtil.set(cacheKey, userInfoDetail);
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
    let platformList = localStorageUtil.get(cacheKey);
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
                localStorageUtil.set(cacheKey, platformList);
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
    let typeList = localStorageUtil.get(cacheKey);
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
                localStorageUtil.set(cacheKey, typeList);
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
    localStorageUtil.del(cacheKey);
    //localStorageUtil.clear(); // 会把站点所有缓存清掉！影响站点其他应用
    return true;
}

/**
 * 响应式调整页面内容
 */
export function doAdjustView() {
    if (GlobalConstant.isShowH5()) {
        adjustView(1); // 1-调整
    } else {
        adjustView(0); // 0-复原
    }
}

// 页面调整，左侧导航栏隐藏，main 区域宽度不限制
function adjustView(opt) {
    // 调整主内容区域宽度
    let mainEle = document.getElementById("main");
    // 隐藏左侧导航栏
    let menuEle = document.getElementById("menu");

    if (opt === 1) { // 调整
        if (mainEle) mainEle.style.padding = "0";
        if (menuEle) menuEle.style.display = "none";
        // 调整平台内容页面布局
        adjustPlatformItem(opt);
    } else { // 复原
        if (mainEle) mainEle.style.padding = "0 15% 0 25%";
        if (menuEle) menuEle.style.display = "unset";
        // 调整平台内容页面布局
        adjustPlatformItem(opt);
    }
}

// 调整平台内容页面布局
function adjustPlatformItem(opt) {

    let platformItems = document.querySelectorAll(".platform_item");
    //console.log(platformItems);
    if (!platformItems || platformItems.length < 1) return;

    for (let i = 0; i < platformItems.length; i++) {
        if (opt === 1) { // 调整
            platformItems[i].style.margin = "unset";
            platformItems[i].style.boxShadow = "unset";
            platformItems[i].style.borderRadius = "unset";
            platformItems[i].style.minHeight = "unset";

            // 最后一个元素
            if (i === platformItems.length - 1) {
                platformItems[i].style.marginBottom = "unset";
            }
        } else { // 复原
            platformItems[i].style.margin = "10px";
            platformItems[i].style.boxShadow = "0 3px 10px 0 rgba(219, 219, 219, 0.5)";
            platformItems[i].style.borderRadius = "6px";
            platformItems[i].style.minHeight = "600px";

            // 最后一个元素
            if (i === platformItems.length - 1) {
                platformItems[i].style.marginBottom = "100px";
            }
        }
    }
}
