import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { identityCodeAPI, registerAPI } from "../../apis/user";
import VerificationCode from "./VerificationCode/VerificationCode";

const Register = () => {
  const [identityCode, setIdentityCode] = useState("");
  const [identity, setIdentity] = useState("");
  const navigete = useNavigate();

  const onFinish = async (values) => {
    // 注册逻辑 触发异步action
    const addIdentity = { ...values, identity: identity };

    // console.log(addIdentity)
    const res = await registerAPI(addIdentity);
    console.log("注册返回值：", res);
    if (res.code !== "200") {
      message.error("注册失败，验证码错误或存在同名用户名");
      return;
    }

    message.success("注册成功");
    navigete("/login");
  };

  useEffect(() => {
    const getcode = async () => {
      const res = await identityCodeAPI();
      // console.log(res)
      setIdentity(res.identity);
      setIdentityCode(`data:image/png;base64,${res.image}`);
    };
    getcode();
  }, []);

  return (
    <div className="register">
      <Card title="注册页面" className="register-container">
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="nickname"
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
            rules={[
              {
                required: true,
                message: "请输入邮箱",
              },
              {
                type: "email",
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
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?~\-]).{6,18}$/,
                message:
                  "密码必须包含小写字母、大写字母、特殊字符，并且长度为6-18个字符",
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
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致"));
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
            <img
              src={identityCode}
              alt="验证码"
              className="verification-image"
            />
            {/* 获取验证码图片组件 */}
            {/* <VerificationCode /> */}
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
