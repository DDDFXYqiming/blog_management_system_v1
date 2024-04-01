import { http } from "../utils";

// 获取评论列表
export function getCommentsListAPI(params){
    return http({
      url:"/api/commentList",
      method:'GET',
      params
    })
  }