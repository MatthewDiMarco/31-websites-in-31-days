//https://www.youtube.com/watch?v=ZniVgo8U7ek

let startTime = undefined; 
let cardFlipped = false;
let initialCard = undefined;
let boardLocked = false;

const modal = document.querySelector('.modal');
const message = document.getElementById('msg');
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', reset);
const cards = document.querySelectorAll('.card');
cards.forEach(cc => {
  cc.addEventListener('click', flipCard);
})

function shuffle() {
  cards.forEach(cc => {
    let rPos = Math.floor(Math.random() * (6*3));
    cc.style.order = rPos;
  })
}
shuffle();

function reset() {
  modal.style.display = 'none'
  startTime = undefined; 
  cardFlipped = false;
  initialCard = undefined;
  boardLocked = false;
  cards.forEach(cc => {
    cc.classList.remove('flip');
    cc.addEventListener('click', flipCard);
  });
  setTimeout(shuffle, 100);
}

function forceWin() {
  if (startTime === undefined) startTime = Date.now();
  cards.forEach(cc => {
    cc.classList.add('flip');
  });
  checkWin();
}

function checkWin() {
  let win = true;
  cards.forEach(cc => {
    if (!cc.classList.contains('flip')) {
      win = false;
    }
  });
  if (win) {
    message.innerHTML = 'NICE! YOUR TIME WAS: ' + 
      ((Math.round(((Date.now() - startTime) / 1000 ) * 100) / 100)) + ' seconds';
    modal.style.display = 'flex';
  }
}

function checkCards(c1, c2) {
  if (c1.dataset.emoji === c2.dataset.emoji) {
    c1.removeEventListener('click', flipCard);
    c2.removeEventListener('click', flipCard);
    checkWin();
  } else {
    boardLocked = true;
    setTimeout(() => {
      c1.classList.remove('flip');
      c2.classList.remove('flip');
      boardLocked = false;
    }, 750);
  }
  initialCard = undefined;
}

function flipCard() {
  if (!boardLocked && !(this === initialCard)) {
    if (startTime === undefined) startTime = Date.now();
    this.classList.add('flip');
    if (!cardFlipped) {
      cardFlipped = true;
      initialCard = this;
    } else {
      cardFlipped = false;
      checkCards(initialCard, this);
    }
  }
}