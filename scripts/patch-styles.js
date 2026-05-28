#!/usr/bin/env node
/**
 * scripts/patch-styles.js
 *
 * 对 web/styles/v1-v12 的 index.html 做 3 件事：
 *   1) 把课件路径从 ../../courseware-packages/* 改成 /courseware-preview/*
 *   2) 在 </body> 前注入 ContactBlock（含 data-cwp-bind="wechat/qr/name"）
 *   3) 在 </body> 前注入 <script src="/channel-loader.js">
 *
 * 跑：
 *   node scripts/patch-styles.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WEB  = path.join(ROOT, 'web');
const STYLES = ['v1','v2','v3','v4','v5','v6','v7','v8','v9','v10','v11','v12'];

const CONTACT_BLOCK = `
<!-- ============ ContactBlock · 自动注入（patch-styles.js） ============ -->
<style>
  .cwp-contact{
    position:relative;z-index:5;
    margin:0;padding:48px 24px;
    background:#0A0C10;color:#EDE9DC;
    font-family:'Inter','PingFang SC','Microsoft YaHei',system-ui,sans-serif;
    border-top:4px solid currentColor;
  }
  .cwp-contact__inner{
    max-width:760px;margin:0 auto;
    display:grid;grid-template-columns:160px 1fr;gap:28px;align-items:center;
  }
  @media (max-width:640px){
    .cwp-contact__inner{grid-template-columns:1fr;text-align:center}
  }
  .cwp-contact__qr{
    width:160px;height:160px;background:#fff;
    border-radius:6px;display:block;object-fit:contain;
    margin:0 auto;
  }
  .cwp-contact__title{
    font-family:'JetBrains Mono',ui-monospace,monospace;
    font-size:11px;letter-spacing:0.18em;text-transform:uppercase;
    color:rgba(245,158,11,0.85);margin-bottom:10px;
  }
  .cwp-contact__head{
    font-size:22px;font-weight:800;letter-spacing:-0.01em;
    margin-bottom:8px;line-height:1.3;
  }
  .cwp-contact__head em{font-style:normal;color:#F59E0B}
  .cwp-contact__sub{
    font-size:14px;color:rgba(237,233,220,0.65);line-height:1.7;margin-bottom:14px;
  }
  .cwp-contact__wx{
    display:inline-block;font-family:'JetBrains Mono',monospace;
    font-size:13px;color:#F59E0B;font-weight:700;
    background:rgba(245,158,11,0.08);
    border:1px dashed rgba(245,158,11,0.35);
    padding:6px 12px;border-radius:4px;letter-spacing:0.05em;
  }
  .cwp-contact__hint{
    font-size:12px;color:rgba(237,233,220,0.45);
    margin-top:10px;line-height:1.6;
  }
</style>
<section class="cwp-contact" aria-label="联系老师">
  <div class="cwp-contact__inner">
    <img class="cwp-contact__qr" data-cwp-bind="qr" src="/static/qr-placeholder.svg" alt="老师二维码">
    <div>
      <div class="cwp-contact__title">FREE TRIAL · 联系老师领取试听课</div>
      <div class="cwp-contact__head">
        <span data-cwp-bind="name">老师</span>
        <span style="opacity:0.5;margin:0 6px">·</span>
        <em>免费试听</em>
      </div>
      <div class="cwp-contact__sub">扫码或加微信，老师会发你完整试听课件，回你的所有报名/价格/定制路径问题。</div>
      <div>
        微信号：<code class="cwp-contact__wx" data-cwp-bind="wechat">S5_LLM_2026</code>
        <span style="opacity:0.55;margin-left:8px;font-size:12px">备注「试听」可直接领取</span>
      </div>
      <div class="cwp-contact__hint" data-cwp-bind="note"></div>
    </div>
  </div>
</section>
<!-- ============ /ContactBlock ============ -->
`;

const LOADER_TAG = `<script src="/channel-loader.js"></script>\n`;

function patchOne(styleId) {
  const file = path.join(WEB, 'styles', styleId, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  let changed = 0;

  // 1) 课件路径
  if (html.includes('../../courseware-packages/')) {
    html = html.replace(/\.\.\/\.\.\/courseware-packages\//g, '/courseware-preview/');
    changed |= 1;
  }

  // 2) 注入 contact block + loader（如果还没注入）
  if (!html.includes('class="cwp-contact"')) {
    const inject = CONTACT_BLOCK + LOADER_TAG + '\n';
    html = html.replace(/<\/body>/, inject + '</body>');
    changed |= 2;
  }

  fs.writeFileSync(file, html, 'utf8');
  return changed;
}

let ok = 0;
STYLES.forEach((s) => {
  const c = patchOne(s);
  const flags = `${c & 1 ? '课件路径' : '--'} · ${c & 2 ? 'contact 注入' : '--'}`;
  console.log(`  ${s.padEnd(4)} → ${flags}`);
  if (c) ok++;
});

console.log(`\n${ok}/${STYLES.length} 套样式已修补\n`);
