import { http } from 'msw'
import { createEmailCode, createIdentityImage, createIdentityText, fail, ok } from '../utils'
import { createToken, db, defaultUser, isValidRequest } from '../db'
import type { LoginForm, RegisterForm, UserInfo } from '@/types'

export const authHandlers = [
  /** 获取图形验证码 */
  http.get('/api/code', () => {
    const identity = createIdentityText()
    db.identityCode = identity
    return ok({ identity, image: createIdentityImage(identity) }, '获取验证码成功')
  }),

  /** 注册 */
  http.post('/api/register', async ({ request }) => {
    const body = (await request.json()) as RegisterForm
    if (body.text !== db.identityCode) {
      return fail(401, '注册失败，验证码错误或存在同名用户名')
    }
    if (db.users.some((u) => u.name === body.nickname)) {
      return fail(401, '注册失败，验证码错误或存在同名用户名')
    }
    const user: UserInfo & { password: string; email: string } = {
      id: db.users.length + 10,
      name: body.nickname,
      email: body.email,
      password: body.password,
      avatarUrl: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    }
    db.users.push(user)
    return ok(null, '注册成功')
  }),

  /** 账号密码登录 */
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as LoginForm
    const validIdentity = body.text === db.identityCode || body.text === 'v'
    const validAccount =
      body.nickname === 'v' && body.password === 'v'
        ? true
        : db.users.some((u) => u.name === body.nickname && u.password === body.password)
    if (!validIdentity || !validAccount) {
      return fail(401, '登录失败')
    }
    return ok({ token: createToken() }, '登录成功')
  }),

  /** 邮箱验证码发送 */
  http.post('/api/email-code', async ({ request }) => {
    const body = (await request.json()) as { email: string }
    if (!body.email?.includes('@')) {
      return fail(400, '邮箱格式不正确')
    }
    const code = createEmailCode()
    db.emailCodes.set(body.email, code)
    return ok({ code }, '验证码已发送（Mock 环境直接返回便于调试）')
  }),

  /** 邮箱登录 */
  http.post('/login/email/pw', async ({ request }) => {
    const body = (await request.json()) as LoginForm & { email?: string }
    const user = db.users.find((u) => u.email === body.email) ?? {
      ...defaultUser,
      email: body.email,
      password: '',
    }
    const emailCodeOk = db.emailCodes.get(body.email ?? '') === body.text
    const identityOk = body.identity === db.identityCode || body.identity === 'v'
    if (!user || !emailCodeOk || !identityOk) {
      return fail(401, '登录失败，请检查邮箱验证码')
    }
    return ok({ token: createToken() }, '登录成功')
  }),

  /** 退出登录 */
  http.post('/logout', () => ok(null, '退出成功')),

  /** 获取用户信息 */
  http.get('/api/userinfo', ({ request }) => {
    if (!isValidRequest(request)) {
      return fail(401, '未登录或登录信息失效，请重新登录')
    }
    return ok<UserInfo>(defaultUser, '获取用户信息成功')
  }),

  /** 更新用户信息 */
  http.post('/api/updateuserinfo', async ({ request }) => {
    if (!isValidRequest(request)) {
      return fail(401, '未登录或登录信息失效，请重新登录')
    }
    const body = (await request.json()) as Partial<UserInfo>
    Object.assign(defaultUser, body)
    return ok(null, '用户信息更新成功')
  }),
]
