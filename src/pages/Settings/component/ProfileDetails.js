import {
  Button,
  Col,
  Divider,
  Input,
  Layout,
  Row,
  Tabs,
  Radio,
  Select,
  DatePicker,
  Form,
  message,
  Flex,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { updateProfileAPI } from "../../../apis/user";
// 时间选择器汉化
import locale from "antd/es/date-picker/locale/zh_CN";

const ProfileDetails = () => {
  const userInfoObject = useSelector((state) => state.user.userInfo);
  const [userInfo, setUserInfo] = useState(userInfoObject);
  // 获取store中用户信息
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
  } = useSelector((state) => state.user.userInfo);

  // 性别选单
  const genderList = [
    {
      label: "不公开",
      key: 0,
    },
    {
      label: "男",
      key: 1,
    },
    {
      label: "女",
      key: 2,
    },
  ];

  // 婚姻状态选单
  const maritalStatusList = [
    {
      label: "不公开",
      key: 0,
    },
    {
      label: "未婚",
      key: 1,
    },
    {
      label: "已婚",
      key: 2,
    },
    {
      label: "离异",
      key: 3,
    },
  ];

  // 生日日期选择器
  const dataFormat = "YYYY-MM-DD";

  // const [dataSelectType, setDataSelectType] = useState("time");
  // const PickerWithType = ({ type, onChange }) => {
  //   if (type === "time") return <DatePicker onChange={onChange} disabled/>;
  //   if (type === "date") return <DatePicker onChange={onChange} />;
  //   return <DatePicker picker={type} onChange={onChange} />;
  // };
  const onDataChange = (value) => {
    console.log(value);
  };

  // 基本资料表单提交
  const onProfileContactFinish = async (values) => {
    // console.log(values)
    values.gender = parseInt(values.gender);
    values.maritalStatus = parseInt(values.maritalStatus);
    const updatedUserInfo = {
      ...userInfo,
      ...values,
    };
    await updateProfileAPI(updatedUserInfo);
    message.success("修改成功");
  };

  // 生成个人信息部分
  const profileContactContent = () => (
    <Form
      name="profileSubmit"
      initialValues={{
        name: name,
        gender: gender,
        profile: profile,
        birthday: birthday,
        maritalStatus: maritalStatus,
      }}
      onFinish={onProfileContactFinish}
    >
      <Layout
        style={{
          backgroundColor: "white",
          marginLeft: 20,
        }}
      >
        <Form.Item
          // label="username"
          name="name"
          rules={[
            {
              required: true,
              message: "用户名不能为空",
            },
          ]}
        >
          <Row>
            <Col span={6}>用户名</Col>
            <Col span={18}>
              <Input defaultValue={name}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          // label="gender"
          name="gender"
        >
          <Row>
            <Col span={6}>性别</Col>
            <Col span={18}>
              <Radio.Group defaultValue={gender}>
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
        <Form.Item
          // label="profile"
          name="profile"
          rules={[
            {
              required: true,
              message: "个人简介不能为空",
            },
          ]}
        >
          <Row>
            <Col span={6}>个人简介</Col>
            <Col span={18}>
              <Input defaultValue={profile}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          // label="birthday"
          name="birthday"
        >
          <Row>
            <Col span={6}>生日</Col>
            <Col span={18}>
              {/* <Select value={dataSelectType} onChange={setDataSelectType}>
              <Option value="time">不公开</Option>
              <Option value="date">公开</Option>
            </Select>
            <PickerWithType
              type={dataSelectType}
              onChange={(value) => console.log(value)}
            /> */}
              <DatePicker
                locale={locale}
                defaultValue={dayjs(birthday, dataFormat)}
                onChange={onDataChange}
              />
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          // label="maritalStatus"
          name="maritalStatus"
        >
          <Row>
            <Col span={6}>婚姻状态</Col>
            <Col span={18}>
              <Radio.Group defaultValue={maritalStatus}>
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
  );

  const onGenerateContactFinish = async (values) => {
    const updatedUserInfo = {
      ...userInfo,
      ...values,
    };
    await updateProfileAPI(updatedUserInfo);
    message.success("修改成功");
  };

  // 生成联系方式部分
  const generateContactContent = () => (
    <Form
      name="contactSubmit"
      initialValues={{
        QQ: QQ,
        email: email,
        mobile: mobile,
      }}
      onFinish={onGenerateContactFinish}
    >
      <Layout
        style={{
          backgroundColor: "white",
          marginLeft: 20,
        }}
      >
        <Form.Item
          name="QQ"
          rules={[
            {
              required: true,
              message: "请输入QQ号码",
            },
          ]}
        >
          <Row>
            <Col span={6}>QQ</Col>
            <Col span={18}>
              <Input defaultValue={QQ}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "请输入邮箱",
            },
            {
              type: "email",
              message: "请输入有效的邮箱地址",
            },
          ]}
        >
          <Row>
            <Col span={6}>联系邮箱</Col>
            <Col span={18}>
              <Input defaultValue={email}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="mobile"
          rules={[
            {
              required: true,
              message: "请输入电话号码",
            },
            {
              pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
              message: "请输入有效的电话号码",
            },
          ]}
        >
          <Row>
            <Col span={6}>电话号码</Col>
            <Col span={18}>
              <Input defaultValue={mobile}></Input>
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
  );

  // 最高学历选单
  const educationDegreeList = [
    {
      label: "不公开",
      key: 0,
    },
    {
      label: "小学",
      key: 1,
    },
    {
      label: "初中",
      key: 2,
    },
    {
      label: "高中",
      key: 3,
    },
    {
      label: "本科",
      key: 4,
    },
    {
      label: "硕士",
      key: 5,
    },
    {
      label: "博士",
      key: 6,
    },
  ];

  const [degreeFixed, setDegreeFixed] = useState(highestEducationDegree);

  const onEducationFinish = async (values) => {
    values.highestEducationDegree = degreeFixed;
    const updatedUserInfo = {
      ...userInfo,
      ...values,
    };
    // console.log('教育表单更新',updatedUserInfo)
    await updateProfileAPI(updatedUserInfo);
    message.success("修改成功");
  };

  // 生成教育情况部分
  const generateEducationContent = () => (
    <Form
      name="educationSubmit"
      initialValues={{
        highestEducationSchool: highestEducationSchool,
        highestEducationMajor: highestEducationMajor,
        highestEducationDegree: highestEducationDegree,
      }}
      onFinish={onEducationFinish}
    >
      <Layout
        style={{
          backgroundColor: "white",
          marginLeft: 20,
        }}
      >
        <Form.Item
          name="highestEducationSchool"
          rules={[
            {
              required: true,
              message: "请输入最高学历学校",
            },
          ]}
        >
          <Row>
            <Col span={6}>最高学历学校</Col>
            <Col span={18}>
              <Input defaultValue={highestEducationSchool}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="highestEducationMajor"
          rules={[
            {
              required: true,
              message: "请输入最高学历专业",
            },
          ]}
        >
          <Row>
            <Col span={6}>最高学历专业</Col>
            <Col span={18}>
              <Input defaultValue={highestEducationMajor}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item name="highestEducationDegree">
          <Row>
            <Col span={6}>最高学历</Col>
            <Col span={18}>
              <Select
                defaultValue={degreeFixed}
                onChange={(value) => {
                  // console.log('select选中数据',value)
                  setDegreeFixed(value);
                }}
                style={{ width: "100%" }}
              >
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
  );

  const onEmploymentFinish = async (values) => {
    const updatedUserInfo = {
      ...userInfo,
      ...values,
    };
    await updateProfileAPI(updatedUserInfo);
    message.success("修改成功");
  };

  // 生成就业情况部分
  const generateEmploymentContent = () => (
    <Form
      name="employmentSubmit"
      initialValues={{
        industry: industry,
        jobTitle: jobTitle,
      }}
      onFinish={onEmploymentFinish}
    >
      <Layout
        style={{
          backgroundColor: "white",
          marginLeft: 20,
        }}
      >
        <Form.Item
          name="industry"
          rules={[
            {
              required: true,
              message: "请输入所在行业",
            },
          ]}
        >
          <Row>
            <Col span={6}>所在行业</Col>
            <Col span={18}>
              <Input defaultValue={industry}></Input>
            </Col>
          </Row>
        </Form.Item>
        <Divider />
        <Form.Item
          name="jobTitle"
          rules={[
            {
              required: true,
              message: "请输入职位名称",
            },
          ]}
        >
          <Row>
            <Col span={6}>职位名称</Col>
            <Col span={18}>
              <Input defaultValue={jobTitle}></Input>
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
  );

  const tabsitems = [
    {
      label: `基本资料`,
      key: "1",
      children: profileContactContent(),
    },
    {
      label: `联系方式`,
      key: "2",
      children: generateContactContent(), // 使用生成联系方式内容的函数
    },
    {
      label: `教育情况`,
      key: "3",
      children: generateEducationContent(), // 使用生成教育情况内容的函数
    },
    {
      label: `就业情况`,
      key: "4",
      children: generateEmploymentContent(), // 使用生成就业情况内容的函数
    },
  ];

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="tabs"
        size="large"
        items={tabsitems}
        style={{
          marginLeft: 20,
          width: "100%",
          // 重复渲染bug
          minWidth: 400,
        }}
      />
    </div>
  );
};

export default ProfileDetails;
