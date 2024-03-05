// 文章相关接口函数
import { http } from "../utils";

// 获取频道列表请求
export function getChannelAPI() {
  return http({
    url: "/api/channelList", 
    method: "GET",
  });
}

// 提交文章表单
export function createArticleAPI(data) {
  return http({
    url: "/api/mp/articles", 
    method: "POST",
    data
  });
}

// 获取文章列表
export function getArticleListAPI(){
  return http({
    url:"/api/articleList",
    method:'GET',
  })
}