import { Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
} from "antd";
// 时间选择器汉化
import locale from "antd/es/date-picker/locale/zh_CN";

import { Table, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "../../hooks/useChannel";
import { useEffect, useState } from "react";
import { getArticleListAPI } from "../../apis/article";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const {channelList} = useChannel()
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
  const [list,setList] = useState()
  const [count,setCount] = useState(0)
  useEffect(()=>{
    async function getList(){
      const res = await getArticleListAPI()
      console.log(res)
      setList(res.data.articleData)
      setCount(res.data.total_count)
      // console.log(list)
    }
    getList()
  },[])

  return (
    <div>
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
        <Form initialValues={{ status: "" }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>综合</Radio>
              <Radio value={1}>最新</Radio>
              <Radio value={2}>热门</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              // defaultValue="lucy"
              style={{ width: 120 }}
            >
              {channelList.map(item=>
              <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

            {/* 传入locale属性 控制中文显示*/}
          {/* <Form.Item label="日期" name="date">
            <RangePicker locale={locale}></RangePicker>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} />
      </Card>
    </div>
  );
};

export default Article;
