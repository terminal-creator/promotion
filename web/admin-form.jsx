// admin-form.jsx — screen 2: configuration form with live preview rail
const { useState: useStateF, useEffect: useEffectF, useRef: useRefF, useMemo: useMemoF } = React;

const RESERVED = new Set(['admin','api','c','static','www','app','dashboard','login','signup','public','assets','styles']);

function FormScreen({ data, setField, styleObj, onBack, onSubmit, onChangeStyle, history, showToast, submitting }) {
  const [slugStatus, setSlugStatus] = useStateF('idle'); // idle | loading | ok | err
  const [slugErr, setSlugErr] = useStateF('');
  const slugTimer = useRefF(null);
  const previewIframeRef = useRefF(null);

  // ---- slug 实时查重（先本地校验 · 然后调真后端 /api/check-slug）
  useEffectF(() => {
    if (!data.slug) { setSlugStatus('idle'); setSlugErr(''); return; }
    setSlugStatus('loading');
    clearTimeout(slugTimer.current);
    slugTimer.current = setTimeout(async () => {
      const v = data.slug.trim().toLowerCase();
      if (v.length < 4) { setSlugStatus('err'); setSlugErr('至少 4 个字符'); return; }
      if (!/^[a-z0-9-]+$/.test(v)) { setSlugStatus('err'); setSlugErr('只能用小写字母、数字、短横线'); return; }
      if (RESERVED.has(v)) { setSlugStatus('err'); setSlugErr('这是系统保留词，换一个'); return; }
      try {
        const res = await fetch(`/api/check-slug/${encodeURIComponent(v)}`);
        const json = await res.json();
        if (json.available) {
          setSlugStatus('ok');
          setSlugErr('');
        } else {
          setSlugStatus('err');
          setSlugErr(json.reason || '已被占用');
        }
      } catch (e) {
        setSlugStatus('err');
        setSlugErr('查重失败，请稍后再试');
      }
    }, 380);
    return () => clearTimeout(slugTimer.current);
  }, [data.slug]);

  // ---- 实时预览 · 表单变化 → postMessage 推到右侧 iframe
  useEffectF(() => {
    const iframe = previewIframeRef.current;
    if (!iframe) return;
    // 一定的 debounce 防止频繁推
    const t = setTimeout(() => {
      if (window.CWP && window.CWP.pushPreview) {
        window.CWP.pushPreview(iframe, {
          name: data.displayName || undefined,
          wechat: data.wechat || undefined,
          qrDataUrl: data.qrFile?.dataUrl || undefined,
          note: data.note || undefined,
        });
      }
    }, 120);
    return () => clearTimeout(t);
  }, [data.displayName, data.wechat, data.qrFile, data.note]);

  const handleQR = (file) => {
    if (!file) return;
    if (file.size > 500 * 1024) {
      showToast('图片超过 500 KB，请压缩后重试', 'err');
      return;
    }
    if (!['image/png','image/jpeg'].includes(file.type)) {
      showToast('仅支持 PNG / JPEG', 'err');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setField({ qrFile: { name: file.name, size: file.size, dataUrl: e.target.result } });
    };
    reader.readAsDataURL(file);
  };

  const canSubmit = !!styleObj
    && data.displayName.trim().length > 0
    && data.wechat.trim().length > 0
    && data.qrFile
    && (slugStatus === 'ok' || data.slug === '');

  return (
    <React.Fragment>
      <div className="section-hd">
        <div>
          <div className="title">// step 02 · configure your channel</div>
          <h1>填一下<span className="acc">你自己</span>的信息</h1>
          <div className="sub">
            这一屏的所有内容只会跟你绑定。学员从你的专属链接进来，看到的微信号、二维码、显示名全部是你这里填的。系统不会要求登录，但创建后会给你一个编辑凭证，请妥善保管。
          </div>
        </div>
        <div className="right">
          <span className="chip">step 02 / 03</span>
          <button className="btn ghost sm" onClick={onBack}>← 返回挑样式</button>
        </div>
      </div>

      <div className="formpage">
        {/* === LEFT: form === */}
        <div className="colL">

          {/* selected style summary */}
          <div className="tick" style={{
            display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
            border:'1px solid var(--line)', background:'var(--panel)', marginBottom:32,
          }}>
            <span className="t1"></span><span className="t2"></span>
            <div style={{width:42, height:42, display:'flex', flexDirection:'column', border:'1px solid var(--line)'}}>
              <div style={{flex:1, background: styleObj?.bg}}></div>
              <div style={{height:8, background: styleObj?.acc}}></div>
            </div>
            <div style={{flex:1, minWidth:0}}>
              <div style={{fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:4}}>
                已选样式 · {styleObj?.n}
              </div>
              <div style={{fontSize:14, fontWeight:600}}>{styleObj?.name}</div>
            </div>
            <button className="btn sm" onClick={onChangeStyle}>换一个 ↻</button>
          </div>

          {/* display name */}
          <div className="field">
            <div className="label">
              <span className="num">01 ·</span>
              <span>显示名</span>
              <span className="req">必填</span>
            </div>
            <input
              className="input"
              type="text"
              placeholder="例如：王晓老师"
              value={data.displayName}
              onChange={e => setField({ displayName: e.target.value })}
              maxLength={20}
            />
            <div className="hint">学员能看到的称呼。建议「真名 + 老师」格式，让学员觉得不是被群发。</div>
          </div>

          {/* wechat */}
          <div className="field">
            <div className="label">
              <span className="num">02 ·</span>
              <span>微信号</span>
              <span className="req">必填</span>
            </div>
            <input
              className="input"
              type="text"
              placeholder="S5_WANGXIAO_24"
              value={data.wechat}
              onChange={e => setField({ wechat: e.target.value.replace(/[^a-zA-Z0-9_-]/g,'') })}
              maxLength={32}
            />
            <div className="hint">学员长按二维码失败时的备选，会显示在"加微信"按钮文案里。</div>
          </div>

          {/* QR */}
          <div className="field">
            <div className="label">
              <span className="num">03 ·</span>
              <span>咨询二维码</span>
              <span className="req">必填</span>
              <span className="opt" style={{marginLeft:'auto'}}>PNG / JPEG · ≤ 500 KB · 建议 ≥ 600 × 600</span>
            </div>
            <UploadField file={data.qrFile} onPick={handleQR} onRemove={() => setField({ qrFile: null })} />
          </div>

          {/* slug */}
          <div className="field">
            <div className="label">
              <span className="num">04 ·</span>
              <span>专属网址后缀（slug）</span>
              <span className="opt">可选 · 留空自动生成 6 位</span>
            </div>
            <div className="slug-row">
              <span className="prefix">s5-2026.cn/c/</span>
              <input
                className="input"
                type="text"
                placeholder="例如：wangxiao"
                value={data.slug}
                onChange={e => setField({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'').slice(0,32) })}
              />
              <span className={`check ${slugStatus === 'ok' ? 'ok' : slugStatus === 'err' ? 'err' : 'loading'}`}>
                {slugStatus === 'idle' && '— 等待输入'}
                {slugStatus === 'loading' && '查重中…'}
                {slugStatus === 'ok' && '✓ 可用'}
                {slugStatus === 'err' && '✕ 占用'}
              </span>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:8, gap:14}}>
              <div className={`hint ${slugStatus === 'err' ? 'err' : slugStatus === 'ok' ? 'ok' : ''}`}>
                {slugErr || (slugStatus === 'ok' ? '可用，未来学员会从这个网址进来' : '至少 4 个字符 · 仅 a-z / 0-9 / -')}
              </div>
              <button className="btn sm" onClick={() => setField({ slug: window.__h.randomSlug() })}>
                <span className="code">⚂</span> 随机生成
              </button>
            </div>
          </div>

          {/* note */}
          <div className="field">
            <div className="label">
              <span className="num">05 ·</span>
              <span>内部备注</span>
              <span className="opt">可选 · 只你自己看得到</span>
            </div>
            <textarea
              className="textarea"
              placeholder="例如：本期发给 5 班高级群、来源于知乎 AMA"
              value={data.note}
              onChange={e => setField({ note: e.target.value })}
              maxLength={200}
            />
            <div className="hint">用来日后区分多个链接的用途。{data.note.length} / 200</div>
          </div>

          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:36, paddingTop:24, borderTop:'1px dashed var(--line)'}}>
            <div className="hint">
              {canSubmit ? '检查无误。点右侧按钮一键生成专属链接。' : '请把上方带 ★ 的必填项填完。'}
            </div>
            <div style={{display:'flex', gap:10}}>
              <button className="btn" onClick={onBack}>← 返回</button>
              <button
                className="btn primary"
                onClick={onSubmit}
                disabled={!canSubmit || submitting}
                style={(!canSubmit || submitting) ? {opacity:0.4, cursor:'not-allowed'} : {}}
              >
                {submitting ? '正在生成…' : '生成专属链接'}
                {!submitting && <span className="arr">→</span>}
              </button>
            </div>
          </div>
        </div>

        {/* === RIGHT: live preview rail === */}
        <div className="colR">
          <div className="prev-card">
            <div className="hd">
              <div className="l">
                <span className="sw" style={{background: styleObj?.acc}}></span>
                <b>样式预览</b>
                <span>· {styleObj?.n}</span>
              </div>
              <span style={{color:'var(--ink-3)'}}>{window.STYLE_FONT_HINTS?.[styleObj?.id] || ''}</span>
            </div>
            <div className="bd">
              <div className="kv"><div className="k">name</div><div className="v">{styleObj?.name}</div></div>
              <div className="kv"><div className="k">mood</div><div className="v dim">{styleObj?.mood}</div></div>
              <div className="kv"><div className="k">palette</div>
                <div className="v" style={{display:'flex', gap:6, alignItems:'center', flexWrap:'wrap'}}>
                  <span style={{display:'inline-flex', alignItems:'center', gap:4}}>
                    <span style={{width:12, height:12, background:styleObj?.bg, border:'1px solid var(--line)'}}></span>
                    {styleObj?.bg}
                  </span>
                  <span style={{display:'inline-flex', alignItems:'center', gap:4}}>
                    <span style={{width:12, height:12, background:styleObj?.ink, border:'1px solid var(--line)'}}></span>
                    {styleObj?.ink}
                  </span>
                  <span style={{display:'inline-flex', alignItems:'center', gap:4}}>
                    <span style={{width:12, height:12, background:styleObj?.acc, border:'1px solid var(--line)'}}></span>
                    {styleObj?.acc}
                  </span>
                </div>
              </div>
              <div className="kv"><div className="k">file</div><div className="v dim">{styleObj?.file}</div></div>
            </div>
          </div>

          <div className="phone">
            <div className="screen">
              <div className="notch"></div>
              {styleObj && (
                <iframe
                  ref={previewIframeRef}
                  src={`/styles/${styleObj.id}/`}
                  scrolling="no"
                  sandbox="allow-same-origin allow-scripts"
                  title="phone preview"
                />
              )}
            </div>
          </div>
          <div className="phone-cap">
            <b>学员手机端实时预览</b> · 你下方填的微信号 / QR 会注入页面"联系老师"入口
          </div>

          <div style={{
            border:'1px solid var(--line)', background:'var(--bg)', padding:'14px 16px',
            display:'grid', gridTemplateColumns:'1fr', gap:10,
          }}>
            <div style={{fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)', letterSpacing:'0.14em', textTransform:'uppercase'}}>
              注入预览
            </div>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <div style={{width:54, height:54, background:'var(--bg-2)', border:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
                {data.qrFile
                  ? <img src={data.qrFile.dataUrl} alt="qr" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                  : <span style={{color:'var(--ink-4)', fontFamily:'var(--mono)', fontSize:9, letterSpacing:'0.1em'}}>QR</span>}
              </div>
              <div style={{flex:1, minWidth:0, fontFamily:'var(--mono)', fontSize:11, lineHeight:1.5}}>
                <div style={{color:'var(--ink-3)', fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase'}}>显示名 / 微信</div>
                <div style={{color:'var(--ink)'}}>{data.displayName || <span className="dim">— 老师 —</span>}</div>
                <div style={{color:'var(--ink-2)'}}>{data.wechat || <span className="dim">— wechat-id —</span>}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function UploadField({ file, onPick, onRemove }) {
  const inputRef = useRefF(null);
  const [drag, setDrag] = useStateF(false);

  return (
    <div
      className={`upload ${file ? 'has' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e)=>{ e.preventDefault(); setDrag(true); }}
      onDragLeave={()=>setDrag(false)}
      onDrop={(e)=>{
        e.preventDefault(); setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onPick(f);
      }}
      style={drag ? { borderColor:'var(--acc)', background:'var(--acc-soft)' } : {}}
    >
      <div className="ph">
        {file
          ? <img src={file.dataUrl} alt="qr" />
          : <span>+</span>}
      </div>
      <div className="info">
        {file ? (
          <React.Fragment>
            <div className="t">{file.name}</div>
            <div className="d">
              <code>{(file.size/1024).toFixed(1)} KB</code> · 已就绪，将作为公开二维码上传到 <code>qr-codes/&lt;slug&gt;/qr.png</code>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="t">点击上传，或把图片拖到这里</div>
            <div className="d">微信「我」&gt; 二维码名片，截图导出即可。临时存在你浏览器，提交后才上传到服务器。</div>
          </React.Fragment>
        )}
      </div>
      {file && (
        <button className="x" onClick={(e)=>{ e.stopPropagation(); onRemove(); }}>移除</button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        style={{display:'none'}}
        onChange={(e) => onPick(e.target.files?.[0])}
      />
    </div>
  );
}

window.FormScreen = FormScreen;
