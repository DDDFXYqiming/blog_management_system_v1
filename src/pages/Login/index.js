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
  const navigete = useNavigate()
  const onFinish = async (values) => {
    // 登陆逻辑 触发异步action
    await dispatch(fetchLogin(values));
    navigete('/')
    message.success('登陆成功')
  };

  // // 测试后端通信
  // const test = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://whole-similarly-impala.ngrok-free.app/code.jpg",
  //       {
  //         // 设置 withCredentials 为 true，以携带 cookies
  //         withCredentials: true,
  //       }
  //     );
  //     console.log("数据", response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   test();
  // }, []);

  return (
    <div className="login">
      <Card className="login-container">
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
