import { Button, Card, Flex, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { identityCodeAPI, registerAPI } from '@/api'
import './index.scss'

interface RegisterValues {
  nickname: string
  email: string
  password: string
  repassword: string
  text: string
}

const Register = () => {
  const [identityCode, setIdentityCode] = useState('')
  const [identity, setIdentity] = useState('')
  const navigate = useNavigate()

  const refreshIdentityCode = async () => {
    const res = await identityCodeAPI()
    setIdentity(res.data.identity)
    setIdentityCode(res.data.image)
  }

  useEffect(() => {
    void refreshIdentityCode()
  }, [])

  const onFinish = async (values: RegisterValues) => {
    const res = await registerAPI({
      nickname: values.nickname,
      email: values.email,
      password: values.password,
      text: values.text,
      identity,
    })
    if (res.code !== 200) {
      message.error('注册失败，验证码错误或存在同名用户名')
      return
    }
    message.success('注册成功')
    navigate('/login')
  }

  return (
    <div className="register">
      <Card title="注册页面" className="register-container">
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="nickname"
            rules={[
              { required: true, message: '请输入账号' },
              { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,12}$/, message: '请输入正确的账号格式' },
            ]}
          >
            <Input size="large" placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' },
            ]}
          >
            <Input size="large" placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?~\-]).{6,18}$/,
                message: '密码必须包含小写字母、大写字母、特殊字符，并且长度为6-18个字符',
              },
            ]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name="repassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value: string) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="请再次确认密码" />
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
          <a href="/login">已有账号？登陆</a>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Register
