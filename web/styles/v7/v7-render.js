/* v7 Editorial Folio · render */
(function(){
  const D = window.S5_DATA;
  if (!D) { document.getElementById('root').innerHTML = '<p style="padding:40px">Data not loaded.</p>'; return; }
  const SVG = window.S5_ARCH_SVG || '';

  // === Cover ===
  const coverStats = D.hero.stats.map(s=>`
    <div class="cover-stat">
      <div class="n">${s.n}</div>
      <div class="l">${s.l}</div>
    </div>`).join('');

  const tocRows = [
    ['I','编者按 · 当下五问', '#editor', 'EDITOR'],
    ['II','沿革 · S 系列五年', '#chron', 'CHRONICLE'],
    ['III','算法 × 工程', '#essay', 'ESSAY'],
    ['IV','十周目录', '#roadmap', 'CONTENTS'],
    ['V','十篇专文', '#weeks', 'ARTICLES'],
    ['VI','专题 · 工业级落地', '#feature', 'FEATURE'],
    ['VII','索引 · 11 层技术栈', '#index', 'INDEX'],
    ['VIII','版记 · 配套 / 适合 / 报名', '#colophon', 'COLOPHON'],
  ];
  const tocLeft = tocRows.slice(0,4).map(r=>`<a href="${r[2]}" class="toc-row"><span><b>${r[0]}</b> · ${r[1]}</span><span class="leader"></span><span class="pg">${r[3]}</span></a>`).join('');
  const tocRight = tocRows.slice(4).map(r=>`<a href="${r[2]}" class="toc-row"><span><b>${r[0]}</b> · ${r[1]}</span><span class="leader"></span><span class="pg">${r[3]}</span></a>`).join('');

  const cover = `
    <section class="cover">
      <div class="page">
        <div class="cover-rule"></div>
        <div class="cover-meta">
          <div class="l"><span>VOL. 卷·五</span><span>·</span><span><b>2026 · S5</b></span></div>
          <div class="m">— 大模型冲刺营 · 编辑部刊行 —</div>
          <div class="r"><span>10 WEEKS</span><span>·</span><span class="vol">No. 05</span></div>
        </div>

        <div class="cover-pre">
          <span>FEATURED · 卷首特辑</span>
          <span class="red">★ AGENT × POST-TRAIN · 全面更新</span>
          <span>BY EDITOR</span>
        </div>

        <h1 class="cover-h1">
          <span class="l1">— 2026 大模型冲刺营 ·  第五期 —</span>
          <span class="l2"><span class="red">Agentic</span> 系统工程</span>
          <span class="l3">与 <span class="red">Post-Train</span><span class="it"> 落地。</span></span>
        </h1>

        <p class="cover-sub">
          2026 想拿 LLM 高薪 offer？不教你调 LangChain 跑 demo —— 是带你<b>拆解世界级 Agent 源码、完全掌握核心架构、熟悉工业级 Post-Train 训练管线、再把整套系统部署上线、最后落到真实业务</b>。十套交互式课件 · 算法 × 工程双修 · 简历级硬项目。
        </p>

        <div class="cover-stats">${coverStats}</div>

        <div class="cover-toc">
          <div>
            <div class="toc-h">目 录 · 上半卷</div>
            ${tocLeft}
          </div>
          <div>
            <div class="toc-h">目 录 · 下半卷</div>
            ${tocRight}
          </div>
        </div>

        <div class="cover-rule bot"></div>
      </div>
    </section>
  `;

  // === Editor's Note (hook + self-check) ===
  const noteParas = D.hook.rows.map((r,i)=>{
    return `<p>${i===0?'<b>编者按。</b> ':''}${r.t.replace(/<s>/g,'<s>').replace(/<em>/g,'<em>')}</p>`;
  }).join('');

  const qs = D.hero.selfCheck.qs.map(q=>`
    <div class="note-q">
      <div class="n">${q.n}</div>
      <div class="t">${q.t}</div>
    </div>`).join('');

  const editorSec = `
    <section class="editor-note" id="editor">
      <div class="page">
        <div class="head">
          <div class="num">I</div>
          <div>
            <div class="lab">EDITOR'S NOTE · 编者按</div>
            <div class="ti">是不是卡在<br/>就业这一关？</div>
          </div>
        </div>

        <div class="note-cols">${noteParas}</div>

        <div class="note-q-list">
          <div class="note-q-h"><b>面试 Self-Check</b> · 5 题 · ${D.hero.selfCheck.subtitle}</div>
          ${qs}
          <div class="note-q-foot">${D.hero.selfCheck.foot}</div>
        </div>
      </div>
    </section>
  `;

  // === Chronicle (S-series) ===
  const series = D.series.map(c=>{
    const lists = c.groups.map(g=>`
      <div class="lab">${g.lab}</div>
      <ul>${g.items.map(it=>`<li>${it}</li>`).join('')}</ul>
    `).join('');
    return `
      <div class="chron-cell ${c.now?'now':''}">
        <div class="yr">${c.tag}</div>
        <div class="id">${c.id}</div>
        <div class="ti">${c.ti}</div>
        <div class="span">${c.span}</div>
        ${lists}
        <div class="foot">${c.foot}</div>
      </div>`;
  }).join('');

  const dl = D.seriesDelta;
  const dlItems = dl.items.map(i=>`
    <div class="item">
      <div class="n">${i.n}</div>
      <div class="h">${i.h}</div>
      <div class="b">${i.b}</div>
    </div>`).join('');

  const chronSec = `
    <section class="chron" id="chron">
      <div class="page">
        <div class="eyebrow"><span class="ch">II · Chronicle</span><span class="div"></span><span>S 系列 · 五年沿革</span></div>
        <h2 class="h-section">这不是"又一门 Agent 课"。<br/>是五期沉淀打磨出来的<em>系统化训练营</em>。</h2>
        <p class="lead">
          从 2024 年的 S2 算法系统课，到 2025 年的 S3 求职急救营 + S4 Agent 工程工业级，再到这一期 S5 —— 每一期都对准当时市场最稀缺的能力栈做迭代。<b>S5 把工业级 Agentic 系统 + Post-Train 全闭环装上去，这是 2026 年最值钱的两块硬骨头。</b>
        </p>

        <div class="chron-grid">${series}</div>

        <div class="chron-delta">
          <div class="lab">${dl.tag}</div>
          <div class="t">${dl.t}</div>
          <div class="d">${dl.d}</div>
          <div class="items">${dlItems}</div>
        </div>
      </div>
    </section>
  `;

  // === Essay (algorithm vs engineering) ===
  const intro = D.intro;
  const essayCols = intro.cols.filter(c=>!c.merge).map(c=>`
    <div class="essay-col">
      <div class="lab">${c.lab}</div>
      <div class="ans">${c.ans}</div>
      <div class="desc">${c.desc}</div>
    </div>`).join('');
  const merge = intro.cols.find(c=>c.merge);
  const tenets = intro.bullets.map(b=>`
    <div class="essay-tenet">
      <div class="n">${b.n}</div>
      <div class="t">${b.t}</div>
      <div class="d">${b.d}</div>
    </div>`).join('');

  const essaySec = `
    <section class="essay" id="essay">
      <div class="page">
        <div class="eyebrow"><span class="ch">III · Essay</span><span class="div"></span><span>算法 × 工程 · 编者论</span></div>
        <h2 class="h-section">我到底是做<em>算法</em>，<br/>还是做<em>工程</em>？</h2>
        <p class="lead">
          过去一年，每天都有同学私信问我这个问题。答案在 2026 年的市场上已经非常清楚 —— <b>除非你做基座层（pre-train、训练框架最底层），否则只懂算法、或者只懂工程，都拿不到真正的高薪 offer。</b>
        </p>

        <blockquote class="essay-quote">
          <span class="mk">"</span>能让你提升上限的，从来不是单点能力。<br/>
          而是同时能把工业级 Agent 系统写出来、又能把 Post-Train 训练管线跑通、再把整套东西部署上线的 <span class="em">"算法 + 工程兼具"</span> 的工程师。<span class="mk">"</span>
        </blockquote>

        <div class="essay-grid">${essayCols}</div>

        <div class="essay-merge">
          <div class="lab">${merge.lab}</div>
          <div class="ans">${merge.ans}</div>
          <div class="desc">${merge.desc}</div>
        </div>

        <div class="essay-tenets">${tenets}</div>
      </div>
    </section>
  `;

  // === Roadmap / TOC ===
  const arcs = D.route.arc.map(a=>`<div class="a"><div class="n">${a.n}</div><div class="t">${a.t}</div></div>`).join('');
  const rmRows = D.route.rows.map(r=>`
    <div class="row">
      <div class="wk">${r.wk}</div>
      <div class="topic">${r.topic}</div>
      <div class="pos">${r.pos}</div>
      <div class="stage">${r.stage}</div>
    </div>`).join('');

  const roadmapSec = `
    <section class="roadmap" id="roadmap">
      <div class="page">
        <div class="eyebrow"><span class="ch">IV · Contents</span><span class="div"></span><span>十周 · 六阶段</span></div>
        <h2 class="h-section">十周 × 六阶段的<em>递进逻辑</em></h2>
        <p class="lead">
          从理解 Agent 的本质 → 看世界级范本 → 打通模型基座 → 工业化部署 → 拓展模态 → 真实业务落地。每一周都和前后强耦合，<b>不是六门孤立的课</b>。
        </p>

        <div class="arc">${arcs}</div>

        <div class="roadmap-toc">
          <div class="head"><b>十周目录 · TABLE OF CONTENTS</b><span class="ct">W1 — W10 · 含阶段定位</span></div>
          ${rmRows}
        </div>
      </div>
    </section>
  `;

  // === Weeks as articles ===
  const articles = D.weeks.map((w,idx)=>{
    const hl = w.highlights.map(h=>`
      <div class="art-hl">
        <div class="lab">${h.lab}</div>
        <div class="h">${h.h}</div>
        <div class="b">${h.b}</div>
      </div>`).join('');
    const chRows = w.chapters.map(c=>`<tr><td class="ch">${c.ch}</td><td class="ti">${c.ti}</td></tr>`).join('');
    const tags = w.tags.map(t=>`<span class="art-tag">${t}</span>`).join('');
    const player = w.player ? `
      <div class="art-player">
        <div class="bar">
          <div class="ll"><span class="dot"></span><span class="name">${w.player.name}</span><span>· LIVE PREVIEW</span></div>
          ${w.player.href && w.player.href !== '#' ? `<a class="openlk" href="${w.player.href}" target="_blank" rel="noopener">新窗口打开 ↗</a>` : '<span style="opacity:0.4">开课前交付</span>'}
        </div>
        <div class="frame-wrap">
          ${w.player.src ? `<iframe loading="lazy" src="${w.player.src}" title="${w.player.name}"></iframe>` : ''}
          <div class="ph" ${w.player.src ? 'data-fallback':''}>
            <div class="ph-h">${w.player.phH}</div>
            <div class="ph-d">${w.player.phD}</div>
            ${w.player.src ? '<button onclick="this.parentElement.previousElementSibling.src=this.parentElement.previousElementSibling.src;this.parentElement.style.display=\'none\';">加载预览 ▸</button>' : ''}
          </div>
        </div>
      </div>` : '';
    const outBullets = w.output ? w.output.bullets.map(b=>`<li>${b}</li>`).join('') : '';
    const output = w.output ? `
      <div class="art-output">
        <div class="lab">${w.output.lab}</div>
        <div class="b">${w.output.b}</div>
        ${outBullets ? `<ul>${outBullets}</ul>`:''}
      </div>` : '';

    return `
      <article class="article" id="${w.id}">
        <div class="page">
          <header class="art-header">
            <div class="art-folio">${w.wk}</div>
            <div class="art-meta-block">
              <div class="stage-lab">${w.meta}</div>
              <h2 class="ti">${w.ti}</h2>
              <div class="sub">第 ${idx+1} 篇 · 共十篇</div>
            </div>
            <div class="art-progress">${w.stage}</div>
          </header>

          <div class="art-section-h"><span>§ ${w.whyLab}</span><span class="div"></span></div>
          <div class="art-body">
            <p class="drop">${w.narrMain}</p>
            ${w.narrSub ? `<div class="art-aside">${w.narrSub}</div>` : ''}
          </div>

          <div class="art-section-h" style="margin-top:48px"><span>§ 三大亮点</span><span class="div"></span></div>
          <div class="art-highlights">${hl}</div>

          <div class="art-chapters">
            <div class="h"><b>${w.pkgName}</b><span class="ct">${w.pkgCount}</span></div>
            <table>${chRows}</table>
          </div>

          ${player}

          ${tags ? `<div class="art-tags">${tags}</div>`:''}

          ${output}
        </div>
      </article>
    `;
  }).join('');

  const weeksSec = `
    <section class="weeks" id="weeks">
      <div class="page weeks-intro">
        <div class="eyebrow"><span class="ch">V · Articles</span><span class="div"></span><span>十篇专文 · 含课件在线预览</span></div>
        <h2 class="h-section">十篇 · 每周一文，<em>含交互式课件预览</em></h2>
        <p class="lead">
          每一周都包含：为什么这一周 / 课件的真实章节地图 / 在线预览课件（可点击展开互动）/ 这一周的产出。<b>课件不是 PDF，是可交互的网页式教学系统。</b>
        </p>
      </div>
      ${articles}
    </section>
  `;

  // === Special Feature (project) ===
  const projStats = D.project.meta.map(m=>`
    <div class="feature-stat">
      <div class="num">${m.num}</div>
      <div class="lab">${m.lab}</div>
      <div class="d">${m.d}</div>
    </div>`).join('');
  const projFeats = D.project.features.map(f=>`
    <div class="feat-c">
      <div class="h">${f.h}</div>
      ${f.body}
    </div>`).join('');

  const featureSec = `
    <section class="feature" id="feature">
      <div class="page">
        <div class="eyebrow"><span class="ch">VI · Special Feature</span><span class="div"></span><span>${D.project.eyebrowEnd}</span></div>
        <h2 class="h-section">企业内部<em>智能协同助手</em>平台</h2>
        <p class="lead">${D.project.lead}</p>

        <div class="feature-stats">${projStats}</div>

        <div class="arch-wrap">${SVG}</div>
        <button class="arch-zoom" id="archZoomBtn" type="button">⌖ 全屏查看架构大图</button>

        <div class="feature-features">${projFeats}</div>

        <div class="feature-biz">
          <div class="lab">业务落地能力清单</div>
          ${D.project.bizList || '会议纪要 · 周报 · 风险预警 · SOP 问答 · 定时播报 · 文档智能管理 · 数据可视化分析 —— 全部基于上图架构跑通。'}
        </div>
      </div>
    </section>
  `;

  // === Index (stack) ===
  const stackRows = D.stack.rows.map(r=>`
    <div class="row">
      <div class="layer">${r.layer}</div>
      <div class="tech">${r.tech}</div>
      <div class="wk">${r.wk}</div>
    </div>`).join('');
  const indexSec = `
    <section class="index-sec" id="index">
      <div class="page">
        <div class="eyebrow"><span class="ch">VII · Index</span><span class="div"></span><span>11 层全栈 · 课件 hand-on</span></div>
        <h2 class="h-section">技术栈索引 · <em>11 层全栈</em></h2>
        <p class="lead">每一项都是真在课程里 hand-on 写过、跑过的，不是 buzzword。</p>
        <div class="stack-tbl">${stackRows}</div>
      </div>
    </section>
  `;

  // === Colophon (support + fit + footer) ===
  const supItems = D.support.items.map(s=>`
    <div class="s">
      <div class="n">${s.n}</div>
      <div class="h">${s.h}</div>
      <div class="b">${s.b}</div>
    </div>`).join('');
  const supExtras = D.support.extras.map(e=>`
    <div class="it">
      <div class="t">${e.t}</div>
      <div class="ti">${e.ti}</div>
      <div class="d">${e.d}</div>
    </div>`).join('');
  const fitCols = D.fit.cols.map(c=>`
    <div class="colo-fit-col ${c.no?'no':''}">
      <div class="h"><span class="ic">${c.no?'×':'§'}</span><span>${c.h}</span></div>
      <ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul>
    </div>`).join('');

  const colophonSec = `
    <section class="colophon" id="colophon">
      <div class="page">
        <div class="eyebrow"><span class="ch">VIII · Colophon</span><span class="div"></span><span>版记 · 配套支持</span></div>
        <h2 class="h-section">配套支持 · <em>不只是课件</em></h2>
        <p class="lead">${D.support.lead}</p>

        <div class="colo-support">${supItems}</div>

        <div class="colo-extra">
          <div class="h">${D.support.extraTitle}</div>
          <div class="list">${supExtras}</div>
        </div>

        <h2 class="h-section" style="margin-top:64px">这门课<em>适合 / 不适合</em>谁</h2>
        <div class="colo-fit">${fitCols}</div>

        <div class="colo-foot">
          <div class="eb">VIII · GET STARTED</div>
          <h2>10 周后，你会有一份<br/>算法 + 工程<span class="it">双修</span>的硬资产。</h2>
          ${D.foot.ps.map(p=>`<p>${p}</p>`).join('')}
          <div class="colophon-meta">${D.foot.meta}</div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('root').innerHTML =
    cover + editorSec + chronSec + essaySec + roadmapSec + weeksSec + featureSec + indexSec + colophonSec;

  // Player placeholders hide on iframe load
  document.querySelectorAll('.art-player').forEach(p => {
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
