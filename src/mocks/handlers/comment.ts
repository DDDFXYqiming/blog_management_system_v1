import { http } from 'msw'
import { fail, ok } from '../utils'
import { db, isValidRequest } from '../db'
import type { Comment, CommentQuery } from '@/types'

export const commentHandlers = [
  /** 评论列表（最热/最新排序） */
  http.get('/api/commentList', ({ request }) => {
    if (!isValidRequest(request)) {
      return fail(401, '未登录或登录信息失效，请重新登录')
    }
    const url = new URL(request.url)
    const sortOrder = (url.searchParams.get('sortOrder') ?? 'hot') as CommentQuery['sortOrder']
    const list = [...db.comments]
    if (sortOrder === 'hot') {
      list.sort((a, b) => b.like_count - a.like_count)
    } else {
      list.sort((a, b) => new Date(b.pubdate).getTime() - new Date(a.pubdate).getTime())
    }
    return ok({ commentsData: list, sortOrder: sortOrder ?? 'hot' }, '获取评论列表成功')
  }),

  /** 发表评论 */
  http.post('/api/comment', async ({ request }) => {
    if (!isValidRequest(request)) {
      return fail(401, '未登录或登录信息失效，请重新登录')
    }
    const body = (await request.json()) as { content: string }
    if (!body.content?.trim()) {
      return fail(400, '评论内容不能为空')
    }
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      username: '银河球棒侠',
      content: body.content.trim(),
      pubdate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      like_count: 0,
    }
    db.comments.unshift(comment)
    return ok(comment, '发表成功')
  }),
]
