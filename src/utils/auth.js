import Cookies from 'js-cookie';
import localStorageUtil from '@/utils/localStorageUtil';
import GlobalConstant from '@/constant/GlobalConstant'

const JWT_DATA_KEY = GlobalConstant.USER_LOGIN_SUCCESS_CACHE_DATA_KEY;
const TOKEN_HEADER_KEY = 'tokenHeader'
const TOKEN_start_KEY = 'tokenStart'
const TOKEN_KEY = 'token'


export function setToken(token) {
  return localStorageUtil.set(TOKEN_KEY, token);
}

export function removeToken() {
  return localStorageUtil.remove(TOKEN_KEY);
}

export function getJwtData() {
  //console.log(">>>> getJwtData:",JWT_DATA_KEY);
  //console.log(">>>> getJwtData:",JSON.stringify(localStorageUtil.get(JWT_DATA_KEY)));
  return localStorageUtil.get(JWT_DATA_KEY);
}

/**
 * JWT 授权认证标识字段 "tokenHeader": "Authorization"
 */
export function getTokenHeader() {
  let jwtData = getJwtData();
  //console.log(">>>> getTokenHeader:",JSON.stringify(jwtData));
  if (!jwtData) {
    return null;
  }
  return jwtData.tokenHeader;
}

/**
 * JWT token 开头字符 "tokenStart": "Bearer "
 */
export function getTokenStart() {
  let jwtData = getJwtData();
  //console.log(">>>> getTokenStart:",JSON.stringify(jwtData));
  if (!jwtData) {
    return null;
  }
  return jwtData.tokenStart;
}

/**
 * 从 JWT data 中获取过期时间 expired
 */
export function getExpired() {
  let jwtData = getJwtData();
  if (!jwtData) {
    return null;
  }
  return jwtData.expired;
}

/**
 * JWT token，需要添加 token 开始字符串
 */
export function getToken() {
  let jwtData = getJwtData();
  //console.log(">>>> getToken:",JSON.stringify(jwtData));
  if (!jwtData) {
    return null;
  }
  let tokenStart = jwtData.tokenStart;
  if (!tokenStart) {
    return null;
  }
  let token = jwtData.token;
  if (!token) {
    return null;
  }
  return tokenStart + token;
}

/**
 * 从 JWT data 中获取 userId
 */
export function getUserId() {
  let jwtData = getJwtData();
  if (!jwtData) {
    return null;
  }
  let userBaseInfo = jwtData.userBaseInfo;
  if (!userBaseInfo) {
    return null;
  }
  if (!userBaseInfo.userId) {
    return null;
  }
  return userBaseInfo.userId;
}

/**
 * 校验 token 是否有效
 * 这里只是前端校验，前端数据用户可以改的，所以后端校验是关键
 * @returns {boolean}
 */
export function checkToken() {
  let expiredTime = getExpired();
  if (process.env.VUE_APP_ENV !== "prod") {
    //console.log(">>>> expiredTime:", expiredTime);
  }
  if (!expiredTime) {
    return false;
  }
  let currentTime = parseInt(new Date().getTime() / 1000); // 单位，统一用秒
  if (process.env.VUE_APP_ENV !== "prod") {
    //console.log(">>>> currentTime:", currentTime);
  }
  if (currentTime >= expiredTime) {
    return false;
  }
  return true;
}
