/* v10 Terminal · render */
(function(){
  const D = window.S5_DATA;
  if (!D) { document.getElementById('root').innerHTML = '<p>Data not loaded</p>'; return; }
  const SVG = window.S5_ARCH_SVG || '';

  // Big stylized brand block instead of ASCII art (which made 5 look like 2)
  const banner = `<div class="brand-block">
    <span class="bb-big">S5</span>
    <span class="bb-sep">::</span>
    <span class="bb-big">2026</span>
    <div class="bb-sub">AGENTIC × POST-TRAIN  ·  10-WEEK SPRINT  ·  EDITION 05</div>
    <div class="bb-sub">algorithm × engineering  ·  industrial capstone  ·  hands-on</div>
  </div>`;

  // === Hero ===
  const heroStats = D.hero.stats.map(s=>{
    const n = s.n.replace(/<[^>]+>/g,'');
    return `<div class="hero-stat"><div class="k">${s.l.toLowerCase().replace(/\s+/g,'_')}</div><div class="v">${n}</div><div class="d">${s.l}</div></div>`;
  }).join('');

  const checkQs = D.hero.selfCheck.qs.map(q=>`
    <div class="q"><div class="n">${q.n}</div><div class="t">${q.t}</div></div>`).join('');

  const painRows = D.hook.rows.map(r=>`
    <div class="row"><div class="n">${r.n}</div><div class="t">${r.t}</div></div>`).join('');

  const heroSec = `
    <section class="hero">
      <div class="shell">
        <div class="ln"><span class="p"><b></b></span><span class="c">s5 --version <span class="dim"># 2026 edition 5 cohort</span></span></div>
        <div class="ln"><span class="p"><b></b></span><span class="c">s5 --help <span class="cur"></span></span></div>
      </div>

      <div class="hero-tag"><span class="bullet"></span><span>S5 · 2026 · 10 weeks · <span class="amber">★ NEW</span> · Agent × Post-Train · 全面更新</span></div>

      <div class="hero-banner">${banner}</div>

      <div class="shell" style="padding:8px 0 0">
        <div class="out">
          <span class="green">desc</span>  &nbsp;不教你调 LangChain 跑 demo —— 是带你<span class="amber">拆解世界级 Agent 源码</span>、完全掌握核心架构、熟悉<span class="amber">工业级 Post-Train 训练管线</span>、再把整套系统部署上线、最后落到真实业务。<br/>
          <span class="green">deliver</span>  10 套交互式课件 · 算法 × 工程双修 · 简历级硬项目<br/>
          <span class="green">target</span>  2026 想拿 LLM 高薪 offer 的工程师
        </div>
      </div>

      <div class="hero-stats">${heroStats}</div>

      <div class="tile-check">
        <div class="h"><span class="l"><span>self_check.5</span></span><span class="r">${D.hero.selfCheck.subtitle}</span></div>
        <div class="body">${checkQs}</div>
        <div class="foot">${D.hero.selfCheck.foot}</div>
      </div>

      <div class="hook">
        <div class="h">${D.hook.lab} · <span style="color:var(--ink);font-weight:700">${D.hook.t.replace(/<br>/g,' ')}</span></div>
        <div class="body">${painRows}</div>
      </div>
    </section>
  `;

  // === S-series ls + tiles ===
  const lsRows = D.series.map(c=>`
    <div class="ls-row ${c.now?'now':''}">
      <div class="perm"></div>
      <div class="id">${c.id}</div>
      <div class="name">${c.ti}</div>
      <div class="span">${c.span}</div>
      <div class="tag">${c.now?'★ current':c.tag.split(' ')[1] || c.tag}</div>
    </div>`).join('');

  const cohorts = D.series.map(c=>{
    const grps = c.groups.map(g=>`<div class="lab">${g.lab}</div><ul>${g.items.map(it=>`<li>${it}</li>`).join('')}</ul>`).join('');
    return `
      <div class="coh ${c.now?'now':''}">
        <div class="tag">${c.tag}</div>
        <div class="id">${c.id}</div>
        <div class="ti">${c.ti}</div>
        <div class="span">${c.span}</div>
        ${grps}
        <div class="foot">${c.foot}</div>
      </div>`;
  }).join('');

  const dl = D.seriesDelta;
  const dlItems = dl.items.map(i=>`
    <div class="item"><div class="n">${i.n}</div><div class="h2">${i.h}</div><div class="b">${i.b}</div></div>`).join('');

  const chronSec = `
    <section id="cohort">
      <div class="shell">
        <div class="ln"><span class="p"><b></b></span><span class="c">cd ~/s5/cohorts <span class="dim"># 五期沿革</span></span></div>
      </div>
      <h2 class="sep-h">cohorts · S 系列五年沿革<span class="meta">// 这不是又一门 Agent 课</span></h2>

      <div class="ls-table">
        <div class="head"><span class="r">4 directories · 1 current (★)</span></div>
        ${lsRows}
      </div>

      <div class="cohorts">${cohorts}</div>

      <div class="delta">
        <div class="lab">${dl.tag}</div>
        <div class="h">${dl.t}</div>
        <div class="d">${dl.d}</div>
        <div class="items">${dlItems}</div>
      </div>
    </section>
  `;

  // === Essay ===
  const intro = D.intro;
  const cols = intro.cols.filter(c=>!c.merge).map(c=>`
    <div class="essay-col">
      <div class="lab">${c.lab.replace(/^A · /,'<b>A</b> · ').replace(/^B · /,'<b>B</b> · ')}</div>
      <div class="ans">${c.ans}</div>
      <div class="desc">${c.desc}</div>
    </div>`).join('');
  const merge = intro.cols.find(c=>c.merge);
  const tenets = intro.bullets.map(b=>`
    <div class="ten"><div class="n">${b.n}</div><div class="t">${b.t}</div><div class="d">${b.d}</div></div>`).join('');

  const essaySec = `
    <section id="essay">
      <div class="shell">
        <div class="ln alt"><span class="p"><b></b></span><span class="c">cat ./essay/why_both.md <span class="dim"># 算法 × 工程</span></span></div>
      </div>
      <h2 class="sep-h">essay · 算法 vs 工程<span class="meta">// 课程定位</span></h2>

      <div class="essay-quote">
        能让你提升上限的，从来不是单点能力。而是同时能把工业级 Agent 系统写出来、又能把 Post-Train 训练管线跑通、再把整套东西部署上线的 <b>"算法 + 工程兼具"</b> 的工程师。
      </div>

      <div class="essay-grid">${cols}</div>

      <div class="essay-merge">
        <div class="lab">${merge.lab}</div>
        <div class="ans">${merge.ans}</div>
        <div class="desc">${merge.desc}</div>
      </div>

      <h2 class="sep-h" style="margin-top:24px">tenets · 课程四原则<span class="meta">// curriculum.tenets[]</span></h2>
      <div class="tenets">${tenets}</div>
    </section>
  `;

  // === Roadmap ===
  const arcs = D.route.arc.map(a=>`<div class="arc-tile"><div class="n">${a.n}</div><div class="t">${a.t.replace('<br>',' · ')}</div></div>`).join('');
  const rmRows = D.route.rows.map(r=>`
    <div class="row">
      <div class="wk">${r.wk}</div>
      <div class="topic">${r.topic}</div>
      <div class="pos">${r.pos}</div>
      <div class="stage">${r.stage}</div>
    </div>`).join('');

  const roadmapSec = `
    <section id="roadmap">
      <div class="shell">
        <div class="ln alt"><span class="p"><b></b></span><span class="c">tree ./roadmap -L 2 <span class="dim"># 10 周 · 6 阶段</span></span></div>
      </div>
      <h2 class="sep-h">roadmap · 十周六阶递进<span class="meta">// 6 stages × 10 weeks</span></h2>

      <div class="arc-tiles">${arcs}</div>

      <div class="route-tbl">
        <div class="h"></div>
        ${rmRows}
      </div>
    </section>
  `;

  // === Weeks ===
  const weeks = D.weeks.map((w,idx)=>{
    const n = idx+1;
    const hl = w.highlights.map(h=>`
      <div class="hl">
        <div class="lab">${h.lab}</div>
        <div class="h">${h.h}</div>
        <div class="b">${h.b}</div>
      </div>`).join('');
    const chRows = w.chapters.map(c=>`<tr><td class="ch">${c.ch}</td><td class="ti">${c.ti}</td></tr>`).join('');
    const tags = w.tags.map(t=>`<span class="tag">${t}</span>`).join('');
    const player = w.player ? `
      <div class="player">
        <div class="bar">
          <div class="ll"><span class="dot"></span><span class="name">${w.player.name}</span><span>· LIVE</span></div>
          ${w.player.href && w.player.href!=='#' ? `<a class="openlk" href="${w.player.href}" target="_blank" rel="noopener">open ↗</a>` : '<span style="opacity:0.4">soon</span>'}
        </div>
        <div class="frame-wrap">
          ${w.player.src ? `<iframe loading="lazy" src="${w.player.src}" title="${w.player.name}"></iframe>` : ''}
          <div class="ph" ${w.player.src?'data-fallback':''}>
            <div class="ph-h">${w.player.phH}</div>
            <div class="ph-d">${w.player.phD}</div>
            ${w.player.src ? `<button onclick="this.parentElement.previousElementSibling.src=this.parentElement.previousElementSibling.src;this.parentElement.style.display='none';">$ ./load_preview</button>` : ''}
          </div>
        </div>
      </div>` : '';
    const outBullets = w.output ? w.output.bullets.map(b=>`<li>${b}</li>`).join('') : '';
    const output = w.output ? `
      <div class="output">
        <div class="lab">"${w.output.lab}"</div>
        <div class="b">${w.output.b}</div>
        ${outBullets?`<ul>${outBullets}</ul>`:''}
      </div>` : '';

    return `
      <article class="week" id="${w.id}">
        <header class="week-head">
          <div class="l">
            <span class="wk">${w.wk}</span>
            <div>
              <div class="meta">${w.meta}</div>
              <div class="ti"><span class="sl">${w.wk.toLowerCase()}</span>${w.ti}</div>
            </div>
          </div>
          <div class="stage">[ <b>${n}/10</b> ]</div>
        </header>
        <div class="week-body">
          <div class="why-line">${w.whyLab}</div>
          <p class="narr">${w.narrMain}</p>
          ${w.narrSub?`<div class="narr-sub">${w.narrSub}</div>`:''}

          <div class="hl-list">${hl}</div>

          <div class="ch-block">
            <div class="h">${w.pkgName}<span class="ct">${w.pkgCount}</span></div>
            <table>${chRows}</table>
          </div>

          ${player}
          ${tags?`<div class="tags">${tags}</div>`:''}
          ${output}
        </div>
      </article>
    `;
  }).join('');

  const weeksSec = `
    <section id="weeks">
      <div class="shell">
        <div class="ln weeks"><span class="p"><b></b></span><span class="c">cd ./weeks && ls -1 | xargs -n1 less <span class="dim"># 10 weeks</span></span></div>
      </div>
      <h2 class="sep-h">weeks · 十周详解 + 在线课件<span class="meta">// hands-on, not slides</span></h2>
      ${weeks}
    </section>
  `;

  // === Capstone ===
  const featStats = D.project.meta.map(m=>`
    <div class="feat-stat">
      <div class="n">${m.num}</div>
      <div class="l">${m.lab}</div>
      <div class="d">${m.d}</div>
    </div>`).join('');
  const featCells = D.project.features.map(f=>`
    <div class="c"><div class="h">${f.h}</div>${f.body}</div>`).join('');

  const featureSec = `
    <section id="feature">
      <div class="shell">
        <div class="ln proj"><span class="p"><b></b></span><span class="c">./run.sh --target=enterprise-coassistant <span class="dim"># Capstone</span></span></div>
      </div>
      <h2 class="sep-h">capstone · 企业内部智能协同助手平台<span class="meta">// W10 整合周 · 工业级</span></h2>

      <div class="feature">
        <div class="h"><span class="r">${D.project.eyebrowEnd}</span></div>
        <div class="body">
          <div class="feat-stats">${featStats}</div>

          <div class="why-line" style="margin:8px 0 6px">cat ./capstone/README.md</div>
          <p class="narr" style="font-size:13px;margin-bottom:14px">${D.project.lead}</p>

          <div class="arch-block">${SVG}</div>
          <button class="arch-zoom" id="archZoomBtn" type="button">[ fullscreen architecture diagram · F ]</button>

          <div class="feat-grid">${featCells}</div>

          <div class="biz">
            <div class="lab">业务落地能力清单 · capabilities[]</div>
            ${D.project.bizList || '会议纪要 · 周报 · 风险预警 · SOP 问答 · 定时播报 · 文档智能管理 · 数据可视化分析 —— 全部基于上图架构跑通。'}
          </div>
        </div>
      </div>
    </section>
  `;

  // === Stack ===
  const stackRows = D.stack.rows.map(r=>`
    <div class="row">
      <div class="layer">${r.layer}</div>
      <div class="tech">${r.tech}</div>
      <div class="wk">${r.wk}</div>
    </div>`).join('');
  const stackSec = `
    <section id="stack">
      <div class="shell">
        <div class="ln alt"><span class="p"><b></b></span><span class="c">cat ./stack.toml <span class="dim"># 11 层 hand-on</span></span></div>
      </div>
      <h2 class="sep-h">stack · 11 层全栈索引<span class="meta">// hand-on, 非 buzzword</span></h2>
      <div class="stack-tbl">
        <div class="h"></div>
        ${stackRows}
      </div>
    </section>
  `;

  // === Support + Fit + CTA ===
  const supItems = D.support.items.map(s=>`
    <div class="c"><div class="n">${s.n}</div><div class="h">${s.h}</div><div class="b">${s.b}</div></div>`).join('');
  const supExtras = D.support.extras.map(e=>`
    <div class="it"><div class="t">${e.t}</div><div class="ti">${e.ti}</div><div class="d">${e.d}</div></div>`).join('');
  const fitCols = D.fit.cols.map(c=>`
    <div class="c ${c.no?'no':''}"><div class="h">${c.h}</div><ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul></div>`).join('');

  const enrollSec = `
    <section id="enroll">
      <div class="shell">
        <div class="ln colo"><span class="p"><b></b></span><span class="c">./enroll --info <span class="dim"># 配套支持</span></span></div>
      </div>
      <h2 class="sep-h">support · 配套支持 · 不只是课件<span class="meta">// 4 通道 + 算力 + 社群</span></h2>
      <div class="sup-grid">${supItems}</div>

      <div class="extra-block">
        <div class="h">${D.support.extraTitle}</div>
        <div class="extra-list">${supExtras}</div>
      </div>

      <h2 class="sep-h">fit · 适合 / 不适合<span class="meta">// audience.match()</span></h2>
      <div class="fit">${fitCols}</div>

      <div class="cta">
        <div class="lab"></div>
        <h2>10 周后，你会有一份<br/>算法 + 工程<span class="acc">双修</span>的硬资产。</h2>
        ${D.foot.ps.map(p=>`<p>${p}</p>`).join('')}
        <div class="meta">${D.foot.meta}</div>
      </div>

      <div class="footer-prompt">
        <div class="ln"><span class="p"><b></b></span><span class="c">echo "see you in s5 — 2026" <span class="cur"></span></span></div>
      </div>
    </section>
  `;

  document.getElementById('root').innerHTML =
    heroSec + chronSec + essaySec + roadmapSec + weeksSec + featureSec + stackSec + enrollSec;

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
        const svg = document.querySelector('.arch-block svg');
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
