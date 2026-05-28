#!/usr/bin/env node
/**
 * scripts/sync-content.js
 *
 * 把最新内容同步到所有 13 套样式：
 *
 * 1) 通用文本替换 · 对 main + v1-v6（内嵌 HTML）+ v7-v12 的 s5-data.js 都生效：
 *    心里发虐 → 非常迷茫
 *    "不教你调 LangChain 跑 demo" → "还在 LangChain 跑 demo？还在脚本一键训练公开数据集？"
 *    "10 套交互式课件 · 算法 × 工程双修 · 简历级硬项目" → "...· 5 个工业级项目 · 算法 × 工程双修"
 *
 * 2) 结构性变更 · 只对 v7-v12 共 6 份 s5-data.js（解析 JSON-after-prefix）：
 *    · hero.stats 从 4 项扩到 5 项（含 3V1 答疑 / 5 个工业级 / 1V1 定制路线）
 *    · hook.rows 加第 5 条「一键训练脚本 → 面试官一看就是 toy」
 *    · support.items 加 05 答疑 / 06 面试真题 / 07 Tech 跟踪
 *    · footerCTA 加 teacherSub 字段
 *
 * 跑：
 *   node scripts/sync-content.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WEB  = path.join(ROOT, 'web');

/* --------------------------------------------------------------
   1. 通用文本替换 · 应用到所有 v1-v6 HTML + 所有 s5-data.js
   -------------------------------------------------------------- */
// HTML 文件用的替换（可以用任意双引号属性）
const TEXT_PATCHES_HTML = [
  { from: /心里发虐/g, to: '非常迷茫' },
  {
    from: /不教你调 LangChain 跑 demo —— 是带你/g,
    to: '<b style="color:var(--accent)">还在 LangChain 跑 demo？还在脚本一键训练公开数据集？</b> —— 是带你',
  },
  // v1 / 早期版本里另一种说法
  {
    from: /不是教你调 LangChain 跑 demo —— 是带你/g,
    to: '<b style="color:var(--accent)">还在 LangChain 跑 demo？还在脚本一键训练公开数据集？</b> —— 是带你',
  },
  {
    from: /10 套交互式课件 · 算法 × 工程双修 · 简历级硬项目。/g,
    to: '10 套交互式课件 · 5 个工业级项目 · 算法 × 工程双修。',
  },
  { from: /免费 30 分钟/g, to: '' },
  { from: /报名 \/ 价格 \/ 退费/g, to: '报名 / 价格 / 定制路径' },
];

// s5-data.js 是 JSON-like，里面 HTML 用双引号包裹，所以嵌入的 HTML 不能再用双引号
// 改用 class 替代 inline style（不用嵌入引号）
const TEXT_PATCHES_DATA = [
  { from: /心里发虐/g, to: '非常迷茫' },
  {
    from: /不教你调 LangChain 跑 demo —— 是带你/g,
    to: '<b class=\\"acc\\">还在 LangChain 跑 demo？还在脚本一键训练公开数据集？</b> —— 是带你',
  },
  {
    from: /10 套交互式课件 · 算法 × 工程双修 · 简历级硬项目。/g,
    to: '10 套交互式课件 · 5 个工业级项目 · 算法 × 工程双修。',
  },
  { from: /免费 30 分钟/g, to: '' },
  { from: /报名 \/ 价格 \/ 退费/g, to: '报名 / 价格 / 定制路径' },
];

function applyText(file, patches) {
  let src = fs.readFileSync(file, 'utf8');
  let n = 0;
  patches.forEach((p) => {
    const before = src;
    src = src.replace(p.from, p.to);
    if (src !== before) n++;
  });
  fs.writeFileSync(file, src, 'utf8');
  return n;
}

const TARGETS_HTML = [
  path.join(WEB, 'styles', 'main', 'index.html'),
  ...['v1','v2','v3','v4','v5','v6'].map(v => path.join(WEB, 'styles', v, 'index.html')),
];
const TARGETS_DATA = ['v7','v8','v9','v10','v11','v12']
  .map(v => path.join(WEB, 'styles', v, 's5-data.js'));

console.log('── 1. 通用文本替换 ─────────────────────────');
TARGETS_HTML.forEach((f) => {
  if (!fs.existsSync(f)) { console.log('  - ' + path.relative(ROOT, f) + ' (不存在)'); return; }
  const n = applyText(f, TEXT_PATCHES_HTML);
  console.log(`  ${n ? '✓' : '·'} ${path.relative(ROOT, f)} · ${n} 处替换`);
});
TARGETS_DATA.forEach((f) => {
  if (!fs.existsSync(f)) { console.log('  - ' + path.relative(ROOT, f) + ' (不存在)'); return; }
  const n = applyText(f, TEXT_PATCHES_DATA);
  console.log(`  ${n ? '✓' : '·'} ${path.relative(ROOT, f)} · ${n} 处替换`);
});

/* --------------------------------------------------------------
   2. 结构性变更 · 解析 s5-data.js 修改 JSON，写回
   -------------------------------------------------------------- */
function loadDataJs(file) {
  const src = fs.readFileSync(file, 'utf8');
  // s5-data.js 形如：
  //   /* comment */
  //   window.S5_DATA = { ... };
  const m = src.match(/window\.S5_DATA\s*=\s*(\{[\s\S]*\})\s*;?\s*$/m);
  if (!m) throw new Error('无法解析 ' + file + '（找不到 window.S5_DATA = ...）');
  // 用 Function 同等于 eval but 不污染作用域
  return { src, prefix: src.slice(0, m.index), data: (new Function('return ' + m[1]))() };
}

