import Mock from "mockjs";

// 获取专栏列表
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
        message: "获取专栏列表信息成功",
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

// 文章发布
const mpArticleMock = Mock.mock(
  "https://whole-similarly-impala.ngrok-free.app/api/mp/articles",
  "post",
  (req, res) => {
    const { title, content, channel_id } = JSON.parse(req.body);
    // 验证请求 body 参数格式
    if (title && content && typeof channel_id === "number") {
      // 如果请求参数格式正确，则返回模拟的文章数据
      return {};
    } else {
      return {};
    }
  }
);

// 获取文章列表
const articleListMock = Mock.mock(
  /https:\/\/whole-similarly-impala.ngrok-free.app\/api\/articleList(\?.*)?/,
  "get",
  (req, res) => {
    // 解析请求的 Query 参数
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const status = urlParams.get("status") || "all";
    const channel_id = urlParams.get("channel_id") || 0;
    const page = urlParams.get("page") || 1;
    const per_page = urlParams.get("per_page") || 10;

    // 模拟生成多篇文章列表
    const articleData = [];
    for (let i = 0; i < 10; i++) {
      const article = {
        id: Mock.Random.guid(), // 生成随机的文章 ID
        comment_count: Mock.Random.integer(0, 100), // 随机生成评论数量
        like_count: Mock.Random.integer(0, 100), // 随机生成点赞数量
        pubdate: Mock.Random.datetime(), // 随机生成发布日期
        read_count: Mock.Random.integer(0, 1000), // 随机生成阅读数量
        status: Mock.Random.integer(0, 2), // 随机生成状态
        title: Mock.Random.ctitle(5, 20), // 随机生成标题，长度在 5 到 20 之间
      };
      articleData.push(article);
    }

    // 返回模拟的文章列表数据
    return {
      code: 200,
      message: "获取文章列表成功",
      data: {
        articleData,
        total_count: 10,
        status,
        channel_id,
        page,
        per_page,
      },
    };
  }
);


export { channelListMock, mpArticleMock, articleListMock };
