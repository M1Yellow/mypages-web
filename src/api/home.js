import request from '@/utils/request'

export function getJsonData(filePath) {
    return request({
        url: filePath
    });
}

export function initAllData(params) {
    return request({
        url: '/home/platformList',
        method: 'get',
        params: params
    });
}

export function getGlobalProperties(params) {
    return request({
        url: '/home/properties',
        method: 'get',
        params: params
    });
}
