import { Avatar, Dropdown, Flex, Input, Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo, fetchUserInfo } from "../../store/modules/user";

const { Search } = Input;
const { Header, Sider } = Layout;

const itemslist = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "查看文章",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "发布文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onMenuClick = (route) => {
    const path = route.key;
    navigate(path);
  };

  // 高亮组件选项卡
  // 获取当前路径
  const location = useLocation();
  const selectedKey = location.pathname;
  // console.log(selectedKey)

  const name = useSelector((state) => state.user.userInfo.name);

  // 退出登录确认回调
  const logoutOnConfirm = () => {
    dispatch(clearUserInfo());
    navigate("/login");
  };

  // 个人中心确认回调
  const myHomePageOnConfirm = () => {
    navigate("/myhomepage");
  };

  // 设置确认回调
  const settingsOnConfirm = () => {
    navigate("/settings/profileDetails");
  };

  // 用户头像下拉菜单
  const items = [
    {
      key: "myhomepage",
      label: (
        <span>
          <div onClick={myHomePageOnConfirm}>个人中心</div>
        </span>
      ),
    },
    {
      key: "settings",
      label: (
        <span>
          <div onClick={settingsOnConfirm}>设置</div>
        </span>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <span className="user-logout">
          <div onClick={logoutOnConfirm}>退出</div>
        </span>
      ),
    },
  ];

  // 搜索框搜索回调
  const onSearch = (value) => {
    console.log("搜索框内容", value);
    navigate("/article");
  };

  //  触发获取用户个人信息
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <Layout>
      <Header className="header">
        <Menu
          className="menu"
          mode="horizontal"
          items={itemslist}
          selectedKeys={selectedKey}
          onClick={onMenuClick}
        ></Menu>
        <div className="user-info">
          <Flex>
            {/* <div className="search"> */}
            <Search
              className="search"
              placeholder="谢邀"
              allowClear
              onSearch={onSearch}
            />
            {/* </div> */}
            {/* 用户头像 */}
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
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
            </Dropdown>
          </Flex>
        </div>
      </Header>
      <Layout>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
