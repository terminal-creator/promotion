// admin-shell.jsx — app shell, top bar, step routing, global state
const { useState, useEffect, useMemo, useCallback, useRef } = React;

const STEPS = [
  { id: 'gallery', n: '01', label: '挑样式' },
  { id: 'form',    n: '02', label: '填配置' },
  { id: 'result',  n: '03', label: '拿链接' },
];

function App() {
  // mode: 'create' (3-step flow) or 'manage' (existing links)
  const [mode, setMode] = useState('create');
  const [step, setStep] = useState('gallery'); // gallery | form | result
  const [data, setData] = useState({
    styleId: null,
    displayName: '',
    wechat: '',
    slug: '',
    slugMode: 'manual', // manual | auto
    qrFile: null,       // {name, size, dataUrl}
    note: '',
  });
  const [generated, setGenerated] = useState(null); // {slug, token, url, ...}
  const [history, setHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('s5ch-history');
      if (raw) return JSON.parse(raw);
    } catch(e){}
    return [];
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, kind='ok') => {
    setToast({ msg, kind, id: Date.now() });
    setTimeout(() => setToast(t => (t && t.msg === msg ? null : t)), 2400);
  }, []);

  const setField = useCallback((patch) => {
    setData(d => ({ ...d, ...patch }));
  }, []);

  const goStep = useCallback((s) => {
    setMode('create');
    setStep(s);
    if (s === 'gallery') document.querySelector('.main')?.scrollTo(0,0);
  }, []);

  // 真实提交：调 POST /api/channels 上传 + 入库
  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    if (!data.qrFile?.dataUrl) {
      showToast('请先上传咨询二维码', 'err');
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('display_name', data.displayName);
      fd.append('wechat_id',    data.wechat);
      fd.append('style_version', data.styleId);
      if (data.slug) fd.append('slug', data.slug);
      if (data.note) fd.append('custom_note', data.note);

      // 把 dataURL 转成 Blob 上传
      const blob = await (await fetch(data.qrFile.dataUrl)).blob();
      const ext = blob.type === 'image/jpeg' ? 'jpg' : 'png';
      fd.append('qr_image', blob, `qr.${ext}`);

      const res = await fetch('/api/channels', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        showToast(json.error || '创建失败', 'err');
        setSubmitting(false);
        return;
      }

      const rec = {
        slug: json.slug,
        style: data.styleId,
        name: data.displayName,
        wechat: data.wechat,
        qr_image_url: json.qr_image_url,
        created: nowStr(),
        visits: 0,
        token: json.edit_token,
      };
      const next = [rec, ...history.filter(h => h.slug !== json.slug)];
      setHistory(next);
      try { localStorage.setItem('s5ch-history', JSON.stringify(next)); } catch(e){}

      setGenerated({
        slug: json.slug,
        token: json.edit_token,
        url: json.url || `${location.origin}/c/${json.slug}`,
        style: data.styleId,
        name: data.displayName,
        wechat: data.wechat,
        qrFile: data.qrFile,
        qr_image_url: json.qr_image_url,
      });
      setStep('result');
      document.querySelector('.main')?.scrollTo(0,0);
      showToast('链接已生成');
    } catch (err) {
      console.error(err);
      showToast('网络异常，请重试', 'err');
    } finally {
      setSubmitting(false);
    }
  }, [data, history, submitting, showToast]);

  const resetFlow = useCallback(() => {
    setData({
      styleId: null, displayName: '', wechat: '', slug: '',
      slugMode: 'manual', qrFile: null, note: '',
    });
    setGenerated(null);
    setStep('gallery');
    setMode('create');
  }, []);

  // Compute step states
  const stepState = (s) => {
    if (mode === 'manage') return 'idle';
    const order = ['gallery','form','result'];
    const cur = order.indexOf(step);
    const idx = order.indexOf(s);
    if (idx < cur) return 'done';
    if (idx === cur) return 'active';
    return 'idle';
  };

  const canGoStep = (s) => {
    if (s === 'gallery') return true;
    if (s === 'form') return !!data.styleId;
    if (s === 'result') return !!generated;
    return false;
  };

  const styleObj = useMemo(
    () => window.STYLES.find(s => s.id === data.styleId) || null,
    [data.styleId]
  );

  return (
    <React.Fragment>
      <TopBar
        step={step}
        mode={mode}
        stepState={stepState}
        canGoStep={canGoStep}
        onGoStep={goStep}
        onGoManage={() => setMode('manage')}
        onReset={resetFlow}
      />
      <MetaStrip mode={mode} step={step} data={data} styleObj={styleObj} historyCount={history.length} />
      <div className="main">
        {mode === 'create' && step === 'gallery' && (
          <Gallery
            styles={window.STYLES}
            selected={data.styleId}
            onSelect={(id) => { setField({ styleId: id }); }}
            onConfirm={(id) => { setField({ styleId: id }); setStep('form'); document.querySelector('.main')?.scrollTo(0,0); }}
          />
        )}
        {mode === 'create' && step === 'form' && (
          <FormScreen
            data={data}
            setField={setField}
            styleObj={styleObj}
            onBack={() => setStep('gallery')}
            onSubmit={handleSubmit}
            onChangeStyle={() => setStep('gallery')}
            history={history}
            showToast={showToast}
            submitting={submitting}
          />
        )}
        {mode === 'create' && step === 'result' && generated && (
          <ResultScreen
            gen={generated}
            styleObj={window.STYLES.find(s => s.id === generated.style)}
            onReset={resetFlow}
            onManage={() => setMode('manage')}
            showToast={showToast}
          />
        )}
        {mode === 'manage' && (
          <ManageScreen
            history={history}
            setHistory={(h) => { setHistory(h); try { localStorage.setItem('s5ch-history', JSON.stringify(h)); } catch(e){} }}
            onNew={() => { resetFlow(); }}
            showToast={showToast}
          />
        )}
      </div>
      <FootStatus mode={mode} step={step} historyCount={history.length} />
      {toast && (
        <div className="toast">
          <span className={toast.kind}>●</span>
          <span>{toast.msg}</span>
        </div>
      )}
    </React.Fragment>
  );
}

