// admin-result.jsx — screen 3: generated link + QR + token
const { useState: useStateR, useMemo: useMemoR, useRef: useRefR } = React;

function ResultScreen({ gen, styleObj, onReset, onManage, showToast }) {
  const [copiedUrl, setCopiedUrl] = useStateR(false);
  const [copiedTok, setCopiedTok] = useStateR(false);
  const [tokVisible, setTokVisible] = useStateR(false);

  const copy = (text, kind) => {
    navigator.clipboard?.writeText(text);
    if (kind === 'url') { setCopiedUrl(true); setTimeout(() => setCopiedUrl(false), 1800); }
    if (kind === 'tok') { setCopiedTok(true); setTimeout(() => setCopiedTok(false), 1800); }
    showToast(kind === 'url' ? '链接已复制' : '凭证已复制');
  };

  // generate deterministic QR-like pattern from slug
  const qrSvg = useMemoR(() => buildQrSvg(gen.url, 33), [gen.url]);

  return (
    <div className="result">
      <div>
        <div className="success tick">
          <span className="t1"></span><span className="t2"></span>
          <div className="badge">
            <span>●</span>
            <span>Channel created · ID #{gen.slug}</span>
          </div>
          <h1>你的<span style={{color:'var(--acc)'}}>专属链接</span>已生成。</h1>
          <div className="lead">
            把下面的链接（或二维码）发给学员。所有"加微信"、"扫码咨询"按钮都会指向<b style={{color:'var(--ink-2)'}}>你刚才上传的那张二维码</b>和<b style={{color:'var(--ink-2)'}}>{gen.wechat || '你的微信号'}</b>。
            旁边那串凭证是你之后修改 / 删除这条链接的唯一钥匙——丢了无法找回，请立刻复制保存。
          </div>

          <div className="url-box">
            <div className="lbl">学员链接</div>
            <div className="url">
              <span className="domain">{location.host}/c/</span><span className="path">{gen.slug}</span>
            </div>
            <button className={`copy ${copiedUrl ? 'copied' : ''}`} onClick={() => copy(gen.url, 'url')}>
              {copiedUrl ? '✓ 已复制' : '复制'}
            </button>
          </div>

          <div className="url-box token">
            <div className="lbl">编辑凭证</div>
            <div className="url" style={{filter: tokVisible ? 'none' : 'blur(4px)'}}>{gen.token}</div>
            <button className="copy" onClick={() => setTokVisible(v => !v)}>
              {tokVisible ? '隐藏' : '显示'}
            </button>
            <button className={`copy ${copiedTok ? 'copied' : ''}`} onClick={() => copy(gen.token, 'tok')}>
              {copiedTok ? '✓ 已复制' : '复制'}
            </button>
          </div>

          <div className="warn-box" style={{marginTop:18}}>
            <div className="ico">!</div>
            <div className="tx">
              <b>这串凭证只显示这一次。</b> 系统不会用任何方式再展示给你（包括"忘记凭证"功能）。建议立即复制到你的备忘录 / 1Password。
              丢失后只能让运营把整条记录删掉重建。
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0, marginTop:28, border:'1px solid var(--line)'}}>
            <KV k="样式" v={`${styleObj?.n} · ${styleObj?.name}`} acc/>
            <KV k="显示名" v={gen.name || '—'} />
            <KV k="微信号" v={gen.wechat || '—'} mono last/>
          </div>

          <div style={{display:'flex', gap:10, marginTop:32, flexWrap:'wrap'}}>
            <a className="btn primary" href={`/c/${gen.slug}`} target="_blank" rel="noopener">
              在新标签打开学员视角
              <span className="arr">↗</span>
            </a>
            <button className="btn" onClick={onManage}>管理我的链接</button>
            <button className="btn ghost" onClick={onReset}>再创建一个 +</button>
          </div>

          <div className="divider"></div>

          <div style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:14, alignItems:'flex-start'}}>
            <div style={{
              fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)',
              letterSpacing:'0.16em', textTransform:'uppercase', writingMode:'vertical-rl',
              transform:'rotate(180deg)', padding:'8px 0',
            }}>
              下一步建议
            </div>
            <div style={{display:'grid', gap:10}}>
              <NextStep n="01" t="发到群里前先扫一遍" d={'用自己的手机扫上面的二维码，确认"加微信"按钮跳出的是你的微信资料。'} />
              <NextStep n="02" t="发链接配一句话" d='例如："S5 大模型冲刺营 5 月报名通道，看完页面有问题直接加我 → [链接]"。' />
              <NextStep n="03" t="把凭证存进你的密码管理器" d="日后改 QR、改微信号、看访问数据都靠这串字符。" />
            </div>
          </div>
        </div>
      </div>

      <div className="qr-side">
        <div className="qr-card tick">
          <span className="t1"></span><span className="t2"></span>
          <div className="qr" dangerouslySetInnerHTML={{__html: qrSvg}} />
          <div className="qr-meta">
            <b>学员扫码进入</b><br/>
            <span style={{color:'var(--ink-3)'}}>{location.host}/c/{gen.slug}</span>
          </div>
          <button className="btn sm" style={{marginTop:14, width:'100%', justifyContent:'center'}}>
            下载 PNG · 480 × 480
          </button>
        </div>

        <div style={{
          border:'1px solid var(--line)', background:'var(--panel)', padding:'18px',
        }}>
          <div style={{fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:14}}>
            投放后的可观测项
          </div>
          <Stat k="累计访问" v="0" tail="次" />
          <Stat k="扫码加微信" v="0" tail="人 · 需自填" />
          <Stat k="渠道分享" v="0" tail="二跳" />
          <div style={{marginTop:14, fontFamily:'var(--mono)', fontSize:10.5, color:'var(--ink-3)', lineHeight:1.6}}>
            数据每 5 分钟刷新一次，可在「管理已有」里随时查看。
          </div>
        </div>
      </div>
    </div>
  );
}

