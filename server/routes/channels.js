/**
 * server/routes/channels.js
 * 5 个 API 端点
 *   POST   /api/channels              创建
 *   GET    /api/channels/:slug        读
 *   PUT    /api/channels/:slug        改（需 X-Edit-Token）
 *   DELETE /api/channels/:slug        删（需 X-Edit-Token）
 *   GET    /api/check-slug/:slug      slug 可用性
 */

const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const { validateSlug, randomSlug } = require('../utils/slug');
const { validateChannelInput } = require('../utils/validate');
const { createLimiter } = require('../middleware/ratelimit');
const { requireEditToken } = require('../middleware/auth-token');
const { upload, finalizeQR, removeQR, toWebPath } = require('./upload');

const router = express.Router();

function makeToken() {
  return crypto.randomBytes(16).toString('hex'); // 32 chars
}

function getIP(req) {
  return req.headers['x-real-ip'] || req.ip || '';
}

function logAudit(action, slug, req) {
  try {
    db.prepare('INSERT INTO audit_log(action, slug, ip, ua) VALUES (?, ?, ?, ?)').run(
      action, slug, getIP(req), (req.headers['user-agent'] || '').slice(0, 200)
    );
  } catch (_) { /* audit 失败不阻断主流程 */ }
}

function rowToPublic(row) {
  if (!row) return null;
  return {
    slug: row.slug,
    display_name: row.display_name,
    wechat_id: row.wechat_id,
    qr_image_url: row.qr_image_path || null,
    style_version: row.style_version,
    custom_note: row.custom_note || '',
    created_at: row.created_at,
    updated_at: row.updated_at || null,
  };
}

/* --------------------------------------------------------------
   GET /api/check-slug/:slug
   -------------------------------------------------------------- */
router.get('/check-slug/:slug', (req, res) => {
  const slug = String(req.params.slug || '');
  const check = validateSlug(slug);
  if (!check.ok) {
    return res.json({ available: false, reason: check.error });
  }
  const row = db.prepare('SELECT slug FROM channels WHERE slug = ?').get(check.value);
  if (row) {
    // 给个建议
    let suggestion = check.value;
    for (let i = 0; i < 20; i++) {
      const s = `${check.value}-${randomSlug(3)}`;
      if (!db.prepare('SELECT 1 FROM channels WHERE slug = ?').get(s)) {
        suggestion = s;
        break;
      }
    }
    return res.json({ available: false, reason: '已被占用', suggestion });
  }
  return res.json({ available: true });
});

/* --------------------------------------------------------------
   GET /api/channels/:slug
   -------------------------------------------------------------- */
router.get('/channels/:slug', (req, res) => {
  const slug = String(req.params.slug || '').toLowerCase();
  const row = db.prepare('SELECT * FROM channels WHERE slug = ?').get(slug);
  if (!row) return res.status(404).json({ error: '渠道不存在' });
  // 累计访问数（非关键，不阻塞）
  try {
    db.prepare('UPDATE channels SET visits = visits + 1 WHERE slug = ?').run(slug);
  } catch (_) {}
  res.set('Cache-Control', 'public, max-age=30');
  res.json(rowToPublic(row));
});

/* --------------------------------------------------------------
   POST /api/channels
   multipart/form-data:
     display_name, wechat_id, style_version, slug?, custom_note?, qr_image (file)
   -------------------------------------------------------------- */
