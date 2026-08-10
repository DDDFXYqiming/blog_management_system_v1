import { Avatar, Button, Divider, Popover, Space, Tag } from 'antd'
import {
  CalendarOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '@/store/userSlice'
import type { AppDispatch, RootState } from '@/store'
import CommentsPanel from './components/CommentsPanel'
import './index.scss'

const ArticleDetail = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { avatarUrl, name } = useSelector((state: RootState) => state.user.userInfo)
  const [likeState, setLikeState] = useState<'text' | 'link'>('text')
  const [starState, setStarState] = useState<'text' | 'link'>('text')

  useEffect(() => {
    void dispatch(fetchUserInfo())
  }, [dispatch])

  return (
    <div className="article-detail">
      <header className="detail-header">
        <h1 className="detail-title">文章标题</h1>
        <div className="detail-meta">
          <Space size="small">
            <Avatar src={avatarUrl} size="small" />
            <span className="meta-author">{name || '文章作者'}</span>
          </Space>
          <span className="meta-item">
            <CalendarOutlined /> 发布时间
          </span>
          <span className="meta-item">
            <EyeOutlined /> 1.2k 阅读
          </span>
          <span className="meta-item">
            <LikeOutlined /> 128 点赞
          </span>
          <span className="meta-item">
            <MessageOutlined /> 32 评论
          </span>
        </div>
        <div className="detail-tags">
          <Tag>标签1</Tag>
          <Tag>标签2</Tag>
          <Tag>标签3</Tag>
        </div>
      </header>

      <Divider className="detail-divider" />

      <div className="detail-category">分类专栏：前端开发</div>

      <article className="detail-body">
        <p>
          这里是文章正文。作为现代内容平台的阅读页，正文采用居中的阅读列、合适的行高与字号，
          让长文阅读保持舒适。
        </p>
        <p>
          段落之间保留足够的留白，标题层级清晰，图片与代码块有统一的排版规则。
          移动端会自动收窄阅读列，保持一致的阅读体验。
        </p>
        <blockquote>引用的内容会以独立区块呈现，与正文形成层级对比。</blockquote>
        <h2>小节标题</h2>
        <p>
          小节的标题、正文、列表、引用等元素遵循统一的排版体系，
          这是内容平台与普通后台页面最核心的区别。
        </p>
      </article>

      <Divider className="detail-divider" />

      <div className="detail-actions">
        <Popover content={<div>点赞</div>}>
          <Button
            type={likeState}
            shape="round"
            icon={<LikeOutlined />}
            onClick={() => setLikeState(likeState === 'text' ? 'link' : 'text')}
          >
            点赞
          </Button>
        </Popover>
        <Popover content={<div>收藏</div>}>
          <Button
            type={starState}
            shape="round"
            icon={<StarOutlined />}
            onClick={() => setStarState(starState === 'text' ? 'link' : 'text')}
          >
            收藏
          </Button>
        </Popover>
      </div>

      <div className="author-card">
        <Avatar src={avatarUrl} size={48} />
        <div className="author-info">
          <div className="author-name">{name || '文章作者'}</div>
          <div className="author-bio">关注技术、分享知识，在这里记录每一篇思考。</div>
        </div>
      </div>

      <Divider className="detail-divider" />

      <CommentsPanel />
    </div>
  )
}

export default ArticleDetail
