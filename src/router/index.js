import Layout from "@/pages/Layout";
import Login from "@/pages/Login";

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "../components/AuthRoute";
import Home from "../pages/Home";
import Article from "../pages/Article";
import Publish from "../pages/Publish";
import Register from "../pages/Register";
import MyHomepage from "../pages/MyHomepage";
import Settings from "../pages/Settings";
import ProfileDetails from "../pages/Settings/component/ProfileDetails";
import ModifyAvatar from "../pages/Settings/component/ModifyAvatar";
import PasswordSecurity from "../pages/Settings/component/PasswordSecurity";
import ArticleDetailLayout from "../pages/ArticleDetail";

// 配置路由实例
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
      {
        path: "myhomepage",
        element: <MyHomepage />,
      },
      {
        path: "articleDetailLayout",
        element: <ArticleDetailLayout />,
      },
      {
        path: "settings",
        element: <Settings />,
        children: [
          {
            // 绝对子路由路径必须以所有父级路由的组合路径开头
            // path: "/",
            path: "profileDetails",
            element: <ProfileDetails />,
          },
          {
            path: "modifyAvatar",
            element: <ModifyAvatar />,
          },
          {
            path: "passwordSecurity",
            element: <PasswordSecurity />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
