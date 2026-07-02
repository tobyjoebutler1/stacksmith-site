/* Stacksmith — small interactions: FAQ accordion, "See it run"
   demo toggles, and the contact form's thank-you state. */

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
