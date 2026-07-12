/* ==========================================================
   Contoura Labs — Shared JavaScript v2
   Auto-injects: navbar (always visible), theme toggle, toast,
   and "Back to Home / Back to All Tools/Games" breadcrumb.
   ========================================================== */

(function () {
  'use strict';

  // ===== DETECT PAGE TYPE =====
  const path = window.location.pathname;
  const inToolsDir = /\/tools\//.test(path);
  const inGamesDir = /\/games\//.test(path);
  const inBlogDir = /\/blog\//.test(path);
  const inLegalDir = /\/legal\//.test(path);
  const inSubdir = inToolsDir || inGamesDir || inBlogDir || inLegalDir;
  const prefix = inSubdir ? '../' : '';

  // Determine if this is a hub page (index.html in tools/ or games/)
  // vs an individual tool/game page
  const isHubPage = /index\.html$/.test(path) || path.endsWith('/tools/') || path.endsWith('/games/') || path.endsWith('/blog/') || path.endsWith('/legal/');
  const pageType = inToolsDir ? 'tool' : (inGamesDir ? 'game' : (inBlogDir ? 'blog' : 'home'));
  const isIndividualPage = inSubdir && !isHubPage;

  // ===== 1. AUTO-INJECT NAVBAR (always visible with solid background) =====
  // All links same color; active page highlighted with brand orange + underline
  function injectNavbar() {
    const mount = document.getElementById('navbar-mount');
    if (!mount) return;

    // Determine which nav item is active based on current path
    const isHome = !inSubdir;
    const isTools = inToolsDir;
    const isGames = inGamesDir;
    const isBlog = inBlogDir;

    const activeClass = 'text-brand-orange font-semibold';
    const inactiveClass = 'text-gray-700 dark:text-gray-300 hover:text-brand-orange dark:hover:text-brand-orange font-medium';

    mount.innerHTML = `
      <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 nav-scrolled">
        <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="${prefix}index.html" class="flex items-center gap-2.5 relative z-50">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
              <path d="M 73 28 A 32 32 0 0 0 27 28" stroke="#FF6B35" stroke-width="9" fill="none" stroke-linecap="round"/>
              <path d="M 24 32 A 32 32 0 0 0 24 68" stroke="#E8384F" stroke-width="9" fill="none" stroke-linecap="round"/>
              <path d="M 27 72 A 32 32 0 0 0 73 72" stroke="#00B8A9" stroke-width="9" fill="none" stroke-linecap="round"/>
            </svg>
            <span class="font-bold text-base tracking-tight">Contoura Labs</span>
          </a>
          <div class="hidden md:flex items-center gap-7">
            <a href="${prefix}index.html" class="text-sm transition-colors ${isHome ? activeClass : inactiveClass}" style="${isHome ? 'border-bottom: 2px solid #FF6B35; padding-bottom: 2px;' : ''}">Home</a>
            <a href="${prefix}tools/index.html" class="text-sm transition-colors ${isTools ? activeClass : inactiveClass}" style="${isTools ? 'border-bottom: 2px solid #FF6B35; padding-bottom: 2px;' : ''}">Tools</a>
            <a href="${prefix}games/index.html" class="text-sm transition-colors ${isGames ? activeClass : inactiveClass}" style="${isGames ? 'border-bottom: 2px solid #FF6B35; padding-bottom: 2px;' : ''}">Games</a>
            <a href="${prefix}blog/index.html" class="text-sm transition-colors ${isBlog ? activeClass : inactiveClass}" style="${isBlog ? 'border-bottom: 2px solid #FF6B35; padding-bottom: 2px;' : ''}">Blog</a>
            <a href="${prefix}faq-contact.html" class="btn-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full">Contact</a>
          </div>
          <button id="menu-btn" class="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 transition-colors z-50" aria-label="Open menu">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Backdrop -->
      <div id="menu-backdrop" class="fixed inset-0 bg-black/40 z-40 is-hidden"></div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-surface-dark z-50 shadow-2xl flex flex-col pt-20 px-8" style="transform: translateX(100%); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);">
        <button id="menu-close" class="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10" aria-label="Close menu">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <a href="${prefix}index.html" class="mobile-link text-lg py-3 border-b border-gray-100 dark:border-white/10 ${isHome ? 'text-brand-orange font-semibold' : 'text-gray-800 dark:text-gray-200 font-medium'}">Home</a>
        <a href="${prefix}tools/index.html" class="mobile-link text-lg py-3 border-b border-gray-100 dark:border-white/10 ${isTools ? 'text-brand-orange font-semibold' : 'text-gray-800 dark:text-gray-200 font-medium'}">Tools</a>
        <a href="${prefix}games/index.html" class="mobile-link text-lg py-3 border-b border-gray-100 dark:border-white/10 ${isGames ? 'text-brand-orange font-semibold' : 'text-gray-800 dark:text-gray-200 font-medium'}">Games</a>
        <a href="${prefix}blog/index.html" class="mobile-link text-lg py-3 border-b border-gray-100 dark:border-white/10 ${isBlog ? 'text-brand-orange font-semibold' : 'text-gray-800 dark:text-gray-200 font-medium'}">Blog</a>
        <a href="${prefix}faq-contact.html" class="mobile-link btn-gradient text-white text-center font-semibold px-5 py-3 rounded-full mt-6">Contact</a>
      </div>
    `;

    // Wire up mobile menu
    const menuBtn = document.getElementById('menu-btn');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBackdrop = document.getElementById('menu-backdrop');

    function openMenu() {
      mobileMenu.style.transform = 'translateX(0)';
      menuBackdrop.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileMenu.style.transform = 'translateX(100%)';
      menuBackdrop.classList.add('is-hidden');
      document.body.style.overflow = '';
    }
    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMenu));
  }

  // ===== 2. AUTO-INJECT BACK-NAVIGATION BREADCRUMBS =====
  // On individual tool/game pages, add "Back to Home" + "Back to All Tools/Games"
  // breadcrumb AND a visible "Go to all tools/games" button near the top.
  function injectBackNav() {
    if (!isIndividualPage) return;

    const hubName = pageType === 'tool' ? 'All Tools' : 'All Games';
    const hubNameShort = pageType === 'tool' ? 'All Tools' : 'All Games';
    const hubUrl = pageType === 'tool' ? '../tools/index.html' : '../games/index.html';

    // --- Slim breadcrumb banner (Home › All Tools/Games) ---
    const banner = document.createElement('div');
    banner.className = 'back-nav-banner';
    banner.innerHTML = `
      <div class="back-nav-crumbs">
        <a href="${prefix}index.html" class="back-nav-btn back-nav-home">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6m-6 0v-5a1 1 0 011-1h4a1 1 0 011 1v5"/></svg>
          <span>Home</span>
        </a>
        <span class="back-nav-sep">›</span>
        <a href="${hubUrl}" class="back-nav-btn back-nav-hub">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          <span>${hubNameShort}</span>
        </a>
      </div>
      <a href="${hubUrl}" class="back-nav-cta">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Go to ${hubNameShort}
      </a>
    `;
    document.body.insertBefore(banner, document.body.firstChild);
    document.body.classList.add('has-back-nav');
  }

  // ===== 3. AUTO-INJECT THEME TOGGLE =====
  function injectThemeToggle() {
    if (document.getElementById('theme-toggle-fixed')) return;

    // Init theme from storage BEFORE rendering to avoid flash
    const html = document.documentElement;
    if (localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    }

    const btn = document.createElement('button');
    btn.id = 'theme-toggle-fixed';
    btn.className = 'fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white dark:bg-surface-card border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-lg hover:scale-110 transition-transform';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = `
      <svg class="w-5 h-5 hidden dark:block text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>
      <svg class="w-5 h-5 block dark:hidden text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
    `;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // ===== 4. AUTO-INJECT TOAST =====
  function injectToast() {
    if (document.getElementById('toast')) return;
    const t = document.createElement('div');
    t.id = 'toast';
    t.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium';
    t.innerHTML = `
      <svg class="w-5 h-5 text-brand-teal shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <span id="toast-text">Done!</span>
    `;
    document.body.appendChild(t);
  }

  // ===== 5. NAVBAR SCROLL EFFECT (always visible now, just darkens on scroll) =====
  function wireNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const onScroll = () => {
      if (window.pageYOffset > 30) navbar.classList.add('nav-scrolled');
      else navbar.classList.remove('nav-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ===== 6. REVEAL ON SCROLL =====
  function wireReveal() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  // ===== 7. GLOBAL HELPERS (exposed as window.CL.*) =====
  window.CL = {
    toast(message, success = true) {
      const toast = document.getElementById('toast');
      const text = document.getElementById('toast-text');
      if (!toast || !text) {
        console.log('[toast]', success ? 'OK' : 'ERR', message);
        return;
      }
      text.textContent = message;
      const icon = toast.querySelector('svg');
      if (success) {
        icon.classList.remove('text-brand-red');
        icon.classList.add('text-brand-teal');
      } else {
        icon.classList.remove('text-brand-teal');
        icon.classList.add('text-brand-red');
      }
      toast.classList.add('show');
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
    },
    download(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    formatBytes(bytes) {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  };

  // ===== 8. WIRE CATEGORY CAROUSEL ARROWS =====
  // Generic — any .cat-carousel-wrap with .prev/.next buttons + .cat-carousel-track
  // Auto-disables arrows at scroll edges.
  function wireCategoryCarousels() {
    document.querySelectorAll('.cat-carousel-wrap').forEach(wrap => {
      const track = wrap.querySelector('.cat-carousel-track');
      const prev  = wrap.querySelector('.cat-carousel-btn.prev');
      const next  = wrap.querySelector('.cat-carousel-btn.next');
      if (!track) return;

      const scrollBy = (dir) => {
        // Scroll by ~80% of visible width
        const amt = track.clientWidth * 0.8 * dir;
        track.scrollBy({ left: amt, behavior: 'smooth' });
      };
      if (prev) prev.addEventListener('click', () => scrollBy(-1));
      if (next) next.addEventListener('click', () => scrollBy(1));

      // Edge-state management
      const updateBtns = () => {
        if (!prev || !next) return;
        const maxScroll = track.scrollWidth - track.clientWidth - 2;
        const x = track.scrollLeft;
        prev.disabled = x <= 2;
        next.disabled = x >= maxScroll;
      };
      track.addEventListener('scroll', updateBtns, { passive: true });
      // Run after layout settles
      setTimeout(updateBtns, 50);
      window.addEventListener('resize', updateBtns, { passive: true });
    });
  }

  // ===== 9. WIRE MARQUEE — duplicate track contents for seamless loop =====
  // Any .marquee-track gets its children cloned once so the -50% translate is seamless.
  function wireMarquees() {
    document.querySelectorAll('.marquee-track').forEach(track => {
      // Only clone once
      if (track.dataset.duplicated === '1') return;
      const children = Array.from(track.children);
      children.forEach(child => {
        const clone = child.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
      track.dataset.duplicated = '1';
    });
  }

  // ===== 10. AUTO-INJECT FOOTER (professional, permanent on every page) =====
  function injectFooter() {
    if (document.querySelector('footer.cl-footer')) return;

    const year = new Date().getFullYear();
    const footer = document.createElement('footer');
    footer.className = 'cl-footer';
    footer.style.cssText = 'background:#0a0a0a;color:#9ca3af;padding:3rem 1.5rem 1.5rem;margin-top:auto;';
    footer.innerHTML = `
      <div class="max-w-6xl mx-auto">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2.5rem;margin-bottom:2rem;">
          <!-- Brand -->
          <div>
            <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:1rem;">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <path d="M 73 28 A 32 32 0 0 0 27 28" stroke="#FF6B35" stroke-width="9" fill="none" stroke-linecap="round"/>
                <path d="M 24 32 A 32 32 0 0 0 24 68" stroke="#E8384F" stroke-width="9" fill="none" stroke-linecap="round"/>
                <path d="M 27 72 A 32 32 0 0 0 73 72" stroke="#00B8A9" stroke-width="9" fill="none" stroke-linecap="round"/>
              </svg>
              <span style="font-weight:700;font-size:1.1rem;color:#fff;">Contoura Labs</span>
            </div>
            <p style="font-size:0.8rem;line-height:1.6;max-width:18rem;">We build digital experiences that matter. Free tools, games, and professional web services. All running 100% in your browser.</p>
            <div style="display:flex;gap:0.75rem;margin-top:1rem;">
              <a href="https://www.instagram.com/contouralabs/" target="_blank" rel="noopener" style="width:36px;height:36px;border-radius:0.5rem;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;color:#9ca3af;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,107,53,0.2)';this.style.color='#FF6B35';" onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.color='#9ca3af';">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61581292773749" target="_blank" rel="noopener" style="width:36px;height:36px;border-radius:0.5rem;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;color:#9ca3af;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,107,53,0.2)';this.style.color='#FF6B35';" onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.color='#9ca3af';">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="mailto:contouralabs@gmail.com" style="width:36px;height:36px;border-radius:0.5rem;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;color:#9ca3af;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,107,53,0.2)';this.style.color='#FF6B35';" onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.color='#9ca3af';">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>
          <!-- Explore -->
          <div>
            <h4 style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#fff;margin-bottom:0.85rem;">Explore</h4>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.5rem;">
              <li><a href="${prefix}index.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">Home</a></li>
              <li><a href="${prefix}tools/index.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">Tools</a></li>
              <li><a href="${prefix}games/index.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#00B8A9'" onmouseout="this.style.color='#9ca3af'">Games</a></li>
              <li><a href="${prefix}blog/index.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">Blog</a></li>
              <li><a href="${prefix}faq-contact.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">FAQ and Contact</a></li>
            </ul>
          </div>
          <!-- Legal -->
          <div>
            <h4 style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#fff;margin-bottom:0.85rem;">Legal</h4>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.5rem;">
              <li><a href="${prefix}legal/privacy-policy.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">Privacy Policy</a></li>
              <li><a href="${prefix}legal/terms-of-service.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">Terms of Service</a></li>
              <li><a href="${prefix}legal/cookie-policy.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">Cookie Policy</a></li>
              <li><a href="${prefix}legal/security.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">Security</a></li>
            </ul>
          </div>
          <!-- Company -->
          <div>
            <h4 style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#fff;margin-bottom:0.85rem;">Company</h4>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.5rem;">
              <li><a href="${prefix}index.html#about" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">About Us</a></li>
              <li><a href="${prefix}index.html#services" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">Services</a></li>
              <li><a href="${prefix}faq-contact.html" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">Contact</a></li>
              <li><a href="mailto:contouralabs@gmail.com" style="font-size:0.8rem;color:#9ca3af;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#FF6B35'" onmouseout="this.style.color='#9ca3af'">contouralabs@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:1.25rem;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:0.5rem;">
          <p style="font-size:0.75rem;color:#6b7280;">${year} Contoura Labs. All rights reserved. Built with passion.</p>
        </div>
      </div>
    `;
    document.body.appendChild(footer);
  }

  // ===== 10b. SHOW GAME RESULT MODAL =====
  // Shared result dialog for all games.
  // Usage: CL.showGameResult({ emoji, title, message, onPlayAgain })
  // The "Return to All Games" button always links to the games hub.
  window.CL.showGameResult = function (opts) {
    // Remove any existing result modal
    const existing = document.getElementById('cl-game-result-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'cl-game-result-modal';
    modal.className = 'cl-game-result';
    modal.innerHTML = `
      <div class="cl-game-result-card">
        <div class="cl-game-result-emoji">${opts.emoji || '🎮'}</div>
        <h2 class="cl-game-result-title">${opts.title || 'Game Over'}</h2>
        <p class="cl-game-result-message">${opts.message || ''}</p>
        <div class="cl-game-result-buttons">
          <button class="cl-game-result-btn cl-game-result-btn-play" id="cl-gr-play">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z"/></svg>
            Play Again
          </button>
          <a class="cl-game-result-btn cl-game-result-btn-return" href="${prefix}games/index.html">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Return to All Games
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Trigger animation
    requestAnimationFrame(() => modal.classList.add('visible'));

    // Wire Play Again
    document.getElementById('cl-gr-play').addEventListener('click', () => {
      modal.classList.remove('visible');
      setTimeout(() => modal.remove(), 300);
      if (typeof opts.onPlayAgain === 'function') opts.onPlayAgain();
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('visible');
        setTimeout(() => modal.remove(), 300);
      }
    });
  };

  // ===== 11. INIT ON DOM READY =====
  function init() {
    injectBackNav();
    injectNavbar();
    injectThemeToggle();
    injectToast();
    wireNavbarScroll();
    wireReveal();
    wireCategoryCarousels();
    wireMarquees();
    injectFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
