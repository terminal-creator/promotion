/**
 * channel-loader.js · 渠道数据注入器
 *
 * 作用：
 *   1. 学员从 /c/<slug> 进来 → fetch /api/channels/:slug → 注入 [data-cwp-bind] 元素
 *   2. 学员从 /styles/<id>/?slug=<slug> 进来（来自路由壳跳转）→ 同上
 *   3. 直接访问首页 / 预览页 → 用默认占位数据
 *   4. admin 表单页用 postMessage 推送预览数据 → 实时刷新所有绑定元素
 *
 * 用法（每套样式 HTML 尾部引入）：
 *   <script src="/s5-content.js"></script>
 *   <script src="/styles/<id>/render.js"></script>
 *   <script>document.getElementById('root').innerHTML = renderStyle(window.S5_CONTENT);</script>
 *   <script src="/channel-loader.js"></script>     ← 必须放最后
 *
 * DOM 标记约定（render.js 输出的 HTML 里必须按下表写）：
 *   data-cwp-bind="wechat"      → 替换文本为 channel.wechat_id
 *   data-cwp-bind="name"        → 替换文本为 channel.display_name
 *   data-cwp-bind="qr"          → 替换 <img> 的 src 为 channel.qr_image_url
 *   data-cwp-bind="note"        → 替换文本为 channel.custom_note
 *   data-cwp-bind="qr-link"     → 替换 <a> 的 href 为 channel.qr_image_url（可选 · 用于"点击放大"）
 */
(function () {
  'use strict';

  const FALLBACK = {
    display_name: '老师',
    wechat_id:    'S5_LLM_2026',
    qr_image_url: '/static/qr-placeholder.svg',
    custom_note:  '',
    style_version: 'main',
  };

  /* --------------------------------------------------------------
     工具：从 URL 拿 slug
     -------------------------------------------------------------- */
  function detectSlug() {
    // 优先匹配 /c/<slug>
    const m1 = location.pathname.match(/^\/c\/([\w-]+)/);
    if (m1) return m1[1];
    // 次：query ?slug=...（壳页跳到 /styles/<id>/?slug=xxx 时）
    const sp = new URLSearchParams(location.search);
    const q = sp.get('slug');
    if (q) return q;
    // 没有 slug = demo / 预览模式
    return null;
  }

  /* --------------------------------------------------------------
     工具：把渠道数据 apply 到所有 [data-cwp-bind] 元素
     -------------------------------------------------------------- */
  function applyChannel(ch) {
    // 完整字段兜底
    const data = Object.assign({}, FALLBACK, ch || {});

    document.querySelectorAll('[data-cwp-bind]').forEach((el) => {
      const key = el.dataset.cwpBind;
      switch (key) {
        case 'wechat':
          el.textContent = data.wechat_id;
          break;
        case 'name':
          el.textContent = data.display_name;
          break;
        case 'qr':
          // 仅对 <img>。其他元素当 src URL 不替换（避免误伤）
          if (el.tagName === 'IMG') {
            el.src = data.qr_image_url;
            el.alt = `${data.display_name} 的咨询二维码`;
          } else {
            // 非 img 元素允许用 background-image 模式
            el.style.backgroundImage = `url("${data.qr_image_url}")`;
          }
          break;
        case 'qr-link':
          if (el.tagName === 'A') el.href = data.qr_image_url;
          break;
        case 'note':
          if (data.custom_note) {
            el.textContent = data.custom_note;
            el.style.display = '';
          } else {
            el.style.display = 'none';
          }
          break;
        default:
          // 未知 key：忽略但 console.warn 提示样式作者
          if (window.__CWP_DEBUG) console.warn('[cwp] unknown bind key:', key, el);
      }
    });

    // 暴露当前数据给外部用
    window.__CHANNEL = data;

    // 自定义事件 · 样式 render.js 可以挂监听做后续动作
    document.dispatchEvent(new CustomEvent('cwp:channel-applied', { detail: data }));
  }

  /* --------------------------------------------------------------
     工具：postMessage 预览模式
     接受 admin 表单页推过来的 {wechat, name, qrDataUrl, note} 字段
     -------------------------------------------------------------- */
  function setupPreviewListener() {
    window.addEventListener('message', (ev) => {
      const d = ev && ev.data;
      if (!d || typeof d !== 'object') return;
      if (d.type !== 'cwp:preview') return;
      const p = d.data || {};
      applyChannel({
        display_name: p.name || FALLBACK.display_name,
        wechat_id:    p.wechat || FALLBACK.wechat_id,
        qr_image_url: p.qrDataUrl || FALLBACK.qr_image_url,
        custom_note:  p.note || '',
      });
    });
  }

  /* --------------------------------------------------------------
     主流程
     -------------------------------------------------------------- */
  async function load() {
    const slug = detectSlug();

    // 注册预览监听（不论有无 slug 都注册，admin 预览时按需用）
    setupPreviewListener();

    if (!slug) {
      // 直访预览模式 · 用默认数据 + 不报错
      applyChannel(FALLBACK);
      return;
    }

    // 拉远程数据
    try {
      const res = await fetch(`/api/channels/${encodeURIComponent(slug)}`, {
        headers: { Accept: 'application/json' },
        credentials: 'omit',
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const ch = await res.json();
      applyChannel(ch);
    } catch (err) {
      console.warn('[cwp] 渠道数据加载失败，使用默认值:', err && err.message);
      applyChannel(FALLBACK);
    }
  }

  /* --------------------------------------------------------------
     启动时机：DOM 渲染完成后再绑（render.js 应该是同步执行）
     -------------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }

  /* --------------------------------------------------------------
     全局 API · 给路由壳页或 admin 用
     -------------------------------------------------------------- */
  window.CWP = {
    apply: applyChannel,
    detectSlug,
    FALLBACK,
    /**
     * 让 admin 表单页用：推送预览数据到样式 iframe
     * @param {HTMLIFrameElement} iframeEl
     * @param {Object} data { name, wechat, qrDataUrl, note }
     */
    pushPreview(iframeEl, data) {
      if (!iframeEl || !iframeEl.contentWindow) return;
      try {
        iframeEl.contentWindow.postMessage({ type: 'cwp:preview', data }, '*');
      } catch (e) { /* cross origin · ignore */ }
    },
  };
})();
