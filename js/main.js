/* ===================================
   Detailng Marek — main.js
   =================================== */
(function () {
  'use strict';

  // ===== NAVBAR SCROLL =====
  var navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== MOBILE HAMBURGER =====
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('open') && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  // Swipe to close
  var touchStartX = 0;
  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (navLinks.classList.contains('open') && e.changedTouches[0].clientX - touchStartX > 60) {
      closeMenu();
    }
  }, { passive: true });

  // ===== DARK / LIGHT THEME =====
  var themeToggle = document.getElementById('theme-toggle');
  var html = document.documentElement;

  function getTheme() {
    return localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function applyTheme(t) {
    if (t === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', t);
  }

  applyTheme(getTheme());

  themeToggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  // ===== COOKIE BANNER =====
  var cookieBanner = document.getElementById('cookie-banner');
  var cookieAccept = document.getElementById('cookie-accept');
  var cookieReject = document.getElementById('cookie-reject');

  function hideCookieBanner() {
    cookieBanner.hidden = true;
  }

  if (!localStorage.getItem('cookie-consent')) {
    setTimeout(function () {
      cookieBanner.hidden = false;
    }, 1200);
  }

  cookieAccept.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'accepted');
    hideCookieBanner();
  });

  cookieReject.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'rejected');
    hideCookieBanner();
  });

  // ===== CONTACT FORM =====
  var form = document.getElementById('contact-form');
  var formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      // Let Netlify handle the actual submission
      // Show success message after a short delay if not redirected
      var submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Odesílám…';

      // Netlify Forms will redirect; this is a fallback for fetch submission
      e.preventDefault();
      var data = new FormData(form);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      })
        .then(function () {
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Odeslat poptávku';
          formSuccess.classList.add('show');
          setTimeout(function () { formSuccess.classList.remove('show'); }, 5000);
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Odeslat poptávku';
          alert('Nepodařilo se odeslat formulář. Kontaktujte nás prosím telefonicky.');
        });
    });
  }

  // ===== ACTIVE NAV LINK ON SCROLL =====
  var sections = document.querySelectorAll('section[id]');
  var navLinkItems = document.querySelectorAll('.nav-link');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinkItems.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = 'var(--accent)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(function (s) { observer.observe(s); });

})();
