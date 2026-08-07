import axios from 'axios'
import { message } from 'antd'
import { getToken, removeToken } from './token'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 10000,
  withCredentials: true,
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const data = error.response?.data
    if (data?.message) {
      message.error(data.message)
    }
    // 登录态失效：清理 token 并回到登录页
    if (error.response?.status === 401 && !window.location.pathname.startsWith('/login')) {
      removeToken()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export { http }
