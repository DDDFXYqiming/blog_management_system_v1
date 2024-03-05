// axios封装
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "../router";
// 跟域名配置
// 超时时间
const http = axios.create({
  baseURL: "https://whole-similarly-impala.ngrok-free.app",
  timeout: 5000,
  // 设置 withCredentials 为 true，以携带 cookies
  withCredentials: true,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 注入token数据
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 添加 ngrok-skip-browser-warning 标头
    config.headers["ngrok-skip-browser-warning"] = "69420";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数,对响应数据操作
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数,对响应错误操作
    if (error.response.status === 401) {
      removeToken();
      router.navigate("/login");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { http };
