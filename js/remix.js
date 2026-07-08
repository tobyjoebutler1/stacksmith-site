/* Stacksmith remix additions — kept separate from main.js so each
   idea can be cherry-picked. Header scroll state, mobile nav,
   hero word reveal, spotlight cards. */

// Header: subtle shadow once the page scrolls.
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// Mobile nav drawer.
(function () {
  var btn = document.querySelector('.ss-navtoggle');
  var panel = document.getElementById('mobile-nav');
  if (!btn || !panel) return;
  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.classList.toggle('is-open', open);
  }
  btn.addEventListener('click', function () {
    setOpen(btn.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
})();

// Hero headline: words rise in one after another on load.
// Skipped entirely for reduced motion, so the plain headline shows.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var h1 = document.querySelector('.ss-hero__h1');
  if (!h1) return;
  var delay = 0;
  function wrapWords(node) {
    [].slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        var frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var span = document.createElement('span');
          span.className = 'ss-word';
          span.style.setProperty('--wd', delay + 'ms');
          span.textContent = part;
          delay += 55;
          frag.appendChild(span);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        wrapWords(child);
      }
    });
  }
  wrapWords(h1);
})();

// Spotlight cards: highlight follows the cursor.
(function () {
  document.querySelectorAll('.ss-spot').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();

// (Home enquiry form thank-you state is handled in main.js alongside
// the contact form — NOTE: neither form sends anywhere yet; wire them
// to the form backend before launch.)
