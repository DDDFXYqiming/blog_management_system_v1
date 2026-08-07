# 知识博客系统（blog_management_system_v1）

面向技术人员的知识博客系统 Web 端。原版为课程项目（React + CRA），本仓库 `refactor` 分支完成现代化重构：

- Vite + React 18 + TypeScript（原 CRA5 + JavaScript）
- Ant Design 5 + Redux Toolkit + React Router 6 + axios + ECharts
- Mock Service Worker（MSW）替代原 mockjs/json-server，可在无后端时独立运行
- 富文本编辑器统一为 ReactQuill（移除冗余的 CKEditor 依赖）

## 快速开始

```bash
npm install
npx msw init public/   # 首次安装后生成 Service Worker 文件
npm run dev            # 打开 http://localhost:5173
```

## 功能清单

- 登录：账号密码登录、邮箱登录（验证码倒计时）、图形验证码（点击刷新）
- 注册：昵称/邮箱/密码强度校验/确认密码/图形验证码
- 首页：近三日阅读量图表 + 推荐文章列表
- 文章：状态/专栏筛选、分页列表
- 发布：标题 + 专栏 + ReactQuill 富文本内容
- 文章详情：点赞/收藏、评论最热/最新排序、发表评论
- 个人中心：个人资料、我的文章、我的收藏、关注/粉丝
- 设置：基本资料/联系方式/教育情况/就业情况四组表单 + 头像上传、隐私设置、密码安全

## Mock 账号

- 账号 `v` / 密码 `v` / 图形验证码 `v`（兼容旧版演示账号）
- 也可在注册页注册新账号，使用注册账号登录
- 邮箱登录验证码固定为 `123456`（Mock 环境演示用）

## 环境变量

见 [.env.example](.env.example)：`VITE_API_BASE_URL` 为空时使用 MSW Mock；
接入真实后端时改为后端地址并设置 `VITE_ENABLE_MOCK=false`。

## 目录结构

```text
src/
  api/        # axios 实例与接口层
  components/ # 通用组件（AuthRoute）
  hooks/      # 自定义 hooks（useChannel）
  mocks/      # MSW 内存数据库与接口处理器
  pages/      # 页面（Home/Login/Register/Article/Publish/...）
  router/     # 路由配置
  store/      # Redux Toolkit 状态
  types/      # TypeScript 类型定义
```