function TopBar({ step, mode, stepState, canGoStep, onGoStep, onGoManage, onReset }) {
  return (
    <div className="bar">
      <div className="brand">
        <span className="sq"></span>
        <b>S5 · 2026</b>
        <span>渠道链接控制台</span>
        <span className="v">v0.3</span>
      </div>
      <div className="steps">
        {STEPS.map((s, i) => {
          const st = mode === 'create' ? stepState(s.id) : 'idle';
          const ok = mode === 'create' && canGoStep(s.id);
          return (
            <button
              key={s.id}
              className={`step ${st === 'active' ? 'active' : ''} ${st === 'done' ? 'done' : ''}`}
              onClick={() => ok && onGoStep(s.id)}
              disabled={!ok}
            >
              <span className="num"><span>{s.n}</span></span>
              <span>{s.label}</span>
            </button>
          );
        })}
        <button
          className={`step ${mode === 'manage' ? 'active' : ''}`}
          style={{ marginLeft:'auto' }}
          onClick={onGoManage}
        >
          <span className="num"><span>M</span></span>
          <span>管理已有</span>
        </button>
      </div>
      <div className="rt">
        <button onClick={onReset} title="重置当前流程">新建 +</button>
        <a href="index.html" target="_blank" rel="noopener">样式总览 ↗</a>
      </div>
    </div>
  );
}

function MetaStrip({ mode, step, data, styleObj, historyCount }) {
  if (mode === 'manage') {
    return (
      <div className="meta">
        <span><span className="pulse"></span><span className="k">系统</span><span className="v">就绪</span></span>
        <span className="sep"></span>
        <span><span className="k">本机历史</span><span className="v acc">{historyCount}</span><span className="v dim"> · 条渠道链接</span></span>
        <span className="sep"></span>
        <span><span className="k">数据后端</span><span className="v">国内自建</span><span className="v dim"> · Node + SQLite</span></span>
        <span className="sep"></span>
        <span><span className="k">存储</span><span className="v">/uploads/qr</span></span>
      </div>
    );
  }
  return (
    <div className="meta">
      <span><span className="pulse"></span><span className="k">流程</span>
        <span className="v acc">
          {step === 'gallery' && '01 · GALLERY'}
          {step === 'form' && '02 · CONFIGURE'}
          {step === 'result' && '03 · DELIVER'}
        </span>
      </span>
      <span className="sep"></span>
      <span><span className="k">已选样式</span>
        {styleObj
          ? <span className="v">{styleObj.n} · {styleObj.name}</span>
          : <span className="v dim">— 未选 —</span>}
      </span>
      <span className="sep"></span>
      <span><span className="k">渠道老师</span>
        {data.displayName
          ? <span className="v">{data.displayName}</span>
          : <span className="v dim">未填写</span>}
      </span>
      <span className="sep"></span>
      <span><span className="k">slug</span>
        {data.slug
          ? <span className="v">/c/{data.slug}</span>
          : <span className="v dim">/c/—</span>}
      </span>
    </div>
  );
}

function FootStatus({ mode, step, historyCount }) {
  return (
    <div className="foot">
      <div className="l">
        <span><span className="k">$ </span><span className="v">s5-channels --interactive</span></span>
        <span><span className="k">env</span> <span className="v">prod</span></span>
      </div>
      <div className="r kbd-list">
        <span><kbd>↑</kbd> <kbd>↓</kbd> 浏览</span>
        <span><kbd>Enter</kbd> 选择</span>
        <span><kbd>Esc</kbd> 退出</span>
        <span className="v">© 2026 大模型冲刺营</span>
      </div>
    </div>
  );
}

// ---- helpers -----------------------------------------------------------
function randomToken() {
  const c = 'abcdef0123456789';
  let s = '';
  for (let i=0;i<32;i++) s += c[Math.floor(Math.random()*c.length)];
  return s;
}
function randomSlug() {
  const c = 'abcdefghijkmnpqrstuvwxyz23456789';
  let s = '';
  for (let i=0;i<6;i++) s += c[Math.floor(Math.random()*c.length)];
  return s;
}
function nowStr() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// expose helpers for other files
window.__h = { randomToken, randomSlug, nowStr };

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
