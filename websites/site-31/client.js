let tt;
const amogus = document.querySelector('img');
window.addEventListener('mousemove', e => {
  amogus.style.top = (e.pageY - (amogus.height/2)) + 'px';
  amogus.style.left = (e.pageX - (amogus.width/2)) + 'px';
  amogus.classList.add('move');
  clearTimeout(tt);
  tt = setTimeout(() => {amogus.classList.remove('move')}, 100);
});