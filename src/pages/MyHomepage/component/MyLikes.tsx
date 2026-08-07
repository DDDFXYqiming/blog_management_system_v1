import { Card, List } from 'antd'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/api'
import type { Article, ArticleQuery } from '@/types'

const MyLikes = () => {
  const [list, setList] = useState<Article[]>([])
  const [count, setCount] = useState(0)
  const [reqData] = useState<ArticleQuery>({
    status: 'all',
    channel_id: '0',
    page: 1,
    per_page: 10,
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
    <div>
      <Card>
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
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>read_count {item.read_count} |</div>
              <div>like_count {item.like_count} |</div>
              <div>pubdate {item.pubdate} |</div>
            </List.Item>
          )}
        />
        <div style={{ textAlign: 'center', color: '#999' }}>共 {count} 篇收藏</div>
      </Card>
    </div>
  )
}

export default MyLikes
