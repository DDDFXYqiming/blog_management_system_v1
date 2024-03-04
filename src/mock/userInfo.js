import Mock from "mockjs";

const userInfoMock = Mock.mock(
  "https://whole-similarly-impala.ngrok-free.app/api/userinfo",
  "get",
  (req, res) => {
    // 在 Mock.js 中，模拟的请求并不会真实地经过拦截器
    //因此在模拟请求的回调函数中无法直接从请求头中获取token
    // const token = req.headers["Authorization"];
    const token = "Bearer mockToken123"
    // 根据 token 获取用户信息
    if (token === "Bearer mockToken123") {
      return {
        code: 200,
        message: "获取用户信息成功",
        data: {
          id: 123,
          name: "v",
          photo: '@image("200x100", "#ccc", "#333", "Mock Image")',
          mobile:'13312345678',
          gender:1,
          birthday:'2077-01-01',
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

export { userInfoMock };
