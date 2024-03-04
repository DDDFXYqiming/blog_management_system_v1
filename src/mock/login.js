import Mock from "mockjs";

const mockLoginData = {
  username: "v",
  password: "v",
  verification: "v",
};

const loginMock = Mock.mock(
  "https://whole-similarly-impala.ngrok-free.app/api/login", 
  "post",
   (req, res) => {
  const { username, password, verification } = JSON.parse(req.body);
  // console.log(req,res)
  if (
    username === mockLoginData.username &&
    password === mockLoginData.password &&
    verification === mockLoginData.verification
  ) {
    return {
      code: 200,
      message: "Login successful",
      data: {
        token:'Bearer mockToken123',
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