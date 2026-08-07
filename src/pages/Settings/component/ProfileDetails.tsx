import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Layout,
  Radio,
  Row,
  Select,
  Tabs,
  Upload,
  message,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { updateProfileAPI } from '@/api'
import type { RootState } from '@/store'
import type { UserInfo } from '@/types'
import locale from 'antd/es/date-picker/locale/zh_CN'

const genderList = [
  { label: '不公开', key: 0 },
  { label: '男', key: 1 },
  { label: '女', key: 2 },
]

const maritalStatusList = [
  { label: '不公开', key: 0 },
  { label: '未婚', key: 1 },
  { label: '已婚', key: 2 },
  { label: '离异', key: 3 },
]

const educationDegreeList = [
  { label: '不公开', key: 0 },
  { label: '小学', key: 1 },
  { label: '初中', key: 2 },
  { label: '高中', key: 3 },
  { label: '本科', key: 4 },
  { label: '硕士', key: 5 },
  { label: '博士', key: 6 },
]

const dateFormat = 'YYYY-MM-DD'

interface BasicFormValues {
  name: string
  gender: number
  profile: string
  birthday: string
  maritalStatus: number
}

interface ContactFormValues {
  QQ: string
  email: string
  mobile: string
}

interface EducationFormValues {
  highestEducationSchool: string
  highestEducationMajor: string
  highestEducationDegree: number
}

interface EmploymentFormValues {
  industry: string
  jobTitle: string
}

