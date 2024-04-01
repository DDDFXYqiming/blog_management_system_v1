// 用户相关所有请求
import { http } from "../utils";

// 验证码请求
export function identityCodeAPI() {
  return http({
    url: "/code",
    method: "GET",
  });
}

// 注册请求
export function registerAPI(fromData) {
  return http({
    // mock
    url: "/api/register",
    // 真实接口
    // url:"/signup",

    method: "POST",
    data: fromData,
  });
}

// 账号密码登陆请求
export function loginAPI(fromData) {
  return http({
    // mock
    url: "/api/login",
    // 真实接口
    // url:'/login/pw',

    method: "POST",
    data: fromData,
  });
}

// 邮箱登陆请求
export function loginEmailAPI(fromData) {
  return http({
    // 真实接口
    url:'/login/email/pw',

    method: "POST",
    data: fromData,
  });
}

// 退出请求
export function logoutAPI() {
  return http({
    
    // 真实接口
    url:'/logout',

    method: "POST",
  });
}

// 获取用户信息
export function getProfileAPI() {
  return http({
    // mock
    url: "/api/userinfo",
    // 真实接口
    // url: "/ac/1/info",

    method: "GET",
  });
}

// 请求修改用户信息
export function updateProfileAPI(fromData) {
  return http({
    url: "/api/updateuserinfo",
    method: "POST",
    data: fromData,
  });
}
