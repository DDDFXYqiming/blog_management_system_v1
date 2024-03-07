import "./index.scss";
import { Card, Form, Input, Button, Image, message } from "antd";
// import logo from '@/assets/logo.png'
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // 登陆逻辑 触发异步action
      await dispatch(fetchLogin(values));
      navigate("/");
      message.success("登陆成功");
    } catch (error) {
      message.error("登陆失败，请检查用户名和密码");
    }
  };

  return (
    <div className="login">
      <Card title="登陆页面" className="login-container">
        {/* <img className="login-logo" src={logo} alt="" /> */}
        {/* 登录表单 */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="username"
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
            name="verification"
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
          <a href="/register">没有账号？注册</a>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
