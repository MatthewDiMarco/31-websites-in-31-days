const THRESHOLD = 0.9;
const remarks = [
  'gosh!', 
  'you animal!', 
  'that\'s messed up', 
  'really?', 
  'surely not...', 
  'kiss mum with that mouth?',
  'I cannot fathom!',
  'goodness grief!',
  'that\'s pretty toxic'
];

const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const message = document.getElementById('message');
const form = document.querySelector('form');
const searchBtn = document.getElementById('search-btn');
const input = document.querySelector('input');

const submitHandler = (e) => {
  e.preventDefault();
  const term = input.value;
  if (term) {
    console.log('loading...');
    message.innerHTML = 'Loading...';
    message.style.opacity = '0.5';
    toxicity.load(THRESHOLD).then(model => {
      const sentences = [term];
      model.classify(sentences).then(predictions => { 
        let maxIdx = 0;
        const probArray = [];
        for (ii = 0; ii < predictions.length; ii++) {
          const pp = predictions[ii].results[0].probabilities[1];
          if (pp > predictions[maxIdx].results[0].probabilities[1]) {
            maxIdx = ii;
          }
          probArray.push(pp);
        }
        console.log(probArray[maxIdx], predictions[maxIdx].label);
        message.innerHTML = `
          ${predictions[maxIdx].label.toUpperCase().replaceAll('_', ' ')} (
          ${Math.round(probArray[maxIdx]*100)}%), 
          ${probArray[maxIdx] > 0.5 ? remarks[Math.round(Math.random()*remarks.length)] : 'that\'s not too bad'}
        `;
        message.style.opacity = '1';
      });
    });
  }
}

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
  navLinks.forEach((link, idx) => {
    if (link.style.animation) {
      link.style.animation = '';
    } else {
      link.style.animation = `navLinkFade 0.3s ease forwards ${idx / 15 + 0.2}s`;
    }
  });
  burger.classList.toggle('toggle');
});

form.addEventListener('onsubmit', submitHandler);
searchBtn.addEventListener('click', submitHandler);