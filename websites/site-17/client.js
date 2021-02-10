// Credit to Dev Ed for the solid tutorial
// https://www.youtube.com/watch?v=gXkqy0b4M5g
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    navLinks.forEach((link, idx) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${idx / 10 + 0.5}s`;
      }
    });
    burger.classList.toggle('toggle');
  });
}

const app = () => {
  navSlide();
}

app();