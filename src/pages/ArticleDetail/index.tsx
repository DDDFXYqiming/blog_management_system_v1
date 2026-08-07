import { Avatar, Button, Card, Divider, Flex, Layout, Popover, Space, Tag } from 'antd'
import { LikeOutlined, StarOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '@/store/userSlice'
import type { AppDispatch, RootState } from '@/store'
import CommentsPanel from './components/CommentsPanel'
import './index.scss'

const ArticleDetail = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { avatarUrl } = useSelector((state: RootState) => state.user.userInfo)
  const [likeState, setLikeState] = useState<'text' | 'link'>('text')
  const [starState, setStarState] = useState<'text' | 'link'>('text')

  useEffect(() => {
    void dispatch(fetchUserInfo())
  }, [dispatch])

  return (
    <div className="articleDetail">
      <Card className="card">
        <h1>文章标题</h1>
        <Card style={{ backgroundColor: '#f0f0f0' }}>
          <Flex vertical gap="small">
            <Flex justify="space-between">
              <div>文章作者</div>
              <div>发布时间</div>
            </Flex>
            <Flex justify="start" gap="large">
              <div>阅读量</div>
              <div>点赞量</div>
              <div>评论量</div>
            </Flex>
            <Flex justify="start" gap="large">
              <div>文章标签:</div>
              <Flex gap="small">
                <Tag>标签1</Tag>
                <Tag>标签2</Tag>
                <Tag>标签3</Tag>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Divider />
        <div>分类专栏</div>
        <Divider />
        <div style={{ minHeight: 400 }}>文章内容</div>
        <Divider />
        <Layout className="footerLayout">
          <Flex align="center">
            <Space size="small">
              <Avatar src={avatarUrl} size="small" />
              <div>文章作者</div>
            </Space>
          </Flex>
          <Flex>
            <Space size="large">
              <Popover content={<div>点赞</div>}>
                <Button
                  type={likeState}
                  icon={<LikeOutlined />}
                  onClick={() => setLikeState(likeState === 'text' ? 'link' : 'text')}
                />
              </Popover>
              <Popover content={<div>收藏</div>}>
                <Button
                  type={starState}
                  icon={<StarOutlined />}
                  onClick={() => setStarState(starState === 'text' ? 'link' : 'text')}
                />
              </Popover>
            </Space>
          </Flex>
        </Layout>
        <Divider />
        <CommentsPanel />
      </Card>
    </div>
  )
}

export default ArticleDetail
