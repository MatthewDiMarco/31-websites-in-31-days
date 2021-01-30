// Init
const sortContainerViewportH = 65;
const minArrLength = 2;
const maxArrLength = 500;

const sortContainer = $('#sort-container');
const inputSize = $('#inputSize');
const sliderSpeed = $('#sortSpeedSlider');
const shuffleBtn = $('#shuffleButton');
const bubbleBtn = $('#bubbleSortButton');
const selectionBtn = $('#selectionSortButton');

let sortSpeed = 1;
let sorted = false, sorting = false;
let sortFunction = bubbleSort;
buildArrayInDOM(50);

// Event Listeners
inputSize.change(e => {
  let arrayLength = Math.min(Math.max(parseInt(e.target.value), minArrLength), maxArrLength);
  buildArrayInDOM(arrayLength);
  e.target.value = sortContainer.children().length;
});

sliderSpeed.change(e => {
  sortSpeed = e.target.value;
});

bubbleBtn.click(e => {
  changeSort(bubbleSort);
});

selectionBtn.click(e => {
  changeSort(selectionSort);
});

shuffleBtn.click(shuffleArray);

//Helper functions
function changeSort(srtFunc) {
  sortFunction = srtFunc;
  if (!sorting) sort();
}

function shuffleArray() {
  let array = sortContainer.children();
  let currIdx = array.length, tempValue, rndIdx;
  while (0 !== currIdx) { // While there remain elements to shuffle...
    rndIdx = Math.floor(Math.random() * currIdx); // Pick a remaining element...
    currIdx -= 1;

    tempValue = array[currIdx]; // And swap it with the current element.
    array[currIdx] = array[rndIdx];
    array[rndIdx] = tempValue;
  }
  sortContainer.empty();
  sortContainer.append(array);

  sorted = false;
  console.log('SHUFFLED');
}

function buildArrayInDOM(arrLen) {
  sorting = false;
  sortContainer.empty();
  for (ii=0; ii<arrLen; ii++) {
    sortContainer.append(
      `<div id="${ii}el" style="
        height: ${((ii+1)/arrLen)*sortContainerViewportH}vh;
        background-color: rgb(${((ii)/arrLen)*100},255,${((ii)/arrLen)*255});
      "></div>`
    );
  }
  sorted = true;
  console.log('SORTED');
}

async function sort() {
  console.log('STARTING SORT...');
  sorting = true;
  sortFunction();
}