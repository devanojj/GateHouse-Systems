/* GateHouse Systems script.js
   Mobile nav, footer year, and a mailto-based contact form. No dependencies. */

(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */

  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('primary-nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
        toggle.focus();
      }
    });

    // Reset the menu when the layout switches to the desktop nav.
    var desktop = window.matchMedia('(min-width: 900px)');
    var onChange = function (event) { if (event.matches) closeNav(); };
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ---------- Footer year ---------- */

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Contact form (opens the visitor's email client) ---------- */

  var CONTACT_EMAIL = 'info@gatehouse.systems';

  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');

  function setError(field, message) {
    var wrapper = field.parentNode;
    var existing = wrapper.querySelector('.error-text');

    if (!message) {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      if (existing) wrapper.removeChild(existing);
      return;
    }

    field.setAttribute('aria-invalid', 'true');
    if (!existing) {
      existing = document.createElement('span');
      existing.className = 'error-text';
      existing.id = field.id + '-error';
      wrapper.appendChild(existing);
    }
    existing.textContent = message;
    field.setAttribute('aria-describedby', existing.id);
  }

  function validate(fields) {
    var firstInvalid = null;

    fields.forEach(function (item) {
      var value = item.field.value.trim();
      var message = '';

      if (!value) {
        message = item.label + ' is required.';
      } else if (item.field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Enter a valid email address.';
      }

      setError(item.field, message);
      if (message && !firstInvalid) firstInvalid = item.field;
    });

    return firstInvalid;
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = form.elements.name;
      var email = form.elements.email;
      var company = form.elements.company;
      var message = form.elements.message;

      var invalid = validate([
        { field: name, label: 'Name' },
        { field: email, label: 'Email' },
        { field: message, label: 'A message' }
      ]);

      if (invalid) {
        invalid.focus();
        if (note) note.textContent = 'Please check the highlighted fields.';
        return;
      }

      var subject = 'Website enquiry from ' + name.value.trim();
      var body = [
        'Name: ' + name.value.trim(),
        'Email: ' + email.value.trim(),
        'Company: ' + (company.value.trim() || 'Not given'),
        '',
        message.value.trim()
      ].join('\n');

      window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (note) {
        note.textContent = 'Opening your email app… if nothing happens, email ' +
          CONTACT_EMAIL + ' directly.';
      }
    });

    // Clear an error as soon as the visitor starts fixing the field.
    form.addEventListener('input', function (event) {
      if (event.target.getAttribute('aria-invalid') === 'true') {
        setError(event.target, '');
      }
    });
  }
})();
