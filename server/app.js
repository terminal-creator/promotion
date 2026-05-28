/**
 * server/app.js
 * Express 主入口
 *
 * 启动：
 *   node app.js              开发期前台
 *   pm2 start ../ecosystem.config.js
 */

const path = require('path');
const fs = require('fs');
const express = require('express');

// 加载环境变量
try {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
} catch (_) { /* dotenv 可选 */ }

// 自动初始化 DB（require 副作用）
require('./db');

const channelsRouter = require('./routes/channels');

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const ROOT = path.join(__dirname, '..');
const WEB_DIR = path.join(ROOT, 'web');
const UPLOADS_ROOT = path.join(ROOT, 'uploads');

/* --------------------------------------------------------------
   基础中间件
   -------------------------------------------------------------- */
app.set('trust proxy', true); // nginx 反代后获取真实 IP
app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// 简单访问日志（生产可换成 morgan / winston）
app.use((req, _res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} · ${req.headers['x-real-ip'] || req.ip}`);
  }
  next();
});

/* --------------------------------------------------------------
   API
   -------------------------------------------------------------- */
app.use('/api', channelsRouter);

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

/* --------------------------------------------------------------
   静态文件
   -------------------------------------------------------------- */
// 上传的二维码：Nginx 直接 serve 更高效，Express 兜底（开发期 + Nginx 没配的情况）
app.use('/uploads', express.static(UPLOADS_ROOT, {
  maxAge: '7d',
  fallthrough: false,
}));

// 前端静态
app.use(express.static(WEB_DIR, {
  maxAge: '5m',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
  },
}));

/* --------------------------------------------------------------
   路由壳：/admin · /c/:slug · 其他 404 fallback
   -------------------------------------------------------------- */
app.get('/admin', (_req, res) => {
  res.sendFile(path.join(WEB_DIR, 'admin.html'));
});

app.get('/c/:slug', (_req, res) => {
  res.sendFile(path.join(WEB_DIR, 'index.html'));
});

app.get('/styles/:id', (req, res) => {
  // /styles/v7 → /styles/v7/index.html
  res.sendFile(path.join(WEB_DIR, 'styles', req.params.id, 'index.html'), (err) => {
    if (err) res.status(404).send('Not found');
  });
});

// 根路径：默认到 admin 控制台（开发期更方便；上线后可改成 landing）
app.get('/', (_req, res) => {
  // 优先看 web/index.html 是否存在（学员页壳）；存在就 serve，
  // 否则跳到 admin
  const homeIndex = path.join(WEB_DIR, 'index.html');
  if (fs.existsSync(homeIndex)) return res.sendFile(homeIndex);
  res.redirect('/admin');
});

/* --------------------------------------------------------------
   错误兜底
   -------------------------------------------------------------- */
app.use((err, _req, res, _next) => {
  console.error('[ERR]', err);
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: '文件超过大小限制' });
  }
  if (err && /仅支持 PNG 或 JPEG/.test(err.message || '')) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: '服务器错误' });
});

/* --------------------------------------------------------------
   启动
   -------------------------------------------------------------- */
app.listen(PORT, () => {
  console.log(`\n  llmpromotion server listening on http://localhost:${PORT}`);
  console.log(`  · WEB_DIR     = ${WEB_DIR}`);
  console.log(`  · UPLOADS     = ${UPLOADS_ROOT}`);
  console.log(`  · PUBLIC_URL  = ${process.env.PUBLIC_BASE_URL || `(未设置，将使用请求 host)`}`);
  console.log();
});

module.exports = app;
