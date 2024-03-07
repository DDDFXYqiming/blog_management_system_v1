import "./index.scss";
import { Card, Form, Input, Button, Image, message } from "antd";
// import logo from '@/assets/logo.png'
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../apis/user";

const Register = () => {
  const dispatch = useDispatch();
  const navigete = useNavigate()
  
  const onFinish = async (values) => {
    // 登陆逻辑 触发异步action
    await registerAPI(values)
    message.success('注册成功')
    navigete('/login')
  };

  return (
    <div className="register">
      <Card title="注册页面"  className="register-container">
        {/* <img className="login-logo" src={logo} alt="" /> */}
        {/* 注册表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="nickname"
            // 校验逻辑
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
              {
                pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,12}$/,
                message: "请输入正确的账号格式",
              },
            ]}
          >
            <Input size="large" placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="email"
            // 校验逻辑
            rules={[
              {
                required: true,
                message: "请输入邮箱",
              },
              {
                type:'email',
                message: "请输入正确的邮箱格式",
              },
            ]}
          >
            <Input size="large" placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name="repassword"
            rules={[
              {
                required: true,
                message: "请再次确认密码",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input size="large" placeholder="请再次确认密码" />
          </Form.Item>
          <Form.Item
            name="text"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <div className="verification-container">
            <Image src="error" className="verification-image" />
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
  );
};

export default Register;
