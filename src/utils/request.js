import axios from 'axios'
import {ElMessage, ElMessageBox} from 'element-plus'
import store from '../store'
import {getToken} from '@/utils/auth'

// 创建 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_MOCK === "true" ? "" : process.env.VUE_APP_BASE_CROS, // api 请求的 base_url
    // 全局设置请求头
    //headers: { "content-type": "application/x-www-form-urlencoded" },
    timeout: 10000 // 请求超时时间
});

// 接口报错，默认提示信息
const API_ERROR_DEFAULT_MSG = process.env.VUE_APP_API_ERROR_DEFAULT_MSG;

// request 拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Authorization'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
});

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code：
         * 200-成功
         * 其他-存在错误，结合自己的业务做出操作
         */
        const res = response.data;
        //console.log("request response: " + res.code + "-" + res.message);
        if (res.code !== 200) {
            if (res.code === 500) { // 500-服务器接口出错
                ElMessage({
                    message: res.message ? res.message : API_ERROR_DEFAULT_MSG,
                    type: 'error',
                    duration: 3 * 1000
                });
            } else if (res.code === 401) { // 401-未登录;
                ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload(); // 为了重新实例化 vue-router 对象，避免 bug
                    });
                });
            } else { // 其他，默认
                // 默认提示
                ElMessage({
                    message: API_ERROR_DEFAULT_MSG ? API_ERROR_DEFAULT_MSG : res.message,
                    type: 'error',
                    duration: 3 * 1000
                });
            }

            //return Promise.reject('error');
            return Promise.reject(res.message ? res.message : 'error');
        } else {
            return res;
        }
    },
    error => {
        console.log('error:' + error); // for debug
        ElMessage({
            message: API_ERROR_DEFAULT_MSG ? API_ERROR_DEFAULT_MSG : error.message,
            type: 'error',
            duration: 3 * 1000
        });
        return Promise.reject(error ? error : 'error');
    }
);

export default service
