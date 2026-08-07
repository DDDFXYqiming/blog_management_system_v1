import type { ApiResponse, Article, ArticleQuery, Channel } from '@/types'
import { http } from './http'

/** 获取专栏列表 */
export function getChannelAPI(): Promise<ApiResponse<{ channels: Channel[] }>> {
  return http.get('/api/channelList')
}

/** 发布文章 */
export function createArticleAPI(data: {
  title: string
  content: string
  channel_id: number
}): Promise<ApiResponse<Article>> {
  return http.post('/api/mp/articles', data)
}

/** 获取文章列表 */
export function getArticleListAPI(
  params: ArticleQuery,
): Promise<
  ApiResponse<{
    articleData: Article[]
    total_count: number
    status: string | number
    channel_id: string | number
    page: number
    per_page: number
  }>
> {
  return http.get('/api/articleList', { params })
}
