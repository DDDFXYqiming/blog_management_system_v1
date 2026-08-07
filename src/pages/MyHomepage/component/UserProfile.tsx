import { Card, Descriptions } from 'antd'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

const labelMap: Record<string, string> = {
  name: '用户名',
  mobile: '电话号码',
  photo: '图片',
  gender: '性别',
  profile: '个人简介',
  birthday: '生日',
  maritalStatus: '婚姻状态',
  QQ: 'QQ',
  email: '邮箱',
  highestEducationSchool: '最高学历学校',
  highestEducationMajor: '最高学历专业',
  highestEducationDegree: '最高学历',
  industry: '所在行业',
  jobTitle: '职位名称',
  avatarUrl: '头像',
}

const UserProfile = () => {
  const userInfoObject = useSelector((state: RootState) => state.user.userInfo)
  const items = Object.entries(userInfoObject)
    .filter(([key]) => key !== 'id')
    .map(([key, value]) => ({
      key,
      label: labelMap[key] ?? key.charAt(0).toUpperCase() + key.slice(1),
      children: String(value),
    }))

  return (
    <Card>
      <Descriptions title={String(userInfoObject.name)} layout="vertical" items={items} />
    </Card>
  )
}

export default UserProfile
