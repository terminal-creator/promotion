/**
 * server/middleware/auth-token.js
 * 校验 X-Edit-Token · 用于 PUT / DELETE
 */

const db = require('../db');

function requireEditToken(req, res, next) {
  const token = req.headers['x-edit-token'];
  if (!token || typeof token !== 'string' || token.length !== 32) {
    return res.status(401).json({ error: '缺少或格式错误的 X-Edit-Token' });
  }
  const slug = req.params.slug;
  if (!slug) {
    return res.status(400).json({ error: '缺少 slug' });
  }
  const row = db.prepare('SELECT edit_token FROM channels WHERE slug = ?').get(slug);
  if (!row) {
    return res.status(404).json({ error: '渠道不存在' });
  }
  // 常量时间比较（避免时序攻击）
  const a = Buffer.from(row.edit_token);
  const b = Buffer.from(token);
  if (a.length !== b.length) {
    return res.status(403).json({ error: 'token 错误' });
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  if (diff !== 0) {
    return res.status(403).json({ error: 'token 错误' });
  }
  next();
}

module.exports = { requireEditToken };
