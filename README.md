简体中文 | [English](README.en.md)

# 知识博客系统 · Blog Management System

**面向技术人员的高性能知识创作、分享与个人中心现代化 Web 应用**。

`blog_management_system_v1` 是一个专为开发者和技术创作者打造的知识博客与内容管理系统。工程经过全栈架构现代化重构，全面迁移至 Vite + React 18 + TypeScript 技术栈，整合 Ant Design 5、Redux Toolkit 状态流管理与 ECharts 数据可视化，并通过 Mock Service Worker (MSW) 提供开箱即用的离线拟真后端数据流，可在零后端环境下体验完整的创作、阅读、互动与设置链路。

---

## 核心功能矩阵

* **全场景身份认证**：
  * 支持账号密码登录、邮箱验证码登录（内建防抖与倒计时）与动态图形验证码校验；
  * 提供密码强度检测、重复确认校验与即时注册机制。
* **数据看板与沉浸阅读**：
  * **ECharts 统计看板**：动态展示近三日文章阅读趋势图表与核心指标；
  * **多维文章列表**：支持专栏分类切片、发布状态过滤（草稿/已发布）与分页流式检索。
* **结构化内容创作（ReactQuill）**：
  * 整合轻量高效的 ReactQuill 富文本编辑器，支持多级标题、代码块格式化、图文混排与草稿自动暂存。
* **高互动社交体系**：
  * 深度支持文章点赞、收藏夹归档；
  * 二级评论嵌套，支持按“最热 / 最新”维度排序与即时发表互动。
* **多维个人中心与资料治理**：
  * 细粒度管理个人资料、教育背景、职场履历、联系方式与社交主页；
  * 粉丝/关注列表透视、头像本地上传预览、安全密码修改与隐私可见性控制。

---

## 技术架构

| 分层 | 技术选型 | 说明 |
| :--- | :--- | :--- |
| **构建与运行时** | Vite + React 18 + TypeScript | 毫秒级热更新与强类型工程契约 |
| **UI 组件库** | Ant Design 5 (CSS-in-JS) | 统一的企业级组件交互规范 |
| **状态管理** | Redux Toolkit (RTK) | 模块化切片与全局凭据/会话状态分发 |
| **路由系统** | React Router v6 | 基于路由表的声明式导航与 `AuthRoute` 鉴权守卫 |
| **网络与 Mock** | Axios + Mock Service Worker (MSW) | Service Worker 网络层精准拦截，无真实后端即开即用 |
| **数据可视化** | Apache ECharts | 响应式折线图与数据趋势图表 |

---

## 快速开始

### 1. 安装与初始化

```bash
# 安装依赖
npm install

# 初始化 MSW 浏览器端 Service Worker 脚本
npx msw init public/
```

### 2. 启动开发服务器

```bash
npm run dev
```

启动完成后在浏览器中访问：`http://localhost:5173`。

### 3. 开箱即用演示凭据
* **演示账号**：`v`
* **演示密码**：`v`
* **图形验证码**：`v`
*(在 Mock 模式下，邮箱登录验证码固定为 `123456`)*

---

## 目录结构

```text
src/
├── api/          # Axios 实例封装与 RESTful 请求函数
├── components/   # 通用业务控件（AuthRoute 路由守卫等）
├── hooks/        # 业务复用 Hooks（useChannel 分类流等）
├── mocks/        # MSW 内存数据库、接口处理器与种子数据
├── pages/        # 业务视图（Home, Article, Publish, Profile, Settings 等）
├── router/       # 路由表定义与导航拦截
├── store/        # Redux Toolkit 切片与全局 Store
└── types/        # 核心业务实体 TypeScript 类型定义
```

---

## 许可证

本项目基于 [MIT License](LICENSE) 开源。
