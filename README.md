# llmpromotion · 渠道专属链接生成系统

> S5 · 2026 大模型冲刺营 · 多渠道推广页生成器
> **自包含可独立部署** · 任何 Linux 服务器 scp 进来即可运行

---

## 快速开始

### 本地开发

```bash
cd llmpromotion
cp .env.example .env             # 按需修改端口、域名等
cd server && npm install         # 装依赖
cd .. && npm run init-db         # 初始化 SQLite
npm run dev                      # 直接 node 跑（前台）
# 浏览器访问 http://localhost:3001
```

### 服务器部署（首次）

```bash
# 1. 上传（任选其一）
scp -r llmpromotion/ user@server:/opt/
# 或 git clone

# 2. 装依赖、初始化
ssh user@server
cd /opt/llmpromotion
cp .env.example .env && vi .env  # 改 PORT / PUBLIC_BASE_URL
npm run install:all              # cd server && npm ci
npm run init-db                  # 建表

# 3. 启动
npm run start                    # pm2 拉起来
pm2 save                         # 持久化
pm2 startup                      # 开机自启

# 4. Nginx 反代
sudo cp nginx/s5-landing.conf.example /etc/nginx/sites-available/llmpromotion
sudo vi /etc/nginx/sites-available/llmpromotion   # 改 server_name + 路径
sudo ln -s /etc/nginx/sites-available/llmpromotion /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 5. SSL 证书
sudo certbot --nginx -d 你的域名
```

### 后续更新

```bash
# 本地改完代码
scp -r llmpromotion/ user@server:/opt/   # 或 git pull
ssh user@server
cd /opt/llmpromotion
npm run check                    # 跑 content-check 验证内容一致性
npm run install:all              # 装新增依赖（如有）
npm run restart                  # pm2 重启
```

---

## 目录结构

```
llmpromotion/
├── server/                  Node.js 后端
│   ├── app.js               Express 主入口
│   ├── db.js                SQLite 封装（CLI --init 可单独初始化）
│   ├── routes/              API 路由
│   ├── middleware/          限频 / token 校验
│   ├── utils/               slug / 校验
│   └── package.json         后端依赖
├── web/                     前端静态文件（Nginx 直接 serve）
│   ├── index.html           路由壳（学员访问 /c/<slug> 命中）
│   ├── admin.html           控制台 SPA 主入口
│   ├── admin-*.jsx          控制台 React 源码（CDN Babel 实时编译）
│   ├── admin-data.js        13 套样式元数据
│   ├── s5-content.js        🔑 单一内容源（所有文案）
│   ├── channel-loader.js    🔑 渠道数据注入器
│   ├── styles/              13 套样式
│   │   ├── main/
│   │   └── v1/ ... v12/
│   ├── courseware-preview/  8 个课件预览（自包含）
│   ├── static/              占位图等
│   └── thumbs/              样式画廊缩略图
├── uploads/qr/              运行时生成 · 渠道二维码图片
├── scripts/
│   └── content-check.js     部署前内容一致性校验
├── nginx/
│   └── s5-landing.conf.example
├── ecosystem.config.js      pm2 配置
├── package.json             根 · 部署脚本聚合
├── .env.example             环境变量模板
└── README.md
```

---

## 环境变量（.env）

| 变量 | 默认 | 说明 |
|---|---|---|
| `PORT` | 3001 | Node 监听端口 |
| `PUBLIC_BASE_URL` | https://s5-2026.cn | 生成链接的域名前缀 |
| `DB_PATH` | ./channels.db | SQLite 文件路径 |
| `UPLOADS_DIR` | ./uploads/qr | 二维码上传目录 |
| `RATE_LIMIT_WINDOW_MS` | 60000 | 限频窗口（毫秒） |
| `RATE_LIMIT_MAX` | 1 | 每窗口最多创建次数 |
| `QR_MAX_SIZE` | 512000 | QR 图片字节上限 |

---

## 维护命令

```bash
npm run logs       # pm2 日志
npm run status     # pm2 状态
npm run restart    # 重启
npm run stop       # 停止
npm run check      # 跑内容一致性测试

# 数据备份
cp channels.db backups/channels-$(date +%F).db

# 看 SQLite 数据
sqlite3 channels.db "SELECT slug, display_name, wechat_id, created_at FROM channels ORDER BY created_at DESC LIMIT 20"
```

---

## API 概览

详见 `server/routes/channels.js`。5 个端点：

```
POST   /api/channels              创建渠道（multipart, 含 QR）
GET    /api/channels/:slug        读渠道
PUT    /api/channels/:slug        改渠道（Header: X-Edit-Token）
DELETE /api/channels/:slug        删渠道（Header: X-Edit-Token）
GET    /api/check-slug/:slug      slug 可用性查询
```

---

## 路由

```
/admin              → web/admin.html（控制台 SPA）
/c/<slug>           → web/index.html（壳页，JS 跳到对应样式）
/styles/<id>/       → web/styles/<id>/index.html
/api/*              → Node 后端
/uploads/qr/*       → 二维码图片（Nginx 直 serve）
```
