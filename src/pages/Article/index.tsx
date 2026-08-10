import { Breadcrumb, Button, Card, Flex, Form, Pagination, Radio, Select, Skeleton } from 'antd'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArticleListAPI } from '@/api'
import { useChannel } from '@/hooks/useChannel'
import type { Article, ArticleQuery } from '@/types'
import './index.scss'

const { Option } = Select

interface FilterValues {
  status?: number | ''
  channel_id?: number
}

function formatDate(value: string): string {
  return value.slice(0, 10)
}

const Article = () => {
  const navigate = useNavigate()
  const { channelList } = useChannel()
  const [list, setList] = useState<Article[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [reqData, setReqData] = useState<ArticleQuery>({
    status: '',
    channel_id: 0,
    page: 1,
    per_page: 8,
  })

  useEffect(() => {
    const getList = async () => {
      setLoading(true)
      try {
        const res = await getArticleListAPI(reqData)
        setList(res.data.articleData)
        setCount(res.data.total_count)
      } finally {
        setLoading(false)
      }
    }
    void getList()
  }, [reqData])

  const onFinish = (values: FilterValues) => {
    setReqData((prev) => ({
      ...prev,
      channel_id: values.channel_id ?? 0,
      status: values.status ?? '',
      page: 1,
    }))
  }

  const onPageChange = (page: number) => {
    setReqData((prev) => ({ ...prev, page }))
  }

  return (
    <div className="article">
      <Card
        className="filter-card"
        title={<Breadcrumb items={[{ title: <Link to="/">首页</Link> }, { title: '文章列表' }]} />}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish} layout="inline">
          <Form.Item label="状态" name="status">
            <Radio.Group optionType="button" buttonStyle="solid" size="small">
              <Radio.Button value={''}>综合</Radio.Button>
              <Radio.Button value={1}>最新</Radio.Button>
              <Radio.Button value={2}>热门</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="专栏" name="channel_id">
            <Select placeholder="全部专栏" style={{ width: 140 }} allowClear>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item style={{ marginLeft: 16 }}>
            <Button type="primary" htmlType="submit" size="small">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card className="list-card" title={`共查询到 ${count} 条结果`}>
        {loading ? (
          <Flex vertical gap={16}>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} active paragraph={{ rows: 1 }} />
            ))}
          </Flex>
        ) : list.length === 0 ? (
          <div className="empty-state">
            <p className="empty-title">没有符合条件的文章</p>
            <p className="empty-desc">试试调整筛选条件</p>
          </div>
        ) : (
          <div className="article-list">
            {list.map((item) => (
              <div
                key={item.id}
                className="article-row blog-card-hover"
                onClick={() => navigate('/articleDetailLayout')}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate('/articleDetailLayout')
                }}
              >
                <div className="article-row-main">
                  <div className="article-row-title">{item.title}</div>
                  <div className="article-row-desc">
                    {item.content?.replace(/<[^>]+>/g, '').slice(0, 120) ?? ''}
                  </div>
                </div>
                <div className="article-row-meta">
                  <span>{formatDate(item.pubdate)}</span>
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
              </div>
            ))}
          </div>
        )}
        {count > 0 && (
          <Flex justify="center" style={{ marginTop: 24 }}>
            <Pagination
              current={reqData.page}
              pageSize={reqData.per_page}
              total={count}
              showSizeChanger={false}
              onChange={onPageChange}
            />
          </Flex>
        )}
      </Card>
    </div>
  )
}

export default Article
