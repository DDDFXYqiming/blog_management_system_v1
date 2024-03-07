// 用户相关状态管理
import { createSlice } from "@reduxjs/toolkit";
import { http, removeToken } from "../../utils";
import { setToken as _setToken, getToken } from "../../utils";
import { getProfileAPI, loginAPI } from "../../apis/user";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // localstorage存储token
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

// 解构actionCreator
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

// 获取reducer函数
const userReducer = userStore.reducer;

// 异步方法 完成登录 获取token
const fetchLogin = (loginFrom) => {
  return async (dispatch) => {
    try {
      // 发送异步请求
      const res = await loginAPI(loginFrom);
      // 提交同步action进行token的存入
      dispatch(setToken(res.data.token));
    } catch (error) {
      // 登录失败，抛出错误
      throw new Error("登录失败");
    }
  };
};

// 获取个人用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI();
    // console.log(res)
    dispatch(setUserInfo(res.data));
  };
};

export { setToken, clearUserInfo, fetchLogin, fetchUserInfo };

export default userReducer;
