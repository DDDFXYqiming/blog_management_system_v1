import type { ApiResponse, Comment, CommentQuery } from '@/types'
import { http } from './http'

/** 获取评论列表 */
export function getCommentsListAPI(
  params: CommentQuery,
): Promise<ApiResponse<{ commentsData: Comment[]; sortOrder: string }>> {
  return http.get('/api/commentList', { params })
}

/** 发表评论 */
export function publishCommentAPI(data: { content: string }): Promise<ApiResponse<Comment>> {
  return http.post('/api/comment', data)
}
