document.addEventListener("DOMContentLoaded", () => {

  /* ========= SLIDE FADE IN ========= */
  const slides = document.querySelectorAll(".slide");

  function revealSlides() {
    slides.forEach(slide => {
      if (slide.getBoundingClientRect().top < window.innerHeight * 0.9) {
        slide.style.opacity = 1;
      }
    });
  }

  // tampilkan slide pertama LANGSUNG
  revealSlides();
  window.addEventListener("scroll", revealSlides);

  /* ========= MUSIC (CLICK / TAP ONCE) ========= */
  const music = document.getElementById("bgMusic");
  let musicStarted = false;

  function startMusic() {
    if (!music || musicStarted) return;
    music.volume = 0.9;
    music.play().catch(()=>{}); // biar ga error autoplay
    musicStarted = true;

    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
  }

  document.addEventListener("click", startMusic);
  document.addEventListener("touchstart", startMusic);

  /* ========= COUNTDOWN ========= */
  const targetDate = new Date("2026-01-30T00:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const countdownInterval = setInterval(() => {
      const gap = targetDate - Date.now();

      if (gap <= 0) {
        clearInterval(countdownInterval);

        // replace countdown dengan teks Happy Birthday
        const parent = daysEl.parentElement.parentElement; // container .time
        parent.innerHTML = `
          <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100px;
          ">
            <h2 style="
              color: inherit; 
              font-family: 'Princess Sofia', cursive;
              font-size:2.5rem;
              text-align:center;
            ">
              Happy Birthday for You 🎉
            </h2>
          </div>
        `;
        return;
      }

      // update countdown normal
      daysEl.textContent = Math.floor(gap / 86400000);
      hoursEl.textContent = Math.floor((gap / 3600000) % 24);
      minutesEl.textContent = Math.floor((gap / 60000) % 60);
      secondsEl.textContent = Math.floor((gap / 1000) % 60);
    }, 1000);
  }

  /* ========= EFFECT HOVER GAMBAR ========= */
  const imgs = document.querySelectorAll('.slide img');

  imgs.forEach(img => {
    img.classList.add('hover-img'); // tambahin class CSS

    img.addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;

      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    img.addEventListener('mouseleave', () => {
      img.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

});

const container = document.getElementById('glitter-container');

function createGlitter() {
  const glitter = document.createElement('div');
  glitter.classList.add('glitter');

  // posisi horizontal random
  glitter.style.left = Math.random() * 100 + 'vw';

  // delay dan durasi random
  const duration = Math.random()*5 + 3; // 3s - 8s
  glitter.style.animationDuration = duration + 's';
  glitter.style.animationDelay = '0s';

  // ukuran random
  const size = Math.random() * 3 + 2; // 2px - 5px
  glitter.style.width = size + 'px';
  glitter.style.height = size + 'px';

  container.appendChild(glitter);

  // hapus glitter setelah animasi selesai biar ga numpuk
  setTimeout(() => {
    glitter.remove();
  }, duration*1000);
}

// spawn glitter terus-menerus
setInterval(createGlitter, 100); // setiap 0.1 detik muncul glitter baru
