/* v12 Brutalist · render */
(function(){
  const D = window.S5_DATA;
  if (!D) { document.getElementById('root').innerHTML = '<p>Data not loaded</p>'; return; }
  const SVG = window.S5_ARCH_SVG || '';

  // === Hero ===
  const heroStats = D.hero.stats.map(s=>`
    <div class="s"><div class="n">${s.n}</div><div class="l">${s.l}</div></div>`).join('');

  const checkQs = D.hero.selfCheck.qs.map(q=>`
    <div class="q">
      <div class="n"><span>${q.n}</span><span class="pill">QUIZ</span></div>
      <div class="t">${q.t}</div>
    </div>`).join('');

  const painRows = D.hook.rows.map(r=>`
    <div class="row"><div class="n">${r.n}</div><div class="t">${r.t}</div></div>`).join('');

  const heroSec = `
    <section class="hero" id="top">
      <div class="hero-meta">
        <span><b>S5 · 2026</b> · 10-WEEK SPRINT · EDITION 05</span>
        <span class="lab">★ NEW · AGENT × POST-TRAIN · 全面更新</span>
        <span class="red">★ ENROLL NOW</span>
      </div>

      <h1 class="hero-h">
        <span class="l1">2026 大模型冲刺营 · 第五期 ——</span>
        <span class="l2"><span class="acc">Agentic</span> 系统工程</span>
        <span class="l3">与 <span class="acc">Post-Train</span> <span class="it">落地<span class="dot"></span></span></span>
      </h1>

      <div class="hero-row">
        <div>
          <p class="hero-sub">
            ${D.hero.sub.replace(/<b>/g,'<b>').replace(/<\/b>/g,'</b>')}
          </p>
        </div>
        <div class="hero-stats">${heroStats}</div>
      </div>

      <div class="check">
        <div class="head">
          <span class="l"><b>面试 SELF-CHECK</b> · 五题快诊</span>
          <span>${D.hero.selfCheck.subtitle}</span>
        </div>
        <h3>答不上 → <span class="acc">你需要这门课。</span></h3>
        <div class="qs">${checkQs}</div>
        <div class="foot">${D.hero.selfCheck.foot}</div>
      </div>

      <div class="hook">
        <div class="head">
          <span>${D.hook.lab}</span>
          <span>5 / 5</span>
        </div>
        <h2>${D.hook.t}</h2>
        <div class="rows">${painRows}</div>
      </div>
    </section>
  `;

  // === Series ===
  const seriesRows = D.series.map(c=>`
    <div class="row ${c.now?'now':''}">
      <div class="tag">${c.tag}</div>
      <div class="id">${c.id}</div>
      <div class="ti">${c.ti}</div>
      <div class="span">${c.span}</div>
      <div class="pin">${c.now?'★ CURRENT':c.foot}</div>
    </div>`).join('');

  const seriesCells = D.series.map(c=>{
    const grps = c.groups.map(g=>`<div class="lab">${g.lab}</div><ul>${g.items.map(it=>`<li>${it}</li>`).join('')}</ul>`).join('');
    return `
      <div class="c ${c.now?'now':''}">
        <div class="id-mini">${c.id}</div>
        <div class="ti-mini">${c.ti}</div>
        ${grps}
      </div>`;
  }).join('');

  const dl = D.seriesDelta;
  const dlItems = dl.items.map(i=>`
    <div class="item"><div class="n">${i.n}</div><div class="h2">${i.h}</div><div class="b">${i.b}</div></div>`).join('');

  const chronSec = `
    <section class="section" id="chron">
      <div class="section-head">
        <div class="num">01<span class="sl">/04</span></div>
        <div class="l">
          <div class="lab"><b>CHRONICLE</b><span>S 系列 · 五年沿革</span></div>
          <h2>不是又一门 Agent 课，<br/>是<span class="acc">五期沉淀</span>的系统营。</h2>
        </div>
        <div class="r"><b>05</b>第五期</div>
      </div>
      <p class="lede">从 2024 年 S2 到 2026 年 S5 — 每一期都对准当时市场最稀缺的能力栈做迭代。<b>S5 把工业级 Agentic 系统 + Post-Train 全闭环装上去。</b></p>

      <div class="series">${seriesRows}</div>

      <div class="series-detail">${seriesCells}</div>

      <div class="delta-card">
        <div class="lab">${dl.tag}</div>
        <h3>${dl.t.replace(/3 个根本变化/g,'<span class="acc">3 个</span>根本变化')}</h3>
        <div class="d">${dl.d}</div>
        <div class="items">${dlItems}</div>
      </div>
    </section>
  `;

  // === Essay ===
  const intro = D.intro;
  const cols = intro.cols.filter(c=>!c.merge).map(c=>`
    <div class="c">
      <div class="lab">${c.lab.replace(/^A · /,'<b>A</b> · ').replace(/^B · /,'<b>B</b> · ')}</div>
      <div class="ans">${c.ans}</div>
      <div class="desc">${c.desc}</div>
    </div>`).join('');
  const merge = intro.cols.find(c=>c.merge);
  const tenets = intro.bullets.map(b=>`
    <div class="t"><div class="n">${b.n}</div><div class="ti">${b.t}</div><div class="d">${b.d}</div></div>`).join('');

  const essaySec = `
    <section class="section" id="essay">
      <div class="section-head">
        <div class="num">02<span class="sl">/04</span></div>
        <div class="l">
          <div class="lab"><b>POSITION</b><span>编者立场 · 算法 × 工程</span></div>
          <h2>算法<span class="acc">×</span>工程<br/>双修，缺一不可。</h2>
        </div>
        <div class="r"><b>A×B</b>双栈</div>
      </div>
      <p class="lede">${D.intro.lead.replace(/<[^>]+>/g,'').slice(0,140)}…</p>

      <div class="essay-quote">
        能让你提升上限的，从来不是单点能力。<b>而是同时能把工业级 Agent 系统写出来、又能把 Post-Train 训练管线跑通、再把整套东西部署上线</b>的"算法 + 工程兼具"的工程师。
      </div>

      <div class="essay-grid">${cols}</div>

      <div class="essay-merge">
        <div class="lab">${merge.lab.replace(/A × B/g,'<b>A × B</b>')}</div>
        <div class="ans">${merge.ans}</div>
        <div class="desc">${merge.desc}</div>
      </div>

      <div class="tenets">${tenets}</div>
    </section>
  `;

  // === Roadmap ===
  const arcs = D.route.arc.map(a=>`<div class="a"><div class="n">${a.n}</div><div class="t">${a.t.replace(/<br>/g,' · ')}</div></div>`).join('');
  const rmRows = D.route.rows.map(r=>`
    <div class="row">
      <div class="wk">${r.wk}</div>
      <div class="topic">${r.topic}</div>
      <div class="pos">${r.pos}</div>
      <div class="stage">${r.stage}</div>
    </div>`).join('');

  const roadmapSec = `
    <section class="section" id="roadmap">
      <div class="section-head">
        <div class="num">03<span class="sl">/04</span></div>
        <div class="l">
          <div class="lab"><b>ROADMAP</b><span>十周课表 · 六阶段</span></div>
          <h2>十周 × 六阶段，<br/>每周强耦合。</h2>
        </div>
        <div class="r"><b>10</b>WEEKS</div>
      </div>
      <p class="lede">从理解 Agent 的本质 → 看世界级范本 → 打通模型基座 → 工业化部署 → 拓展模态 → 真实业务落地。<b>不是六门孤立的课。</b></p>

      <div class="arc">${arcs}</div>

      <div class="schedule">${rmRows}</div>
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
          ${w.player.href && w.player.href!=='#' ? `<a class="openlk" href="${w.player.href}" target="_blank" rel="noopener">OPEN ↗</a>` : '<span style="opacity:0.4">SOON</span>'}
        </div>
        <div class="frame-wrap">
          ${w.player.src ? `<iframe loading="lazy" src="${w.player.src}" title="${w.player.name}"></iframe>` : ''}
          <div class="ph" ${w.player.src?'data-fallback':''}>
            <div class="ph-h">${w.player.phH}</div>
            <div class="ph-d">${w.player.phD}</div>
            ${w.player.src ? `<button onclick="this.parentElement.previousElementSibling.src=this.parentElement.previousElementSibling.src;this.parentElement.style.display='none';">LOAD PREVIEW ▸</button>` : ''}
          </div>
        </div>
      </div>` : '';
    const outBullets = w.output ? w.output.bullets.map((b,j)=>`<li data-n="${String(j+1).padStart(2,'0')}">${b}</li>`).join('') : '';
    const output = w.output ? `
      <div class="output">
        <div class="lab"><b>OUTCOMES</b> · ${w.output.lab}</div>
        <div class="b">${w.output.b}</div>
        ${outBullets?`<ul>${outBullets}</ul>`:''}
      </div>` : '';

    return `
      <article class="week" id="${w.id}">
        <header class="week-h">
          <div class="wk">${w.wk}</div>
          <div class="l">
            <div class="lab"><b>${String(n).padStart(2,'0')}/10</b><span>${w.meta}</span></div>
            <h2 class="ti">${w.ti}</h2>
          </div>
          <div class="r"><b>${n}/10</b>${w.stage.replace(/<b>[^<]+<\/b>/,'').replace(/<br>/,'')}</div>
        </header>

        <div class="why-tag">§ ${w.whyLab}</div>
        <div class="week-narr">${w.narrMain}</div>
        ${w.narrSub?`<div class="week-sub">${w.narrSub}</div>`:''}

        <div class="hl-block">${hl}</div>

        <div class="ch-block">
          <div class="head"><span class="pkg">${w.pkgName}</span><span class="ct">${w.pkgCount}</span></div>
          <table>${chRows}</table>
        </div>

        ${player}
        ${tags?`<div class="tags">${tags}</div>`:''}
        ${output}
      </article>
    `;
  }).join('');

  const weeksSec = `
    <section class="section" id="weeks">
      <div class="section-head">
        <div class="num">04<span class="sl">/04</span></div>
        <div class="l">
          <div class="lab"><b>WEEKS</b><span>十周详解 · 含课件预览</span></div>
          <h2>十周。<br/>每周一篇，<span class="acc">手写</span>到底。</h2>
        </div>
        <div class="r"><b>×10</b>篇</div>
      </div>
      <p class="lede">每周包含：为什么这一周 · 课件章节地图 · 三大亮点 · 在线预览 · 学完产出。<b>课件不是 PDF，是可交互的网页教学系统。</b></p>
      ${weeks}
    </section>
  `;

  // === Feature (Capstone) ===
  const featStats = D.project.meta.map(m=>`
    <div class="c">
      <div class="n">${m.num}</div>
      <div class="l">${m.lab}</div>
      <div class="d">${m.d}</div>
    </div>`).join('');
  const featCells = D.project.features.map(f=>`
    <div class="c"><div class="h">${f.h}</div>${f.body}</div>`).join('');

  const featureSec = `
    <section class="feature" id="feature">
      <div class="wrap">
        <div class="section-head">
          <div class="num">05</div>
          <div class="l">
            <div class="lab"><b>CAPSTONE</b><span>W10 · 工业级落地</span></div>
            <h2>企业内部<br/><span class="acc">智能协同助手</span>平台</h2>
          </div>
          <div class="r"><b>W10</b>项目周</div>
        </div>
        <p class="lede">${D.project.lead}</p>

        <div class="feature-stats">${featStats}</div>

        <div class="arch-wrap">${SVG}</div>
        <button class="arch-zoom" id="archZoomBtn" type="button">⌖ 全屏查看架构大图</button>

        <div class="feature-feats">${featCells}</div>

        <div class="biz">
          <div class="lab"><b>BUSINESS</b> · 业务落地能力清单</div>
          <div class="b">${D.project.bizList || '会议纪要 · 周报 · 风险预警 · SOP 问答 · 定时播报 · 文档智能管理 · 数据可视化分析 —— 全部基于上图架构跑通。'}</div>
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
    <section class="section" id="stack">
      <div class="section-head">
        <div class="num">06</div>
        <div class="l">
          <div class="lab"><b>STACK</b><span>11 层技术索引</span></div>
          <h2>11 层全栈，<br/>每项 <span class="acc">hand-on</span>。</h2>
        </div>
        <div class="r"><b>11</b>LAYERS</div>
      </div>
      <p class="lede">每一项都是真在课程里 hand-on 写过、跑过的，<b>不是 buzzword 列表。</b></p>
      <div class="stack-tbl">${stackRows}</div>
    </section>
  `;

  // === Enroll (support + fit + coda) ===
  const supItems = D.support.items.map(s=>`
    <div class="c">
      <div class="n">${s.n.replace(/(\d+ ·)/,'<b>$1</b>')}</div>
      <div class="h">${s.h}</div>
      <div class="b">${s.b}</div>
    </div>`).join('');
  const supExtras = D.support.extras.map(e=>`
    <div class="it"><div class="t">${e.t}</div><div class="ti">${e.ti}</div><div class="d">${e.d}</div></div>`).join('');
  const fitCols = D.fit.cols.map(c=>`
    <div class="c ${c.no?'no':''}">
      <div class="h"><span class="ic">${c.no?'✗':'✓'}</span><span>${c.h}</span></div>
      <ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul>
    </div>`).join('');

  const enrollSec = `
    <section class="section" id="enroll">
      <div class="section-head">
        <div class="num">07</div>
        <div class="l">
          <div class="lab"><b>ENROLL</b><span>配套 · 适合 · 报名</span></div>
          <h2>配套支持，<br/>不只是课件。</h2>
        </div>
        <div class="r"><b>1V1</b>×2</div>
      </div>
      <p class="lede">${D.support.lead}</p>

      <div class="sup-grid">${supItems}</div>

      <div class="extra">
        <div class="h">${D.support.extraTitle}</div>
        <div class="list">${supExtras}</div>
      </div>

      <div class="fit-grid">${fitCols}</div>
    </section>

    <section class="coda">
      <div class="wrap">
        <div class="lab">${D.foot.eyebrow || '08 · GET STARTED'}</div>
        <h2>10 周后，<br/>一份 <span class="acc">硬资产</span>。</h2>
        ${D.foot.ps.map(p=>`<p>${p}</p>`).join('')}
        <div class="meta">${D.foot.meta}</div>
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
        const svg = document.querySelector('.arch-wrap svg');
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
