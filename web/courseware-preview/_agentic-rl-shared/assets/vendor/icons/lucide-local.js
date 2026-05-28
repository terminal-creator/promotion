(function () {
  const ICONS = {
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    'loader-2': '<path d="M21 12a9 9 0 1 1-6.22-8.56"/>',
    'check-circle-2': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    calculator: '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
    'link-2': '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/>',
    'x-circle': '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
    percent: '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    layers: '<path d="m12.83 2.18 8.5 4.25a.75.75 0 0 1 0 1.34l-8.5 4.25a1.9 1.9 0 0 1-1.66 0l-8.5-4.25a.75.75 0 0 1 0-1.34l8.5-4.25a1.9 1.9 0 0 1 1.66 0Z"/><path d="m22 12-9.17 4.59a1.9 1.9 0 0 1-1.66 0L2 12"/><path d="m22 17-9.17 4.59a1.9 1.9 0 0 1-1.66 0L2 17"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'
  };

  function renderIcon(el) {
    const raw = el.getAttribute('data-icon') || '';
    const name = raw.replace(/^lucide:/, '');
    const body = ICONS[name];
    if (!body) return;

    const width = el.getAttribute('data-width') || el.getAttribute('data-height') || '1em';
    const height = el.getAttribute('data-height') || width;
    const spinClass = name === 'loader-2' ? ' iconify-local-spin' : '';
    el.innerHTML = `<svg class="iconify-local-svg${spinClass}" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  function renderAll(root) {
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.matches && root.matches('.iconify[data-icon]')) renderIcon(root);
    root.querySelectorAll && root.querySelectorAll('.iconify[data-icon]').forEach(renderIcon);
  }

  const style = document.createElement('style');
  style.textContent = '.iconify{display:inline-flex;align-items:center;justify-content:center;line-height:1}.iconify-local-svg{display:block;flex:0 0 auto}@keyframes iconifyLocalSpin{to{transform:rotate(360deg)}}.iconify-local-spin{animation:iconifyLocalSpin 1s linear infinite}';
  document.head.appendChild(style);

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes') {
        renderIcon(mutation.target);
      } else {
        mutation.addedNodes.forEach(renderAll);
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderAll(document));
  } else {
    renderAll(document);
  }
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-icon', 'data-width', 'data-height'] });
})();