function saveDataJs(file, prefix, data) {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(file, prefix + 'window.S5_DATA = ' + json + ';\n', 'utf8');
}

function patchData(data) {
  let changes = 0;

  /* ---- hero.stats 5 格 ---- */
  if (data.hero && Array.isArray(data.hero.stats)) {
    const newStats = [
      { n: '10<span class="u">周</span>',   l: '完整路线' },
      { n: '3V1',                            l: '答疑' },
      { n: '5<span class="u">个</span>',    l: '工业级项目' },
      { n: '1V1',                            l: '定制路线' },
      { n: '4090',                           l: '独享算力' },
    ];
    // 仅当不匹配时才覆盖
    if (data.hero.stats.length !== 5 ||
        !data.hero.stats.some(s => /3V1/.test(s.n)) ||
        !data.hero.stats.some(s => /工业级项目/.test(s.l))) {
      data.hero.stats = newStats;
      changes++;
    }
  }

  /* ---- hook.rows 加第 5 条「一键训练脚本」 ---- */
  if (data.hook && Array.isArray(data.hook.rows)) {
    const row5 = {
      n: '05',
      t: '跑过几次 <b>「一键训练脚本」</b>，<s>公开数据集出了点分</s>，<em>面试官一看就是 toy</em>。',
    };
    // 看看是否已包含
    const has = data.hook.rows.some(r => /一键训练脚本/.test(r.t || ''));
    if (!has) {
      // 在原 04 之后插入，剩下的 05/06 编号往后推
      const insertAt = data.hook.rows.findIndex(r => /demo 级/.test(r.t || ''));
      if (insertAt >= 0) {
        // 把原 05 改成 06
        for (let i = insertAt + 1; i < data.hook.rows.length; i++) {
          const ord = String(i + 2).padStart(2, '0');
          data.hook.rows[i].n = ord;
        }
        data.hook.rows.splice(insertAt + 1, 0, row5);
      } else {
        data.hook.rows.push(row5);
      }
      changes++;
    }
  }

  /* ---- support.items 改成 7 项 · 01/02 合并 · 加 05/06/07 ---- */
  if (data.support && Array.isArray(data.support.items)) {
    const needsRewrite = !data.support.items.some(i => /课程交付|Tech 跟踪/.test(i.h || i.n || ''));
    if (needsRewrite) {
      data.support.items = [
        { n: '01 · 课程交付', h: '直播 + 录播 + 代码 + 课件', b: '每周固定直播 · 全程录播回看 · 课程代码完整开源 · 10 套交互式课件随取随用。' },
        { n: '02 · 1V1 陪跑', h: '学习路线 + 简历打磨 + Mock 面试', b: '第一次：背景分析 + 路线定制 + 简历初评。第二次：终版打磨 + 大厂面试官模拟面试。' },
        { n: '03 · 算力', h: '独享 4090 · 24G 显存', b: '课程期间每人独享 24G 显存，跑课程代码无忧 —— 不用为算力发愁。' },
        { n: '04 · 社群', h: '知识星球 + 闭门直播', b: '每日更新 AI 岗位信息 · 闭门直播 · 飞书知识库资源 · 个性化指导。' },
        { n: '05 · 答疑', h: '3V1 答疑群 + 助教', b: '每个学员配 <b>3 个答疑老师</b> · 微信群答疑。' },
        { n: '06 · 面试真题', h: '真正的大厂面试真题', b: '2024-2026 跑通大厂的同学回流的 <b>LLM 真题库</b> · 算法 + 系统设计 + 八股，全部实战来源。' },
        { n: '07 · Tech 跟踪', h: '持续跟踪最新 Tech 更新', b: '每周整理 arxiv / 业界 blog / 新模型动态 · 课程内容随技术演进迭代 —— 让你不被淘汰、也不再 FOMO。' },
      ];
      changes++;
    }
  }

  /* ---- footerCTA 加 teacher 字段 ---- */
  if (data.footerCTA && !data.footerCTA.teacherSub) {
    data.footerCTA.teacherEyebrow = 'READY TO ENROLL · 准备报名';
    data.footerCTA.teacherSub = '报名 / 价格 / 定制路径 等问题，<b>联系老师即可一对一解答</b>，附赠 1 节试听课';
    data.footerCTA.teacherBtn = '联系老师领取试听课';
    changes++;
  }

  return changes;
}

console.log('\n── 2. 结构性变更 (v7-v12 的 s5-data.js) ───');
TARGETS_DATA.forEach((f) => {
  if (!fs.existsSync(f)) { console.log('  - ' + path.relative(ROOT, f) + ' (不存在)'); return; }
  const { prefix, data } = loadDataJs(f);
  const n = patchData(data);
  if (n > 0) {
    saveDataJs(f, prefix, data);
    console.log(`  ✓ ${path.relative(ROOT, f)} · ${n} 处结构性更新`);
  } else {
    console.log(`  · ${path.relative(ROOT, f)} · 无需改动`);
  }
});

console.log('\n完成。\n');
console.log('提示：v1-v6 的"结构性改动"（新增 hook 行 / 新增 support 卡）无法通过 sed 注入，');
console.log('     需要单独人工编辑各 HTML（每套 162K · 不同 DOM）。');
console.log('     目前已通过 ContactBlock 注入提供了底部"联系老师"块。');
