(function() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });

  const track = document.getElementById('galleryTrack');
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const dotsContainer = document.getElementById('galleryDots');
  let current = 0;
  let total = slides.length;

  if (track && total) {
    const updateGallery = () => {
      track.style.transform = `translateX(-${current * 100}%)`;
      if (dotsContainer) {
        Array.from(dotsContainer.children).forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
          dot.setAttribute('aria-current', i === current ? 'true' : 'false');
        });
      }
    };

    const createDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        if (i === current) dot.classList.add('active');
        dot.setAttribute('aria-label', `Ir al flyer ${i+1}`);
        dot.addEventListener('click', () => { current = i; updateGallery(); });
        dotsContainer.appendChild(dot);
      }
    };

    createDots();
    if (nextBtn) nextBtn.addEventListener('click', () => { current = (current + 1) % total; updateGallery(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { current = (current - 1 + total) % total; updateGallery(); });
    updateGallery();
  }
})();