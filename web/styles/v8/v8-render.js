/* v8 Whitepaper · render */
(function(){
  const D = window.S5_DATA;
  if (!D) { document.getElementById('root').innerHTML = '<p>Data not loaded</p>'; return; }
  const SVG = window.S5_ARCH_SVG || '';

  // === Title page ===
  const tpStats = D.hero.stats.map(s=>`<div class="tp-stat"><div class="n">${s.n}</div><div class="l">${s.l}</div></div>`).join('');

  const tocItems = [
    {n:'§1',  t:'Editorial · 当下五问 / Self-Check', pg:'EDITORIAL', sub:[]},
    {n:'§2',  t:'Chronicle · S 系列五年沿革', pg:'CHRONICLE', sub:[
      {n:'2.1', t:'S2 · S3 · S4 概览'},
      {n:'2.2', t:'S4 → S5 · 三个根本变化'}
    ]},
    {n:'§3',  t:'Algorithm × Engineering · 课程定位', pg:'POSITIONING', sub:[]},
    {n:'§4',  t:'Curriculum Roadmap · 十周表', pg:'ROADMAP', sub:[]},
    {n:'§5',  t:'Weekly Detail · 十周详解', pg:'WEEKS', sub:
      D.weeks.map((w,i)=>({n:`5.${i+1}`, t:`${w.wk} · ${w.ti}`}))
    },
    {n:'§6',  t:'Capstone · 工业级落地架构', pg:'CAPSTONE', sub:[]},
    {n:'§7',  t:'Tech Index · 11 层技术栈', pg:'INDEX', sub:[]},
    {n:'§8',  t:'Support · Fit · Enrollment', pg:'CODA', sub:[]},
  ];

  const tocHtml = tocItems.map(it=>{
    const main = `<a class="tp-toc-row" href="#${it.n.replace('§','s')}"><span class="num">${it.n}</span><span class="t"><b>${it.t}</b></span><span class="leader"></span><span class="pg">${it.pg}</span></a>`;
    const subs = it.sub.map(s=>`<a class="tp-toc-row sub" href="#${(s.n.replace('.','-'))}"><span class="num">${s.n}</span><span class="t">${s.t}</span><span class="leader"></span><span class="pg"></span></a>`).join('');
    return main + subs;
  }).join('');

  const tp = `
    <section class="titlepage">
      <div class="doc">
        <div class="tp-banner">
          <div class="l"><b>S5 / 2026</b> · TR-S5-001</div>
          <div class="m">A Technical Report on Agentic Systems &amp; Post-Train Production</div>
          <div class="r">Issue 05 · 2026 · v1.0</div>
        </div>

        <div class="tp-meta-row">
          <span>TECHNICAL REPORT · 十周冲刺营</span>
          <span class="red">★ AGENT × POST-TRAIN · 全面更新</span>
        </div>

        <h1 class="tp-title">
          2026 大模型冲刺营：<span class="acc">Agentic</span> 系统工程<br/>与 <span class="acc">Post-Train</span> 工业级落地方法论
          <span class="sub">— A 10-week curriculum for engineers who want to ship the algorithm and the infrastructure, end-to-end.</span>
        </h1>

        <div class="tp-authors">
          <span class="lab">Issuer</span>
          <span class="val"><b>2026 大模型冲刺营 · 编委会</b> · Curriculum Team · Edition 05</span>
          <span class="lab">Scope</span>
          <span class="val">10 weeks · 10 interactive courseware packages · 1 industrial capstone · 22 weeks of S-series lineage</span>
          <span class="lab">Status</span>
          <span class="val">Open · Enrollment Active · Production-Ready Curriculum</span>
        </div>

        <div class="tp-abstract">
          <div class="lab">Abstract</div>
          <p>
            <b>本报告</b>系统刻画 <b>S5/2026</b> 大模型冲刺营的课程结构、技术栈与落地方法。课程以"算法 × 工程双修"为方法论核心，<b>在 10 周内完成 6 大阶段</b>：从 Agent Skill 抽象、单 Agent 工程范本（ClaudeCode）、Agent 集群（OpenClaw），过渡到工业级 RL 训练框架（verl/HybridFlow），并落到 Post-Train 完整闭环（SFT 冷启动、Curriculum Learning、GRPO/GSPO/DAPO 算法）；最终通过工程基建（Docker/K8s/可观测性）与多模态/GUI Agent 能力扩展，集成为一个企业内部智能协同助手平台。
          </p>
          <p>
            与传统课程不同，本期取消纯论文导读与 LangChain 演示，<b>全部 10 套交互式课件均要求学员从 0–1 自行实现并部署</b>。课程提供 4090 独享算力、2 次 1v1 陪跑、知识星球资源与 S2/S3/S4 完整归档。
          </p>
          <div class="kw"><b>Keywords</b>Agent Skill · ClaudeCode · OpenClaw · verl HybridFlow · Agentic RL · GRPO/GSPO/DAPO · SFT · Curriculum · Post-Train · GUI Agent · 多模态 RAG · K8s · MCP · 企业级 Swarm</div>
        </div>

        <div class="tp-stats">${tpStats}</div>

        <div class="tp-toc">
          <div class="tp-toc-h">Table of Contents · 目录</div>
          ${tocHtml}
        </div>
      </div>
    </section>
  `;

  // === §1 Editorial ===
  const qHtml = D.hero.selfCheck.qs.map(q=>`
    <div class="row">
      <div class="cell" style="font-family:var(--mono);color:var(--acc);font-weight:700;font-size:12px">${q.n}</div>
      <div class="cell">${q.t}</div>
    </div>`).join('');
  const painParas = D.hook.rows.map((r,i)=>`<p>${i===0?'<b>1.1 当前痛点。</b> ':`<b>1.${i+1}</b> `}${r.t}</p>`).join('');

  const s1 = `
    <section class="s" id="s1">
      <div class="doc">
        <div class="s-num"><b>§ 1.0</b> · Editorial<span class="div"></span><span class="meta">编者按 · 现状评估</span></div>
        <h2 class="s-title">1.0 &nbsp;现状评估：<em>是不是卡在就业这一关？</em></h2>
        <p class="s-lead">本节列举 2026 年 LLM 求职者最常见的五类卡点，及其与本课程目标的对应关系。卡点描述基于过去一年累计 3,000+ 求职咨询样本。</p>

        <div class="body" style="margin-top:18px">${painParas}</div>

        <h3 class="ss-title" id="self-check"><span class="num">1.6</span>Self-Check · 五题面试快诊</h3>
        <p class="body">每一题对应课程中的具体章节。<b>答得上即跳过；答不上的章节，即是你需要的章节</b>。</p>

        <div class="tbl" style="margin-top:14px">
          <div class="row head" style="grid-template-columns:60px 1fr"><div class="cell">No.</div><div class="cell">Question</div></div>
          ${qHtml}
        </div>
        <div class="tbl-cap"><b>Table 1</b>面试 Self-Check · ${D.hero.selfCheck.foot.replace(/<[^>]+>/g,'')}</div>
      </div>
    </section>
  `;

  // === §2 Chronicle ===
  const cohortCells = D.series.map(c=>{
    const groups = c.groups.map(g=>`<div class="lab">${g.lab}</div><ul>${g.items.map(x=>`<li>${x}</li>`).join('')}</ul>`).join('');
    return `
      <div class="c ${c.now?'now':''}">
        <div class="tag">${c.tag}</div>
        <div class="id">${c.id}</div>
        <div class="ti">${c.ti}</div>
        <div class="span">${c.span}</div>
        ${groups}
        <div class="foot">${c.foot}</div>
      </div>`;
  }).join('');

  const dl = D.seriesDelta;
  const deltaItems = dl.items.map(i=>`
    <div class="item"><div class="n">${i.n}</div><div class="h2">${i.h}</div><div class="b">${i.b}</div></div>`).join('');

  const s2 = `
    <section class="s" id="s2">
      <div class="doc">
        <div class="s-num"><b>§ 2.0</b> · Chronicle<span class="div"></span><span class="meta">S 系列 · 五年沿革</span></div>
        <h2 class="s-title">2.0 &nbsp;Chronicle: <em>五期沉淀 — 课程的迭代轨迹</em></h2>
        <p class="s-lead">从 2024 年的 S2 算法系统课，到 2025 年的 S3 求职急救营 + S4 Agent 工程工业级，再到本期 S5 — 每一期都对准当时市场最稀缺的能力栈做迭代。<b>S5 把工业级 Agentic 系统 + Post-Train 全闭环装上去，这是 2026 年最值钱的两块硬骨头</b>。</p>

        <h3 class="ss-title" id="s2-1"><span class="num">2.1</span>Cohort Overview · S2 → S5 横向对照</h3>
        <div class="cohort">${cohortCells}</div>

        <h3 class="ss-title" id="s2-2"><span class="num">2.2</span>Delta · S4 → S5 的三个根本变化</h3>
        <p class="body">为什么 S5 不是 S4 的小升级，而是一次彻底重构。</p>
        <div class="delta">
          <div class="lab">${dl.tag}</div>
          <div class="h">${dl.t}</div>
          <div class="d">${dl.d}</div>
          <div class="items">${deltaItems}</div>
        </div>
      </div>
    </section>
  `;

  // === §3 Essay ===
  const intro = D.intro;
  const cols = intro.cols.filter(c=>!c.merge).map(c=>`
    <div class="c">
      <div class="lab">${c.lab.replace(/^A · /,'<b>A</b> · ').replace(/^B · /,'<b>B</b> · ')}</div>
      <div class="ans">${c.ans}</div>
      <div class="desc">${c.desc}</div>
    </div>`).join('');
  const merge = intro.cols.find(c=>c.merge);
  const tenets = intro.bullets.map(b=>`<div class="tenet"><div class="n">${b.n}</div><div class="t">${b.t}</div><div class="d">${b.d}</div></div>`).join('');

  const s3 = `
    <section class="s" id="s3">
      <div class="doc">
        <div class="s-num"><b>§ 3.0</b> · Positioning<span class="div"></span><span class="meta">课程定位 · 算法 × 工程</span></div>
        <h2 class="s-title">3.0 &nbsp;Positioning: <em>算法 vs 工程，还是算法 × 工程？</em></h2>
        <p class="s-lead">${D.intro.lead.replace(/<[^>]+>/g,'')}</p>

        <div class="blockq" style="margin-top:24px">
          能让你提升上限的，从来不是单点能力。而是同时能把工业级 Agent 系统写出来、又能把 Post-Train 训练管线跑通、再把整套东西部署上线的 <b>"算法 + 工程兼具"</b> 的工程师。
          <cite>— 编者按 · 2026 春</cite>
        </div>

        <h3 class="ss-title" id="s3-1"><span class="num">3.1</span>两种偏科型工程师 · 现状画像</h3>
        <div class="essay-grid">${cols}</div>

        <h3 class="ss-title" id="s3-2"><span class="num">3.2</span>目标画像 · 算法 × 工程双修</h3>
        <div class="essay-merge">
          <div class="lab">${merge.lab}</div>
          <div class="ans">${merge.ans}</div>
          <div class="desc">${merge.desc}</div>
        </div>

        <h3 class="ss-title" id="s3-3"><span class="num">3.3</span>课程四原则 · Curriculum Tenets</h3>
        <div class="tenets">${tenets}</div>
      </div>
    </section>
  `;

  // === §4 Roadmap ===
  const arcs = D.route.arc.map(a=>`<div class="cell" style="display:flex;flex-direction:column;align-items:flex-start;gap:4px"><span style="font-family:var(--mono);font-size:10px;color:var(--acc);font-weight:700;letter-spacing:0.12em">${a.n}</span><span style="font-family:var(--serif);font-size:14px;font-weight:600;color:var(--ink);line-height:1.3">${a.t}</span></div>`).join('');
  const rmRows = D.route.rows.map(r=>`
    <div class="row">
      <div class="cell" style="font-family:var(--mono);font-weight:700;color:var(--acc);font-size:13px">${r.wk}</div>
      <div class="cell" style="font-weight:700;color:var(--ink);font-family:var(--serif);font-size:15px">${r.topic}</div>
      <div class="cell" style="font-style:italic;color:var(--ink-2)">${r.pos}</div>
      <div class="cell" style="font-family:var(--mono);font-size:11px;color:var(--ink-3);letter-spacing:0.06em;text-transform:uppercase">${r.stage}</div>
    </div>`).join('');

  const s4 = `
    <section class="s" id="s4">
      <div class="doc">
        <div class="s-num"><b>§ 4.0</b> · Curriculum Roadmap<span class="div"></span><span class="meta">十周 · 六阶段</span></div>
        <h2 class="s-title">4.0 &nbsp;Curriculum Roadmap: <em>十周 × 六阶段</em></h2>
        <p class="s-lead">从理解 Agent 的本质 → 看世界级范本 → 打通模型基座 → 工业化部署 → 拓展模态 → 真实业务落地。<b>每一周都和前后强耦合，不是六门孤立的课。</b></p>

        <h3 class="ss-title"><span class="num">4.1</span>六阶段递进 · Stage Macro-Arc</h3>
        <div class="tbl">
          <div class="row" style="grid-template-columns:repeat(6,1fr)">${arcs}</div>
        </div>
        <div class="tbl-cap"><b>Table 2</b>六阶段宏观轴 · 每阶段对应若干周</div>

        <h3 class="ss-title"><span class="num">4.2</span>十周细表 · Weekly Schedule</h3>
        <div class="tbl">
          <div class="row head" style="grid-template-columns:60px 1fr 1.4fr 200px">
            <div class="cell">Week</div>
            <div class="cell">Topic</div>
            <div class="cell">Positioning</div>
            <div class="cell">Stage</div>
          </div>
          ${rmRows.replace(/grid-template-columns:60px 1fr 1.4fr 200px/g,'').replace(/<div class="row">/g,'<div class="row" style="grid-template-columns:60px 1fr 1.4fr 200px">')}
        </div>
        <div class="tbl-cap"><b>Table 3</b>十周课表 · 每周覆盖一个工业级技术栈</div>
      </div>
    </section>
  `;

  // === §5 Weekly Detail ===
  const weekArticles = D.weeks.map((w,idx)=>{
    const n = idx+1;
    const hl = w.highlights.map(h=>`<div class="hl"><div class="lab">${h.lab}</div><div class="h">${h.h}</div><div class="b">${h.b}</div></div>`).join('');
    const chRows = w.chapters.map(c=>`
      <div class="row" style="grid-template-columns:160px 1fr">
        <div class="cell" style="font-family:var(--mono);font-size:11.5px;color:var(--ink-3);letter-spacing:0.04em;font-weight:600">${c.ch}</div>
        <div class="cell" style="font-family:var(--serif);font-size:14px;color:var(--ink-2);line-height:1.55">${c.ti}</div>
      </div>`).join('');
    const tags = w.tags.map(t=>`<span class="tag">${t}</span>`).join('');
    const player = w.player ? `
      <div class="player">
        <div class="bar">
          <div class="ll"><span class="dot"></span><span class="name">${w.player.name}</span><span>· LIVE PREVIEW</span></div>
          ${w.player.href && w.player.href!=='#' ? `<a class="openlk" href="${w.player.href}" target="_blank" rel="noopener">新窗口打开 ↗</a>` : '<span style="opacity:0.45">开课前交付</span>'}
        </div>
        <div class="frame-wrap">
          ${w.player.src ? `<iframe loading="lazy" src="${w.player.src}" title="${w.player.name}"></iframe>` : ''}
          <div class="ph" ${w.player.src?'data-fallback':''}>
            <div class="ph-h">${w.player.phH}</div>
            <div class="ph-d">${w.player.phD}</div>
            ${w.player.src ? `<button onclick="this.parentElement.previousElementSibling.src=this.parentElement.previousElementSibling.src;this.parentElement.style.display='none';">加载预览 ▸</button>` : ''}
          </div>
        </div>
      </div>` : '';
    const outBullets = w.output ? w.output.bullets.map((b,j)=>`<li data-n="(${j+1})">${b}</li>`).join('') : '';
    const output = w.output ? `
      <div class="output">
        <div class="lab">${w.output.lab}</div>
        <div class="b">${w.output.b}</div>
        ${outBullets?`<ul>${outBullets}</ul>`:''}
      </div>` : '';

    return `
      <article class="week" id="5-${n}">
        <div class="week-h">
          <div class="id">§ 5.${n}</div>
          <div>
            <h3 class="ti">${w.wk} &nbsp;${w.ti}</h3>
          </div>
          <div class="stage">${w.stage}</div>
        </div>
        <div class="week-meta">
          <span>STAGE · <b>${w.meta}</b></span>
          <span>FOCUS · ${w.whyLab}</span>
          ${w.player?'<span>PREVIEW · 含课件</span>':''}
        </div>

        <h4 class="sss-title"><b>5.${n}.1</b> &nbsp;Motivation · 为什么放在这一周</h4>
        <div class="body">
          <p>${w.narrMain}</p>
          ${w.narrSub?`<p class="fn"><span class="mk">¶</span>${w.narrSub}</p>`:''}
        </div>

        <h4 class="sss-title"><b>5.${n}.2</b> &nbsp;Highlights · 三大要点</h4>
        <div class="hl-list">${hl}</div>

        <h4 class="sss-title"><b>5.${n}.3</b> &nbsp;Courseware Chapters · ${w.pkgName}<span style="color:var(--ink-3);font-weight:500;font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:0.12em;margin-left:10px">${w.pkgCount}</span></h4>
        <div class="tbl">${chRows}</div>

        ${w.player?`<h4 class="sss-title"><b>5.${n}.4</b> &nbsp;Live Preview · 在线课件</h4>${player}`:''}

        ${tags?`<h4 class="sss-title"><b>5.${n}.5</b> &nbsp;Technical Tags</h4><div class="tags">${tags}</div>`:''}

        ${w.output?`<h4 class="sss-title"><b>5.${n}.6</b> &nbsp;Outcomes · 学完这一周</h4>${output}`:''}
      </article>
    `;
  }).join('');

  const s5 = `
    <section class="s" id="s5">
      <div class="doc">
        <div class="s-num"><b>§ 5.0</b> · Weekly Detail<span class="div"></span><span class="meta">十周详解 · 含课件预览</span></div>
        <h2 class="s-title">5.0 &nbsp;Weekly Detail · <em>逐周技术地图</em></h2>
        <p class="s-lead">本节按周展开课程结构。每周包含 (1) Motivation 为什么放在这一周 · (2) Highlights 三大要点 · (3) Courseware Chapters 课件章节 · (4) Live Preview 在线预览 · (5) Tags 技术标签 · (6) Outcomes 学完产出。<b>课件不是 PDF，是可交互的网页式教学系统。</b></p>
        ${weekArticles}
      </div>
    </section>
  `;

  // === §6 Capstone ===
  const featStats = D.project.meta.map(m=>`
    <div class="feature-stat">
      <div class="num">${m.num}</div>
      <div class="lab">${m.lab}</div>
      <div class="d">${m.d}</div>
    </div>`).join('');
  const featCells = D.project.features.map(f=>`<div class="c"><div class="h">${f.h}</div>${f.body}</div>`).join('');

  const s6 = `
    <section class="s wide" id="s6">
      <div class="doc-wide">
        <div class="s-num"><b>§ 6.0</b> · Industrial Capstone<span class="div"></span><span class="meta">企业内部智能协同助手平台</span></div>
        <h2 class="s-title">6.0 &nbsp;Capstone: <em>企业内部智能协同助手平台</em></h2>
        <p class="s-lead">${D.project.lead}</p>

        <h3 class="ss-title"><span class="num">6.1</span>Project Vitals · 关键指标</h3>
        <div class="feature-stats">${featStats}</div>

        <h3 class="ss-title"><span class="num">6.2</span>System Architecture · 系统架构（Figure 1）</h3>
        <p class="body">下图为企业智能协同助手平台的端到端系统架构，覆盖 Channel Layer / Gateway / Agent Swarm / Storage / Post-Train Platform / Observability 六层。</p>
        <div class="figure">${SVG}</div>
        <div class="figure-cap"><b>Figure 1</b>System Architecture · 12+ Service Modules · 5 Specialist Agents · 20+ Skill Library · On-Prem · Self-Evolving Loop</div>
        <button class="arch-zoom" id="archZoomBtn" type="button">⌖ 全屏查看架构大图</button>

        <h3 class="ss-title"><span class="num">6.3</span>Capabilities Catalogue · 12 项能力清单</h3>
        <div class="feat-grid">${featCells}</div>

        <div class="box dark" data-label="Business Outcomes · 业务落地能力" style="margin-top:24px;max-width:none">
          <div class="b">${D.project.bizList || '会议纪要 · 周报 · 风险预警 · SOP 问答 · 定时播报 · 文档智能管理 · 数据可视化分析 —— 全部基于上图架构跑通。'}</div>
        </div>
      </div>
    </section>
  `;

  // === §7 Tech Index ===
  const stackRows = D.stack.rows.map(r=>`
    <div class="row">
      <div class="cell" style="font-family:var(--serif);font-weight:700;color:var(--ink);font-size:15px">${r.layer}</div>
      <div class="cell" style="font-family:var(--mono);font-size:12.5px;color:var(--ink-2);line-height:1.6">${r.tech}</div>
      <div class="cell" style="font-family:var(--mono);font-size:12px;font-weight:700;color:var(--acc);letter-spacing:0.04em">${r.wk}</div>
    </div>`).join('');
  const s7 = `
    <section class="s" id="s7">
      <div class="doc">
        <div class="s-num"><b>§ 7.0</b> · Tech Index<span class="div"></span><span class="meta">11 层全栈 · hand-on</span></div>
        <h2 class="s-title">7.0 &nbsp;Tech Index · <em>11 层全栈索引</em></h2>
        <p class="s-lead">每一项都是真在课程里 hand-on 写过、跑过的，不是 buzzword。</p>
        <div class="tbl stack-tbl">
          <div class="row head"><div class="cell">Layer</div><div class="cell">Technology Stack</div><div class="cell">Week</div></div>
          ${stackRows}
        </div>
        <div class="tbl-cap"><b>Table 4</b>11 层全栈对照表 · 课程章节映射</div>
      </div>
    </section>
  `;

  // === §8 Coda ===
  const supItems = D.support.items.map(s=>`<div class="c"><div class="n">${s.n}</div><div class="h">${s.h}</div><div class="b">${s.b}</div></div>`).join('');
  const supExtras = D.support.extras.map(e=>`<div class="c"><div class="t">${e.t}</div><div class="ti">${e.ti}</div><div class="d">${e.d}</div></div>`).join('');
  const fitCols = D.fit.cols.map(c=>`
    <div class="c ${c.no?'no':''}">
      <div class="h"><span class="ic">${c.no?'×':'§'}</span><span>${c.h}</span></div>
      <ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul>
    </div>`).join('');

  const s8 = `
    <section class="s" id="s8">
      <div class="doc">
        <div class="s-num"><b>§ 8.0</b> · Support · Fit · Enrollment<span class="div"></span><span class="meta">配套支持 · 适合谁 · 报名</span></div>
        <h2 class="s-title">8.0 &nbsp;Support · Fit · Enrollment</h2>
        <p class="s-lead">${D.support.lead}</p>

        <h3 class="ss-title"><span class="num">8.1</span>Curriculum Support · 配套支持</h3>
        <div class="sup-grid">${supItems}</div>

        <h3 class="ss-title"><span class="num">8.2</span>Archive Bonus · S 系列归档解锁</h3>
        <p class="body" style="margin-bottom:10px"><b>${D.support.extraTitle}</b></p>
        <div class="extra-grid">${supExtras}</div>

        <h3 class="ss-title"><span class="num">8.3</span>Audience Fit · 适合 / 不适合</h3>
        <div class="fit-grid">${fitCols}</div>
      </div>
    </section>
  `;

  const coda = `
    <section class="coda">
      <div class="doc">
        <div class="eb">END OF REPORT · GET STARTED</div>
        <h2>10 周后，你会有一份<br/>算法 + 工程<span class="it">双修</span>的硬资产。</h2>
        ${D.foot.ps.map(p=>`<p>${p}</p>`).join('')}
        <div class="meta">${D.foot.meta}</div>
      </div>
    </section>
  `;

  document.getElementById('root').innerHTML =
    tp + s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + coda;

  // Player placeholders
  document.querySelectorAll('.player').forEach(p => {
    const f = p.querySelector('iframe');
    const ph = p.querySelector('.ph');
    if (!f || !ph) return;
    ph.style.display = 'flex';
    f.addEventListener('load', () => { try{ ph.style.display='none'; }catch(e){} });
  });

  // Arch modal
  (function(){
    const btn = document.getElementById('archZoomBtn');
    const modal = document.getElementById('archModal');
    const closeBtn = document.getElementById('archModalClose');
    const body = document.getElementById('archModalBody');
    if(!btn||!modal||!closeBtn||!body) return;
    function openM(){
      if(!body.firstChild){
        const svg = document.querySelector('.figure svg');
        if(svg){ const clone = svg.cloneNode(true); clone.removeAttribute('style'); body.appendChild(clone); }
      }
      modal.classList.add('open'); document.body.style.overflow='hidden';
    }
    function closeM(){ modal.classList.remove('open'); document.body.style.overflow=''; }
    btn.addEventListener('click', openM);
    closeBtn.addEventListener('click', closeM);
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeM(); });
  })();
})();
