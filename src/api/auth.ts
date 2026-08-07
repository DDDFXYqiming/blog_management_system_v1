import type {
  ApiResponse,
  IdentityCode,
  LoginForm,
  RegisterForm,
  UserInfo,
} from '@/types'
import { http } from './http'

/** 获取图形验证码 */
export function identityCodeAPI(): Promise<ApiResponse<IdentityCode>> {
  return http.get('/api/code')
}

/** 注册 */
export function registerAPI(data: RegisterForm): Promise<ApiResponse<null>> {
  return http.post('/api/register', data)
}

/** 账号密码登录 */
export function loginAPI(data: LoginForm): Promise<ApiResponse<{ token: string }>> {
  return http.post('/api/login', data)
}

/** 邮箱登录（真实接口路径，Mock 中同样支持） */
export function loginEmailAPI(data: LoginForm): Promise<ApiResponse<{ token: string }>> {
  return http.post('/login/email/pw', data)
}

/** 邮箱验证码发送 */
export function sendEmailCodeAPI(data: { email: string }): Promise<ApiResponse<null>> {
  return http.post('/api/email-code', data)
}

/** 退出登录 */
export function logoutAPI(): Promise<ApiResponse<null>> {
  return http.post('/logout')
}

/** 获取当前用户信息 */
export function getProfileAPI(): Promise<ApiResponse<UserInfo>> {
  return http.get('/api/userinfo')
}

/** 更新用户信息 */
export function updateProfileAPI(data: Partial<UserInfo>): Promise<ApiResponse<null>> {
  return http.post('/api/updateuserinfo', data)
}
