import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createArticleAPI} from "../../apis/article";
import { useChannel } from "../../hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  const navigate = useNavigate()
  const {channelList} = useChannel()

  // 提交表单
  const onFinish = async (formValue) => {
    // 按照接口文档处理表单数据格式
    const { title, content, channel_id } = formValue;
    const reqData = {
      title,
      content,
      channel_id,
    };

    console.log('发给后端文章数据',reqData)
    // 调用接口提交
    const res = await createArticleAPI(reqData);
    console.log(res)
    message.success("发布成功");
    navigate('/')
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "发布文章" },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="专栏"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章专栏" }]}
          >
            <Select placeholder="请选择文章专栏" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
