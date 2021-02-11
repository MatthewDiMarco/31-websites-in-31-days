//https://www.youtube.com/watch?v=4SQXOA8Z-lo
const modal = document.querySelector('.modal');
const previews = document.querySelectorAll('.gallery img');
const original = document.querySelector('.full-img');
const imgText = document.querySelector('.caption');

previews.forEach(pp => {
  pp.addEventListener('click', () => {
    modal.classList.add('open');
    original.classList.add('open');
    const originalSrc = pp.getAttribute('data-original');
    const altText = pp.alt;
    original.src = `full/${originalSrc}`
    imgText.textContent = altText;
  });
});

modal.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    modal.classList.remove('open');
    original.classList.remove('open');
  }
});