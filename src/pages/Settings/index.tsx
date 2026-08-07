import { Breadcrumb, Card, Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './index.scss'

const menuItems: MenuProps['items'] = [
  {
    key: 'grp',
    label: '设置',
    type: 'group',
    children: [
      { label: '个人资料', key: 'profileDetails' },
      { label: '隐私设置', key: 'privacySettings' },
      { label: '密码安全', key: 'passwordSecurity' },
    ],
  },
]

const Settings = () => {
  const navigate = useNavigate()
  const [selectedKey, setSelectedKey] = useState('profileDetails')

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    setSelectedKey(key)
  }

  useEffect(() => {
    navigate(`/settings/${selectedKey}`)
  }, [selectedKey, navigate])

  return (
    <div className="settings">
      <Card
        className="card"
        title={<Breadcrumb items={[{ title: <Link to="/">首页</Link> }, { title: '设置' }]} />}
      >
        <Layout style={{ backgroundColor: 'white' }}>
          <Layout.Sider width="25%" style={{ backgroundColor: 'white' }}>
            <Menu
              className="menu"
              items={menuItems}
              selectedKeys={[selectedKey]}
              onClick={onMenuClick}
            />
          </Layout.Sider>
          <Layout style={{ backgroundColor: 'white' }}>
            <Outlet />
          </Layout>
        </Layout>
      </Card>
    </div>
  )
}

export default Settings
