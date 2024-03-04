// 用户相关状态管理
import {createSlice} from '@reduxjs/toolkit'
import { http } from '../../utils'
import { setToken as _setToken,getToken } from '../../utils'

const userStore = createSlice({
    name:'user',
    initialState:{
        token:getToken() || ''
    },
    // 同步修改方法
    reducers:{
        setToken(state,action){
            state.token = action.payload
            // localstorage存储token
            _setToken(action.payload)
        }
    }
})

// 解构actionCreator
const {setToken} = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法 完成登录 获取token
const fetchLogin = (loginFrom)=>{
    return async(dispatch)=>{
        // 发送异步请求
        const res = await http.post('/api/login',loginFrom)
        // 提交同步action进行token的存入
        console.log(res)
        dispatch(setToken(res.data.token))
    }
}

export {setToken,fetchLogin}

export default userReducer