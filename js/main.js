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

  // Hold the opening scene until the showcase is actually on screen,
  // so its one-shot animation doesn't play unseen at page load.
  var wrap = document.querySelector('.ss-showwrap');
  if (wrap && 'IntersectionObserver' in window) {
    wrap.classList.add('ss-wait');
    var gate = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        wrap.classList.remove('ss-wait');
        gate.disconnect();
      }
    }, { threshold: 0.2 });
    gate.observe(wrap);
  }

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

// Showcase demos (home): the panel animations are one-shot CSS with
// fixed delays, which would start at page load — long before anyone
// scrolls down. site.css holds them paused until #services gets
// .is-seen; we add it the first time a demo visual enters the viewport.
(function () {
  var section = document.getElementById('services');
  var visual = section && section.querySelector('.ssx');
  if (!section || !visual) return;
  if (!('IntersectionObserver' in window)) {
    section.classList.add('is-seen');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    section.classList.add('is-seen');
    io.disconnect();
  }, { threshold: 0.3 });
  io.observe(visual);
})();

// Onboarding story deck (how-we-work): five scenes loop continuously
// while the deck is in view — the outgoing scene lifts away, the next
// one rises in, and a light beam sweeps the stage between them.
// Scene-internal builds are CSS transitions/keyframes gated by .is-on
// (--d / --nd delays); this driver only advances scenes. Pauses
// off-screen and resumes on re-entry. Reduced motion → final frame.
(function () {
  var deck = document.getElementById('hw-deck');
  if (!deck) return;
  var stage = deck.querySelector('.hw-deck__stage');
  var scenes = [].slice.call(deck.querySelectorAll('.hwd-scene'));
  var DUR = [5800, 5400, 8000, 6600, 6000]; // per-scene ms
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    deck.classList.add('is-static'); // final frame, everything visible
    scenes[scenes.length - 1].classList.add('is-on');
    return;
  }

  var k = -1, timer = null, running = false;
  function next() {
    var prev = k >= 0 ? scenes[k] : null;
    k = (k + 1) % scenes.length;
    if (prev) {
      prev.classList.remove('is-on');
      prev.classList.add('is-out');
      setTimeout(function () { prev.classList.remove('is-out'); }, 700);
    }
    stage.classList.remove('is-sweep');
    void stage.offsetWidth; // retrigger the beam cleanly
    stage.classList.add('is-sweep');
    scenes[k].classList.add('is-on');
    timer = setTimeout(next, DUR[k]);
  }

  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !running) {
      running = true;
      next();
    } else if (!entries[0].isIntersecting && running) {
      running = false; // freeze in place; resumes on re-entry
      clearTimeout(timer);
    }
  }, { threshold: 0.35 }).observe(deck);
})();

// Tradesperson system rail (how-we-work): a ball rides the track and
// each station lights as it passes. Loops while in view; pauses
// off-screen. Reduced motion / no IO → all stations lit, static.
(function () {
  var rail = document.getElementById('hw-rail');
  if (!rail) return;
  var stops = [].slice.call(rail.querySelectorAll('.hw-rail__stop'));
  var ball = rail.querySelector('.hw-rail__ball');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    stops.forEach(function (s) { s.classList.add('on'); });
    return;
  }

  var TRAVEL = 5000, HOLD = 1900, timers = [], running = false;
  function cycle() {
    stops.forEach(function (s) { s.classList.remove('on'); });
    ball.classList.remove('is-run');
    void ball.offsetWidth; // restart the ball's animation cleanly
    ball.classList.add('is-run');
    stops.forEach(function (s, i) {
      timers.push(setTimeout(function () { s.classList.add('on'); },
        i * (TRAVEL / (stops.length - 1))));
    });
    timers.push(setTimeout(cycle, TRAVEL + HOLD));
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
  }, { threshold: 0.4 }).observe(rail);
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
