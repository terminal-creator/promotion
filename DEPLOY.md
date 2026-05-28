# llmpromotion · 部署须知

> 给运维 / 部署同事 · 自包含目录 · 任何 Linux 服务器一键跑起来
> 整个目录直接 `scp` 到 `/opt/llmpromotion/` 即可

---

## 环境要求

- Node.js ≥ 18（推荐 20，`nvm install 20`）
- pm2（`npm i -g pm2`）
- Nginx（反代 + SSL）
- 服务器有公网 IP + 已备案域名（国内）

---

## 部署步骤

```bash
# 1. 上传代码到服务器
scp -r llmpromotion/ user@server:/opt/

# 2. 进目录、装依赖
ssh user@server
cd /opt/llmpromotion
cp .env.example .env
vi .env                                 # 改 PORT / PUBLIC_BASE_URL

# 3. 安装后端依赖
npm run install:all

# 4. 初始化 SQLite（创表）
npm run init-db

# 5. 校验内容一致性（13 套样式）
npm run check                            # 全绿才能继续

# 6. 启动
npm run start                            # pm2 拉起来
pm2 save && pm2 startup                  # 开机自启

# 7. 配 Nginx
sudo cp nginx-example.conf /etc/nginx/sites-available/llmpromotion
sudo vi /etc/nginx/sites-available/llmpromotion   # 改域名 / 路径
sudo ln -s /etc/nginx/sites-available/llmpromotion /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 8. SSL（首次）
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d 你的域名
```

---

## Nginx 配置参考

```nginx
server {
  listen 443 ssl http2;
  server_name 你的域名;

  ssl_certificate     /etc/letsencrypt/live/你的域名/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/你的域名/privkey.pem;

  client_max_body_size 1m;

  # 静态文件 Nginx 直接 serve（比 Express 快很多）
  root /opt/llmpromotion/web;

  # API → Node
  location /api/ {
    proxy_pass http://127.0.0.1:3001/api/;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
  }

  # 上传文件
  location /uploads/ {
    alias /opt/llmpromotion/uploads/;
    expires 7d;
    add_header Cache-Control "public";
  }

  # admin 控制台
  location = /admin { try_files /admin.html =404; }

  # 渠道路由壳（/c/<slug>）
  location /c/ { try_files /index.html =404; }

  # 样式（/styles/<id>/）
  location /styles/ { try_files $uri $uri/ $uri/index.html =404; }

  # 其它静态
  location / { try_files $uri $uri/ /index.html; }
}

# 全局限流防爆破
limit_req_zone $binary_remote_addr zone=cwp_global:10m rate=2r/s;
server { limit_req zone=cwp_global burst=20 nodelay; }
```

---

## 验证清单

部署完跑这些：

```bash
curl https://你域名/api/health
# → {"ok":true,...}

curl https://你域名/admin -o /dev/null -w "%{http_code}\n"
# → 200

# 浏览器实际打开 https://你域名/admin
# 1. 看到三屏 SPA · 13 套样式画廊
# 2. 选 main · 填表 · 上传 QR · 生成
# 3. 点「打开学员视角」→ 看到完整 main 样式 + 自己上传的 QR
```

---

## 后续更新（每次推新代码）

```bash
scp -r llmpromotion/ user@server:/opt/           # 或 git pull
cd /opt/llmpromotion
npm run install:all                              # 装新增依赖（如有）
npm run build:styles                             # 重建 v1-v12 样式
npm run check                                    # 内容校验
npm run restart                                  # pm2 重启
```

---

## 数据备份

```bash
# 手动
cp /opt/llmpromotion/channels.db /backup/channels-$(date +%F).db

# Cron 自动（每天 3am）
crontab -e
0 3 * * * cp /opt/llmpromotion/channels.db /opt/backup/channels-$(date +\%F).db
```

---

## 故障排查

| 现象 | 排查 |
|---|---|
| `/admin` 502 | `npm run logs` 看 pm2 日志；`pm2 status` 看是否启动 |
| 上传 QR 失败 | 检查 `/opt/llmpromotion/uploads/qr/` 写权限；`chmod 755` |
| `/c/<slug>` 404 | 检查 Nginx 配置里 `try_files /index.html` |
| `/styles/main/` 加载慢 | 看 `web/courseware-preview/` 大小（~30M）· 可加 Nginx 缓存 |
| 学员看不到自己渠道的 QR | 浏览器 DevTools 看 `/api/channels/<slug>` 是否返回；看 channel-loader.js 是否加载 |

---

## 重要文件位置

```
/opt/llmpromotion/
├── channels.db              ← SQLite（备份关注这个）
├── uploads/qr/              ← 上传的二维码（备份关注这个）
├── server/                  ← 后端
├── web/                     ← 前端
├── .env                     ← 配置（PORT / DOMAIN）
└── ecosystem.config.js      ← pm2
```
