const grid = $('#gamegrid');
const info = $('#turninfo');
let crossTurn; 

$(document).ready(e => {
  console.log('starting...');
  crossTurn = true;
  info.html('❌\'s turn');
  buildGrid();
});

function buildGrid() {
  for (ii = 0; ii < 3*3; ii++) {
    grid.append(
      $('<div></div>').on('click', e => {
        if (e.target.innerHTML === '') {
          if (crossTurn) {
            e.target.classList.add('cross');
            e.target.innerHTML = '❌';
            info.html('⭕\'s turn');
          } else {
            e.target.classList.add('circle');
            e.target.innerHTML = '⭕';
            info.html('❌\'s turn');
          }
          crossTurn = !crossTurn;
          checkBoard();
        }
      })
    );
  }
}

function disableGrid() {
  const cells = grid.children();
  for (ii = 0; ii < 3*3; ii++) {
    cells[ii].classList.add('disable');
  }
}

function checkBoard() {
  const cells = grid.children();
  let full = true;
  let ii = 0;
  while (full && ii < 9) {
    if (cells[ii].innerHTML === '') {
      full = false; 
    }
    ii++;
  }
  if (full) {
    info.html('DRAW - GAMEOVER MAN!');
    disableGrid();
  } else {
    const win = getWinner();
    if (win === 'cross') {
      console.log('cross wins');
      info.html('WINNER! ❌');
      disableGrid();
    } else if (win === 'circle') {
      console.log('circle wins');
      info.html('WINNER! ⭕');
      disableGrid();
    }
  }
}

function getWinner() {
  const cells = grid.children();
  const winner = (c) => {
    return c.innerHTML === '❌' ? 'cross' : 'circle'; 
  }
  // Check rows
  for (ii = 0; ii < 7; ii += 3) {
    if ((!$(cells[ii]).is(':empty')) && (cells[ii].innerHTML === cells[ii+1].innerHTML) && 
        (cells[ii+1].innerHTML === cells[ii+2].innerHTML)) {
      return winner(cells[ii]);
    }
  }

  // Check columns
  for (ii = 0; ii < 3; ii++) {
    if ((!$(cells[ii]).is(':empty')) && (cells[ii].innerHTML === cells[ii+3].innerHTML) && 
        (cells[ii+3].innerHTML === cells[ii+6].innerHTML)) {
      return winner(cells[ii]);
    }
  }

  // Check diags
  if ((!$(cells[0]).is(':empty')) && (cells[0].innerHTML === cells[4].innerHTML) && 
      (cells[4].innerHTML === cells[8].innerHTML)) {
    return winner(cells[0]);
  }

  if ((!$(cells[2]).is(':empty')) && (cells[2].innerHTML === cells[4].innerHTML) && 
      (cells[4].innerHTML === cells[6].innerHTML)) {
    return winner(cells[2]);
  }
}