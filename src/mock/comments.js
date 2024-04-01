import Mock from "mockjs";

const commentListMock = Mock.mock(
  // 模拟传递Query参数
  /https:\/\/whole-similarly-impala.ngrok-free.app\/api\/commentList(\?.*)?/,
  "get",
  (req, res) => {
    // 解析请求的 Query 参数
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const sortOrder = urlParams.get("sortOrder") || "hot";

    // 模拟生成评论列表
    const commentsData = [];
    for (let i = 0; i < 10; i++) {
      const comment = {
        id: Mock.Random.guid(), // 生成随机的评论 ID
        username: Mock.Random.cname(), // 随机生成用户名
        content: Mock.Random.csentence(5, 20), // 随机生成评论内容
        pubdate: Mock.Random.datetime(), // 随机生成发布日期
        like_count: Mock.Random.integer(0, 100), // 随机生成点赞数量
      };
      commentsData.push(comment);
    }

    // 按照排序方式排序评论列表
    if (sortOrder === "hot") {
      commentsData.sort((a, b) => b.like_count - a.like_count); // 按照点赞数量降序排列
    } else {
      commentsData.sort((a, b) => new Date(b.pubdate) - new Date(a.pubdate)); // 按照发布日期降序排列
    }

    // 返回模拟的评论列表数据
    return {
      code: 200,
      message: "获取评论列表成功",
      data: {
        commentsData,
        sortOrder,
      },
    };
  }
);

export { commentListMock };
