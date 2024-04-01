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
  Avatar,
  Image,
  Card,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { updateProfileAPI } from "../../../apis/user";
// 时间选择器汉化
import locale from "antd/es/date-picker/locale/zh_CN";
import ImgCrop from "antd-img-crop";

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
      children: generateContactContent(),
    },
    {
      label: `教育情况`,
      key: "3",
      children: generateEducationContent(),
    },
    {
      label: `就业情况`,
      key: "4",
      children: generateEmploymentContent(),
    },
  ];

  // 修改头像部分
  const { avatarUrl } = useSelector((state) => state.user.userInfo);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleCancelPreview = () => {
    setPreviewVisible(false);
  };

  const handlestartPreview = () => {
    setPreviewVisible(true);
  };

  const [hasFile, setHasFile] = useState(false);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("文件格式需为JPG/PNG！");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小超过2MB！");
    }
    setHasFile(true);
    return isJpgOrPng && isLt2M;
  };

  // 上传头像预览部分
  // const [fileList,setFileList] = useState({})
  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };
  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };

  // 点击上传按钮之后部分
  const handleUploadPreview = () => {
    message.success("修改头像成功");
    setPreviewVisible(false);
  };

  return (
    <div>
      <Flex
        style={{ width: "100%" }}
        className="profileFlex"
        justify="center"
        align="flex-start"
        vertical
      >
        <Row>
          <Col span={4}></Col>
          <Col span={20}>
            <Image
              height={100}
              width={100}
              src={avatarUrl}
              onClick={handlestartPreview}
              preview={{
                mask: "修改头像",
                visible: previewVisible,
                imageRender: () => (
                  <Card
                    title="上传头像"
                    style={{
                      width: 600,
                      minHeight: 350,
                    }}
                  >
                    <Flex align="flex-start" vertical>
                      <Card
                        style={{
                          width: "100%",
                          backgroundColor: "#f0f0f0",
                        }}
                      >
                        <ImgCrop rotationSlider>
                          <Upload
                            name="avatarUpload"
                            listType="picture"
                            maxCount={1}
                            // accept=".jpg,.jpeg,.png"
                            beforeUpload={beforeUpload}
                            // fileList={fileList}
                            // onChange={onChange}
                            // onPreview={onPreview}
                          >
                            {/* {fileList.length < 5 && '+ Upload'} */}
                            {!hasFile && (
                              <>
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  点击或拖动图片至此处
                                </p>
                              </>
                            )}
                          </Upload>
                        </ImgCrop>
                      </Card>
                      <p>图片宽度*高度至少为150*150像素，大小不超过2MB</p>
                      <Flex
                        style={{ width: "100%" }}
                        align="flex-end"
                        justify="space-between"
                      >
                        <p>30天内还可以编辑 5 次</p>
                        {hasFile && (
                          <Button
                            type="primary"
                            danger
                            onClick={handleUploadPreview}
                          >
                            上传头像
                          </Button>
                        )}
                        <Button type="primary" onClick={handleCancelPreview}>
                          取消
                        </Button>
                      </Flex>
                    </Flex>
                  </Card>
                ),
                toolbarRender: () => null,
              }}
            ></Image>
          </Col>
        </Row>
        <Tabs
          defaultActiveKey="1"
          // type="card"
          type="tabs"
          size="large"
          items={tabsitems}
          style={{
            marginLeft: 20,
            paddingRight: 20,
            width: "100%",
            // 重复渲染bug
            minWidth: 400,
          }}
        />
      </Flex>
    </div>
  );
};

export default ProfileDetails;
