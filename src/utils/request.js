import axios from 'axios'
import {ElMessage, ElMessageBox} from 'element-plus'
import store from '@/store'
import {getToken, getTokenHeader, checkToken} from '@/utils/auth'
import {getNewObjByJson} from "@/utils/index";

// 创建 axios 实例
const service = axios.create({
    // 前端配置跨域
    baseURL: process.env.VUE_APP_MOCK === "true" ? "" : process.env.VUE_APP_CROS_API,

    // 全局设置请求头
    //headers: { "content-type": "application/x-www-form-urlencoded" },
    timeout: 10000 // 请求超时时间
});

// 接口报错，默认提示信息
const API_ERROR_DEFAULT_MSG = process.env.VUE_APP_ERROR_DEFAULT_MSG;

// TODO 注意，这里提取变量，如果页面没有真正刷新（目前vue用的reload就不是完全刷新网页），会导致不调用方法，导致变量值为 null
// JWT 授权认证标识
//let tokenHeader = getTokenHeader();
// JWT token
//let token = getToken();


// request 拦截器
service.interceptors.request.use(config => {
    if (getTokenHeader() && getToken()) { // 改成方法参数，每次都会执行
        config.headers[getTokenHeader()] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (process.env.VUE_APP_ENV !== "prod") {
        //console.log(">>>> request config:", JSON.stringify(config));
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
                ElMessageBox.confirm('您的登录状态已失效，请重新登录', '登录提示', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 显示登录弹窗
                    //store.commit('SET_USER_LOGIN_DIALOG_VISIBLE', true);
                    store.dispatch('userLogin/setDialogVisible', true);
                }).catch(() => { // 点取消，或空白区域，跳转默认数据首页
                    /*
                    ElMessage({
                        message: res.message ? res.message : API_ERROR_DEFAULT_MSG,
                        type: 'error',
                        duration: 3 * 1000
                    });
                    */
                });
            } else if (res.code === 403) { // 403-没有权限;
                ElMessage({
                    message: res.message ? res.message : API_ERROR_DEFAULT_MSG,
                    type: 'error',
                    duration: 3 * 1000
                });
            } else if (res.code === 400) { // 400-方法校验失败;
                ElMessage({
                    message: res.message ? res.message : API_ERROR_DEFAULT_MSG,
                    type: 'error',
                    duration: 3 * 1000
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
        console.log(error); // for debug
        ElMessage({
            message: API_ERROR_DEFAULT_MSG ? API_ERROR_DEFAULT_MSG : error.message,
            type: 'error',
            duration: 3 * 1000
        });
        return Promise.reject(error ? error : 'error');
    }
);

export default service
