/**
 * collapse-cta.js · 课件预览折叠交互
 *
 * 用法：每套样式 </body> 之前引入
 *   <script src="/collapse-cta.js"></script>
 *
 * 功能：
 *   · 默认收起所有 .wb-player
 *   · 清空 iframe.src，首次展开时才真正加载（节省网络）
 *   · 在 .pbar 末尾注入 .toggle 按钮（CSS 控制视觉）
 *   · 点击 toggle / 点击 pbar 空白处 都能展开
 *
 * 必须在 DOM 渲染完成后跑。如果你的 DOM 是 render.js 异步生成的，
 * 在 render.js 末尾自己再调用一次 window.CWP_COLLAPSE_INIT() 即可。
 */
(function () {
  'use strict';

  function init() {
    const players = document.querySelectorAll('.wb-player:not([data-cwp-collapse-bound])');
    players.forEach(function (p, idx) {
      // 标记，避免重复绑定
      p.setAttribute('data-cwp-collapse-bound', '1');

      // 默认收起
      if (!p.hasAttribute('data-collapsed')) {
        p.setAttribute('data-collapsed', 'true');
      }

      // 把 iframe.src 暂存到 data-src（折叠态不消耗网络）
      const iframe = p.querySelector('iframe');
      if (iframe && iframe.getAttribute('src')) {
        iframe.setAttribute('data-src', iframe.getAttribute('src'));
        iframe.removeAttribute('src');
      }

      // 在 pbar 末尾插入 toggle 按钮
      const pbar = p.querySelector('.pbar');
      if (!pbar) return;
      if (pbar.querySelector('.toggle')) return; // 已有按钮就不再加

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'toggle';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'cwp-frame-' + idx);
      btn.innerHTML = '<span class="chev"></span><span class="label"></span><span class="arrow"></span>';
      pbar.appendChild(btn);

      const frameWrap = p.querySelector('.frame-wrap');
      if (frameWrap && !frameWrap.id) frameWrap.id = 'cwp-frame-' + idx;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const collapsed = p.getAttribute('data-collapsed') === 'true';
        const next = !collapsed;
        p.setAttribute('data-collapsed', String(next));
        btn.setAttribute('aria-expanded', String(!next));
        // 首次展开时再灌入 src
        if (!next && iframe && !iframe.getAttribute('src')) {
          const ds = iframe.getAttribute('data-src');
          if (ds) iframe.setAttribute('src', ds);
        }
      });

      // 点 pbar 空白处也能展开（除 openlk / toggle 自己）
      pbar.addEventListener('click', function (e) {
        if (e.target.closest('.openlk') || e.target.closest('.toggle')) return;
        btn.click();
      });
      pbar.style.cursor = 'pointer';

      // placeholder fade-on-load（兼容某些样式有占位图）
      const ph = p.querySelector('.placeholder');
      if (iframe && ph) {
        ph.style.display = 'flex';
        iframe.addEventListener('load', function () {
          try { ph.style.display = 'none'; } catch (_) {}
        });
      }
    });
  }

  // 暴露给 render.js 异步调用
  window.CWP_COLLAPSE_INIT = init;

  // DOM 就绪后自动跑一次（同步 render.js 的场景）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 监听 DOM 增删，应对 render.js 在 init 之后才生成 wb-player 的情况
  if (window.MutationObserver) {
    const mo = new MutationObserver(function () {
      // 简单 debounce
      clearTimeout(mo._t);
      mo._t = setTimeout(init, 80);
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }
})();
