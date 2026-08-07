import { Avatar, Breadcrumb, Card, Divider, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import UserProfile from './component/UserProfile'
import MyArticles from './component/MyArticles'
import MyLikes from './component/MyLikes'
import MyFollowers from './component/MyFollowers'
import './index.scss'

const MyHomepage = () => {
  const { name, avatarUrl } = useSelector((state: RootState) => state.user.userInfo)
  const tabItems = [
    { label: '个人资料', key: '1', children: <UserProfile /> },
    { label: '我的文章', key: '2', children: <MyArticles /> },
    { label: '我的收藏', key: '3', children: <MyLikes /> },
    { label: '关注/粉丝', key: '4', children: <MyFollowers /> },
  ]

  return (
    <div className="myHomepage">
      <Card
        className="card"
        title={<Breadcrumb items={[{ title: <Link to="/">首页</Link> }, { title: '个人中心' }]} />}
      >
        <div>
          <Avatar src={avatarUrl} style={{ verticalAlign: 'middle', marginRight: 100 }} size="default" />
          <span>{name}</span>
        </div>
        <Divider />
        <Tabs style={{ width: '100%' }} defaultActiveKey="1" type="card" size="large" items={tabItems} />
      </Card>
    </div>
  )
}

export default MyHomepage
