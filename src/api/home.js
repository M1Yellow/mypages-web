import request from '@/utils/request'

export function initAllData(params) {
    return request({
        url:'/home/platformList',
        method:'get',
        params:params
    });
}

export function getJsonData(filePath) {
    return request({
        url:filePath
    });
}
