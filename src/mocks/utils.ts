import type { HttpResponseResolver } from 'msw'
import { HttpResponse } from 'msw'

export function ok<T>(data: T, message = 'ok'): ReturnType<HttpResponseResolver> {
  return HttpResponse.json({ code: 200, message, data })
}

export function fail(code: number, message: string): ReturnType<HttpResponseResolver> {
  return HttpResponse.json({ code, message, data: null }, { status: code })
}

/** 生成 4 位图形验证码文本 */
export function createIdentityText(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

/** 将验证码文本渲染为 SVG 并返回 data URI */
export function createIdentityImage(text: string): string {
  const width = 120
  const height = 40
  const chars = text
    .split('')
    .map(
      (ch, i) =>
        `<text x="${22 + i * 24}" y="28" font-size="22" font-family="monospace" fill="#1677ff" transform="rotate(${Math.random() * 10 - 5} ${22 + i * 24} 28)">${ch}</text>`,
    )
    .join('')
  const lines = Array.from(
    { length: 3 },
    () =>
      `<line x1="${Math.floor(Math.random() * width)}" y1="${Math.floor(Math.random() * height)}" x2="${Math.floor(Math.random() * width)}" y2="${Math.floor(Math.random() * height)}" stroke="#ccc" stroke-width="1"/>`,
  ).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#f5f5f5"/>${lines}${chars}</svg>`
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/** 生成 6 位数字邮箱验证码 */
export function createEmailCode(): string {
  // Mock 环境固定为 123456，便于演示与自动化验证
  return '123456'
}
