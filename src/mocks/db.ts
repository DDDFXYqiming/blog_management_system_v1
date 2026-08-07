import type { Article, Channel, Comment, UserInfo } from '@/types'

/** 内存数据库：模拟真实后端存储 */
export const db = {
  users: [] as Array<UserInfo & { password: string; email: string }>,
  tokens: new Set<string>(['mock-token-123']),
  channels: [
    { id: 1, name: '前端开发' },
    { id: 2, name: '后端开发' },
    { id: 3, name: '人工智能' },
    { id: 4, name: '操作系统' },
    { id: 5, name: '随笔杂谈' },
  ] as Channel[],
  articles: [] as Article[],
  comments: [] as Comment[],
  emailCodes: new Map<string, string>(),
  /** 当前图形验证码 */
  identityCode: '',
}

/** 默认用户（与旧版 mock 账号 v/v 对齐） */
export const defaultUser: UserInfo = {
  id: 3,
  name: '银河球棒侠',
  gender: 1,
  profile: '个人简介',
  birthday: '2077-01-01',
  maritalStatus: 0,
  QQ: '888888888',
  mobile: '13312345678',
  email: 'example@example.com',
  highestEducationSchool: '某某大学',
  highestEducationMajor: '某某专业',
  highestEducationDegree: 0,
  industry: 'IT',
  jobTitle: '软件工程师',
  avatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
}

/** 预置文章数据 */
const presetTitles = [
  'React 18 并发特性实践指南',
  '从零搭建 Vite + TypeScript 工程',
  'Redux Toolkit 最佳实践',
  'Ant Design 5 主题定制入门',
  '浏览器渲染原理浅析',
  'HTTP 缓存机制详解',
  'TypeScript 类型体操入门',
  'CSS 布局演进：从浮动到 Grid',
  'Node.js 事件循环探秘',
  '前端工程化这一年',
  '函数式编程在前端的应用',
  '如何写好单元测试',
  'Web 性能优化清单',
  'Monorepo 方案对比',
  '设计系统与组件库建设',
  '微前端落地经验分享',
  'GraphQL 与 REST 之争',
  'WebAssembly 初体验',
  '深拷贝的九种写法',
  '代码评审的艺术',
]

export function initMockData(): void {
  db.articles = presetTitles.map((title, index) => ({
    id: `article-${index + 1}`,
    title,
    content: `${title} 的正文内容。这是一篇用于演示的文章，包含若干段落与示例代码。`,
    status: index % 3,
    channel_id: (index % 5) + 1,
    pubdate: new Date(Date.now() - index * 86400000).toISOString().slice(0, 19).replace('T', ' '),
    read_count: 1000 - index * 47,
    like_count: 100 - index * 4,
    comment_count: 50 - index * 2,
    author: '银河球棒侠',
  }))

  db.comments = Array.from({ length: 10 }, (_, index) => ({
    id: `comment-${index + 1}`,
    username: `评论用户${index + 1}`,
    content: `这是一条第 ${index + 1} 条模拟评论，用于展示评论列表的渲染效果。`,
    pubdate: new Date(Date.now() - index * 3600000).toISOString().slice(0, 19).replace('T', ' '),
    like_count: 100 - index * 9,
  }))
}

/** 生成随机 token */
export function createToken(): string {
  // 固定 token：与浏览器端 localStorage 持久化配合，刷新页面后登录态不丢失
  const token = 'mock-token-123'
  db.tokens.add(token)
  return token
}

/** 校验请求头中的 token 是否有效 */
export function isValidRequest(request: Request): boolean {
  const auth = request.headers.get('Authorization')
  if (!auth?.startsWith('Bearer ')) return false
  return db.tokens.has(auth.slice('Bearer '.length))
}
