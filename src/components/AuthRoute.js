// 封装高阶组件HOC

import { Navigate } from "react-router-dom"
import { getToken } from "../utils"

// 验证token有无 无token->登陆页面
export function AuthRoute ({children}){
    const token = getToken()
    if(token){
        return (
            <>{children}</>
        )
    }
    else{
        return <Navigate to={'/login'} replace/>
    }
}