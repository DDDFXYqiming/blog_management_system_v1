import { Button, Card, Flex, Form, Input, message, Space, Statistic, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { identityCodeAPI, sendEmailCodeAPI } from '@/api'
import { fetchLogin, fetchLoginEmail } from '@/store/userSlice'
import type { AppDispatch } from '@/store'
import './index.scss'

const { Countdown } = Statistic

const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

const Login = () => {
  const [identityCode, setIdentityCode] = useState('')
  const [identity, setIdentity] = useState('')
  const [loading, setLoading] = useState(false)
  const [deadline, setDeadline] = useState(Date.now())
  const [emailForm] = Form.useForm<{ email?: string; text?: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const refreshIdentityCode = async () => {
    const res = await identityCodeAPI()
    setIdentity(res.data.identity)
    setIdentityCode(res.data.image)
  }

  useEffect(() => {
    void refreshIdentityCode()
  }, [])

  const onUPFinish = async (values: { nickname: string; password: string; text: string }) => {
    try {
      await dispatch(fetchLogin({ ...values, identity }))
      navigate('/')
      message.success('登陆成功')
    } catch {
      message.error('登陆失败，请检查用户名和密码')
    }
  }

  const sendEmailCode = () => {
    const email = emailForm.getFieldValue('email') as string | undefined
    if (!email || !emailRegex.test(email)) {
      message.error('请输入正确的邮箱')
      return
    }
    void sendEmailCodeAPI({ email }).then(() => {
      message.success('验证码已发送')
      setLoading(true)
      setDeadline(Date.now() + 1000 * 15)
      setTimeout(() => setLoading(false), 1000 * 15)
    })
  }

  const onEmailFinish = async (values: { email?: string; text?: string }) => {
    try {
      await dispatch(fetchLoginEmail({ ...values, identity }))
      navigate('/')
      message.success('登陆成功')
    } catch {
      message.error('登陆失败，请检查邮箱验证码')
    }
  }

  const usernamePasswordLogin = () => (
    <Form onFinish={onUPFinish} validateTrigger="onBlur">
      <Form.Item
        name="nickname"
        rules={[
          { required: true, message: '请输入账号' },
          { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,12}$/, message: '请输入正确的账号格式' },
        ]}
      >
        <Input size="large" placeholder="请输入账号" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password size="large" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item name="text" rules={[{ required: true, message: '请输入验证码' }]}>
        <Input size="large" placeholder="请输入验证码" />
      </Form.Item>
      <div className="verification-container">
        <Flex align="center" gap={8}>
          {identityCode && (
            <img
              src={identityCode}
              alt="验证码"
              className="verification-image"
              title="点击刷新"
              onClick={() => void refreshIdentityCode()}
            />
          )}
          <span
            className="verification-refresh"
            onClick={() => void refreshIdentityCode()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void refreshIdentityCode()
            }}
          >
            看不清？换一张
          </span>
        </Flex>
      </div>
      <a href="/register">没有账号？注册</a>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )

  const emailLogin = () => (
    <Form form={emailForm} onFinish={onEmailFinish} validateTrigger="onBlur">
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { pattern: emailRegex, message: '请输入正确的邮箱格式' },
        ]}
      >
        <Input size="large" placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item name="text" rules={[{ required: true, message: '请输入邮箱验证码' }]}>
        <Space.Compact style={{ width: '100%' }}>
          <Input size="large" placeholder="请输入邮箱验证码" />
          <Button size="large" type="primary" loading={loading} onClick={sendEmailCode}>
            {loading ? (
              <Countdown
                valueStyle={{ color: 'white', fontSize: 15 }}
                value={deadline}
                format="s秒可再次发送"
              />
            ) : (
              <>发送验证码</>
            )}
          </Button>
        </Space.Compact>
      </Form.Item>
      <a href="/register">没有账号？注册</a>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  )

  const tabItems = [
    { label: '账号密码登陆', key: '1', children: usernamePasswordLogin() },
    { label: '邮箱登录', key: '2', children: emailLogin() },
  ]

  return (
    <div className="login">
      <Card title="登录页面" className="login-container">
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Card>
    </div>
  )
}

export default Login
