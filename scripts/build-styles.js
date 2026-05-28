#!/usr/bin/env node
/**
 * scripts/build-styles.js
 *
 * 用 main 样式当基底，为 v1-v12 每套生成 index.html + theme.css。
 * 13 套样式：内容 100% 同步（克隆 main 文档），视觉差异化通过 theme.css 覆盖。
 *
 * 用法：
 *   node scripts/build-styles.js
 *
 * 输出：
 *   web/styles/v1/index.html  + theme.css
 *   web/styles/v2/index.html  + theme.css
 *   ... v3-v12
 */

const fs = require('fs');
const path = require('path');

const ROOT  = path.join(__dirname, '..');
const WEB   = path.join(ROOT, 'web');
const MAIN  = path.join(WEB, 'styles', 'main', 'index.html');

// 13 套样式调色板（同 web/admin-data.js · 这里只列 v1-v12，main 不变）
const STYLES = [
  { id:'v1',  name:'Kraft · 牛皮纸',       bg:'#F4F1E9', ink:'#15171C', acc:'#C2410C',
    accSoft:'rgba(194,65,12,0.1)', font:'Inter Tight, ui-sans-serif',
    mood:'暖米底 + 工业橙 · 印刷质感' },
  { id:'v2',  name:'Editorial · 财经版',   bg:'#F4F1EA', ink:'#0A0B0E', acc:'#B91C1C',
    accSoft:'rgba(185,28,28,0.08)', font:'"Source Serif Pro", ui-serif, Georgia',
    mood:'象牙底 + 海军蓝 + 绯红 · FT 风格' },
  { id:'v3',  name:'Mono · 单色电光',      bg:'#FAFAFA', ink:'#0A0A0A', acc:'#7C3AED',
    accSoft:'rgba(124,58,237,0.08)', font:'Inter Tight, ui-sans-serif',
    mood:'纯白纯黑 + 电光紫 · Brutalist' },
  { id:'v4',  name:'Sage · 植物学',        bg:'#F3F2EC', ink:'#0A0B0E', acc:'#A6531C',
    accSoft:'rgba(166,83,28,0.08)', font:'"Source Serif Pro", ui-serif',
    mood:'鼠尾草 + 陶土赭 · 静谧自然' },
  { id:'v5',  name:'Terminal · 暗夜终端',  bg:'#0E1014', ink:'#EDE9DC', acc:'#F59E0B',
    accSoft:'rgba(245,158,11,0.12)', font:'"JetBrains Mono", ui-monospace, Menlo',
    mood:'深炭 + 琥珀 CRT · 工程师向', dark:true },
  { id:'v6',  name:'Business · 商务蓝',    bg:'#FFFFFF', ink:'#0A0B0E', acc:'#1D4ED8',
    accSoft:'rgba(29,78,216,0.08)', font:'Inter Tight, ui-sans-serif',
    mood:'白底 + 海军蓝 + 钴蓝 · 企业沟通' },
  { id:'v7',  name:'《卷·五》Editorial Folio', bg:'#F4EFE5', ink:'#1A1611', acc:'#8B2A1F',
    accSoft:'rgba(139,42,31,0.08)', font:'"Source Serif Pro", "Noto Serif SC", ui-serif',
    mood:'★ 杂志大开本，衬线 + 留白 + 编者按' },
  { id:'v8',  name:'Technical Whitepaper', bg:'#FAFAF6', ink:'#0A0907', acc:'#9C1F1F',
    accSoft:'rgba(156,31,31,0.08)', font:'"Computer Modern", "Source Serif Pro", ui-serif',
    mood:'★ arXiv 技术报告，§ 编号 + 表格 + 脚注' },
  { id:'v9',  name:'Bento Modular · 模块化卡片', bg:'#EEEDE9', ink:'#0A0A0A', acc:'#FF5A1F',
    accSoft:'rgba(255,90,31,0.10)', font:'Inter Tight, ui-sans-serif',
    mood:'★ 现代产品页，圆角大卡 + 强对比拼图' },
  { id:'v10', name:'CLI · 终端命令行',     bg:'#0B0E0A', ink:'#E8E2C7', acc:'#F0B23A',
    accSoft:'rgba(240,178,58,0.12)', font:'"JetBrains Mono", ui-monospace',
    mood:'★ 全终端风，等宽字体 + 琥珀 CRT + $ 提示', dark:true },
  { id:'v11', name:'《冲刺日报》Newspaper', bg:'#F4EFE3', ink:'#15110B', acc:'#9C1F1F',
    accSoft:'rgba(156,31,31,0.08)', font:'"Old Standard TT", "Source Serif Pro", ui-serif',
    mood:'★ 报纸头版，多栏 serif + masthead + 双线分隔' },
  { id:'v12', name:'Brutalist · 极简极大字', bg:'#F4F2EC', ink:'#0A0A0A', acc:'#A3CC2F',
    accSoft:'rgba(163,204,47,0.18)', font:'Inter Tight, ui-sans-serif',
    mood:'★ 极大字号 + 黑白 + 电光酸绿单色块' },
];

/* --------------------------------------------------------------
   主题 CSS 模板 · 重写关键 CSS 变量 + 覆盖核心 class
   -------------------------------------------------------------- */
