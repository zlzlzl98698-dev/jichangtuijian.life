document.addEventListener('DOMContentLoaded', () => {
  // 1. 优惠码点击自动复制与反馈
  const couponPills = document.querySelectorAll('.coupon-pill, [data-copy-coupon]');
  couponPills.forEach(pill => {
    pill.style.cursor = 'pointer';
    pill.title = '点击复制优惠码';
    pill.addEventListener('click', (e) => {
      const code = pill.getAttribute('data-coupon') || pill.textContent.replace(/.*优惠码[：:\s]*/i, '').trim();
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          const originalText = pill.innerHTML;
          pill.innerHTML = '✅ 已复制优惠码: ' + code;
          setTimeout(() => {
            pill.innerHTML = originalText;
          }, 2500);
        });
      }
    });
  });

  // 2. 本地搜索功能 (Client-side JSON Search)
  const searchModal = document.getElementById('search-modal');
  const searchTrigger = document.getElementById('search-trigger');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  let searchIndex = null;

  async function loadSearchIndex() {
    if (!searchIndex) {
      try {
        const res = await fetch('/index.json');
        searchIndex = await res.json();
      } catch (err) {
        console.error('Failed to load search index:', err);
      }
    }
  }

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('active');
      loadSearchIndex();
      setTimeout(() => searchInput && searchInput.focus(), 50);
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('active');
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
    }
  }

  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // 快捷键支持 (Ctrl + K 或 /)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
      closeSearch();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q || !searchIndex) {
        searchResults.innerHTML = '';
        return;
      }

      const matches = searchIndex.filter(item => {
        return (item.title && item.title.toLowerCase().includes(q)) ||
               (item.summary && item.summary.toLowerCase().includes(q)) ||
               (item.tags && item.tags.some(t => t.toLowerCase().includes(q))) ||
               (item.section && item.section.toLowerCase().includes(q));
      }).slice(0, 10);

      if (matches.length === 0) {
        searchResults.innerHTML = '<div style="color:var(--text-dim);padding:1rem;text-align:center;">未找到与 "' + q + '" 相关的评测或方案</div>';
      } else {
        searchResults.innerHTML = matches.map(item => `
          <a href="${item.permalink}" class="search-item">
            <div class="search-item-title">${item.title}</div>
            <div class="search-item-meta">${item.section || '文章'} · ${item.date || ''}</div>
          </a>
        `).join('');
      }
    });
  }

  // 3. 首页与品牌库实时条件筛选
  const filterButtons = document.querySelectorAll('.filter-btn');
  const brandCards = document.querySelectorAll('.brand-card');

  if (filterButtons.length > 0 && brandCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        brandCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'flex';
          } else if (filter === 'measured') {
            const hasMeasured = card.getAttribute('data-status') === 'measured';
            card.style.display = hasMeasured ? 'flex' : 'none';
          } else if (filter === 'iplc') {
            const isIplc = card.getAttribute('data-line') && card.getAttribute('data-line').includes('专线');
            card.style.display = isIplc ? 'flex' : 'none';
          } else if (filter === 'budget') {
            const price = parseFloat(card.getAttribute('data-price') || '999');
            card.style.display = price <= 15 ? 'flex' : 'none';
          } else if (filter === 'ai') {
            const ai = card.getAttribute('data-ai') === 'true';
            card.style.display = ai ? 'flex' : 'none';
          }
        });
      });
    });
  }
});
