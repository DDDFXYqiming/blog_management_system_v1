import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '@/api/token'

interface AuthRouteProps {
  children: ReactNode
}

/** 路由守卫：无 token 时重定向到登录页 */
export function AuthRoute({ children }: AuthRouteProps) {
  const token = getToken()
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
