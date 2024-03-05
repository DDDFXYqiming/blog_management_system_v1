import Mock from "mockjs";

const channelListMock = Mock.mock(
  "https://whole-similarly-impala.ngrok-free.app/api/channelList",
  "get",
  (req, res) => {
    const channelData = Mock.mock({
      "channels|5-10": [
        {
          "id|+1": 1,
          name: "@ctitle(2, 4)", // 生成随机的中文标题，长度在 2 到 4 之间
        },
      ],
    });
    // 在 Mock.js 中，模拟的请求并不会真实地经过拦截器
    //因此在模拟请求的回调函数中无法直接从请求头中获取token
    // const token = req.headers["Authorization"];
    const token = "Bearer mockToken123";
    // 根据 token 获取用户信息
    if (token === "Bearer mockToken123") {
      return {
        code: 200,
        message: "获取频道列表信息成功",
        data: {
          channels: channelData.channels,
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

const mpArticleMock = Mock.mock(
  "https://whole-similarly-impala.ngrok-free.app/api/mp/articles",
  "post",
  (req, res) => {
    const { title, content, channel_id } = JSON.parse(req.body);
    // 验证请求 body 参数格式
    if (title && content && typeof channel_id === 'number') {
      // 如果请求参数格式正确，则返回模拟的文章数据
      return {
        code: 200,
        message: "文章发布成功",
        data: {
          article_id: Mock.Random.guid(), // 生成随机的文章 ID
          title,
          content,
          channel_id
        }
      };
    } else {
      return {
        code: 400,
        message: "请求参数格式错误，请检查标题、内容和频道 ID 是否正确填写"
      };
    }
  }
);

export { channelListMock,mpArticleMock };
