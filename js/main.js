/* ==========================================================================
   HyperThink Systems — homepage behaviour (prototype only)
   No libraries. Every block below names the native Elementor feature that
   replaces it in the WordPress build; none of this file ships to production.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('ht-js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktopMq = window.matchMedia('(min-width: 1200px)');

  /* ------------------------------------------------------------------------
     Announcement dismiss
     Elementor: Popup (Pro) → Layout "Top bar" + close button,
     Advanced Rules → "Show up to 1 time per session".
     ------------------------------------------------------------------------ */
  var announce = document.querySelector('[data-ht-dismissible]');
  if (announce) {
    if (sessionStorage.getItem('ht-announce-closed')) announce.hidden = true;
    announce.querySelector('.ht-announce__close').addEventListener('click', function () {
      announce.hidden = true;
      sessionStorage.setItem('ht-announce-closed', '1');
      var logo = document.querySelector('.ht-header__logo');
      if (logo) logo.focus();
    });
  }

  /* ------------------------------------------------------------------------
     Sticky header shrink
     Elementor: Header container → Advanced → Motion Effects → Sticky: Top,
     Effects Offset 100. Elementor adds .elementor-sticky--effects past the
     offset; elementor-custom.css targets that class.
     ------------------------------------------------------------------------ */
  var header = document.querySelector('[data-ht-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-shrunk', window.scrollY > 100); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------------
     Mega menu — hover on desktop, toggle button for touch and keyboard,
     Escape closes and returns focus.
     Elementor: Menu widget (Pro, v3.16+) → Content Type "Dropdown",
     Open on "Hover" (desktop) / "Click" (tablet).
     ------------------------------------------------------------------------ */
  function setPanel(item, open) {
    var toggle = item.querySelector('.ht-nav__toggle');
    var panel = item.querySelector('.ht-mega');
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
  }

  function closeAll(scope, except) {
    scope.querySelectorAll('.ht-nav__item--has-panel').forEach(function (item) {
      if (item !== except) setPanel(item, false);
    });
  }

  function wireMenu(scope, isDrawer) {
    scope.querySelectorAll('.ht-nav__item--has-panel').forEach(function (item) {
      var toggle = item.querySelector('.ht-nav__toggle');
      var hoverTimer;

      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') !== 'true';
        if (!isDrawer) closeAll(scope, item);
        setPanel(item, open);
      });

      if (isDrawer) return;

      item.addEventListener('mouseenter', function () {
        if (!desktopMq.matches) return;
        clearTimeout(hoverTimer);
        closeAll(scope, item);
        setPanel(item, true);
      });
      item.addEventListener('mouseleave', function () {
        if (!desktopMq.matches) return;
        hoverTimer = setTimeout(function () { setPanel(item, false); }, 150);
      });
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) setPanel(item, false);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          setPanel(item, false);
          toggle.focus();
        }
      });
    });
  }

  var nav = document.querySelector('.ht-nav');
  if (nav) wireMenu(nav, false);

  /* ------------------------------------------------------------------------
     Mobile drawer — full screen, accordion sections, Contact Us pinned.
     Elementor: Nav Menu / Menu widget → Mobile Dropdown "Full width",
     Toggle Button "Hamburger", Submenu indicator → accordion.
     ------------------------------------------------------------------------ */
  var burger = document.querySelector('.ht-header__burger');
  var drawer = document.getElementById('ht-drawer');
  var drawerMenu = document.querySelector('[data-ht-drawer-menu]');

  if (burger && drawer && drawerMenu && nav) {
    var clone = nav.querySelector('.ht-nav__list').cloneNode(true);
    clone.querySelectorAll('[id]').forEach(function (el) { el.id = 'm-' + el.id; });
    clone.querySelectorAll('[aria-controls]').forEach(function (el) {
      el.setAttribute('aria-controls', 'm-' + el.getAttribute('aria-controls'));
    });
    var drawerNav = document.createElement('nav');
    drawerNav.setAttribute('aria-label', 'Main');
    drawerNav.appendChild(clone);
    drawerMenu.appendChild(drawerNav);
    wireMenu(drawerNav, true);

    var setDrawer = function (open) {
      if (open) drawer.style.top = header.querySelector('.ht-header__inner').getBoundingClientRect().bottom + 'px';
      drawer.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.querySelector('.ht-sr-only').textContent = open ? 'Close menu' : 'Open menu';
      document.body.classList.toggle('ht-lock', open);
      if (open) {
        var first = drawer.querySelector('a, button');
        if (first) first.focus();
      }
    };

    burger.addEventListener('click', function () {
      setDrawer(burger.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) { setDrawer(false); burger.focus(); }
    });

    desktopMq.addEventListener('change', function (e) { if (e.matches) setDrawer(false); });
  }

  /* ------------------------------------------------------------------------
     Tabs (≥768px) / accordion (<768px), state kept in sync.
     Elementor: Tabs widget — renders desktop titles plus per-panel mobile
     titles and switches to accordion at the mobile breakpoint by itself.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-ht-tabs]').forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var mobileTitles = Array.prototype.slice.call(root.querySelectorAll('.ht-tabs__mobile-title'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

    function select(index, focus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        mobileTitles[i].setAttribute('aria-expanded', on ? 'true' : 'false');
        panels[i].hidden = !on;
      });
      if (focus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });

    mobileTitles.forEach(function (title, i) {
      title.addEventListener('click', function () {
        if (title.getAttribute('aria-expanded') === 'true') {
          title.setAttribute('aria-expanded', 'false');
          panels[i].hidden = true;
        } else {
          select(i, false);
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     Logo marquee — one logo per step every 3s, infinite, pauses on hover/focus.
     Elementor: Image Carousel → Autoplay 3000ms, Infinite Loop yes,
     Pause on Hover yes, Navigation none, Transition Duration 400ms.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-ht-marquee]').forEach(function (marquee) {
    if (reduceMotion) { marquee.style.overflowX = 'auto'; return; }
    var track = marquee.querySelector('.ht-marquee__track');
    var paused = false;

    ['mouseenter', 'focusin'].forEach(function (ev) { marquee.addEventListener(ev, function () { paused = true; }); });
    ['mouseleave', 'focusout'].forEach(function (ev) { marquee.addEventListener(ev, function () { paused = false; }); });

    setInterval(function () {
      if (paused || document.hidden) return;
      var first = track.firstElementChild;
      var step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
      track.classList.add('is-stepping');
      track.style.transform = 'translateX(' + (-step) + 'px)';
      track.addEventListener('transitionend', function done() {
        track.removeEventListener('transitionend', done);
        track.classList.remove('is-stepping');
        track.appendChild(first);
        track.style.transform = '';
      });
    }, 3000);
  });

  /* ------------------------------------------------------------------------
     Chip row — edge fades show there is more to scroll on mobile.
     Elementor: Container (Direction row, Wrap "No wrap", Overflow auto)
     plus the .ht-chips mask rules in elementor-custom.css.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('[data-ht-chip-scroll]').forEach(function (row) {
    function update() {
      var max = row.scrollWidth - row.clientWidth;
      row.classList.toggle('has-more-start', row.scrollLeft > 4);
      row.classList.toggle('has-more-end', row.scrollLeft < max - 4);
    }
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ------------------------------------------------------------------------
     Hero parallax — art and cards drift in opposite directions with the pointer.
     Elementor: art HTML widget → Motion Effects → Mouse Track "Opposite",
     speed 1; card HTML widget → Mouse Track "Direct", speed 2. Desktop only.
     ------------------------------------------------------------------------ */
  var stage = document.querySelector('[data-ht-parallax]');
  if (stage && !reduceMotion && window.matchMedia('(hover: hover) and (min-width: 1025px)').matches) {
    var hero = stage.closest('.ht-hero');
    var layers = stage.querySelectorAll('[data-ht-depth]');
    var pointer = { x: 0, y: 0 };
    var frame = null;
    var apply = function () {
      frame = null;
      layers.forEach(function (layer) {
        var depth = parseFloat(layer.getAttribute('data-ht-depth'));
        layer.style.transform = 'translate3d(' + (pointer.x * depth) + 'px,' + (pointer.y * depth) + 'px,0)';
      });
    };
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(apply);
    });
    hero.addEventListener('pointerleave', function () {
      layers.forEach(function (layer) { layer.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------------------------
     Entrance animation (Fade In Up, once) + counters.
     Elementor: Advanced → Motion Effects → Entrance Animation "Fade In Up",
     Animation Delay 0/100/200ms within a row; Counter widget, 2000ms.
     Hero is deliberately excluded so the H1 (the LCP element) paints at once.
     ------------------------------------------------------------------------ */
  var animTargets = document.querySelectorAll(
    'main > section:not(.ht-hero) .ht-section-head, ' +
    'main > section:not(.ht-hero) .ht-grid > li, ' +
    '.ht-aibox__copy > *, .ht-aibox__media, .ht-diff .ht-h2, .ht-diff .ht-eyebrow, ' +
    '.ht-tabs, .ht-stat, .ht-cta__inner > *, .ht-proof-logos .ht-h2-small'
  );

  function counter(el) {
    var target = parseInt(el.getAttribute('data-ht-counter'), 10);
    if (reduceMotion || !target) { el.textContent = target; return; }
    var start = null;
    el.textContent = '0';
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 2000, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-ht-counter]').forEach(function (el) { el.textContent = el.getAttribute('data-ht-counter'); });
    return;
  }

  animTargets.forEach(function (el) {
    el.classList.add('ht-anim');
    var prev = el.previousElementSibling;
    var steps = 0;
    while (prev && steps < 4) {
      if (Math.abs(prev.offsetTop - el.offsetTop) > 4) break;
      steps++;
      prev = prev.previousElementSibling;
    }
    if (el.parentElement && el.parentElement.classList.contains('ht-aibox__copy')) {
      steps = Array.prototype.indexOf.call(el.parentElement.children, el);
    }
    el.style.transitionDelay = Math.min(steps, 4) * 100 + 'ms';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      entry.target.querySelectorAll('[data-ht-counter]').forEach(counter);
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  animTargets.forEach(function (el) { io.observe(el); });
})();
