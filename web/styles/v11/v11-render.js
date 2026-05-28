/* v11 Newspaper · render */
(function(){
  const D = window.S5_DATA;
  if (!D) { document.getElementById('root').innerHTML = '<p>Data not loaded</p>'; return; }
  const SVG = window.S5_ARCH_SVG || '';

  // === Front page ===
  const fpStats = D.hero.stats.map(s=>`
    <div class="fp-stat"><div class="n">${s.n}</div><div class="l">${s.l}</div></div>`).join('');

  // Hook → sidebar story
  const painParas = D.hook.rows.map((r)=>`<p><span class="n">${r.n}</span>${r.t}</p>`).join('');

  const checkQs = D.hero.selfCheck.qs.map(q=>`
    <div class="q"><div class="n">${q.n}</div><div class="t">${q.t}</div></div>`).join('');

  const frontpageSec = `
    <section class="frontpage" id="frontpage">
      <div class="fp-eyebrow">
        <span>FRONT PAGE · 卷首通告</span>
        <span class="red">★ EXCLUSIVE · 10-WEEK SPRINT</span>
        <span>By Editor</span>
      </div>

      <h1 class="fp-headline">
        2026 大模型冲刺营：<em>Agentic</em> 系统工程<br/>
        与 <em>Post-Train</em> 工业级落地。
      </h1>
      <div class="fp-kicker">— 第五期 · 10 周课程 · 十套交互式课件 · 算法 × 工程双修 · 一段简历级硬资产 —</div>

      <div class="fp-deck">
        <p>2026 想拿 LLM 高薪 offer？编辑部本期重磅推出 <b>S5 大模型冲刺营</b>：不教你调 LangChain 跑 demo —— 是带你<b>拆解世界级 Agent 源码、完全掌握核心架构、熟悉工业级 Post-Train 训练管线、再把整套系统部署上线、最后落到真实业务</b>。</p>
        <p>本期亮点在于将算法层与工程层<em>合二为一</em>：W1–W3 完整拆解 Anthropic ClaudeCode、OpenClaw 等顶级 Agent 范本；W4–W7 下沉到 verl HybridFlow 训练框架与 Agentic RL、GRPO/GSPO/DAPO 全套算法实战；W8 工程基建打通后端；W9 多模态 + GUI Agent 拓展模态边界；W10 集成为一个企业内部可用的智能协同助手平台。</p>
        <p>课程提供 <b>4090 独享算力 · 2 次 1v1 陪跑 · 知识星球资源 · S2/S3/S4 全套归档</b>。详见后续各专版与目录。</p>
      </div>

      <div class="fp-stats">${fpStats}</div>

      <div class="fp-row">
        <div class="l">
          <div class="story-h"><b>本期社论 · Lead Story</b> · 是不是卡在就业这一关？</div>
          <h3 class="story-title">五类卡点 · 一年走过 3,000+ 求职咨询样本所见</h3>
          <div class="pain-body">${painParas}</div>
        </div>
        <div class="r">
          <div class="check">
            <div class="h"><span>SELF-CHECK · 自检五题</span><b>5 题</b></div>
            <h3>面试快诊</h3>
            <div class="sub">${D.hero.selfCheck.subtitle}</div>
            ${checkQs}
            <div class="foot">${D.hero.selfCheck.foot}</div>
          </div>
        </div>
      </div>
    </section>
  `;

  // === Chronicle ===
  const chronCells = D.series.map(c=>{
    const grps = c.groups.map(g=>`<div class="lab">${g.lab}</div><ul>${g.items.map(it=>`<li>${it}</li>`).join('')}</ul>`).join('');
    return `
      <div class="chron-cell ${c.now?'now':''}">
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
    <section class="section" id="chron">
      <div class="section-head">
        <div class="l">
          <div class="lab"><b>VOL. II</b><span>CHRONICLE · 沿革版</span></div>
          <h2>这不是又一门 Agent 课，<br/>是<em>五期沉淀</em>的系统化训练营</h2>
        </div>
        <div class="r"><b>05</b>S 系列五年</div>
      </div>
      <p class="lede">从 2024 年 S2 到 2026 年 S5 — 每一期都对准当时市场最稀缺的能力栈做迭代。<b>S5 把工业级 Agentic 系统 + Post-Train 全闭环装上去</b>，这是 2026 年最值钱的两块硬骨头。</p>

      <div class="chron-cols">${chronCells}</div>

      <div class="delta-card">
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
        <div class="l">
          <div class="lab"><b>VOL. III</b><span>EDITORIAL · 本报社评</span></div>
          <h2>我到底是做<em>算法</em>，<br/>还是做<em>工程</em>？</h2>
        </div>
        <div class="r"><b>2/2</b>编者立场</div>
      </div>
      <p class="lede">过去一年，每天都有同学私信问编辑部这个问题。答案在 2026 年的市场上已经非常清楚 — <b>除非你做基座层（pre-train、训练框架最底层），否则只懂算法、或者只懂工程，都拿不到真正的高薪 offer。</b></p>

      <div class="essay-quote">
        <span class="mk">"</span>能让你提升上限的，从来不是单点能力。<br/>而是同时能把工业级 Agent 系统写出来、又能把 Post-Train 训练管线跑通、再把整套东西部署上线的 <span class="em">"算法 + 工程兼具"</span> 的工程师。<span class="mk">"</span>
      </div>

      <div class="essay-grid">${cols}</div>

      <div class="essay-merge">
        <div class="lab">${merge.lab}</div>
        <div class="ans">${merge.ans}</div>
        <div class="desc">${merge.desc}</div>
      </div>

      <div class="tenets">${tenets}</div>
    </section>
  `;

  // === Roadmap ===
  const arcs = D.route.arc.map(a=>`<div class="a"><div class="n">${a.n}</div><div class="t">${a.t}</div></div>`).join('');
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
        <div class="l">
          <div class="lab"><b>VOL. IV</b><span>SCHEDULE · 本季课表</span></div>
          <h2>十周 × 六大阶段的<em>递进逻辑</em></h2>
        </div>
        <div class="r"><b>W1—10</b>本季排程</div>
      </div>
      <p class="lede">从理解 Agent 的本质 → 看世界级范本 → 打通模型基座 → 工业化部署 → 拓展模态 → 真实业务落地。<b>每一周都和前后强耦合，不是六门孤立的课。</b></p>

      <div class="arc">${arcs}</div>

      <div class="schedule">
        <div class="head"><span>十周课表 · WEEKLY SCHEDULE</span><b>W1 — W10</b></div>
        ${rmRows}
      </div>
    </section>
  `;

  // === Weeks as feature articles ===
  const weekArticles = D.weeks.map((w,idx)=>{
    const n = idx+1;
    const hl = w.highlights.map(h=>`
      <div class="fa-hl">
        <div class="lab">${h.lab}</div>
        <div class="h">${h.h}</div>
        <div class="b">${h.b}</div>
      </div>`).join('');
    const chRows = w.chapters.map(c=>`<tr><td class="ch">${c.ch}</td><td class="ti">${c.ti}</td></tr>`).join('');
    const tags = w.tags.map(t=>`<span class="fa-tag">${t}</span>`).join('');
    const player = w.player ? `
      <div class="fa-player">
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
    const outBullets = w.output ? w.output.bullets.map(b=>`<li>${b}</li>`).join('') : '';
    const output = w.output ? `
      <div class="fa-output">
        <div class="lab">${w.output.lab}</div>
        <div class="b">${w.output.b}</div>
        ${outBullets?`<ul>${outBullets}</ul>`:''}
      </div>` : '';

    const bodyHtml = `
      <p>${w.narrMain}</p>
      ${w.narrSub?`<div class="aside-box">${w.narrSub}</div>`:''}
    `;

    return `
      <article class="feature-article" id="${w.id}">
        <div class="fa-eyebrow">
          <span><span class="wk">${w.wk}</span> · <span class="red">${w.meta}</span></span>
          <span>VOL. V · ARTICLE ${n} OF 10 · ${w.whyLab}</span>
        </div>
        <h2 class="fa-headline">${w.ti}</h2>
        <div class="fa-deck">${w.whyLab} · 编辑部专访</div>
        <div class="fa-byline">本报特派 · <b>编辑部</b> · 第 ${n} 周 · <span style="color:var(--red);font-weight:700">${w.meta}</span></div>

        <div class="fa-body">${bodyHtml}</div>

        <div class="fa-highlights">${hl}</div>

        <div class="fa-toc">
          <div class="h"><span><b>${w.pkgName}</b></span><span>${w.pkgCount}</span></div>
          <table>${chRows}</table>
        </div>

        ${player}
        ${tags?`<div class="fa-tags">${tags}</div>`:''}
        ${output}
      </article>
    `;
  }).join('');

  const weeksSec = `
    <section class="section" id="weeks">
      <div class="section-head">
        <div class="l">
          <div class="lab"><b>VOL. V</b><span>FEATURES · 十篇专文</span></div>
          <h2>每周一篇<em>专文</em>，含交互式课件预览</h2>
        </div>
        <div class="r"><b>×10</b>每周一篇</div>
      </div>
      <p class="lede">本版按周刊载十篇深度专文。每篇包含：为什么这一周 · 课件章节地图 · 三大亮点 · 在线预览 · 学完产出。<b>课件不是 PDF，是可交互的网页式教学系统。</b></p>
      ${weekArticles}
    </section>
  `;

  // === Centerfold (project) ===
  const featStats = D.project.meta.map(m=>`
    <div class="c">
      <div class="n">${m.num}</div>
      <div class="l">${m.lab}</div>
      <div class="d">${m.d}</div>
    </div>`).join('');
  const featCells = D.project.features.map(f=>`
    <div class="c"><div class="h">${f.h}</div>${f.body}</div>`).join('');

  const featureSec = `
    <section class="centerfold" id="feature">
      <div class="paper">
        <div class="section-head">
          <div class="l">
            <div class="lab"><b>VOL. VI</b><span>CENTERFOLD · 特辑跨页</span></div>
            <h2>企业内部<em>智能协同助手</em>平台</h2>
          </div>
          <div class="r"><b>W10</b>整合项目</div>
        </div>
        <p class="lede">${D.project.lead}</p>

        <div class="cf-stats">${featStats}</div>

        <div class="arch-wrap">${SVG}</div>
        <button class="arch-zoom" id="archZoomBtn" type="button">⌖ 全屏查看架构大图</button>

        <div class="cf-feats">${featCells}</div>

        <div class="cf-biz">
          <div class="lab">业务落地能力清单 · CAPABILITIES</div>
          ${D.project.bizList || '会议纪要 · 周报 · 风险预警 · SOP 问答 · 定时播报 · 文档智能管理 · 数据可视化分析 —— 全部基于上图架构跑通。'}
        </div>
      </div>
    </section>
  `;

  // === Stack as classifieds ===
  const cls = D.stack.rows.map(r=>`
    <div class="cls-row">
      <div class="layer"><span>${r.layer}</span><span class="wk">${r.wk}</span></div>
      <div class="tech">${r.tech}</div>
    </div>`).join('');
  const stackSec = `
    <section class="section" id="stack">
      <div class="section-head">
        <div class="l">
          <div class="lab"><b>VOL. VII</b><span>CLASSIFIEDS · 技术栈分类</span></div>
          <h2>技术栈<em>11 层全栈索引</em></h2>
        </div>
        <div class="r"><b>11</b>层 hand-on</div>
      </div>
      <p class="lede">每一项都是真在课程里 hand-on 写过、跑过的，不是 buzzword。</p>
      <div class="classifieds">${cls}</div>
    </section>
  `;

  // === Support, fit, coda ===
  const supItems = D.support.items.map(s=>`
    <div class="c"><div class="n">${s.n}</div><div class="h">${s.h}</div><div class="b">${s.b}</div></div>`).join('');
  const supExtras = D.support.extras.map(e=>`
    <div class="it"><div class="t">${e.t}</div><div class="ti">${e.ti}</div><div class="d">${e.d}</div></div>`).join('');
  const fitCols = D.fit.cols.map(c=>`
    <div class="c ${c.no?'no':''}">
      <div class="h"><span class="ic">${c.no?'×':'§'}</span><span>${c.h}</span></div>
      <ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul>
    </div>`).join('');

  const enrollSec = `
    <section class="section" id="enroll">
      <div class="section-head">
        <div class="l">
          <div class="lab"><b>VOL. VIII</b><span>SUBSCRIPTION · 订阅与配套</span></div>
          <h2>配套支持 · 适合谁 · <em>订阅入营</em></h2>
        </div>
        <div class="r"><b>1V1</b>陪跑</div>
      </div>
      <p class="lede">${D.support.lead}</p>

      <div class="sup-grid">${supItems}</div>

      <div class="extra">
        <div class="h">${D.support.extraTitle}</div>
        <div class="list">${supExtras}</div>
      </div>

      <h2 class="story-title" style="margin-top:36px;font-size:clamp(24px,3vw,32px);text-align:center">这门课<span style="color:var(--red);font-style:italic;font-family:var(--serif-disp)">适合 / 不适合</span>谁</h2>
      <div class="fit-grid">${fitCols}</div>

      <div class="coda">
        <div class="eb">VOL. VIII · GET STARTED</div>
        <h2>10 周后，你会有一份<br/>算法 + 工程<span class="it">双修</span>的硬资产。</h2>
        ${D.foot.ps.map(p=>`<p>${p}</p>`).join('')}
        <div class="meta">— ${D.foot.meta} —</div>
      </div>
    </section>
  `;

  document.getElementById('root').innerHTML =
    frontpageSec + chronSec + essaySec + roadmapSec + weeksSec + featureSec + stackSec + enrollSec;

  // Player placeholders
  document.querySelectorAll('.fa-player').forEach(p => {
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
