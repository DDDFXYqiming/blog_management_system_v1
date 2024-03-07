import Mock from "mockjs";

const userInfoMock = Mock.mock(
  "https://whole-similarly-impala.ngrok-free.app/api/userinfo",
  "get",
  (req, res) => {
    // 在 Mock.js 中，模拟的请求并不会真实地经过拦截器
    //因此在模拟请求的回调函数中无法直接从请求头中获取token
    // const token = req.headers["Authorization"];
    const token = "Bearer mockToken123";
    // 根据 token 获取用户信息
    if (token === "Bearer mockToken123") {
      return {
        code: 200,
        message: "获取用户信息成功",
        data: {
          id: 123,
          name: "银河球棒侠",
          gender: 1,
          profile: "个人简介",
          birthday: "2077-01-01",
          maritalStatus: 0,
          QQ: "888888888",
          mobile: "13312345678",
          email: "example@example.com",
          highestEducationSchool: "某某大学",
          highestEducationMajor: "某某专业",
          highestEducationDegree: 0,
          industry: "IT",
          jobTitle: "软件工程师",
        },
      };
    } else {
      return {
        code: 401,
        message: "未登录或登录信息失效，请重新登录",
      };
    }
  }
);

const updateUserInfoMock = Mock.mock(
  "https://whole-similarly-impala.ngrok-free.app/api/updateuserinfo",
  "post",
  (req, res) => {
    // 获取请求的数据
    const data = JSON.parse(req.body);
    console.log("接收userinfo数据:", data);

    // 假设后端成功接收并处理请求，返回成功响应
    return {
      code: 200,
      message: "用户信息更新成功",
    };
  }
);

export { userInfoMock, updateUserInfoMock };
