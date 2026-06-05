(function() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  function toggleScrolled() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', toggleScrolled, { passive: true });
  toggleScrolled();

  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const duration = 1300;
      const start = performance.now();
      function animateCounter(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = (target * eased).toFixed(decimals);
        el.textContent = decimals > 0 ? value + 'x' : '+' + Math.floor(value);
        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        } else {
          el.textContent = decimals > 0 ? target.toFixed(decimals) + 'x' : '+' + target;
        }
      }
      requestAnimationFrame(animateCounter);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.45 });
  counters.forEach(c => counterObserver.observe(c));

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          const offset = 75;
          const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  const track = document.getElementById('galleryTrack');
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const dotsContainer = document.getElementById('galleryDots');
  let currentIndex = 0;
  let totalSlides = slides.length;

  if (track && totalSlides > 0) {
    function updateGallery() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      document.querySelectorAll('.dot-nav').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }
    function createDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot-nav');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateGallery();
        });
        dotsContainer.appendChild(dot);
      }
    }
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateGallery();
    }
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateGallery();
    }
    createDots();
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    let autoInterval = setInterval(nextSlide, 5000);
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
      galleryContainer.addEventListener('mouseenter', () => clearInterval(autoInterval));
      galleryContainer.addEventListener('mouseleave', () => {
        autoInterval = setInterval(nextSlide, 5000);
      });
    }
    updateGallery();
  }
})();