const randomTypewriterFacts = [
  "It Wasn't Always QWERTY...",
  "Early Keyboards Were Modelled After Piano Keys",
  "Typewriters Allowed an Avenue for Women",
  "Mark Twain Wrote the First Typewritten Novel",
  "Infinite monkey theorem ;)",
  "Typewriters are Still Used in Some Places :O",
  "No one can hack a typewriter :D",
  "The First Patent Came in 1714"
];

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const reset = () => {
  quotesShuffled = shuffleArray(randomTypewriterFacts);
  quoteIdx = 0; 
}

// State
let linger = 10000;
let typeSpeed = 50;
let quotesShuffled;
let quoteIdx;
reset();

const paper = document.getElementById('thetext');
const cursor = document.getElementById('cursor');

const typeWriterStart = (txt, spd) => {
  cursor.classList.remove('animated-blink');
  const erase = () => {
    if (paper.innerHTML !== '') {
      paper.innerHTML = paper.innerHTML.slice(0, -1);
      setTimeout(erase, 50); // erase spd is constant
    } else {
      write(0, txt, spd); 
    }
  }
  erase();
}

const write = (ii, txt, spd) => {
  if (ii < txt.length) {
    const isSpace = txt.charAt(ii) === ' ' ? true : false;
    paper.innerHTML += txt.charAt(ii);
    ii++;
    setTimeout(() => {write(ii, txt, spd)}, isSpace ? spd/2 : spd);
  } else {
    cursor.classList.add('animated-blink');
  }
}

const loop = () => {
  if (quoteIdx < quotesShuffled.length) {
    typeWriterStart(quotesShuffled[quoteIdx], typeSpeed);
    quoteIdx++;
  } else {
    reset();
  }
  setTimeout(loop, linger);
}

setTimeout(loop, linger/3);