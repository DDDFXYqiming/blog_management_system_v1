import { Card, List } from 'antd'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/api'
import type { Article, ArticleQuery } from '@/types'
import BarChart from './component/BarChart'
import './index.scss'

const Home = () => {
  const [list, setList] = useState<Article[]>([])
  const [count, setCount] = useState(0)
  const [reqData] = useState<ArticleQuery>({
    status: 'all',
    channel_id: '0',
    page: 1,
    per_page: 4,
  })

  useEffect(() => {
    const getList = async () => {
      const res = await getArticleListAPI(reqData)
      setList(res.data.articleData)
      setCount(res.data.total_count)
    }
    void getList()
  }, [reqData])

  return (
    <div className="home">
      <Card className="card" title="今日推荐">
        <BarChart title="近三日阅读量" />
      </Card>
      <Card className="card" title={`推荐文章（共 ${count} 篇）`}>
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a href="/articleDetailLayout" target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                }
                description="面向技术人员的知识博客"
              />
              <div>read_count {item.read_count} |</div>
              <div>like_count {item.like_count} |</div>
              <div>pubdate {item.pubdate} |</div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default Home
