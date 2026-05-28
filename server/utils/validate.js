/**
 * server/utils/validate.js
 * 输入字段校验
 */

// 13 套已知样式 id（与 web/admin-data.js 对齐）
const KNOWN_STYLES = new Set([
  'main', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6',
  'v7', 'v8', 'v9', 'v10', 'v11', 'v12',
]);

function trimOrEmpty(v) {
  return typeof v === 'string' ? v.trim() : '';
}

function validateChannelInput(body, { partial = false } = {}) {
  const errors = [];
  const out = {};

  // display_name
  const displayName = trimOrEmpty(body.display_name);
  if (!partial && !displayName) errors.push('display_name 必填');
  if (displayName) {
    if (displayName.length > 32) errors.push('display_name 最多 32 字符');
    out.display_name = displayName;
  }

  // wechat_id
  const wechat = trimOrEmpty(body.wechat_id);
  if (!partial && !wechat) errors.push('wechat_id 必填');
  if (wechat) {
    if (!/^[a-zA-Z0-9_-]{4,32}$/.test(wechat)) {
      errors.push('wechat_id 只能用字母/数字/_/-，4-32 字符');
    } else {
      out.wechat_id = wechat;
    }
  }

  // style_version
  const style = trimOrEmpty(body.style_version);
  if (!partial && !style) errors.push('style_version 必填');
  if (style) {
    if (!KNOWN_STYLES.has(style)) {
      errors.push(`style_version 必须是 ${[...KNOWN_STYLES].join('/')} 之一`);
    } else {
      out.style_version = style;
    }
  }

  // custom_note (可选)
  const note = trimOrEmpty(body.custom_note);
  if (note) {
    if (note.length > 200) errors.push('custom_note 最多 200 字符');
    else out.custom_note = note;
  }

  return { ok: errors.length === 0, errors, value: out };
}

module.exports = { validateChannelInput, KNOWN_STYLES };
