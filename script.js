document.addEventListener("DOMContentLoaded", () => {

  /* ========= TAP TO START ========= */
  const startScreen = document.getElementById("startScreen");
  const music = document.getElementById("bgMusic");

  if (startScreen) {
    startScreen.addEventListener("click", () => {
      if (music) {
        music.volume = 0.9;
        music.play().catch(() => {});
      }

      startScreen.classList.add("hide");
      setTimeout(() => {
        startScreen.style.display = "none";
      }, 600);
    });
  }

  /* ========= SLIDE FADE IN ========= */
  const slides = document.querySelectorAll(".slide");

  function revealSlides() {
    slides.forEach(slide => {
      if (slide.getBoundingClientRect().top < window.innerHeight * 0.9) {
        slide.style.opacity = 1;
      }
    });
  }

  revealSlides();
  window.addEventListener("scroll", revealSlides);

  /* ========= COUNTDOWN ========= */
  const targetDate = new Date("2026-02-10T00:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  let birthdayDone = false;

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const countdownInterval = setInterval(() => {
      const gap = targetDate - Date.now();

      if (gap <= 0 && !birthdayDone) {
        birthdayDone = true;
        clearInterval(countdownInterval);

        const parent = daysEl.parentElement.parentElement;
        parent.innerHTML = `
          <h2 style="
            font-family:'Princess Sofia', cursive;
            font-size:2.4rem;
            text-align:center;
          ">
            Happy Birthday Evelyne 🎉
          </h2>
        `;

        /* === MUNCULIN WISH SECTION === */
        setTimeout(() => {
          const wishSection = document.getElementById("wishSection");
          if (wishSection) {
            wishSection.style.display = "flex";
            wishSection.style.opacity = 0;
            setTimeout(() => {
              wishSection.style.opacity = 1;
            }, 200);
          }
        }, 1200);

        return;
      }

      if (gap > 0) {
        daysEl.textContent = Math.floor(gap / 86400000);
        hoursEl.textContent = Math.floor((gap / 3600000) % 24);
        minutesEl.textContent = Math.floor((gap / 60000) % 60);
        secondsEl.textContent = Math.floor((gap / 1000) % 60);
      }
    }, 1000);
  }

  /* ========= IMAGE HOVER EFFECT ========= */
  document.querySelectorAll(".slide img").forEach(img => {
    img.classList.add("hover-img");

    img.addEventListener("mousemove", (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rx = ((y - cy) / cy) * 8;
      const ry = ((x - cx) / cx) * -8;

      img.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  });

  /* ========= IMAGE MODAL ========= */
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");

  if (modal && modalImg) {
    document.querySelectorAll(".slide img").forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
      });
    });

    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  /* ========= ENDING TYPEWRITER ========= */
  const target = document.getElementById("endingText");
  const text = "It’s always you.";
  let i = 0;

  function typeText() {
    if (i < text.length) {
      target.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeText, 120);
    }
  }

  if (target) {
    window.addEventListener("scroll", () => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight && target.innerHTML === "") {
        typeText();
      }
    });
  }

  /* ========= WISH SYSTEM ========= */
/* ========= WISH SYSTEM ========= */
const sendWishBtn = document.getElementById("sendWish");
const wishInput = document.getElementById("wishInput");
const wishReply = document.getElementById("wishReply");

if (sendWishBtn && wishInput && wishReply) {
  sendWishBtn.addEventListener("click", () => {
    if (wishInput.value.trim() === "") return;

    // ilangin textarea & tombol
    wishInput.style.display = "none";
    sendWishBtn.style.display = "none";

    // ganti dengan kalimat romantis
    wishReply.innerHTML = `
      Harapan yang sangat indah ;) <br>
      kamu akan mewujudkannya ✨
    `;
    wishReply.style.opacity = 1;
  });
}

});

/* ========= GLITTER ========= */
const container = document.getElementById("glitter-container");

function createGlitter() {
  if (!container) return;

  const glitter = document.createElement("div");
  glitter.className = "glitter";

  glitter.style.left = Math.random() * 100 + "vw";

  const duration = Math.random() * 5 + 3;
  glitter.style.animationDuration = duration + "s";

  const size = Math.random() * 3 + 2;
  glitter.style.width = size + "px";
  glitter.style.height = size + "px";

  container.appendChild(glitter);

  setTimeout(() => glitter.remove(), duration * 1000);
}

setInterval(createGlitter, 120);