router.post(
  '/channels',
  createLimiter,
  upload.single('qr_image'),
  (req, res) => {
    try {
      // 1. 基础字段校验
      const v = validateChannelInput(req.body);
      if (!v.ok) {
        if (req.file) try { require('fs').unlinkSync(req.file.path); } catch (_) {}
        return res.status(400).json({ error: v.errors.join(' · ') });
      }

      // 2. slug：用户指定 or 自动生成
      let slug = String(req.body.slug || '').toLowerCase().trim();
      if (slug) {
        const sv = validateSlug(slug);
        if (!sv.ok) {
          if (req.file) try { require('fs').unlinkSync(req.file.path); } catch (_) {}
          return res.status(400).json({ error: `slug: ${sv.error}` });
        }
        slug = sv.value;
        const dup = db.prepare('SELECT 1 FROM channels WHERE slug = ?').get(slug);
        if (dup) {
          if (req.file) try { require('fs').unlinkSync(req.file.path); } catch (_) {}
          return res.status(409).json({ error: 'slug 已被占用' });
        }
      } else {
        // 自动生成，最多试 10 次
        for (let i = 0; i < 10; i++) {
          const candidate = randomSlug(6);
          if (!db.prepare('SELECT 1 FROM channels WHERE slug = ?').get(candidate)) {
            slug = candidate;
            break;
          }
        }
        if (!slug) {
          if (req.file) try { require('fs').unlinkSync(req.file.path); } catch (_) {}
          return res.status(500).json({ error: '随机 slug 生成失败，请手动指定' });
        }
      }

      // 3. QR 图片必填
      if (!req.file) {
        return res.status(400).json({ error: 'qr_image 必填' });
      }

      // 4. 把 tmp 文件重命名为 <slug>.<ext>
      const finalAbs = finalizeQR(req.file.path, slug);
      const qrWebPath = toWebPath(finalAbs);

      // 5. 生成 token + 写库
      const token = makeToken();
      const created_ip = getIP(req);

      db.prepare(`
        INSERT INTO channels
          (slug, edit_token, display_name, wechat_id, qr_image_path,
           style_version, custom_note, created_ip)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        slug, token,
        v.value.display_name,
        v.value.wechat_id,
        qrWebPath,
        v.value.style_version,
        v.value.custom_note || null,
        created_ip,
      );

      logAudit('create', slug, req);

      // 6. 返回完整信息
      const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
      res.status(201).json({
        slug,
        edit_token: token,
        url: `${base.replace(/\/$/, '')}/c/${slug}`,
        qr_image_url: qrWebPath,
        style_version: v.value.style_version,
      });
    } catch (err) {
      console.error('[POST /api/channels]', err);
      if (req.file) try { require('fs').unlinkSync(req.file.path); } catch (_) {}
      res.status(500).json({ error: err.message || '服务器错误' });
    }
  }
);

/* --------------------------------------------------------------
   PUT /api/channels/:slug
   Header: X-Edit-Token
   -------------------------------------------------------------- */
router.put(
  '/channels/:slug',
  requireEditToken,
  upload.single('qr_image'),
  (req, res) => {
    try {
      const slug = String(req.params.slug || '').toLowerCase();
      const v = validateChannelInput(req.body, { partial: true });
      if (!v.ok) {
        if (req.file) try { require('fs').unlinkSync(req.file.path); } catch (_) {}
        return res.status(400).json({ error: v.errors.join(' · ') });
      }

      const patch = { ...v.value };

      if (req.file) {
        // 替换 QR：先删旧的，再 finalize 新的
        removeQR(slug);
        const finalAbs = finalizeQR(req.file.path, slug);
        patch.qr_image_path = toWebPath(finalAbs);
      }

      const keys = Object.keys(patch);
      if (keys.length === 0) return res.status(400).json({ error: '没有可更新的字段' });

      const set = keys.map(k => `${k} = ?`).join(', ');
      db.prepare(`UPDATE channels SET ${set}, updated_at = datetime('now') WHERE slug = ?`)
        .run(...keys.map(k => patch[k]), slug);

      logAudit('update', slug, req);

      const row = db.prepare('SELECT * FROM channels WHERE slug = ?').get(slug);
      res.json(rowToPublic(row));
    } catch (err) {
      console.error('[PUT /api/channels/:slug]', err);
      if (req.file) try { require('fs').unlinkSync(req.file.path); } catch (_) {}
      res.status(500).json({ error: err.message || '服务器错误' });
    }
  }
);

/* --------------------------------------------------------------
   DELETE /api/channels/:slug
   Header: X-Edit-Token
   -------------------------------------------------------------- */
router.delete('/channels/:slug', requireEditToken, (req, res) => {
  try {
    const slug = String(req.params.slug || '').toLowerCase();
    removeQR(slug);
    db.prepare('DELETE FROM channels WHERE slug = ?').run(slug);
    logAudit('delete', slug, req);
    res.json({ ok: true });
  } catch (err) {
    console.error('[DELETE /api/channels/:slug]', err);
    res.status(500).json({ error: err.message || '服务器错误' });
  }
});

module.exports = router;
