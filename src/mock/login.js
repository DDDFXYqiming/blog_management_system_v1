import Mock from "mockjs";

const mockLoginData = {
  username: "aaa",
  password: "aaa",
  verification: "aaa",
};

const loginMock = Mock.mock("https://whole-similarly-impala.ngrok-free.app/api/login", "post", (req, res) => {
  const { username, password, verification } = JSON.parse(req.body);
  if (
    username === mockLoginData.username &&
    password === mockLoginData.password &&
    verification === mockLoginData.verification
  ) {
    return {
      code: 200,
      message: "Login successful",
      data: {
        token:'mockToken123',
        userId: 123,
        username: username,
      },
    };
  } else {
    return {
      code: 401,
      message: "登陆失败",
    };
  }
});

export {loginMock}