/** 统一接口响应结构 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/** 专栏 */
export interface Channel {
  id: number
  name: string
}

/** 文章 */
export interface Article {
  id: string
  title: string
  content?: string
  status: number
  channel_id?: number
  pubdate: string
  read_count: number
  like_count: number
  comment_count: number
  author?: string
}

/** 文章列表查询参数 */
export interface ArticleQuery {
  status?: number | string
  channel_id?: number | string
  page?: number
  per_page?: number
}

/** 评论 */
export interface Comment {
  id: string
  username: string
  content: string
  pubdate: string
  like_count: number
}

/** 评论列表查询参数 */
export interface CommentQuery {
  sortOrder?: 'hot' | 'new'
}

/** 用户资料 */
export interface UserInfo {
  id?: number
  name?: string
  gender?: number
  profile?: string
  birthday?: string
  maritalStatus?: number
  QQ?: string
  mobile?: string
  email?: string
  highestEducationSchool?: string
  highestEducationMajor?: string
  highestEducationDegree?: number
  industry?: string
  jobTitle?: string
  avatarUrl?: string
}

/** 验证码接口返回 */
export interface IdentityCode {
  identity: string
  image: string
}

/** 登录表单 */
export interface LoginForm {
  nickname?: string
  password?: string
  text?: string
  email?: string
  identity?: string
}

/** 注册表单 */
export interface RegisterForm {
  nickname: string
  email: string
  password: string
  text: string
  identity?: string
}
