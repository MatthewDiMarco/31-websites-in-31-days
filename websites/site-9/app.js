// - randomize on start and button
// - "you win" screen
// - basic instructions

const grid = $('#thegrid');
const btn = $('#restart-btn');

btn.click(e => {
  randomizeGrid(); 
})

function buildGrid() {
  for (ii = 0; ii < 4*4; ii++) {
    grid.append(
      $('<div>&larr;</div>').on('click', e => {
        update(e.target);
        assignClass(e.target);
        checkWin();
      })
    );
  }
}

function randomizeGrid() {
  const kids = grid.children();
  for (ii = 0; ii < 4*4; ii++) {
    let dir;
    const rand = Math.floor(Math.random()*4);
    switch (rand) {
      case 0: dir = 'up-arrow'; break;
      case 1: dir = 'right-arrow'; break;
      case 2: dir = 'down-arrow'; break;
      default: dir = '';
    }
    kids[ii].classList = dir;
  }
}

function assignClass(el) {
  const classes = el.classList;
  if (classes.value === '') {
    el.classList = 'up-arrow';  
  } else if (classes.contains('up-arrow')) {
    el.classList = 'right-arrow';  
  } else if (classes.contains('right-arrow')) {
    el.classList = 'down-arrow';  
  } else {
    el.classList = '';
  } 
}

function update(source) {
  const kids = grid.children();
  for (ii = 0; ii < 4*4; ii++) {
    if (kids[ii] === source) {
      let pointing;
      if (source.classList.contains('up-arrow')) {
        pointing = kids[ii-4];
      } else if (source.classList.contains('right-arrow') && ii != 3 && ii != 7 && ii != 11) {
        pointing = kids[ii+1];
      } else if (source.classList.contains('down-arrow')) {
        pointing = kids[ii+4];
      } else if (source.classList.value === '' && ii != 4 && ii != 8 && ii != 12) {
        pointing = kids[ii-1];
      }
      if (pointing != null) {
        assignClass(pointing);
      }
    }
  }
}

function checkWin() {
  let win = true; 
  const kids = grid.children();
  for (ii = 0; ii < 4*4; ii++) {
    if (kids[ii+1] != null && kids[ii].classList.value !== kids[ii+1].classList.value) {
      win = false; 
    }
  }

  if (win) {
    winner();
  }
}

function winner() {
  const kids = grid.children();
  for (ii = 0; ii < 4*4; ii++) {
    kids[ii].classList.add('win');
  }
  $('#locked').remove(); 
  $('body').append(
    '<iframe width="420" height="315"' +
      'src="https://www.youtube.com/embed/xg29TuWo0Yo">' +
    '</iframe>'
  );
}

buildGrid();
randomizeGrid();