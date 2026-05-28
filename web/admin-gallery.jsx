// admin-gallery.jsx — screen 1: style gallery with live iframe thumbnails
const { useState: useStateG, useEffect: useEffectG, useRef: useRefG } = React;

function Gallery({ styles, selected, onSelect, onConfirm }) {
  const [audience, setAudience] = useStateG('all');
  const [feel, setFeel] = useStateG('all');
  const [showOnlyNew, setShowOnlyNew] = useStateG(false);

  const audiences = ['all','通用','技术向','商务向','设计向','文科向','管理者','极客','学生向','女性向'];
  const feels = ['all','极客','现代','严肃','高级','学术','怀旧','反叛','柔和','温润','明亮','锐利','硬核','稳重'];

  const filtered = styles.filter(s => {
    if (showOnlyNew && !s.isNew) return false;
    if (audience !== 'all' && !s.audience.includes(audience)) return false;
    if (feel !== 'all' && s.feel !== feel) return false;
    return true;
  });

  return (
    <React.Fragment>
      <div className="section-hd">
        <div>
          <div className="title">// step 01 · choose template</div>
          <h1>挑一个学员<span className="acc">第一眼</span>看到的样式</h1>
          <div className="sub">
            13 套已上线的样式，色板、字体、排版语言各不一样。鼠标移上去可以局部预览，点击新标签会全屏打开真实页面。
            一旦选定，下一步你填的微信号 / 二维码会被直接注入这套样式的所有"联系老师"入口。
          </div>
        </div>
        <div className="right">
          <div>共 <b style={{color:'var(--ink)'}}>13</b> 套 · 命中 <b style={{color:'var(--acc)'}}>{filtered.length}</b> 套</div>
          <div className="dim" style={{fontSize:10}}>更新于 2026-05-28</div>
        </div>
      </div>

      <div className="filter-bar">
        <span style={{color:'var(--ink-3)', letterSpacing:'0.14em', textTransform:'uppercase', fontSize:10}}>受众</span>
        <div className="grp">
          {audiences.slice(0,5).map(a => (
            <button key={a} className={`fb ${audience===a?'on':''}`} onClick={()=>setAudience(a)}>
              {a === 'all' ? '全部' : a}
            </button>
          ))}
        </div>
        <span style={{color:'var(--ink-3)', letterSpacing:'0.14em', textTransform:'uppercase', fontSize:10, marginLeft:10}}>基调</span>
        <div className="grp">
          {['all','极客','现代','严肃','高级','学术','怀旧','反叛','柔和'].map(f => (
            <button key={f} className={`fb ${feel===f?'on':''}`} onClick={()=>setFeel(f)}>
              {f === 'all' ? '全部' : f}
            </button>
          ))}
        </div>
        <div className="sp"></div>
        <button className={`fb ${showOnlyNew?'on':''}`} style={{border:'1px solid var(--line-2)'}} onClick={()=>setShowOnlyNew(v=>!v)}>
          ★ 仅看新版面
        </button>
        <span className="cnt"><b>{filtered.length}</b> / 13</span>
      </div>

      <div className="gallery">
        {filtered.map(s => (
          <StyleCard
            key={s.id}
            s={s}
            isSelected={selected === s.id}
            onSelect={() => onSelect(s.id)}
            onConfirm={() => onConfirm(s.id)}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

function StyleCard({ s, isSelected, onSelect, onConfirm }) {
  const ref = useRefG(null);
  const [visible, setVisible] = useStateG(false);
  const [loaded, setLoaded] = useStateG(false);

  useEffectG(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      });
    }, { rootMargin: '300px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`card tick ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      onDoubleClick={onConfirm}
    >
      <span className="t1"></span><span className="t2"></span>
      <div className="thumb" style={{background:s.bg}}>
        {!loaded && (
          <div className="skeleton">
            <span>{visible ? `loading ${s.file}` : 'queued'}</span>
          </div>
        )}
        {visible && (
          <iframe
            src={s.file}
            scrolling="no"
            sandbox="allow-same-origin allow-scripts"
            loading="lazy"
            title={s.name}
            onLoad={() => setLoaded(true)}
            style={{opacity: loaded ? 1 : 0, transition:'opacity 0.2s'}}
          />
        )}
        <div className="thumb-cover"></div>
        <div className="thumb-actions">
          <a className="ta" href={s.file} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()}>
            全屏看 ↗
          </a>
        </div>
      </div>

      <div className="meta-row">
        <div className="lf">
          <span className="num">{s.n}</span>
          <span>·</span>
          <span>{s.label}</span>
          {s.isNew && <span className="chip acc" style={{padding:'1px 6px', fontSize:9, marginLeft:6}}>★ NEW</span>}
        </div>
        <div className="sw-bar" title={`${s.bg} / ${s.ink} / ${s.acc}`}>
          <div style={{background:s.bg}}></div>
          <div style={{background:s.ink}}></div>
          <div style={{background:s.acc}}></div>
        </div>
      </div>

      <div className="body">
        <div className="name">{s.name}</div>
        <div className="mood">{s.summary}</div>
        <div className="tags">
          <span className="chip dim">{s.feel}</span>
          {s.audience.slice(0,2).map(a => (
            <span key={a} className="chip">{a}</span>
          ))}
        </div>
      </div>

      <div className="pick" onClick={(e)=>{e.stopPropagation(); onConfirm();}}>
        <span>
          <span className="ch"></span>
          <span style={{marginLeft:10}}>{isSelected ? '已选 · 点击进入下一步' : '选这一套 →'}</span>
        </span>
        <span className="dim" style={{fontSize:9}}>双击直接进入</span>
      </div>
    </div>
  );
}

window.Gallery = Gallery;