const ProfileDetails = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const {
    name,
    gender,
    profile,
    birthday,
    maritalStatus,
    QQ,
    mobile,
    email,
    highestEducationSchool,
    highestEducationMajor,
    highestEducationDegree,
    industry,
    jobTitle,
    avatarUrl,
  } = userInfo
  const [degreeFixed, setDegreeFixed] = useState(highestEducationDegree ?? 0)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [hasFile, setHasFile] = useState(false)

  const saveProfile = async (values: Partial<UserInfo>) => {
    await updateProfileAPI({ ...userInfo, ...values })
    message.success('修改成功')
  }

  const onProfileContactFinish = (values: BasicFormValues) => {
    void saveProfile({
      ...values,
      gender: Number(values.gender),
      maritalStatus: Number(values.maritalStatus),
    })
  }

  const onGenerateContactFinish = (values: ContactFormValues) => {
    void saveProfile(values)
  }

  const onEducationFinish = (values: EducationFormValues) => {
    void saveProfile({ ...values, highestEducationDegree: degreeFixed })
  }

  const onEmploymentFinish = (values: EmploymentFormValues) => {
    void saveProfile(values)
  }

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('文件格式需为JPG/PNG！')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小超过2MB！')
    }
    setHasFile(true)
    return isJpgOrPng && isLt2M
  }

  const handleUploadPreview = () => {
    message.success('修改头像成功')
    setPreviewVisible(false)
  }

  const profileContactContent = () => (
    <Form
      name="profileSubmit"
      initialValues={{ name, gender, profile, birthday, maritalStatus }}
      onFinish={onProfileContactFinish}
    >
      <Layout style={{ backgroundColor: 'white', marginLeft: 20 }}>
        <Form.Item name="name" rules={[{ required: true, message: '用户名不能为空' }]}>
          <Row>
            <Col span={6}>用户名</Col>
            <Col span={18}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item name="gender">
          <Row>
            <Col span={6}>性别</Col>
            <Col span={18}>
              <Radio.Group>
                {genderList.map((item) => (
                  <Radio key={item.key} value={item.key}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item name="profile" rules={[{ required: true, message: '个人简介不能为空' }]}>
          <Row>
            <Col span={6}>个人简介</Col>
            <Col span={18}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item name="birthday">
          <Row>
            <Col span={6}>生日</Col>
            <Col span={18}>
              <DatePicker locale={locale} format={dateFormat} />
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item name="maritalStatus">
          <Row>
            <Col span={6}>婚姻状态</Col>
            <Col span={18}>
              <Radio.Group>
                {maritalStatusList.map((item) => (
                  <Radio key={item.key} value={item.key}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Col>
          </Row>
        </Form.Item>
      </Layout>
      <Divider />
      <Flex justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  )

  const generateContactContent = () => (
    <Form name="contactSubmit" initialValues={{ QQ, email, mobile }} onFinish={onGenerateContactFinish}>
      <Layout style={{ backgroundColor: 'white', marginLeft: 20 }}>
        <Form.Item name="QQ" rules={[{ required: true, message: '请输入QQ号码' }]}>
          <Row>
            <Col span={6}>QQ</Col>
            <Col span={18}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Row>
            <Col span={6}>联系邮箱</Col>
            <Col span={18}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="mobile"
          rules={[
            { required: true, message: '请输入电话号码' },
            { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入有效的电话号码' },
          ]}
        >
          <Row>
            <Col span={6}>电话号码</Col>
            <Col span={18}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
      </Layout>
      <Divider />
      <Flex justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  )

  const generateEducationContent = () => (
    <Form
      name="educationSubmit"
      initialValues={{ highestEducationSchool, highestEducationMajor, highestEducationDegree }}
      onFinish={onEducationFinish}
    >
      <Layout style={{ backgroundColor: 'white', marginLeft: 20 }}>
        <Form.Item name="highestEducationSchool" rules={[{ required: true, message: '请输入最高学历学校' }]}>
          <Row>
            <Col span={6}>最高学历学校</Col>
            <Col span={18}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item name="highestEducationMajor" rules={[{ required: true, message: '请输入最高学历专业' }]}>
          <Row>
            <Col span={6}>最高学历专业</Col>
            <Col span={18}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item name="highestEducationDegree">
          <Row>
            <Col span={6}>最高学历</Col>
            <Col span={18}>
              <Select value={degreeFixed} onChange={(value) => setDegreeFixed(value)} style={{ width: '100%' }}>
                {educationDegreeList.map((item) => (
                  <Select.Option key={item.key} value={item.key}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Form.Item>
      </Layout>
      <Divider />
      <Flex justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  )

  const generateEmploymentContent = () => (
    <Form name="employmentSubmit" initialValues={{ industry, jobTitle }} onFinish={onEmploymentFinish}>
      <Layout style={{ backgroundColor: 'white', marginLeft: 20 }}>
        <Form.Item name="industry" rules={[{ required: true, message: '请输入所在行业' }]}>
          <Row>
            <Col span={6}>所在行业</Col>
            <Col span={18}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item name="jobTitle" rules={[{ required: true, message: '请输入职位名称' }]}>
          <Row>
            <Col span={6}>职位名称</Col>
            <Col span={18}>
              <Input />
            </Col>
          </Row>
        </Form.Item>
      </Layout>
      <Divider />
      <Flex justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  )

  const tabItems = [
    { label: '基本资料', key: '1', children: profileContactContent() },
    { label: '联系方式', key: '2', children: generateContactContent() },
    { label: '教育情况', key: '3', children: generateEducationContent() },
    { label: '就业情况', key: '4', children: generateEmploymentContent() },
  ]

  return (
    <div>
      <Flex style={{ width: '100%' }} className="profileFlex" justify="center" align="flex-start" vertical>
        <Row>
          <Col span={4} />
          <Col span={20}>
            <Image
              height={100}
              width={100}
              src={avatarUrl}
              onClick={() => setPreviewVisible(true)}
              preview={{
                mask: '修改头像',
                visible: previewVisible,
                imageRender: () => (
                  <Card title="上传头像" style={{ width: 600, minHeight: 350 }}>
                    <Flex align="flex-start" vertical>
                      <Card style={{ width: '100%', backgroundColor: '#f0f0f0' }}>
                        <ImgCrop rotationSlider>
                          <Upload
                            name="avatarUpload"
                            listType="picture"
                            maxCount={1}
                            beforeUpload={(file: UploadFile) => beforeUpload(file as unknown as File)}
                          >
                            {!hasFile && (
                              <>
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">点击或拖动图片至此处</p>
                              </>
                            )}
                          </Upload>
                        </ImgCrop>
                      </Card>
                      <p>图片宽度*高度至少为150*150像素，大小不超过2MB</p>
                      <Flex style={{ width: '100%' }} align="flex-end" justify="space-between">
                        <p>30天内还可以编辑 5 次</p>
                        {hasFile && (
                          <Button type="primary" danger onClick={handleUploadPreview}>
                            上传头像
                          </Button>
                        )}
                        <Button type="primary" onClick={() => setPreviewVisible(false)}>
                          取消
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                ),
                toolbarRender: () => null,
              }}
            />
          </Col>
        </Row>
        <Tabs
          defaultActiveKey="1"
          type="line"
          size="large"
          items={tabItems}
          style={{ marginLeft: 20, paddingRight: 20, width: '100%', minWidth: 400 }}
        />
      </Flex>
    </div>
  )
}

export default ProfileDetails