function buildThemeCSS(s) {
  // 暗主题需要反转更多 class 颜色
  const isDark = !!s.dark;
  return `/*
 * styles/${s.id}/theme.css · 自动生成（build-styles.js）
 * ${s.name}
 * ${s.mood}
 */
:root {
  --bg: ${s.bg};
  --ink: ${s.ink};
  --accent: ${s.acc};
  --accent-soft: ${s.accSoft};
}

html, body {
  background: ${s.bg} !important;
  color: ${s.ink} !important;
  font-family: ${s.font}, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif !important;
}

/* 主色全局覆盖 */
.accent, .new, .wb-tag.acc,
.hook-l, .hook-r .row .t em,
.s-cell.now .tag,
.wb-hl .lab .n,
.wb-hl .h .acc,
.intro-bullet .n,
.swash,
.eyebrow .sq, .hero-meta .sq,
.foot::before {
  color: ${s.acc} !important;
}

.hook-l { background: ${s.acc} !important; color: ${isDark ? s.bg : '#fff'} !important; }
.hero-meta .sq, .eyebrow .sq, .sec-label .sq,
.wb-output::before,
.hook-r .row .n,
.foot,
.hero-stat .n,
.s-cell.now,
.intro-quote::before,
.feat-grid,
.wb-output { ${'' /* 让 footer/wb-output 跟着主题色 */} }

.wb-output {
  background: ${isDark ? s.bg : '#1a1d21'} !important;
}
.foot {
  background: ${isDark ? '#0a0a0a' : s.ink} !important;
  color: ${isDark ? s.ink : '#f7f7f7'} !important;
  border-top-color: ${s.acc} !important;
}
.foot h2, .foot p, .foot .meta { color: inherit !important; }

a, .em, em.em, .ul { color: ${s.acc} !important; }
.hero-stat .n .u, .hero-stats { ${isDark ? `color: ${s.ink}; border-color: rgba(255,255,255,0.18);` : ''} }

/* CTA / 按钮 */
.btn-primary, .cta-row .btn, button.btn-primary {
  background: ${s.acc} !important;
  color: ${isDark ? s.bg : '#fff'} !important;
}

/* 暗主题额外修正 · 白底卡片反转 */
${isDark ? `
.s-track .s-cell, .wb-chapters table, .feat-grid .feat-cell,
.support .sup, .extra-item, .fit .fit-col, .route-tbl .row,
.stack-row, .intro-grid .intro-col, .arc-line .arc-step,
.hero-card, .open-q, .coresent {
  background: rgba(255,255,255,0.04) !important;
  color: ${s.ink} !important;
  border-color: rgba(255,255,255,0.12) !important;
}
.wb-chapters table tr,
.route-tbl .row,
.stack-row { border-color: rgba(255,255,255,0.08) !important; }
.hero-stat .l, .wb-hl .b, .s-cell .lab, .s-cell .ti,
.fit-col ul, .stack .layer {
  color: ${s.ink} !important;
  opacity: 0.85;
}
.hero-stats { background: rgba(255,255,255,0.03) !important; }
` : ''}

/* 字体类 · 大标题更显式 */
.h-section, .hero-title, h1, h2, h3 {
  font-family: ${s.font}, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif !important;
}

/* 给画廊里能立刻看出区别的视觉标记：左上角一条主色色块 */
body::before {
  content: "";
  position: fixed; left: 0; top: 0; width: 4px; height: 100vh;
  background: ${s.acc};
  z-index: 9999;
  pointer-events: none;
}
`;
}

/* --------------------------------------------------------------
   主流程
   -------------------------------------------------------------- */
function main() {
  if (!fs.existsSync(MAIN)) {
    console.error('✗ 没找到 main 样式：', MAIN);
    process.exit(1);
  }
  const mainHtml = fs.readFileSync(MAIN, 'utf8');

  let ok = 0;
  STYLES.forEach((s) => {
    const dir = path.join(WEB, 'styles', s.id);
    fs.mkdirSync(dir, { recursive: true });

    // 1. theme.css
    fs.writeFileSync(path.join(dir, 'theme.css'), buildThemeCSS(s), 'utf8');

    // 2. index.html · 从 main 克隆 + 插入主题 CSS link
    let html = mainHtml;

    // 在 </head> 前插一行主题 CSS 引用
    const themeTag = `  <link rel="stylesheet" href="theme.css">\n  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${encodeURIComponent('Noto Serif SC')}:wght@400;700&family=${encodeURIComponent('JetBrains Mono')}:wght@400;700&display=swap">\n`;
    html = html.replace('</head>', `${themeTag}</head>`);

    // 在 <title> 后加样式后缀，保留原文（含关键短语）
    html = html.replace(/<title>([^<]+)<\/title>/, `<title>$1 · 样式 ${s.id} · ${s.name}</title>`);

    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
    ok++;
    console.log(`✓ ${s.id.padEnd(4)} → ${path.relative(ROOT, dir)} · ${s.name}`);
  });

  console.log(`\n生成完成 · ${ok}/${STYLES.length} 套样式 + 13 套对应 theme.css`);
}

main();
