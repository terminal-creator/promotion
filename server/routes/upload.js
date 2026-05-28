/**
 * server/routes/upload.js
 * multer 上传中间件 · 二维码 PNG/JPEG · ≤ 500KB
 */

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(__dirname, '..', '..', process.env.UPLOADS_DIR)
  : path.join(__dirname, '..', '..', 'uploads', 'qr');

const MAX_SIZE = Number(process.env.QR_MAX_SIZE) || 500 * 1024;

fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const ALLOWED_MIME = new Set(['image/png', 'image/jpeg']);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    // 文件名稍后由路由层重命名为 <slug>.<ext>
    const ext = file.mimetype === 'image/png' ? '.png' : '.jpg';
    const tmpName = `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, tmpName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE, files: 1 },
  fileFilter: function (req, file, cb) {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error('仅支持 PNG 或 JPEG 格式'));
    }
    cb(null, true);
  },
});

/**
 * 把 multer 临时文件重命名为最终路径 `<slug>.<ext>`
 * @returns 绝对路径
 */
function finalizeQR(tmpPath, slug) {
  if (!tmpPath) return null;
  const ext = path.extname(tmpPath);
  const finalName = `${slug}${ext}`;
  const finalPath = path.join(UPLOADS_DIR, finalName);
  // 如果已存在，覆盖
  if (fs.existsSync(finalPath)) fs.unlinkSync(finalPath);
  fs.renameSync(tmpPath, finalPath);
  return finalPath;
}

/**
 * 删除某个 slug 下的所有 QR（不论扩展名）
 */
function removeQR(slug) {
  ['png', 'jpg', 'jpeg'].forEach(ext => {
    const p = path.join(UPLOADS_DIR, `${slug}.${ext}`);
    if (fs.existsSync(p)) {
      try { fs.unlinkSync(p); } catch (_) {}
    }
  });
}

/**
 * 把绝对路径转为 web 路径 /uploads/qr/<file>
 */
function toWebPath(absPath) {
  if (!absPath) return null;
  const name = path.basename(absPath);
  return `/uploads/qr/${name}`;
}

module.exports = { upload, finalizeQR, removeQR, toWebPath, UPLOADS_DIR };
