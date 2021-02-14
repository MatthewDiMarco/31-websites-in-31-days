const blipBtn = document.getElementById('blip');
const crashBtn = document.getElementById('crash');
const boomBtn = document.getElementById('boom');

let sounds = [
  new Audio('res/snd1.wav'),
  new Audio('res/snd2.wav'),
  new Audio('res/snd3.wav')
];

blipBtn.addEventListener('click', () => {
  sounds[0].play();
  blipBtn.classList.add('shake');
});
blipBtn.addEventListener('animationend', () => {
  blipBtn.classList.remove('shake');
});

crashBtn.addEventListener('click', () => {
  sounds[1].play();
  crashBtn.classList.add('shake');
});
crashBtn.addEventListener('animationend', () => {
  crashBtn.classList.remove('shake');
});

boomBtn.addEventListener('click', () => {
  sounds[2].play();
  boomBtn.classList.add('shake');
});
boomBtn.addEventListener('animationend', () => {
  boomBtn.classList.remove('shake');
});