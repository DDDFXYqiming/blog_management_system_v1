import { http } from 'msw'
import { fail, ok } from '../utils'
import { db, isValidRequest } from '../db'
import type { Article, ArticleQuery } from '@/types'

export const articleHandlers = [
  /** 专栏列表 */
  http.get('/api/channelList', ({ request }) => {
    if (!isValidRequest(request)) {
      return fail(401, '未登录或登录信息失效，请重新登录')
    }
    return ok({ channels: db.channels }, '获取专栏列表信息成功')
  }),

  /** 发布文章 */
  http.post('/api/mp/articles', async ({ request }) => {
    if (!isValidRequest(request)) {
      return fail(401, '未登录或登录信息失效，请重新登录')
    }
    const body = (await request.json()) as { title: string; content: string; channel_id: number }
    if (!body.title || !body.content || typeof body.channel_id !== 'number') {
      return fail(401, '发布文章失败')
    }
    const article: Article = {
      id: `article-${Date.now()}`,
      title: body.title,
      content: body.content,
      channel_id: body.channel_id,
      status: 0,
      pubdate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      read_count: 0,
      like_count: 0,
      comment_count: 0,
      author: '银河球棒侠',
    }
    db.articles.unshift(article)
    return ok(article, '发布文章成功')
  }),

  /** 文章列表（支持状态/专栏/分页筛选） */
  http.get('/api/articleList', ({ request }) => {
    if (!isValidRequest(request)) {
      return fail(401, '未登录或登录信息失效，请重新登录')
    }
    const url = new URL(request.url)
    const query = {
      status: url.searchParams.get('status') ?? 'all',
      channel_id: url.searchParams.get('channel_id') ?? '0',
      page: Number(url.searchParams.get('page') ?? 1),
      per_page: Number(url.searchParams.get('per_page') ?? 10),
    } satisfies ArticleQuery

    let list = [...db.articles]
    if (query.status !== 'all' && query.status !== '') {
      list = list.filter((a) => a.status === Number(query.status))
    }
    if (query.channel_id !== '0' && query.channel_id !== '') {
      list = list.filter((a) => a.channel_id === Number(query.channel_id))
    }
    const total = list.length
    const start = (query.page - 1) * query.per_page
    const pageData = list.slice(start, start + query.per_page)
    return ok(
      {
        articleData: pageData,
        total_count: total,
        status: query.status,
        channel_id: query.channel_id,
        page: query.page,
        per_page: query.per_page,
      },
      '获取文章列表成功',
    )
  }),
]
