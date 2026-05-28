#!/usr/bin/env node
/**
 * scripts/content-check.js
 *
 * 部署前自动校验：13 套样式的 index.html 必须包含
 *   1. s5-content.js 里的所有 CRITICAL_PHRASES（防止文案漂移）
 *   2. ContactBlock 锚点：data-cwp-bind="wechat" / "qr" / "name" 各至少 1 个
 *   3. /channel-loader.js 已引入
 *
 * 跑：
 *   npm run check
 * 失败时 exit 1，可接到 CI / 部署脚本里阻断。
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WEB  = path.join(ROOT, 'web');

// 加载 s5-content.js 拿到 critical phrases
const content = require(path.join(WEB, 's5-content.js'));
const CRITICAL = content.CRITICAL_PHRASES;

const STYLES = ['main', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v11', 'v12'];

let pass = 0;
let fail = 0;
const failures = [];

function check(styleId) {
  const idx = path.join(WEB, 'styles', styleId, 'index.html');
  if (!fs.existsSync(idx)) {
    failures.push(`[${styleId}] index.html 不存在`);
    return false;
  }
  const html = fs.readFileSync(idx, 'utf8');

  const issues = [];

  // 1) critical phrases 全在
  CRITICAL.forEach((phrase) => {
    if (!html.includes(phrase)) {
      issues.push(`缺关键文案: "${phrase}"`);
    }
  });

  // 2) data-cwp-bind 锚点齐全
  const requiredBinds = ['wechat', 'name', 'qr'];
  requiredBinds.forEach((k) => {
    const re = new RegExp(`data-cwp-bind=["']${k}["']`);
    if (!re.test(html)) {
      issues.push(`缺 data-cwp-bind="${k}"`);
    }
  });

  // 3) channel-loader.js 引入
  if (!/channel-loader\.js/.test(html)) {
    issues.push('未引入 /channel-loader.js');
  }

  if (issues.length === 0) {
    pass++;
    return true;
  }
  fail++;
  failures.push(`[${styleId}] ${issues.length} 个问题:\n    ${issues.join('\n    ')}`);
  return false;
}

console.log('======================================================');
console.log('  content-check · 13 套样式一致性校验');
console.log('======================================================\n');
console.log(`critical phrases: ${CRITICAL.length} 条`);
console.log(`必备 data-cwp-bind: wechat / name / qr\n`);

STYLES.forEach((s) => {
  const ok = check(s);
  console.log(`  ${ok ? '✓' : '✗'}  ${s.padEnd(4)} · styles/${s}/index.html`);
});

console.log(`\n${pass} 套通过 · ${fail} 套失败 · ${STYLES.length} 总数\n`);

if (fail > 0) {
  console.log('失败明细：\n');
  failures.forEach((f) => console.log('  ' + f + '\n'));
  process.exit(1);
}

console.log('✓ 全部样式内容一致 · 可发布\n');
process.exit(0);
