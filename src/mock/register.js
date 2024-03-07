import Mock from "mockjs";

const registerMock = Mock.mock(
  "https://whole-similarly-impala.ngrok-free.app/api/register",
  "post",
  (req, res) => {
    const { nickname,email, password, text } = JSON.parse(req.body);
    // console.log(req,res)
    if (1) {
      return {
        code: 200,
        message: "Register successful",
        data: { nickname,email, password, text },
      };
    } else {
      return {
        code: 401,
        message: "注册失败",
      };
    }
  }
);

export { registerMock };
