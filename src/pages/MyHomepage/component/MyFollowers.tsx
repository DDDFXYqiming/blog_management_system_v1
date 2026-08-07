import { Button, Card, Flex, List, Tabs } from 'antd'

interface FollowItem {
  name: string
  isFollowing: number
}

const list: FollowItem[] = [
  { name: '1', isFollowing: 1 },
  { name: '2', isFollowing: 0 },
]

const FollowList = () => (
  <Flex>
    <List
      style={{ width: '100%' }}
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Flex style={{ width: '100%' }} justify="space-between" align="start">
            <div>用户名 {item.name} </div>
            <Button
              type={item.isFollowing ? 'primary' : 'default'}
              onMouseEnter={(e) => {
                e.currentTarget.innerText = item.isFollowing ? '取消关注' : '关注'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.innerText = item.isFollowing ? '已关注' : '未关注'
              }}
            >
              {item.isFollowing ? '已关注' : '未关注'}
            </Button>
          </Flex>
        </List.Item>
      )}
    />
  </Flex>
)

const MyFollowers = () => {
  const tabItems = [
    { label: '我的关注', key: '1', children: <FollowList /> },
    { label: '我的粉丝', key: '2', children: <FollowList /> },
  ]

  return (
    <div>
      <Card>
        <Tabs
          defaultActiveKey="1"
          type="line"
          size="large"
          items={tabItems}
          style={{ marginLeft: 20, paddingRight: 20, width: '100%', minWidth: 400 }}
        />
      </Card>
    </div>
  )
}

export default MyFollowers
