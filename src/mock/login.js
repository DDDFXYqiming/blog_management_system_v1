import Mock from "mockjs";

const mockLoginData = {
  nickname: "v",
  password: "v",
  text: "v",
};

const loginMock = Mock.mock(
  "https://whole-similarly-impala.ngrok-free.app/api/login", 
  "post",
   (req, res) => {
  const { nickname, password, text } = JSON.parse(req.body);
  // console.log(req,res)
  if (
    nickname === mockLoginData.nickname &&
    password === mockLoginData.password &&
    text === mockLoginData.text
  ) {
    return {
      code: 200,
      message: "Login successful",
      data: {
        token:'Bearer mockToken123',
        // 其他数据
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