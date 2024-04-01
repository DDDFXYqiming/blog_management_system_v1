import {
  Avatar,
  Button,
  Card,
  Divider,
  Flex,
  Layout,
  Popover,
  Space,
  Tag,
} from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../store/modules/user";
import Sider from "antd/es/layout/Sider";
import CommentsPanel from "./components/CommentsPanel";

import { LikeOutlined, StarOutlined } from "@ant-design/icons";

const ArticleDetailLayout = () => {
  const dispatch = useDispatch();
  const { avatarUrl } = useSelector((state) => state.user.userInfo);
  const [likeState, setLikeState] = useState("text");
  const [starState, setStarState] = useState("text");

  const handleLikeClick = () => {
    setLikeState(likeState === 'text' ? 'link' : 'text');
  };

  const handleStarClick = () => {
    setStarState(starState === 'text' ? 'link' : 'text');
  };

  //  触发获取用户个人信息
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <div className="articleDetail">
      <Card className="card">
        <h1>文章标题</h1>
        <Card
          style={{
            backgroundColor: "#f0f0f0",
          }}
        >
          <Flex vertical gap="small">
            <Flex justify="space-between">
              <div>文章作者</div>
              <div>发布时间</div>
            </Flex>
            {/* <div>文章作者</div>
          <div>发布时间</div> */}
            <Flex justify="start" gap="large">
              <div>阅读量</div>
              <div>点赞量</div>
              <div>评论量</div>
            </Flex>

            <Flex justify="start" gap="large">
              <div>文章标签:</div>
              <Flex gap="small">
                <Tag>标签1</Tag>
                <Tag>标签2</Tag>
                <Tag>标签3</Tag>
              </Flex>
            </Flex>
          </Flex>
        </Card>
        <Divider />
        <div>分类专栏</div>
        <Divider />
        <div style={{minHeight:'1000px'}}>文章内容</div>
        <Divider />
        <Layout className="footerLayout">
          <Flex align="center">
            <Space size="small">
              <Avatar src={avatarUrl} size="small"></Avatar>
              <div>文章作者</div>
            </Space>
          </Flex>
          <Flex>
            <Space size="large">
              <Popover content={<div>点赞</div>}>
                <Button
                  type={likeState}
                  icon={<LikeOutlined />}
                  onClick={handleLikeClick}
                ></Button>
              </Popover>
              <Popover content={<div>收藏</div>}>
                <Button
                  type={starState}
                  icon={<StarOutlined />}
                  onClick={handleStarClick}
                ></Button>
              </Popover>
            </Space>
          </Flex>
        </Layout>
        <Divider />
        <CommentsPanel />
      </Card>
    </div>
  );
};
export default ArticleDetailLayout;
