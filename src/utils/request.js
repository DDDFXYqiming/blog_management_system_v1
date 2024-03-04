// axios封装
import axios from "axios";
import { getToken } from "./token";
// 跟域名配置
// 超时时间
const http = axios.create({
  baseURL: "https://whole-similarly-impala.ngrok-free.app",
  timeout: 5000,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 注入token数据
    const token = getToken()
    if(token){
      config.headers.Authorization = `${token}`
    }
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
    return Promise.reject(error);
  }
);

export { http };
