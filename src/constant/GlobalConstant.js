/**
 * 应用内部全局常量配置类
 * @type {string}
 */
export default class GlobalConstant {
    //================================================================================//
    // 平台相关配置项区域
    //================================================================================//
    // 用户默认平台id
    static USER_DEFAULT_PLATFORM_ID = 1;
    // 用户平台列表缓存KEY
    static USER_PLATFORM_LIST_CACHE_KEY = "USER_PLATFORM_LIST_CACHE_";
    // 带确认按钮的提示框自定义class，避免重复弹出
    static GLOBAL_CONFIRM_BOX_CLASS = "global-confirm-box";
    // 页面主视图区域宽度
    static MAIN_CONTENT_WIDTH = 1519;
    // 触发调整的比例
    static BEGIN_ADJUST_SCALE = 0.8;
    // 最终调整的比例
    static FINAL_ADJUST_SCALE = 0.7;
    // 是否调整显示为 h5
    static isShowH5 = function () {
        const scale = document.documentElement.clientWidth / this.MAIN_CONTENT_WIDTH;
        if (scale && scale < this.BEGIN_ADJUST_SCALE) {
            return true;
        }
        return false;
    }


    //================================================================================//
    // 用户相关配置项区域
    //================================================================================//
    // 登录成功返回的用户信息数据存储KEY
    static USER_DEFAULT_PROFILE_PHOTO_URL = "/images/user-profile-photo/f0ee8a3c7c9638a54940382568c9dpng.png";
    // 登录成功返回的用户信息数据存储KEY
    static USER_LOGIN_SUCCESS_CACHE_DATA_KEY = "LOGIN_RETURN_JWT_DATA";
    // 登录成功加载用户详细信息存储KEY
    static USER_LOGIN_SUCCESS_DETAIL_INFO_CACHE_DATA_KEY = "LOGIN_LOAD_USER_DETAIL_INFO_";


    //================================================================================//
    // 类型相关配置项区域
    //================================================================================//
    // 用户类型列表缓存KEY
    static USER_TYPE_LIST_CACHE_KEY = "USER_TYPE_LIST_CACHE_";

    //================================================================================//
    // 观点相关配置项区域
    //================================================================================//
    // 删除观点时，提示内容最大长度
    static MSG_CONTENT_LENGTH = 20;
    // 最多可添加观点的数量，默认设置 10
    static MAX_OPINION_NUM = 10;

    //================================================================================//
    // 关注用户相关配置项区域
    //================================================================================//


}
