// Win mappings
const EMOJIS = ['🗿', '📄', '✂️'];
let winMap = new Map(); 
winMap['🗿📄'] = cpuWin;
winMap['🗿✂️'] = playerWin;
winMap['📄🗿'] = playerWin;
winMap['📄✂️'] = cpuWin;
winMap['✂️🗿'] = cpuWin;
winMap['✂️📄'] = playerWin;

// DOM
const platform = document.getElementById('fight-platform');
const playerslot = document.getElementById('player-fight');
const cpuslot = document.getElementById('cpu-fight');
const info = document.getElementById('vs');

// Listeners
const rockBtn = document.getElementById('rock');
rockBtn.addEventListener('click', e => {playerslot.innerHTML=EMOJIS[0]});

const paperBtn = document.getElementById('paper');
paperBtn.addEventListener('click', e => {playerslot.innerHTML=EMOJIS[1]});

const sciBtn = document.getElementById('sci');
sciBtn.addEventListener('click', e => {playerslot.innerHTML=EMOJIS[2]});

playerslot.addEventListener('animationend', e => {
  playerslot.innerHTML = '';
  cpuslot.innerHTML = '';
  playerslot.classList = '';
  cpuslot.classList = '';
  info.innerHTML = 'VS';
  start(0);
});

function playerWin() {
  console.log('Player wins');
  playerslot.classList.add('winner');
  cpuslot.classList.add('loser');
  info.innerHTML = 'NICE!';
}

function cpuWin() {
  console.log('CPU wins');
  cpuslot.classList.add('winner');
  playerslot.classList.add('loser');
  info.innerHTML = 'OUCH!';
}

function checkWin() {
  if (playerslot.innerHTML === cpuslot.innerHTML) {
    info.innerHTML = 'TIE!'
    playerslot.classList.add('tied');
    cpuslot.classList.add('tied');
  } else {
    const combo = playerslot.innerHTML + cpuslot.innerHTML;
    const winFunction = winMap[combo];
    winFunction();
  }
}

function start(idx) {
  if (idx >= 3) idx = 0;
  cpuslot.innerHTML = EMOJIS[idx];
  if (playerslot.innerHTML === '') {
    setTimeout(() => { start(idx+1) }, 50);
  } else {
    checkWin();
  }
}

start(0);