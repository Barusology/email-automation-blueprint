(function () {
  'use strict';

  window.__docsReady = true;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progress = document.querySelector('.progress');
  var nav = document.querySelector('.site-nav');
  var toTop = document.querySelector('.to-top');
  var ticking = false;

  function updateScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) {
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    }
    if (nav) nav.classList.toggle('scrolled', y > 12);
    if (toTop) toTop.classList.toggle('show', y > 700);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', updateScroll);
  updateScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  var railLinks = Array.prototype.slice.call(document.querySelectorAll('.rail a[href^="#"]'));
  if (railLinks.length && 'IntersectionObserver' in window) {
    var linkFor = {};
    railLinks.forEach(function (a) { linkFor[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          railLinks.forEach(function (a) {
            a.classList.remove('active');
            a.removeAttribute('aria-current');
          });
          link.classList.add('active');
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    Object.keys(linkFor).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var status = document.querySelector('[data-copy-status]');
    var original = btn.textContent;
    var timer = null;
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      function done(ok) {
        btn.textContent = ok ? 'Copied ✓' : 'Copy failed';
        if (status) status.textContent = ok ? text + ' copied to clipboard.' : 'Select the address and copy it manually.';
        window.clearTimeout(timer);
        timer = window.setTimeout(function () {
          btn.textContent = original;
          if (status) status.textContent = '';
        }, 2200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallback(); });
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        done(ok);
      }
    });
  });
})();