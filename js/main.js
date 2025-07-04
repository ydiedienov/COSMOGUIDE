//3D effect in Hero section

document.addEventListener('mousemove', e => {
  Object.assign(document.documentElement, {
    style: `
        --move-x: ${(e.clientX - window.innerWidth / 2) * -.003}deg;
        --move-y: ${(e.clientY - window.innerHeight / 2) * -.006}deg;
        `
  });
});

//burger-menu function

document.querySelector('.burger-btn').addEventListener('click', function () {
  document.querySelector('.header').classList.toggle('open');
});

document.querySelectorAll('.header__item-link[data-text="Language"]').forEach(function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.popup').classList.toggle('open');
  });
});

//popup open

document.querySelector('.popup__close-btn').addEventListener('click', function () {
  document.querySelector('.popup').classList.remove('open');
  langSelect.classList.remove('show');
});

//Animation for planet in hero section

const planet = document.querySelector(".hero__planet");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const sectionHeight = window.innerHeight;

  const progress = Math.min(scrollY / sectionHeight, 1);
  const translateX = - 80 * progress;
  const translateY = 75 * progress;
  const scale = 1 + 0.75 * progress;

  planet.style.transform = `translate(${translateX}vh, ${translateY}vh) scale(${scale})`;
});

//Comments with images

document.querySelectorAll('.comment__wrap').forEach(function (img) {
  img.addEventListener('click', function () {
    this.classList.toggle('show');
  });
});

// Parallax for Landscape section

const targetLandscape = document.querySelector('.landscape__container');
const offsetPaddingLandscape = window.innerHeight * 0.05;
const targetOffsetLandscape = targetLandscape.getBoundingClientRect().top + window.scrollY + offsetPaddingLandscape;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const relativeScrollLandscape = Math.max(0, scrollY - targetOffsetLandscape);

  document.body.style.setProperty('--scrollTopLandscape', `${relativeScrollLandscape}px`);
});


//Animaton when 50% of element and height of window less than 1000px

const fadeInUp = document.querySelectorAll('.fadeInUp');
const fadeInDown = document.querySelectorAll('.fadeInDown');

const shouldAnimate = !(window.innerWidth <= 1151 && window.innerHeight <= 1000);

if (!shouldAnimate) {

  fadeInUp.forEach(el => el.classList.remove('fadeInUp', 'animated'));
  fadeInDown.forEach(el => el.classList.remove('fadeInDown', 'animated'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.5
  });

  window.addEventListener('load', () => {
    fadeInUp.forEach(el => observer.observe(el));
    fadeInDown.forEach(el => observer.observe(el));
  });
}

// Облака

const targetCloud = document.querySelector('.habitability__clouds');
if (targetCloud) {
  const offsetMarginCloud = window.innerHeight * 0.3;
  const targetOffsetCloud = targetCloud.getBoundingClientRect().top + window.scrollY - offsetMarginCloud;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const relativeScrollCloud = Math.max(0, scrollY - targetOffsetCloud);

    document.body.style.setProperty('--scrollTopCloud', `${relativeScrollCloud}px`);
  });
}

// CARDS

document.querySelectorAll('.flip-btn').forEach(button =>
  button.addEventListener('click', e => {
    e.stopPropagation();
    button.closest('.card').classList.toggle('flipped');
  })
);

// 3D hover + glow effect for smartphone too

document.querySelectorAll('.card').forEach(card => {
  const glows = card.querySelectorAll('.glow');

  // mouse PC
  card.addEventListener('mousemove', e => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const mouseX = e.clientX - (left + width / 2);
    const mouseY = e.clientY - (top + height / 2);

    const rotateY = (-20 * mouseX) / (width / 2);
    const rotateX = (20 * mouseY) / (height / 2);

    applyTransform(card, glows, rotateX, rotateY, mouseX, mouseY, width, height);
  });

  // Touch 
  card.addEventListener('touchmove', e => {
    if (window.innerWidth < 1151) {
      e.preventDefault();
    }

    const touch = e.touches[0];
    const { left, top, width, height } = card.getBoundingClientRect();
    const touchX = touch.clientX - (left + width / 2);
    const touchY = touch.clientY - (top + height / 2);

    const rotateY = (-20 * touchX) / (width / 2);
    const rotateX = (20 * touchY) / (height / 2);

    applyTransform(card, glows, rotateX, rotateY, touchX, touchY, width, height);
  }, { passive: false });

  card.addEventListener('touchend', () => {
    resetTransform(card, glows);
  });

  card.addEventListener('touchcancel', () => {
    resetTransform(card, glows);
  });

  card.addEventListener('mouseleave', () => {
    resetTransform(card, glows);
  });
});

// transformation
function applyTransform(card, glows, rotateX, rotateY, posX, posY, width, height) {
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

  const glowX = 50 + (posX / width) * 100;
  const glowY = 50 + (posY / height) * 100;

  glows.forEach(glow => {
    glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, var(--light-color, #fff) 0%, transparent 50%)`;
    glow.style.opacity = '0.15';
  });
}

// reset animation
function resetTransform(card, glows) {
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  glows.forEach(glow => {
    glow.style.opacity = '0';
  });
}

// Parametres Swiper

const swiperParameters = new Swiper('.parameters__swiper', {

  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 0,

  pagination: {
    el: '.parameters__swiper-pagination',
    clickable: true,
  },

  navigation: {
    prevEl: '.parameters__swiper-button-prev',
    nextEl: '.parameters__swiper-button-next',
  },
});


// Satellites Swiper

const swiperSatellites = new Swiper('.satellites__swiper', {

  direction: 'horizontal',
  loop: true,
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 0,

  pagination: {
    el: '.satellites__swiper-pagination',
    clickable: true,
  },

  navigation: {
    prevEl: '.satellites__swiper-button-prev',
    nextEl: '.satellites__swiper-button-next',
  },
});

function smoothScrollToId(id, event) {
  if (event) event.preventDefault();
  const element = document.getElementById(id);
  if (!element) return;


  setTimeout(() => {
    const offset = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }, 100);
}


window.addEventListener('load', () => {
  const videos = document.querySelectorAll('video');

  videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
        })
        .catch(error => {

          const onUserGesture = () => {
            video.play();
            window.removeEventListener('touchstart', onUserGesture);
            window.removeEventListener('click', onUserGesture);
          };
          window.addEventListener('touchstart', onUserGesture);
          window.addEventListener('click', onUserGesture);
        });
    }
  });
});
