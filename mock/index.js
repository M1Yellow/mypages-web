import Mock from 'mockjs';
import * as jsonUtils from './util';

console.log("==== Data from local mock. ====");
// 可以设置延迟时间，来真实模拟请求数据的那段请求过程
Mock.setup({
    timeout: 0
});

// Mock.mock( rurl?, rtype?, template|function( options ) )
// 【手动逐个添加】通过 Mock.mock 匹配拦截路由，不通过后端直接返回模拟数据
//Mock.mock('/view/bb', 'post', produceUserInfo);

/*
// 【自动读取】方式一
let configArray = [];
// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
    if (key === './index.js') return;
    configArray = configArray.concat(files(key).default);
});
// 注册所有的mock服务
configArray.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split('|');
        Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
    }
});
*/

// 【自动读取】方式二
const mockFiles = require.context('./modules', false, /\.js$/);

let mocks = [];
mockFiles.keys().forEach(key => {
    mocks.push(...mockFiles(key));
});

mocks.forEach(item => {
    // mock 拦截的路径需要跟 request 请求的路径一致，或者使用正则匹配
    //Mock.mock(/\/home\/platformList(|\?\S*)$/, item.type, item.response);
    //Mock.mock(process.env.VUE_APP_BASE_API + item.url, item.type, item.response);
});

let homeData = jsonUtils.parseJsonFile('/json/home/platformList.json');
//console.log(homeData);
Mock.mock(/\/home\/platformList(|\?\S*)$/, "get", homeData);

export default Mock;