function KV({ k, v, acc, mono, last }) {
  return (
    <div style={{
      padding:'14px 16px', borderRight: last ? 0 : '1px solid var(--line)',
      background:'var(--panel)',
    }}>
      <div style={{fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)', letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:6}}>{k}</div>
      <div style={{
        fontSize:14, fontFamily: mono ? 'var(--mono)' : 'inherit',
        color: acc ? 'var(--acc)' : 'var(--ink)', fontWeight: acc ? 600 : 500,
        wordBreak:'break-all',
      }}>{v}</div>
    </div>
  );
}

function Stat({ k, v, tail }) {
  return (
    <div style={{
      display:'flex', justifyContent:'space-between', alignItems:'baseline',
      padding:'8px 0', borderBottom:'1px dashed var(--line-2)',
    }}>
      <span style={{fontFamily:'var(--mono)', fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase'}}>{k}</span>
      <span>
        <span style={{fontFamily:'var(--mono)', fontSize:20, color:'var(--ink)', fontWeight:600}}>{v}</span>
        <span style={{fontFamily:'var(--mono)', fontSize:10, color:'var(--ink-3)', marginLeft:6}}>{tail}</span>
      </span>
    </div>
  );
}

function NextStep({ n, t, d }) {
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'30px 1fr', gap:14, alignItems:'flex-start',
      padding:'10px 0', borderBottom:'1px dashed var(--line-2)',
    }}>
      <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--acc)', fontWeight:700, paddingTop:2}}>{n}</div>
      <div>
        <div style={{fontSize:14, color:'var(--ink)', fontWeight:600, marginBottom:3}}>{t}</div>
        <div style={{fontFamily:'var(--mono)', fontSize:11, color:'var(--ink-3)', lineHeight:1.6}}>{d}</div>
      </div>
    </div>
  );
}

// ---------- pseudo-QR svg (visual mock, not scannable) ----------
function hashStr(s) {
  let h = 2166136261;
  for (let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function buildQrSvg(seed, n=33) {
  let h = hashStr(seed);
  const next = () => { h = (h * 1664525 + 1013904223) >>> 0; return h; };
  const cells = [];
  for (let y=0;y<n;y++) {
    const row = [];
    for (let x=0;x<n;x++) {
      row.push((next() & 0xff) > 128 ? 1 : 0);
    }
    cells.push(row);
  }
  // clear & stamp three position-detection patterns (corners)
  const stamp = (cx, cy) => {
    for (let dy=0; dy<7; dy++) for (let dx=0; dx<7; dx++) {
      const onRing = dy===0||dy===6||dx===0||dx===6;
      const inner = dy>=2 && dy<=4 && dx>=2 && dx<=4;
      cells[cy+dy][cx+dx] = onRing || inner ? 1 : 0;
    }
    // clear 1px around
    for (let dy=-1; dy<=7; dy++) for (let dx=-1; dx<=7; dx++) {
      const yy = cy+dy, xx = cx+dx;
      if (yy<0||xx<0||yy>=n||xx>=n) continue;
      const inFinder = dy>=0 && dy<7 && dx>=0 && dx<7;
      if (!inFinder && (dy===-1 || dy===7 || dx===-1 || dx===7)) cells[yy][xx] = 0;
    }
  };
  stamp(0,0); stamp(n-7,0); stamp(0,n-7);
  // alignment block (small)
  for (let dy=0; dy<5; dy++) for (let dx=0; dx<5; dx++) {
    const onRing = dy===0||dy===4||dx===0||dx===4;
    const center = dy===2 && dx===2;
    cells[n-9+dy][n-9+dx] = onRing||center ? 1 : 0;
  }
  // timing rows
  for (let i=8;i<n-8;i++){ cells[6][i] = i%2===0?1:0; cells[i][6] = i%2===0?1:0; }

  const cell = 220 / n;
  let rects = '';
  for (let y=0;y<n;y++) for (let x=0;x<n;x++) {
    if (cells[y][x]) {
      rects += `<rect x="${(10 + x*cell).toFixed(2)}" y="${(10 + y*cell).toFixed(2)}" width="${cell.toFixed(2)}" height="${cell.toFixed(2)}" fill="#0A0B0E"/>`;
    }
  }
  return `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg"><rect width="240" height="240" fill="#fff"/>${rects}</svg>`;
}

window.ResultScreen = ResultScreen;
