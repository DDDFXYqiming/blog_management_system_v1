import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Flex,
} from "antd";

import { Table, Tag, Space, List, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "../../hooks/useChannel";
import { useEffect, useState } from "react";
import { getArticleListAPI } from "../../apis/article";
import "./index.scss";

const { Option } = Select;

const Article = () => {
  const navigate = useNavigate();
  const { channelList } = useChannel();
  // 准备列数据
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    // {
    //   title: "状态",
    //   dataIndex: "status",
    //   render: (data) => <Tag color="green">审核通过</Tag>,
    // },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    // {
    //   title: "操作",
    //   render: (data) => {
    //     return (
    //       <Space size="middle">
    //         <Button type="primary" shape="circle" icon={<EditOutlined />} />
    //         <Button
    //           type="primary"
    //           danger
    //           shape="circle"
    //           icon={<DeleteOutlined />}
    //         />
    //       </Space>
    //     );
    //   },
    // },
  ];

  // 获取文章列表
  const [list, setList] = useState();
  const [count, setCount] = useState(0);
  // 准备参数
  const [reqData, setReqData] = useState({
    status: "all",
    channel_id: "0",
    page: 1,
    per_page: 4,
  });

  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData);
      setList(res.data.articleData);
      setCount(res.data.total_count);
      // console.log("文章列表表单数据", res);
    }
    getList();
  }, [reqData]);

  // 筛选功能

  // 获取表单筛选数据
  const onFinish = (formValue) => {
    // 表单数据放入参数中（不可变方式）
    setReqData({
      ...reqData,
      channel_id: formValue.channel_id,
      status: formValue.status,
    });
    // 重新拉取文章列表+table渲染（通过reqData变化执行useEffect)
  };

  // 分页功能
  const onPageChange = (page) => {
    // 修改参数依赖项 引发列表重新渲染
    setReqData({
      ...reqData,
      page,
    });
  };

  return (
    <div className="article">
      <div className="main-article">
        <Card
          title={
            <Breadcrumb
              items={[
                { title: <Link to={"/"}>首页</Link> },
                { title: "文章列表" },
              ]}
            />
          }
          style={{ marginBottom: 20 }}
        >
          <Form 
          initialValues={{ status: "" }} 
          onFinish={onFinish}>
            <Flex>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                <Radio value={""}>综合</Radio>
                <Radio value={1}>最新</Radio>
                <Radio value={2}>热门</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="专栏" name="channel_id">
              <Select
                placeholder="请选择文章专栏"
                // defaultValue="lucy"
                style={{ width: 120 }}
              >
                {channelList.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 40 }}
              >
                筛选
              </Button>
            </Form.Item>
            </Flex>
          </Form>
        </Card>
        {/* 表格区域 */}
        <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a href="/articleDetailLayout" target="_blank">
                      {item.title}
                    </a>
                  }
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
                <div>read_count {item.read_count} |</div>
                <div>like_count {item.like_count} |</div>
                <div>pubdate {item.pubdate} |</div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default Article;
