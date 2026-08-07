import { Breadcrumb, Button, Card, Flex, Form, List, Pagination, Radio, Select } from 'antd'
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

const Article = () => {
  const navigate = useNavigate()
  const { channelList } = useChannel()
  const [list, setList] = useState<Article[]>([])
  const [count, setCount] = useState(0)
  const [reqData, setReqData] = useState<ArticleQuery>({
    status: '',
    channel_id: 0,
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
      <div className="main-article">
        <Card
          title={<Breadcrumb items={[{ title: <Link to="/">首页</Link> }, { title: '文章列表' }]} />}
          style={{ marginBottom: 20 }}
        >
          <Form initialValues={{ status: '' }} onFinish={onFinish}>
            <Flex>
              <Form.Item label="状态" name="status">
                <Radio.Group>
                  <Radio value={''}>综合</Radio>
                  <Radio value={1}>最新</Radio>
                  <Radio value={2}>热门</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="专栏" name="channel_id">
                <Select placeholder="请选择文章专栏" style={{ width: 120 }} allowClear>
                  {channelList.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                  筛选
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Card>
        <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a
                      onClick={() => navigate('/articleDetailLayout')}
                      style={{ cursor: 'pointer' }}
                    >
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
          <Flex justify="center" style={{ marginTop: 16 }}>
            <Pagination
              current={reqData.page}
              pageSize={reqData.per_page}
              total={count}
              showSizeChanger={false}
              onChange={onPageChange}
            />
          </Flex>
        </Card>
      </div>
    </div>
  )
}

export default Article
