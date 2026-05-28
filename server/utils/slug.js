/**
 * server/utils/slug.js
 * slug 校验 + 随机生成 + 保留词名单
 */

const RESERVED = new Set([
  'admin', 'api', 'c', 'static', 'uploads', 'styles', 'static',
  'public', 'assets', 'thumbs', 'courseware-preview',
  'www', 'app', 'dashboard', 'login', 'signup', 'help', 'about',
  'null', 'undefined', 'true', 'false',
  'index', 'home', 'main', 'root',
]);

const SLUG_RE = /^[a-z][a-z0-9-]{3,31}$/;

/**
 * 校验 slug 是否合法
 * @returns { ok: boolean, error?: string }
 */
function validateSlug(slug) {
  if (typeof slug !== 'string') return { ok: false, error: 'slug 必须是字符串' };
  const s = slug.trim().toLowerCase();
  if (s.length < 4) return { ok: false, error: '至少 4 个字符' };
  if (s.length > 32) return { ok: false, error: '最多 32 个字符' };
  if (!SLUG_RE.test(s)) return { ok: false, error: '只能包含小写字母、数字、短横线，且必须以字母开头' };
  if (RESERVED.has(s)) return { ok: false, error: '这是系统保留词，请换一个' };
  if (s.startsWith('-') || s.endsWith('-')) return { ok: false, error: '不能以短横线开头或结尾' };
  if (s.includes('--')) return { ok: false, error: '不能连续两个短横线' };
  return { ok: true, value: s };
}

/**
 * 生成随机 slug（6 位 · 排除易混字符 0/o/1/l）
 */
function randomSlug(len = 6) {
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789';
  let s = '';
  for (let i = 0; i < len; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  // 首字符必须是字母（chars 第一段全是字母，这里保险起见再判一次）
  if (!/^[a-z]/.test(s)) s = 'a' + s.slice(1);
  return s;
}

module.exports = { validateSlug, randomSlug, RESERVED };
