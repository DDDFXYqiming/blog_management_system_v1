import { Card, Descriptions } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../../store/modules/user";

const UserProfile = () => {
  // 登陆时个人信息已经存储在store里面
  // const dispatch = useDispatch();

  // //   获取用户个人信息展示
  // useEffect(() => {
  //   dispatch(fetchUserInfo());
  // }, [dispatch]);

  const userInfoObject = useSelector((state) => state.user.userInfo);
  // 创建一个新对象，不包含 id 属性
  const filteredUserInfo = Object.keys(userInfoObject)
    .filter((key) => key !== "id")
    .reduce((obj, key) => {
      obj[key] = userInfoObject[key];
      return obj;
    }, {});
  const items = Object.entries(filteredUserInfo).map(([key, value]) => {
    // console.log(key);
    let label = "";
    let children = filteredUserInfo[key];

    // 根据属性名生成对应的 label
    switch (key) {
      case "name":
        label = "用户名";
        break;
      case "mobile":
        label = "电话号码";
        break;
      case "photo":
        label = "图片";
        break;
      default:
        label = key.charAt(0).toUpperCase() + key.slice(1); // 首字母大写作为 label
        break;
    }

    return {
      key: key,
      label: label,
      children: children,
    };
  });

  return (
    <Card>
      <Descriptions
        title={userInfoObject.name}
        layout="vertical"
        items={items}
      />
    </Card>
  );
};

export default UserProfile;
