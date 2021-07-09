import request from '@/utils/request'

export function getJsonData(filePath) {
    return request({
        url: filePath
    });
}

export function initAllData(params) {
    return request({
        url: process.env.VUE_APP_IS_CLOUD === "true" ? '/admin/home/platformList' : '/home/platformList',
        method: 'get',
        params: params
    });
}

export function initDefaultData() {
    return request({
        url: process.env.VUE_APP_IS_CLOUD === "true" ? '/admin/home' : '/home',
        method: 'get',
        //params: params
    });
}

export function getGlobalProperties(params) {
    return request({
        url: process.env.VUE_APP_IS_CLOUD === "true" ? '/admin/home/properties' : '/home/properties',
        method: 'get',
        params: params
    });
}
