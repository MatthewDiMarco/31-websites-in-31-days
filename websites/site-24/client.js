/**
 * TF Model retrieved from:
 * https://github.com/tensorflow/tfjs-models/tree/master/mobilenet
 */

const msgSlot = document.getElementById('message');
const imgSlot = document.getElementById('user-img');
const chooseBtn = document.getElementById('choose');

const openers = [
  'That\'s a',
  'Looks like a',
  'For my money, it\'s a',
  'It\'s gotta be a',
  'I think we\'re looking at a',
  'Clearly that\'s a'
];

const startPrintingMessage = (txt, spd, callback) => {
  const erase = () => {
    if (msgSlot.innerHTML !== '') {
      msgSlot.innerHTML = msgSlot.innerHTML.slice(0, -1);
      setTimeout(erase, 1); // erase spd is constant
    } else {
      write(0, txt, spd, callback); 
    }
  }
  erase();
}

const write = (ii, txt, spd, callback) => {
  if (ii < txt.length) {
    const isSpace = txt.charAt(ii) === ' ' ? true : false;
    msgSlot.innerHTML += txt.charAt(ii);
    ii++;
    setTimeout(() => {write(ii, txt, spd, callback)}, isSpace ? spd/2 : spd);
  } else {
    callback();
  }
}

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(imgSlot).attr('src', e.target.result);
        imgSlot.style.display = 'block';
      };
      reader.readAsDataURL(input.files[0]);
  }
}

function processImage() {
  mobilenet.load().then(model => {
    model.classify(imgSlot).then(predictions => {
      let msg = `"${openers[Math.floor(Math.random()*openers.length)]}`;
      for (ii = 0; ii < predictions.length; ii++) {
        msg += ' ' + predictions[ii].className;
      }
      console.log('DONE');
      document.querySelector('.loading').style.display = ''; 
      msg += `. ${Math.floor(Math.random()*10)}/10!"`;
      startPrintingMessage(msg, 20, () => {return null});
    });
  });
}

$(chooseBtn).on('change', e => {
  readURL(e.target)
  console.log('processing...');
  document.querySelector('.loading').style.display = 'block'; 
  startPrintingMessage('Let me adjust my glasses...', 10, processImage);
})

startPrintingMessage(
  '"Hi. You\'re in luck, because I critique photos for free!' +
  ' I also have 20/200 vision."', 10, () => {return null}
);