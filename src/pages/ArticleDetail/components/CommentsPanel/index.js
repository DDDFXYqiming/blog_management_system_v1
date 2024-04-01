import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Form,
  List,
  Radio,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import { getCommentsListAPI } from "../../../../apis/comments";
import { valid } from "mockjs";

const CommentsPanel = () => {
  const [commentInputValue,setCommentInputValue] = useState('')
  // const commentInputRef = useRef()
  const { avatarUrl } = useSelector((state) => state.user.userInfo);
  const [commentsList, setCommentsList] = useState();
  const [commentsNumber, setCommentsNumber] = useState(10);

  // 最新最热选单
  const [commentsValue, setCommentsValue] = useState("hot");
  // 准备参数
  const [reqData, setReqData] = useState({
    sortOrder: "hot",
  });

  // 获取评论框内容
  

  // 最新最热参数修改
  const onCommentsGroupChange = ({ target: { value } }) => {
    setCommentsValue(value);
    setReqData({ ...reqData, sortOrder: value });
  };

  //   输入评论部分
  const onCommentTextChange = (e) => {
    setCommentInputValue(e.target.value);
    // console.log(commentInputValue)
  };

  // 发布评论部分
  const onCommentInputClick = () => {
    // console.log();
  };

  const [disabled,setDisabled] = useState(false)
  const [value,setValue] = useState('好好好')
  const [form] = Form.useForm()

  const onCommentInputFinish = (values) => {
    console.log(values)
    message.success('发表成功')

    form.resetFields()
    // setCommentInputValue('')
    // commentInputRef.current.state.value = ''
    setReqData({...reqData})

    // setDisabled(true)
    // window.location.reload()
  };

  // 获取评论列表
  const getCommentsList = async () => {
    try {
      const res = await getCommentsListAPI(reqData);
      setCommentsList(res.data.commentsData);
      
      // setCommentsNumber(res.data.commentsData.length); // 根据实际返回的评论数量更新评论数目
    } catch (error) {
      console.error("获取评论列表错误", error);
    }
  };

  useEffect(() => {
    getCommentsList()
  }, [reqData]);

  return (
    <Card>
      <Flex vertical>
        <Flex align="center" gap="middle">
          <Flex align="center" gap="small">
            <h3>评论</h3>
            <p>{commentsNumber}</p>
          </Flex>
          <Radio.Group
            options={[
              {
                label: "最热",
                value: "hot",
              },
              {
                label: "最新",
                value: "new",
              },
            ]}
            onChange={onCommentsGroupChange}
            value={commentsValue}
            optionType="button"
          ></Radio.Group>
        </Flex>
        <Flex align="flex-start" gap="small">
          <Avatar
            src={avatarUrl}
            style={{
              verticalAlign: "middle",
              minWidth: 35,
              minHeight: 35,
              marginLeft: 10,
              marginRight: 10,
            }}
            size="middle"
          ></Avatar>
          <Form
          form={form}
            style={{ width: "100%" }}
            onFinish={onCommentInputFinish}
            validateTrigger="onBlur"
            initialValues={{
              inputContent:''
            }}
          >
            <Flex
              justify="space-between"
              gap="middle"
              style={{ width: "100%" }}
            >
              <Form.Item
                name="inputContent"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "请输入内容",
                  },
                ]}
              >
                <TextArea
                  disabled={disabled}
                  // value={value}
                  // defaultValue={commentInputValue}
                  // ref={commentInputRef}
                  className="commentInput"
                  showCount
                  maxLength={200}
                  onChange={onCommentTextChange}
                  placeholder="这里需要输入一条评论"
                  autoSize={{
                    minRows: 3,
                    maxRows: 10,
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={onCommentInputClick}
                >
                  发布
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Flex>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={commentsList}
          renderItem={(item, index) => (
            <List.Item>
              <Flex align="flex-start" gap="small">
                <Avatar
                  src={avatarUrl}
                  size="large"
                  style={{ marginTop: 15 }}
                ></Avatar>
                <Flex align="flex-start" vertical gap="middle">
                  <h4>{item.username}</h4>
                  <div>{item.content}</div>
                  <Flex gap="large">
                    <p>{item.pubdate}</p>
                    <p>点赞数：{item.like_count}</p>
                  </Flex>
                </Flex>
              </Flex>
            </List.Item>
          )}
        ></List>
      </Flex>
    </Card>
  );
};

export default CommentsPanel;
