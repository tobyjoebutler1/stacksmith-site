/* Stacksmith — small interactions: the hero's live automation
   demo, FAQ accordion, "See it run" demo toggles, and the
   contact form's thank-you state. */

// Hero: the phone sends a thank-you text, the Google review lands,
// and the auto-reply posts itself — on a loop, with the flow rail
// lighting up in sync. Timings live in data-t (ms); the Messages →
// Google Reviews app switch happens at SWITCH_MS.
(function () {
  var stage = document.getElementById('hero-stage');
  var views = document.getElementById('hero-views');
  if (!stage || !views) return;

  var timed = [].slice.call(stage.querySelectorAll('[data-t]'));
  var typing = stage.querySelector('.ss-typing');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SWITCH_MS = 4400, LOOP_MS = 13200;

  function stateClass(el) {
    return el.closest('#hero-rail') ? 'is-on' : 'is-shown';
  }

  if (reduced) { // no loop: land on the completed story
    timed.forEach(function (el) { el.classList.add(stateClass(el)); });
    views.classList.add('is-review');
    return;
  }

  var timers = [];
  function run() {
    timers.forEach(clearTimeout);
    timers = [];
    timed.forEach(function (el) { el.classList.remove('is-shown', 'is-on'); });
    views.classList.remove('is-review');
    typing.classList.remove('is-shown');
    timed.forEach(function (el) {
      timers.push(setTimeout(function () { el.classList.add(stateClass(el)); },
        +el.getAttribute('data-t')));
    });
    timers.push(setTimeout(function () { typing.classList.add('is-shown'); }, +typing.getAttribute('data-show')));
    timers.push(setTimeout(function () { typing.classList.remove('is-shown'); }, +typing.getAttribute('data-hide')));
    timers.push(setTimeout(function () { views.classList.add('is-review'); }, SWITCH_MS));
    timers.push(setTimeout(run, LOOP_MS));
  }
  run();
})();

// Proof stats count up when they scroll into view.
(function () {
  var els = document.querySelectorAll('[data-count]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      io.unobserve(el);
      var target = +el.getAttribute('data-count');
      var suffix = el.getAttribute('data-suffix') || '';
      var t0 = null;
      function tick(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / 900, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  els.forEach(function (el) { io.observe(el); });
})();

// MacBook screen: scale the fixed 440x290 design canvas to fill
// the photo's measured screen area exactly.
(function () {
  var screenEl = document.querySelector('.ssx-macphoto__screen');
  var frame = document.querySelector('.ssx-macphoto__screen .ob-frame');
  if (!screenEl || !frame) return;
  function fit() {
    var w = screenEl.clientWidth;
    if (w > 0) frame.style.transform = 'scale(' + (w / 440) + ')';
  }
  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
})();

// Services tab showcase (home): pick a system, its panel swaps in
// and the visual's entrance animations replay.
(function () {
  var tablist = document.querySelector('.ss-tabs');
  if (!tablist) return;
  var tabs = [].slice.call(tablist.querySelectorAll('.ss-tab'));

  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.classList.toggle('is-active', on);
      if (on) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { select(t); });
  });
  tablist.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    var n = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
    tabs[n].focus();
    select(tabs[n]);
    e.preventDefault();
  });
})();

// Flow band (home): a pulse travels the pipeline, lighting each
// station as it arrives. Loops while in view; pauses off-screen.
(function () {
  var band = document.getElementById('flow-band');
  if (!band) return;
  var parts = [].slice.call(band.children); // node, line, node, line…
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    parts.forEach(function (p) { p.classList.add('on'); }); // lit, static
    return;
  }

  var STEP_TIMES = [200, 700, 1500, 2000, 2800, 3300, 4100, 4600, 5400];
  var CYCLE_MS = 7600;
  var timers = [], running = false;

  function cycle() {
    band.classList.add('fb-reset');
    parts.forEach(function (p) { p.classList.remove('on'); });
    void band.offsetWidth; // flush so the reset isn't animated
    band.classList.remove('fb-reset');
    parts.forEach(function (p, i) {
      timers.push(setTimeout(function () { p.classList.add('on'); }, STEP_TIMES[i]));
    });
    timers.push(setTimeout(cycle, CYCLE_MS));
  }

  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !running) {
      running = true;
      cycle();
    } else if (!entries[0].isIntersecting && running) {
      running = false;
      timers.forEach(clearTimeout);
      timers = [];
    }
  }, { threshold: 0.35 }).observe(band);
})();

// "See it run" demo toggles (Services)
document.querySelectorAll('.ssdemo-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    var open = btn.classList.toggle('is-open');
    if (panel) panel.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

// FAQ accordion (Home)
document.querySelectorAll('.ss-accordion__item').forEach(function (item) {
  var head = item.querySelector('.ss-accordion__head');
  var panel = item.querySelector('.ss-accordion__panel');
  if (!head || !panel) return;
  if (item.getAttribute('data-open') === 'true') panel.style.height = 'auto';
  head.addEventListener('click', function () {
    var isOpen = item.getAttribute('data-open') === 'true';
    if (isOpen) {
      panel.style.height = panel.scrollHeight + 'px';
      requestAnimationFrame(function () { panel.style.height = '0px'; });
      item.setAttribute('data-open', 'false');
      head.setAttribute('aria-expanded', 'false');
    } else {
      panel.style.height = panel.scrollHeight + 'px';
      panel.addEventListener('transitionend', function done() {
        panel.style.height = 'auto';
        panel.removeEventListener('transitionend', done);
      });
      item.setAttribute('data-open', 'true');
      head.setAttribute('aria-expanded', 'true');
    }
  });
});

// Home CTA form → thank-you state
var homeForm = document.getElementById('home-form');
var homeSent = document.getElementById('home-form-sent');
if (homeForm && homeSent) {
  homeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    homeForm.hidden = true;
    homeSent.hidden = false;
  });
}

// Contact form → thank-you state
var form = document.getElementById('contact-form');
var sentPanel = document.getElementById('form-sent');
if (form && sentPanel) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.style.display = 'none';
    sentPanel.style.display = 'block';
  });
  var again = document.getElementById('send-another');
  if (again) again.addEventListener('click', function () {
    form.reset();
    form.style.display = '';
    sentPanel.style.display = 'none';
  });
}
