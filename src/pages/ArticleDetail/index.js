import { Card, Divider, Flex, Layout, Tag } from "antd";
import "./index.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../store/modules/user";
import Sider from "antd/es/layout/Sider";

const ArticleDetailLayout = () => {
  const dispatch = useDispatch();

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
          <Flex vertical gap='small'>
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
        <div>文章内容</div>
      </Card>
    </div>
  );
};
export default ArticleDetailLayout;
