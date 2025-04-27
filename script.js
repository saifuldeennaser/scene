const audioPlayers = [];

document.querySelectorAll('.custom-player').forEach(player => {
  const audio = new Audio(player.getAttribute('data-src'));
  audioPlayers.push(audio); // Store the reference

  const playBtn = player.querySelector('.play-btn');
  const progressContainer = player.querySelector('.progress-container');
  const progress = player.querySelector('.progress');
  const currentTimeEl = player.querySelector('.current');
  const durationEl = player.querySelector('.duration');

  let isPlaying = false;

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playBtn.textContent = 'Play';
    } else {
      // Pause all other audio instances
      audioPlayers.forEach(a => {
        if (a !== audio) {
          a.pause();
          a.currentTime = 0; // optional: reset position
        }
      });

      // Also update all play buttons
      document.querySelectorAll('.play-btn').forEach(btn => {
        btn.textContent = 'Play';
      });

      audio.play();
      playBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  progressContainer.addEventListener('click', e => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
  });

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
});

  const reveals = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const revealTop = reveals[i].getBoundingClientRect().top;
      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {
        reveals[i].classList.add('visible');
      }
    }
  }

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);

  const slideContainer = document.getElementById('slideContainer');
  const slides = slideContainer.querySelectorAll('img');
  const totalSlides = slides.length;
  let currentIndex = 1;
  const slideWidth = slideContainer.clientWidth / totalSlides;

  function updateSlidePosition() {
    slideContainer.style.transition = 'transform 0.5s ease-in-out';
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function moveSlide(direction) {
    currentIndex += direction;
    updateSlidePosition();
  }

  function handleTransitionEnd() {
    if (currentIndex >= totalSlides - 1) {
      slideContainer.style.transition = 'none';
      currentIndex = 1;
      slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    if (currentIndex <= 0) {
      slideContainer.style.transition = 'none';
      currentIndex = totalSlides - 2;
      slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }

  slideContainer.addEventListener('transitionend', handleTransitionEnd);

  let autoScroll = setInterval(() => moveSlide(1), 3000);

  document.querySelector('.slider').addEventListener('mouseenter', () => clearInterval(autoScroll));
  document.querySelector('.slider').addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => moveSlide(1), 3000);
  });

  slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  window.addEventListener('scroll', () => {
    const slider = document.querySelector('.slider');
    const fadeStart = 100;
    const fadeEnd = 300;
    const scrollY = window.scrollY;

    if (scrollY <= fadeStart) {
      slider.style.opacity = 1;
    } else if (scrollY >= fadeEnd) {
      slider.style.opacity = 0;
    } else {
      const opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      slider.style.opacity = opacity.toFixed(2);
    }
  });
