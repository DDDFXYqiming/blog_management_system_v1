import { Card, Breadcrumb, Avatar, Divider, Tabs } from "antd";
import { Link } from "react-router-dom";
import "./index.scss";

import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import UserProfile from "./component/UserProfile";
import MyArticles from "./component/MyArticles";
import MyLikes from "./component/MyLikes";

const MyHomepage = () => {
  const name = useSelector((state) => state.user.userInfo.name);
  const tabsitems = [
    {
      label: `个人资料`,
      key: "1",
      children: <UserProfile />,
    },
    {
      label: `我的文章`,
      key: "2",
      children: <MyArticles />,
    },
    {
      label: `我的点赞`,
      key: "3",
      children: <MyLikes />,
    },
  ];

  return (
    <div className="myHomepage">
      <Card
        className="card"
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "个人中心" },
            ]}
          />
        }
      >
        <div>
          <Avatar
            style={{
              backgroundColor: "blue",
              verticalAlign: "middle",
              marginRight: 100,
            }}
            size="middle"
          >
            {name}
          </Avatar>
          <span>{name}</span>
        </div>
        <Divider />
        <Tabs defaultActiveKey="1" type="card" size="large" items={tabsitems} />
      </Card>
    </div>
  );
};

export default MyHomepage;
