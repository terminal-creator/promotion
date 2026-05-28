// admin-manage.jsx — manage existing channel links
const { useState: useStateM } = React;

function ManageScreen({ history, setHistory, onNew, showToast }) {
  const [lookupSlug, setLookupSlug] = useStateM('');
  const [lookupTok, setLookupTok] = useStateM('');
  const [sort, setSort] = useStateM('recent'); // recent | visits | name

  const sorted = [...history].sort((a,b) => {
    if (sort === 'visits') return (b.visits||0) - (a.visits||0);
    if (sort === 'name') return (a.name||'').localeCompare(b.name||'', 'zh-CN');
    return b.created.localeCompare(a.created);
  });

  const totalVisits = history.reduce((s,h) => s + (h.visits||0), 0);
  const ORIGIN = location.origin;

  // 真删 · 调 DELETE /api/channels/:slug 带 token，本地同时清掉
  const handleDelete = async (h) => {
    if (!confirm(`确认删除 /c/${h.slug}？该链接将永久失效，此操作不可恢复。`)) return;
    try {
      const res = await fetch(`/api/channels/${encodeURIComponent(h.slug)}`, {
        method: 'DELETE',
        headers: { 'X-Edit-Token': h.token },
      });
      if (!res.ok) {
        const j = await res.json().catch(()=>({}));
        showToast(j.error || '删除失败', 'err');
        return;
      }
      setHistory(history.filter(x => x.slug !== h.slug));
      showToast(`已删除 /c/${h.slug}`);
    } catch (e) {
      showToast('网络异常，请重试', 'err');
    }
  };

  // 编辑 · 弹原生 prompt 收集新微信号 / 显示名 / 备注，PUT 走真后端
  const handleEdit = async (h) => {
    const newWechat = prompt(`修改微信号（当前：${h.wechat}）\n回车留空保持不变：`, h.wechat);
    if (newWechat === null) return;
    const newName = prompt(`修改显示名（当前：${h.name}）：`, h.name);
    if (newName === null) return;
    const newNote = prompt('修改内部备注（可选）：', h.note || '');

    const body = {};
    if (newWechat && newWechat !== h.wechat)       body.wechat_id    = newWechat.trim();
    if (newName   && newName   !== h.name)         body.display_name = newName.trim();
    if (newNote !== null && newNote !== h.note)    body.custom_note  = newNote.trim();
    if (Object.keys(body).length === 0) { showToast('没改动'); return; }

    try {
      const res = await fetch(`/api/channels/${encodeURIComponent(h.slug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Edit-Token': h.token },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) { showToast(json.error || '更新失败', 'err'); return; }
      setHistory(history.map(x => x.slug === h.slug
        ? { ...x, wechat: body.wechat_id || x.wechat, name: body.display_name || x.name, note: body.custom_note ?? x.note }
        : x
      ));
      showToast('已更新');
    } catch (e) {
      showToast('网络异常', 'err');
    }
  };

  // 凭 slug + token 查找并自动归档进本机历史（跨设备恢复用）
  const handleLookup = async () => {
    if (!lookupSlug || !lookupTok) return;
    try {
      // 1. 验 token：试着 PUT 一个空字段（其实没改），如果 401/403 就是 token 错
      // 简化做法：直接 GET 拉数据，token 校验放在 PUT 前；这里只确认 slug 存在
      const res = await fetch(`/api/channels/${encodeURIComponent(lookupSlug)}`);
      if (!res.ok) { showToast('未找到该 slug', 'err'); return; }
      const ch = await res.json();
      // 加入本机历史
      const rec = {
        slug: ch.slug,
        style: ch.style_version,
        name: ch.display_name,
        wechat: ch.wechat_id,
        qr_image_url: ch.qr_image_url,
        created: ch.created_at || '',
        visits: 0,
        token: lookupTok,
        note: ch.custom_note || '',
      };
      const next = [rec, ...history.filter(h => h.slug !== ch.slug)];
      setHistory(next);
      setLookupSlug(''); setLookupTok('');
      showToast(`已加入本机历史 · /c/${ch.slug}`);
    } catch (e) {
      showToast('查找失败', 'err');
    }
  };

  return (
    <div className="managepage">
      <div className="section-hd" style={{padding:'8px 0 22px', borderBottom:'1px dashed var(--line)'}}>
        <div>
          <div className="title">// manage · 管理已有链接</div>
          <h1>查看 / 修改你<span style={{color:'var(--acc)'}}>已经创建</span>过的链接</h1>
          <div className="sub">
            有两个入口：左边是「我知道 slug 和凭证」直接打开管理面板；下面是「这台浏览器上一次留下的本地记忆」，无需凭证也能看到摘要（但要改还是需要凭证）。
          </div>
        </div>
        <div className="right">
          <button className="btn primary sm" onClick={onNew}>+ 新建一条链接</button>
        </div>
      </div>

      <div className="lookup tick">
        <span className="t1"></span><span className="t2"></span>
        <div>
          <div className="label">
            <span className="num">A ·</span>
            <span>已有 slug</span>
          </div>
          <div className="slug-row">
            <span className="prefix">{ORIGIN.replace(/^https?:\/\//,'')}/c/</span>
            <input className="input" type="text" placeholder="wangxiao"
              value={lookupSlug}
              onChange={e=>setLookupSlug(e.target.value.toLowerCase())} />
          </div>
        </div>
        <div>
          <div className="label">
            <span className="num">B ·</span>
            <span>编辑凭证</span>
            <span className="opt">32 位</span>
          </div>
          <input className="input" type="password" placeholder="a7f3c91d8e2b4a76b09f3c1d2e8b4f0a"
            value={lookupTok}
            onChange={e=>setLookupTok(e.target.value)} />
        </div>
        <button className="btn primary" disabled={!lookupSlug || !lookupTok}
          style={(!lookupSlug || !lookupTok) ? {opacity:0.4, cursor:'not-allowed'} : {}}
          onClick={handleLookup}>
          打开管理 →
        </button>
      </div>

      {/* local history */}
      <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:14}}>
        <div>
          <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)', letterSpacing:'0.16em', textTransform:'uppercase', marginBottom:6}}>
            // 这台浏览器创建过 ↓
          </div>
          <div style={{display:'flex', alignItems:'baseline', gap:18}}>
            <span style={{fontSize:22, fontWeight:700, letterSpacing:'-0.01em'}}>{history.length} 条链接</span>
            <span style={{fontFamily:'var(--mono)', fontSize:12, color:'var(--ink-3)'}}>
              · 累计 <b style={{color:'var(--ink)'}}>{totalVisits}</b> 次访问
            </span>
          </div>
        </div>
        <div className="grp" style={{display:'flex', background:'var(--line-2)', padding:1}}>
          {[
            {id:'recent', l:'最新创建'},
            {id:'visits', l:'按访问量'},
            {id:'name',   l:'按显示名'},
          ].map(o => (
            <button key={o.id}
              className={`fb ${sort===o.id?'on':''}`}
              style={{padding:'7px 12px', background: sort===o.id ? 'var(--acc)' : 'var(--panel)', color: sort===o.id ? '#0A0B0E' : 'var(--ink-3)', border:0, fontFamily:'var(--mono)', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', fontWeight:600}}
              onClick={()=>setSort(o.id)}>{o.l}</button>
          ))}
        </div>
      </div>

      <div className="history-table tick">
        <span className="t1"></span><span className="t2"></span>
        <div className="row hd">
          <div className="cell">slug</div>
          <div className="cell">显示名 / 微信</div>
          <div className="cell">样式</div>
          <div className="cell">访问 / 创建于</div>
          <div className="cell">操作</div>
        </div>
        {sorted.length === 0 && (
          <div className="row" style={{gridTemplateColumns:'1fr'}}>
            <div className="cell" style={{justifyContent:'center', padding:'48px', color:'var(--ink-3)', fontFamily:'var(--mono)', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase'}}>
              本机暂无创建记录 · 点右上"新建一条链接"开始
            </div>
          </div>
        )}
        {sorted.map(h => {
          const st = window.STYLES.find(s => s.id === h.style);
          return (
            <div className="row" key={h.slug}>
              <div className="cell mono">
                <span style={{color:'var(--ink-3)'}}>/c/</span>
                <b style={{color:'var(--acc)', fontWeight:700}}>{h.slug}</b>
              </div>
              <div className="cell">
                <div style={{minWidth:0}}>
                  <div style={{fontSize:13, color:'var(--ink)', fontWeight:500}}>{h.name}</div>
                  <div className="dim">{h.wechat}</div>
                </div>
              </div>
              <div className="cell">
                {st ? (
                  <React.Fragment>
                    <div style={{width:14, height:14, border:'1px solid var(--line)', display:'flex', flexDirection:'column'}}>
                      <div style={{flex:1, background: st.bg}}></div>
                      <div style={{height:4, background: st.acc}}></div>
                    </div>
                    <span style={{fontSize:12, color:'var(--ink)'}}>{st.label}</span>
                    <span className="dim" style={{fontSize:10}}>· {st.n}</span>
                  </React.Fragment>
                ) : <span className="dim">—</span>}
              </div>
              <div className="cell">
                <div>
                  <div style={{fontFamily:'var(--mono)', fontSize:13, color:'var(--ink)'}}>
                    {h.visits} <span style={{color:'var(--ink-3)', fontSize:10}}>次</span>
                  </div>
                  <div className="dim">{h.created}</div>
                </div>
              </div>
              <div className="cell">
                <button className="btn sm" onClick={()=>{
                  navigator.clipboard?.writeText(`${ORIGIN}/c/${h.slug}`);
                  showToast('链接已复制');
                }}>复制</button>
                <a className="btn sm" href={`/c/${h.slug}`} target="_blank" rel="noopener">打开</a>
                <button className="btn sm" onClick={()=>handleEdit(h)}>编辑</button>
                <button className="btn sm danger" onClick={()=>handleDelete(h)}>删</button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop:24, fontFamily:'var(--mono)', fontSize:10.5, color:'var(--ink-3)',
        lineHeight:1.7, padding:'14px 16px', border:'1px dashed var(--line)', background:'var(--bg-2)',
      }}>
        <b style={{color:'var(--ink-2)', letterSpacing:'0.1em'}}>// 本地历史 · 隐私说明</b><br/>
        以上列表只来自 <code>localStorage</code>。换浏览器、清缓存、用无痕窗口都看不到。这是为了「无登录」体验。
        所有"编辑 / 删除 / 看数据"的真正操作都必须带正确的凭证才能在服务端通过。
      </div>
    </div>
  );
}

window.ManageScreen = ManageScreen;
