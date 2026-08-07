import { createSlice } from '@reduxjs/toolkit'
import type { LoginForm, UserInfo } from '@/types'
import { getProfileAPI, loginAPI, loginEmailAPI } from '@/api'
import { getToken, removeToken, setToken } from '@/api/token'

interface UserState {
  token: string
  userInfo: UserInfo
}

const initialState: UserState = {
  token: getToken() ?? '',
  userInfo: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTokenAction(state, action: { payload: string }) {
      state.token = action.payload
      setToken(action.payload)
    },
    setUserInfo(state, action: { payload: UserInfo }) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    },
  },
})

export const { setTokenAction, setUserInfo, clearUserInfo } = userSlice.actions

/** 账号密码登录 */
export const fetchLogin =
  (loginForm: LoginForm) =>
  async (dispatch: (action: unknown) => void): Promise<void> => {
    const res = await loginAPI(loginForm)
    dispatch(setTokenAction(res.data.token))
  }

/** 邮箱登录 */
export const fetchLoginEmail =
  (loginForm: LoginForm) =>
  async (dispatch: (action: unknown) => void): Promise<void> => {
    const res = await loginEmailAPI(loginForm)
    dispatch(setTokenAction(res.data.token))
  }

/** 获取当前用户信息 */
export const fetchUserInfo =
  () => async (dispatch: (action: unknown) => void): Promise<void> => {
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
  }

export default userSlice.reducer
