import { Avatar, Dropdown, Flex, Input, Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { clearUserInfo, fetchUserInfo } from '@/store/userSlice'
import type { AppDispatch, RootState } from '@/store'
import './index.scss'

const { Search } = Input
const { Header } = Layout

const navItems: MenuProps['items'] = [
  { label: '首页', key: '/', icon: <HomeOutlined /> },
  { label: '查看文章', key: '/article', icon: <DiffOutlined /> },
  { label: '发布文章', key: '/publish', icon: <EditOutlined /> },
]

const LayoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const { avatarUrl } = useSelector((state: RootState) => state.user.userInfo)

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  // 菜单高亮：/settings 子路由映射到文章页之外不做额外处理
  const selectedKey = location.pathname

  const logout = () => {
    dispatch(clearUserInfo())
    navigate('/login')
  }

  const userMenu: MenuProps['items'] = [
    { key: 'myhomepage', label: <span onClick={() => navigate('/myhomepage')}>个人中心</span> },
    { key: 'settings', label: <span onClick={() => navigate('/settings/profileDetails')}>设置</span> },
    { type: 'divider' },
    {
      key: 'logout',
      label: (
        <span className="user-logout" onClick={logout}>
          退出
        </span>
      ),
    },
  ]

  const onSearch = () => {
    navigate('/article')
  }

  useEffect(() => {
    void dispatch(fetchUserInfo())
  }, [dispatch])

  return (
    <Layout>
      <Header className="header">
        <Flex align="center" gap={32}>
          <span
            style={{
              fontFamily: 'var(--blog-font-serif)',
              fontSize: 'var(--blog-text-xl)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onClick={() => navigate('/')}
          >
            知识博客
          </span>
          <Menu
            className="menu"
            mode="horizontal"
            items={navItems}
            selectedKeys={[selectedKey]}
            onClick={onMenuClick}
          />
        </Flex>
        <div className="user-info">
          <Flex>
            <Search className="search" placeholder="搜索文章" allowClear onSearch={onSearch} />
            <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
              <Avatar
                src={avatarUrl}
                style={{ verticalAlign: 'middle', cursor: 'pointer' }}
                size="default"
              />
            </Dropdown>
          </Flex>
        </div>
      </Header>
      <Layout>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
