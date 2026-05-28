/* 课件预览·锁屏交互 · S5 2026
 * <button class="cwp-lock__cta" data-cwp-action="enroll">…</button>
 * 点击时：在 iframe 内 → 通过 postMessage 告知顶层 landing 滚到报名区；
 * 直接打开预览 → 弹一个轻量提示。
 */
(function () {
  function go(e) {
    e.preventDefault();
    try {
      if (window.top && window.top !== window) {
        window.top.postMessage({ type: 'cwp:enroll', from: 'cwp-preview' }, '*');
        return;
      }
    } catch (err) { /* cross-origin, ignore */ }
    alert('返回 S5 课程页 · 报名后即可解锁本章节全部互动内容');
  }
  document.addEventListener('click', function (e) {
    const t = e.target.closest('[data-cwp-action="enroll"]');
    if (t) go(e);
  }, true);

  // 锁住向下滚动：用户读到锁屏卡片，会被钩到那儿，不会再越过
  document.addEventListener('DOMContentLoaded', function () {
    const card = document.querySelector('.cwp-lock__card');
    if (!card) return;
    // 让锁屏卡片正好处于视口中央，强调"到此为止"
    setTimeout(() => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add('cwp-lock__card--in');
        });
      }, { threshold: 0.4 });
      io.observe(card);
    }, 50);
  });
})();
