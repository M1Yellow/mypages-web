/**
 * localStorage 操作工具类（ES6）
 */
export default class localStorageUtil {

    /** 添加 key 前缀，避免跟其他网站 key 冲突 */
    static _key(key) {
        return 'M1YELLOW_MYPAGES_LS_' + key;
    };

    /** 取值 */
    static get(key) {
        return JSON.parse(localStorage.getItem(this._key(key)));
    };

    /** 存值 */
    static set(key, val) {
        if (typeof (val) === 'object') val = JSON.stringify(val);
        return localStorage.setItem(this._key(key), val);
    };

    /** 根据 key 删除 */
    static del(key) {
        return localStorage.removeItem(this._key(key));
    };

    /** 清空所有值 */
    static clear() {
        return localStorage.clear();
    };

    /** 设置带过期时间的值 */
    static SetExpire(key, val, expire) {
        if (typeof (val) === 'object') val = JSON.stringify(val);
        localStorage.setItem(key, val);
        setTimeout(() => {
            localStorage.removeItem(key);
        }, expire); // 过期时间，单位，毫秒
    };

}

