import "./index.scss";
import {
  Statistic,
  Card,
  Form,
  Input,
  Button,
  Image,
  message,
  Tabs,
  Space,
  Flex,
  ConfigProvider,
} from "antd";
// import logo from '@/assets/logo.png'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin, fetchLoginEmail } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";
import VerificationCode from "../Register/VerificationCode/VerificationCode";
import { identityCodeAPI } from "../../apis/user";
const { Countdown } = Statistic;

const Login = () => {
  const [identityCode, setIdentityCode] = useState("");
  const [identity, setIdentity] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUPFinish = async (values) => {
    const addIdentity = { ...values, identity: identity };
    console.log("账号密码登陆发给后端登陆数据", addIdentity);
    try {
      await dispatch(fetchLogin(addIdentity));

      navigate("/");
      message.success("登陆成功");
    } catch (error) {
      message.error("登陆失败，请检查用户名和密码");
    }
  };

  // 组件挂载时获取验证码
  useEffect(() => {
    const getcode = async () => {
      const res = await identityCodeAPI();
      // console.log(res)
      setIdentity(res.identity);
      setIdentityCode(`data:image/png;base64,${res.image}`);
    };
    getcode();
  }, []);

  // 用户名密码登陆表单
  const usernamePasswordLogin = () => (
    <Form onFinish={onUPFinish} validateTrigger="onBlur">
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
        <img src={identityCode} alt="验证码" className="verification-image" />
        {/* 获取验证码图片组件 */}
        {/* <VerificationCode /> */}
      </div>
      <a href="/register">没有账号？注册</a>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          登录
        </Button>
      </Form.Item>
    </Form>
  );

  // 邮箱登录表
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  let email = "";
  // 正则表达式用于验证邮箱格式
  const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  // 倒计时时间
  const deadtime = 15;
  const deadline = Date.now() + 1000 * deadtime;

  const enterLodaing = () => {
    // 获取邮箱值
    // antDesign表单实例方法
    // 获取一组字段名对应的值，会按照对应结构返回。默认返回现存字段值，当调用 getFieldsValue(true) 时返回所有值
    const formValues = formRef.current.getFieldsValue();
    email = formValues.email; // 保存邮箱值到 email 变量

    if (emailRegex.test(email)) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1000 * deadtime);
    } else {
      message.error("请输入正确的邮箱");
    }
  };

  const onEmailFinish = async (values) => {
    const addIdentity = { ...values, identity: identity };
    console.log("邮箱登录发给后端登陆数据", addIdentity);
    try {
      await dispatch(fetchLoginEmail(addIdentity));

      navigate("/");
      message.success("登陆成功");
    } catch (error) {
      message.error("登陆失败，请检查用户名和密码");
    }
  };

  const emailLogin = () => (
    <Form onFinish={onEmailFinish} validateTrigger="onBlur" ref={formRef}>
      <Form.Item
        name="email"
        // 校验逻辑
        rules={[
          {
            required: true,
            message: "请输入邮箱",
          },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: "请输入正确的邮箱格式",
          },
        ]}
      >
        <Input size="large" placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item
        name="text"
        rules={[
          {
            required: true,
            message: "请输入邮箱验证码",
          },
        ]}
      >
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Input size="large" placeholder="请输入邮箱验证码" />
          <Button
            size="large"
            type="primary"
            loading={loading}
            onClick={enterLodaing}
          >
            {loading ? (
              <>
                <Countdown
                  valueStyle={{
                    color: "white",
                    fontSize: "15px",
                  }}
                  value={deadline}
                  format={`s秒可再次发送`}
                />
              </>
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
  );

  const tabsitems = [
    {
      label: `账号密码登陆`,
      key: "1",
      children: usernamePasswordLogin(),
    },
    {
      label: `邮箱登录`,
      key: "2",
      children: emailLogin(),
    },
  ];

  return (
    <div className="login">
      <Card title="登陆页面" className="login-container">
        <Tabs defaultActiveKey="1" items={tabsitems}>
          onChange={() => {}}
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
