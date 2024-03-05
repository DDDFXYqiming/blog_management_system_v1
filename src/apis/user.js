// 用户相关所有请求
import { http } from "../utils";

// 登陆请求
export function loginAPI(fromData) {
  return http({
    url: "/api/login",
    method: "POST",
    data: fromData,
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
