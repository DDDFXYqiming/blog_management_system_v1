import { Breadcrumb, Card, Layout, Menu } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";

const itemslist = [
  {
    key: "grp",
    icon: null,
    children: [
      {
        label: "个人资料",
        key: "profileDetails",
      },
      {
        label: "修改头像",
        key: "modifyAvatar",
      },
      {
        label: "密码安全",
        key: "passwordSecurity",
      },
    ],
    label: "设置",
    type: "group",
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("profileDetails");

  const onMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  useEffect(() => {
    navigate(`/settings/${selectedKey}`);
  }, [selectedKey, navigate]);

  return (
    <div className="settings">
      <Card
        className="card"
        title={
          <Breadcrumb
            items={[{ title: <Link to={"/"}>首页</Link> }, { title: "设置" }]}
          />
        }
      >
        <Layout style={{ backgroundColor: "white" }}>
          <Sider width="25%" style={{ backgroundColor: "white" }}>
            <Menu
              className="menu"
              items={itemslist}
              selectedKeys={[selectedKey]}
              onClick={onMenuClick}
            ></Menu>
          </Sider>
          <Outlet />
        </Layout>
      </Card>
    </div>
  );
};

export default Settings;
