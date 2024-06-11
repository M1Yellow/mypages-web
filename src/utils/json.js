import request from '@/utils/request';

const fs = require('fs');
const path = require('path');

export function parseJson(filePath) {
    // 读取指定的json文件
    const json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    // 解析并返回
    // console.log(json);
    return JSON.parse(json);
}

export function parseJsonFile(filePath) {
    return request({
        url:filePath
    });
}
