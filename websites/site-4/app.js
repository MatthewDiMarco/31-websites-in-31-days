const MAX_COLS = 16;
const MAX_ROWS = 7;

const rowInput = document.getElementById('row-input');
const colInput = document.getElementById('col-input');
const setBtn = document.getElementById('setBtn');
const gridContainer = document.querySelector('.grid-container');

const animationHandler = (e) => {
  if (e.target.classList.contains('fall')) {
    e.target.classList = 'return';
  } else {
    e.target.classList = '';
  }
}

const onClickHandler = (e) => {
  e.target.classList = 'fall';
}

setBtn.addEventListener('click', e => {
  const nRows = rowInput.value > MAX_ROWS ? rowInput.value = MAX_ROWS : rowInput.value;
  const nCols = colInput.value > MAX_COLS ? colInput.value = MAX_COLS : colInput.value;
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateRows = `repeat(${nRows}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${nCols}, 1fr)`;
  let ii = 0;
  while (gridContainer.childElementCount < (nRows*nCols)) {
    ii++;
    const bb = document.createElement('button');
    bb.innerHTML = ii;
    bb.addEventListener('click', onClickHandler);
    bb.addEventListener('animationend', animationHandler);
    gridContainer.appendChild(bb);
  }
});