const hc = $('#honeycomb');

function chooseSymbol() {
  return `&#${Math.floor(Math.random() * (9983 - 9917) + 9917)};`;
}

function buildHoneyComb() {
  hc.empty();
  for (ii = 0; ii < 48; ii++) {
    hc.append(
      $('<div class="hex">' +
          '<div class="hex-content">' +
            `${chooseSymbol()}` + 
          '</div>' +
        '</div>'
      )
      .on('click', e => {
        let tar = e.target;
        if (!tar.classList.contains('hex')) {
          tar = e.target.parentElement;
        }
        tar.classList.add('fall');
        setTimeout(e => {$(tar).children()[0].innerHTML = '&#9749;'}, 1000)
      })
    );
  }
}

buildHoneyComb();