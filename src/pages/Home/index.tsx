import { Avatar, Card, Flex, Skeleton, Tag } from 'antd'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArticleListAPI } from '@/api'
import type { Article, ArticleQuery } from '@/types'
import BarChart from './component/BarChart'
import './index.scss'

function formatDate(value: string): string {
  return value.slice(0, 10)
}

const Home = () => {
  const navigate = useNavigate()
  const [list, setList] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [reqData] = useState<ArticleQuery>({
    status: 'all',
    channel_id: '0',
    page: 1,
    per_page: 12,
  })

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await getArticleListAPI(reqData)
        setList(res.data.articleData)
      } finally {
        setLoading(false)
      }
    }
    void getList()
  }, [reqData])

  const featured = list[0]
  const rest = list.slice(1)

  if (loading) {
    return (
      <div className="home">
        <Skeleton active paragraph={{ rows: 3 }} />
        <div className="article-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="article-card">
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="home">
      {featured && (
        <article
          className="featured-card blog-card-hover"
          onClick={() => navigate('/articleDetailLayout')}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate('/articleDetailLayout')
          }}
        >
          <div className="featured-body">
            <Tag className="featured-tag" color="blue">
              精选
            </Tag>
            <h1 className="featured-title">{featured.title}</h1>
            <p className="featured-excerpt">
              {featured.content?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '点击阅读全文'}
            </p>
            <span className="featured-read-more">阅读全文 →</span>
            <div className="featured-meta">
              <Avatar size="small" style={{ backgroundColor: '#1677ff' }}>
                {featured.author?.[0] ?? '知'}
              </Avatar>
              <span className="meta-author">{featured.author ?? '作者'}</span>
              <span className="meta-dot">·</span>
              <span>{formatDate(featured.pubdate)}</span>
              <span className="meta-dot">·</span>
              <span>{featured.read_count} 阅读</span>
            </div>
          </div>
          <BarChart title="近三日阅读量" />
        </article>
      )}

      <section className="home-section">
        <Flex justify="space-between" align="center" className="section-header">
          <h2 className="section-title">最新文章</h2>
          <span className="section-count">{list.length} 篇</span>
        </Flex>

        {rest.length === 0 ? (
          <Card className="empty-card">
            <div className="empty-state">
              <p className="empty-title">还没有文章</p>
              <p className="empty-desc">去发布第一篇知识博客吧</p>
            </div>
          </Card>
        ) : (
          <div className="article-grid">
            {rest.map((item) => (
              <Card
                key={item.id}
                className="article-card blog-card-hover"
                onClick={() => navigate('/articleDetailLayout')}
                hoverable={false}
              >
                <div className="article-card-title">{item.title}</div>
                <p className="article-card-excerpt">
                  {item.content?.replace(/<[^>]+>/g, '').slice(0, 80) ?? ''}
                </p>
                <div className="article-card-meta">
                  <span>{formatDate(item.pubdate)}</span>
                  <span className="meta-spacer" />
                  <span className="meta-icon">
                    <EyeOutlined /> {item.read_count}
                  </span>
                  <span className="meta-icon">
                    <LikeOutlined /> {item.like_count}
                  </span>
                  <span className="meta-icon">
                    <MessageOutlined /> {item.comment_count}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
