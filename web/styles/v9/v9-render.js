/* v9 Bento Modular · render */
(function(){
  const D = window.S5_DATA;
  if (!D) { document.getElementById('root').innerHTML = '<p>Data not loaded</p>'; return; }
  const SVG = window.S5_ARCH_SVG || '';

  // === Hero bento ===
  const heroStats = D.hero.stats.map(s=>`
    <div class="s">
      <div class="n">${s.n}</div>
      <div class="l">${s.l}</div>
    </div>`).join('');

  const checkQs = D.hero.selfCheck.qs.map(q=>`
    <div class="q"><div class="n">${q.n}</div><div class="t">${q.t}</div></div>`).join('');

  const painRows = D.hook.rows.map(r=>`
    <div class="row"><div class="n">${r.n}</div><div class="t">${r.t}</div></div>`).join('');

  const heroSec = `
    <section class="section hero-bento">
      <div class="bento">
        <div class="tile col-8 dark tile-main">
          <div>
            <span class="pill"><span class="dot"></span><b>S5 · 2026</b> · 10 周冲刺营 · ★ NEW</span>
            <h1 style="margin-top:24px">
              <span class="l1">2026 大模型冲刺营 · 第五期</span>
              <span class="l2"><span class="acc">Agentic</span> 系统工程</span>
              <span class="l2">与 <span class="acc">Post-Train</span><span class="it"> 落地。</span></span>
            </h1>
            <p>${D.hero.sub.replace(/<b>/g,'<b>').replace(/<\/b>/g,'</b>')}</p>
          </div>
          <div class="hero-grid">${heroStats}</div>
        </div>

        <div class="tile col-4 tile-check">
          <div class="h"><span class="dot"></span>面试 Self-Check</div>
          <h3>5 题快诊<span class="sub">${D.hero.selfCheck.subtitle}</span></h3>
          <div class="qs">${checkQs}</div>
          <div class="foot">${D.hero.selfCheck.foot}</div>
        </div>

        <div class="tile col-12 dark tile-pain">
          <div class="h">${D.hook.lab}</div>
          <h3>${D.hook.t}</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 32px">${painRows}</div>
        </div>
      </div>
    </section>
  `;

  // === Chronicle (S-series) ===
  const cohortTiles = D.series.map((c,i)=>{
    const grps = c.groups.map(g=>`<div class="lab">${g.lab}</div><ul>${g.items.map(it=>`<li>${it}</li>`).join('')}</ul>`).join('');
    return `
      <div class="tile tile-coh col-3 ${c.now?'now':''}">
        ${c.now?'<div class="pin">★ 2026 · 当期</div>':''}
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
    <div class="item">
      <div class="n">${i.n}</div>
      <div class="h2">${i.h}</div>
      <div class="b">${i.b}</div>
    </div>`).join('');

  const chronSec = `
    <section class="section chron" id="chron">
      <div class="section-h">
        <div class="l">
          <div class="lab">Chronicle · 五年沿革</div>
          <h2>不是又一门 Agent 课，<br/>是五期沉淀的<em>系统化训练营</em>。</h2>
          <p class="lead">从 2024 年 S2 到 2026 年 S5 — 每一期都对准当时市场最稀缺的能力栈做迭代。<b>S5 把工业级 Agentic 系统 + Post-Train 全闭环装上去。</b></p>
        </div>
      </div>
      <div class="bento">
        ${cohortTiles}
        <div class="tile col-12 dark tile-delta">
          <div class="lab">${dl.tag}</div>
          <h3>${dl.t}</h3>
          <p>${dl.d}</p>
          <div class="items">${dlItems}</div>
        </div>
      </div>
    </section>
  `;

  // === Essay (algorithm vs engineering) ===
  const intro = D.intro;
  const colsA = intro.cols.filter(c=>!c.merge);
  const merge = intro.cols.find(c=>c.merge);
  const tenets = intro.bullets.map(b=>`
    <div class="tile col-3">
      <div class="n">${b.n}</div>
      <div class="t">${b.t}</div>
      <div class="d">${b.d}</div>
    </div>`).join('');

  const essaySec = `
    <section class="section essay" id="essay">
      <div class="section-h">
        <div class="l">
          <div class="lab">Positioning · 课程定位</div>
          <h2>我到底是做<em>算法</em>，<br/>还是做<em>工程</em>？</h2>
          <p class="lead">2026 年的市场已经把答案说清楚 — <b>除非你做基座层，否则单一栈拿不到真正的高薪 offer。</b></p>
        </div>
      </div>
      <div class="bento">
        <div class="tile col-6">
          <div class="lab">${colsA[0].lab.replace(/^A · /,'<b>A</b> · ')}</div>
          <div class="ans">${colsA[0].ans}</div>
          <div class="desc">${colsA[0].desc}</div>
        </div>
        <div class="tile col-6 acc3">
          <div class="lab">${colsA[1].lab.replace(/^B · /,'<b>B</b> · ')}</div>
          <div class="ans">${colsA[1].ans}</div>
          <div class="desc">${colsA[1].desc}</div>
        </div>
        <div class="tile col-12 merge">
          <div class="lab">${merge.lab}</div>
          <div class="ans">${merge.ans}</div>
          <div class="desc">${merge.desc}</div>
        </div>
      </div>
      <div class="bento tenets">${tenets}</div>
    </section>
  `;

  // === Roadmap ===
  const arcTiles = D.route.arc.map((a,i)=>{
    const styles = ['', 'acc3', '', 'acc4', '', 'acc'];
    return `<div class="tile col-2 ${styles[i]||''}">
      <div class="n">${a.n}</div>
      <div class="t">${a.t}</div>
    </div>`;
  }).join('');
  const rmRows = D.route.rows.map(r=>`
    <div class="row">
      <div class="wk">${r.wk}</div>
      <div class="topic">${r.topic}</div>
      <div class="pos">${r.pos}</div>
      <div class="stage">${r.stage}</div>
    </div>`).join('');

  const roadmapSec = `
    <section class="section arc" id="roadmap">
      <div class="section-h">
        <div class="l">
          <div class="lab">Roadmap · 十周六阶</div>
          <h2>十周 × 六大阶段的<em>递进逻辑</em></h2>
          <p class="lead">从理解 Agent 的本质 → 看世界级范本 → 打通模型基座 → 工业化部署 → 拓展模态 → 真实业务落地。<b>不是六门孤立的课。</b></p>
        </div>
      </div>
      <div class="bento">
        ${arcTiles}
        <div class="tile col-12 tile-table">
          <div class="head"><span>十周课表 · <b>WEEKLY SCHEDULE</b></span><span>W1 — W10</span></div>
          ${rmRows}
        </div>
      </div>
    </section>
  `;

  // === Weeks (each week is its own bento) ===
  const weekBlocks = D.weeks.map((w,idx)=>{
    const n = idx + 1;
    const hl = w.highlights.map((h,j)=>{
      const variants = ['','acc3','acc4'];
      return `
        <div class="tile col-4 week-hl-tile ${variants[j]||''}">
          <div class="lab">${h.lab}</div>
          <div class="h">${h.h}</div>
          <div class="b">${h.b}</div>
        </div>`;
    }).join('');
    const chRows = w.chapters.map(c=>`<tr><td class="ch">${c.ch}</td><td class="ti">${c.ti}</td></tr>`).join('');
    const tags = w.tags.map(t=>`<span class="tag">${t}</span>`).join('');
    const player = w.player ? `
      <div class="tile col-12 week-player-tile">
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
      <div class="tile col-12 week-output-tile">
        <div class="lab">${w.output.lab}</div>
        <div class="b">${w.output.b}</div>
        ${outBullets?`<ul>${outBullets}</ul>`:''}
      </div>` : '';

    return `
      <div class="week-block" id="${w.id}">
        <div class="week-bento">
          <div class="col-7 week-title-tile">
            <div class="top-row">
              <div class="wk">${w.wk}</div>
              <div class="prog">${w.stage}</div>
            </div>
            <div>
              <div class="meta">${w.meta}</div>
              <h3>${w.ti}</h3>
            </div>
          </div>
          <div class="tile col-5 week-narr-tile">
            <div class="lab">${w.whyLab}</div>
            <p>${w.narrMain}</p>
            ${w.narrSub?`<div class="sub">${w.narrSub}</div>`:''}
          </div>
          ${hl}
          <div class="tile col-8 week-ch-tile">
            <div class="head"><span class="pkg">${w.pkgName}</span><span class="ct">${w.pkgCount}</span></div>
            <table>${chRows}</table>
          </div>
          <div class="tile col-4 week-tags-tile">${tags}</div>
          ${player}
          ${output}
        </div>
      </div>
    `;
  }).join('');

  const weeksSec = `
    <section class="section" id="weeks">
      <div class="section-h">
        <div class="l">
          <div class="lab">Weekly Detail · 十周详解</div>
          <h2>每周一文 · 含<em>交互式课件预览</em></h2>
          <p class="lead">每周包含：为什么这一周 · 课件章节地图 · 在线预览 · 三大亮点 · 学完产出。<b>课件不是 PDF，是可交互的网页教学系统。</b></p>
        </div>
      </div>
      ${weekBlocks}
    </section>
  `;

  // === Feature (Capstone) ===
  const featStats = D.project.meta.map(m=>`
    <div class="tile tile-stat">
      <div class="n">${m.num}</div>
      <div class="l">${m.lab}</div>
      <div class="d">${m.d}</div>
    </div>`).join('');
  const featCells = D.project.features.map(f=>`
    <div class="feat-c">
      <div class="h">${f.h}</div>
      ${f.body}
    </div>`).join('');

  const featureSec = `
    <section class="section feature" id="feature">
      <div class="bento">
        <div class="tile col-12 tile-head">
          <div class="lab">${D.project.eyebrow} · ${D.project.eyebrowEnd}</div>
          <h2>企业内部 <em>智能协同助手</em> 平台</h2>
          <p>${D.project.lead}</p>
        </div>
        <div class="col-12" style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">${featStats}</div>
        <div class="tile col-12 arch-tile">
          <div class="arch-wrap">${SVG}</div>
          <button class="arch-zoom" id="archZoomBtn" type="button">⌖ 全屏查看架构大图</button>
        </div>
        <div class="col-12">
          <div class="feat-grid">${featCells}</div>
          <div class="biz">
            <div class="lab">业务落地能力清单</div>
            <div class="b">${D.project.bizList || '会议纪要 · 周报 · 风险预警 · SOP 问答 · 定时播报 · 文档智能管理 · 数据可视化分析 —— 全部基于上图架构跑通。'}</div>
          </div>
        </div>
      </div>
    </section>
  `;

  // === Tech stack as bento tiles ===
  const stackTiles = D.stack.rows.map(r=>`
    <div class="tile col-4">
      <div class="layer">${r.layer}</div>
      <div class="name">${r.layer.length > 10 ? '' : r.layer}<span style="opacity:0;display:none"></span></div>
      <div class="wk">${r.wk}</div>
      <div class="tech">${r.tech}</div>
    </div>`).join('');
  // Note: rendering layer twice was an oversight — clean version:
  const stackTilesClean = D.stack.rows.map(r=>`
    <div class="tile col-4">
      <div class="layer">${r.layer}</div>
      <div class="wk">${r.wk}</div>
      <div class="tech">${r.tech}</div>
    </div>`).join('');

  const stackSec = `
    <section class="section stack-grid" id="stack">
      <div class="section-h">
        <div class="l">
          <div class="lab">Tech Index · 11 层全栈</div>
          <h2>每一项都是真在课程里 <em>hand-on</em> 写过的</h2>
          <p class="lead">不是 buzzword 列表 — 每个技术栈都对应具体周次的代码实战。</p>
        </div>
      </div>
      <div class="bento">${stackTilesClean}</div>
    </section>
  `;

  // === Colophon (support + fit + cta) ===
  const supTiles = D.support.items.map(s=>`
    <div class="tile col-3 sup-tile">
      <div class="n">${s.n}</div>
      <div class="h">${s.h}</div>
      <div class="b">${s.b}</div>
    </div>`).join('');
  const extras = D.support.extras.map(e=>`
    <div class="it">
      <div class="t">${e.t}</div>
      <div class="ti">${e.ti}</div>
      <div class="d">${e.d}</div>
    </div>`).join('');
  const fitTiles = D.fit.cols.map(c=>`
    <div class="tile col-6 fit-tile ${c.no?'no':''}">
      <div class="h"><span class="ic"></span><span>${c.h}</span></div>
      <ul>${c.items.map(i=>`<li>${i}</li>`).join('')}</ul>
    </div>`).join('');

  const colophonSec = `
    <section class="section colophon" id="colo">
      <div class="section-h">
        <div class="l">
          <div class="lab">Support · Fit · Enrollment</div>
          <h2>配套支持 · 适合谁 · <em>报名</em></h2>
          <p class="lead">${D.support.lead}</p>
        </div>
      </div>

      <div class="bento">
        ${supTiles}
        <div class="tile col-12 extra-tile">
          <div class="h">${D.support.extraTitle}</div>
          <div class="list">${extras}</div>
        </div>
        ${fitTiles}
        <div class="tile col-12 cta-tile">
          <div class="lab">${D.foot.eyebrow} · GET STARTED</div>
          <h2>10 周后，你会有一份<br/>算法 + 工程<span class="it">双修</span>的硬资产。</h2>
          ${D.foot.ps.map(p=>`<p>${p}</p>`).join('')}
          <div class="meta">${D.foot.meta}</div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('root').innerHTML =
    heroSec + chronSec + essaySec + roadmapSec + weeksSec + featureSec + stackSec + colophonSec;

  // Player placeholders
  document.querySelectorAll('.week-player-tile').forEach(p => {
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
