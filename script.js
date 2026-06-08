(function() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  const track = document.getElementById('galleryTrack');
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const dotsContainer = document.getElementById('galleryDots');
  let current = 0;
  const total = slides.length;

  if (track && total) {
    const updateGallery = () => {
      track.style.transform = `translateX(-${current * 100}%)`;
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    };
    const createDots = () => {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        if (i === current) dot.classList.add('active');
        dot.addEventListener('click', () => { current = i; updateGallery(); });
        dotsContainer.appendChild(dot);
      }
    };
    createDots();
    if (nextBtn) nextBtn.addEventListener('click', () => { current = (current + 1) % total; updateGallery(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { current = (current - 1 + total) % total; updateGallery(); });
    updateGallery();
  }

  const testTrack = document.getElementById('testimoniosTrack');
  const testSlides = document.querySelectorAll('.testimonio');
  const testPrev = document.getElementById('testimoniosPrev');
  const testNext = document.getElementById('testimoniosNext');
  const testDots = document.getElementById('testimoniosDots');
  let testCurrent = 0;
  const testTotal = testSlides.length;

  if (testTrack && testTotal) {
    const updateTestimonios = () => {
      testTrack.style.transform = `translateX(-${testCurrent * 100}%)`;
      Array.from(testDots.children).forEach((dot, i) => {
        dot.classList.toggle('active', i === testCurrent);
      });
    };
    const createTestDots = () => {
      testDots.innerHTML = '';
      for (let i = 0; i < testTotal; i++) {
        const dot = document.createElement('div');
        dot.classList.add('testimonio-dot');
        if (i === testCurrent) dot.classList.add('active');
        dot.addEventListener('click', () => { testCurrent = i; updateTestimonios(); });
        testDots.appendChild(dot);
      }
    };
    createTestDots();
    if (testNext) testNext.addEventListener('click', () => { testCurrent = (testCurrent + 1) % testTotal; updateTestimonios(); });
    if (testPrev) testPrev.addEventListener('click', () => { testCurrent = (testCurrent - 1 + testTotal) % testTotal; updateTestimonios(); });
    updateTestimonios();
  }
})();