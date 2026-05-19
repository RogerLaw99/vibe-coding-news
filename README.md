# Vibe Coding 新闻站

简单的 Vibe Coding 资讯官网：Vue 3 前端 + Node.js (Express) 后端。

## 功能

- 首页介绍与最新 3 条资讯
- 资讯列表：分类筛选、关键词搜索
- 文章详情页
- REST API：`/api/news`、`/api/news/:id`、`/api/categories`

## 项目结构

```
project1/
├── backend/          # Express API
│   ├── data/news.json
│   └── server.js
├── frontend/         # Vue 3 + Vite
│   └── src/
└── README.md
```

## 快速开始

需要 Node.js 18+。

### 1. 启动后端

```bash
cd backend
npm install
npm run dev
```

API 默认运行在 http://localhost:3001

### 2. 启动前端

新开一个终端：

```bash
cd frontend
npm install
npm run dev
```

网站默认运行在 http://localhost:5173（开发模式会通过 Vite 代理访问后端 `/api`）。

## 生产构建

```bash
cd frontend
npm run build
npm run preview
```

生产环境需自行配置反向代理，将 `/api` 转发到后端服务。

## 修改资讯内容

编辑 `backend/data/news.json` 即可增删改文章，重启后端后生效。
