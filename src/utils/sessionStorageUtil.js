/**
 * sessionStorage 操作工具类
 */

const _key = (key) => {
    return 'M1YELLOW_MYPAGES_SS_' + key;
}

const sessionStorageUtil = {

    /** 添加 key 前缀，避免跟其他网站 key 冲突 */
    _key: (key) => {
        return 'M1YELLOW_MYPAGES_SS_' + key;
    },

    /** 取值 */
    get: (key) => {
        return JSON.parse(sessionStorage.getItem(_key(key)));
    },

    /** 存值 */
    set: (key, val) => {
        if (typeof (val) === 'object') val = JSON.stringify(val);
        return sessionStorage.setItem(_key(key), val);
    },

    /** 根据 key 删除 */
    del: (key) => {
        return sessionStorage.removeItem(_key(key));
    },

    /** 清空所有值 */
    clear: () => {
        return sessionStorage.clear();
    },

    /** 设置带过期时间的值 */
    SetExpire: (key, val, expire) => {
        if (typeof (val) === 'object') val = JSON.stringify(val);
        sessionStorage.setItem(key, val);
        setTimeout(() => {
            sessionStorage.removeItem(key);
        }, expire); // 过期时间，单位，毫秒
    }
}

export default sessionStorageUtil
