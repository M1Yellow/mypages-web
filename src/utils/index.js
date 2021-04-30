export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}


/**
 * 自定义深度克隆对象
 * @param data
 * @returns {{}|*}
 */
export function deepClone(data) {
    let type = getType(data);
    let obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (let key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
}


/**
 * JSON.stringify 复制对象
 * 注意事项：
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#%E6%8F%8F%E8%BF%B0
 * @param obj
 * @returns {any}
 */
export function getNewObjByJson(obj) {
    return JSON.parse(JSON.stringify(obj));
}


/**
 * 生成随机数。100000-999999 getRandomNum(100000, 999999)
 * @param Min
 * @param Max
 * @returns {*}
 */
export function getRandomNum(Min, Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

