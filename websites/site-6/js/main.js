// Init
const sortContainerViewportH = 65;
const minArrLength = 2;
const maxArrLength = 500;

const sortContainer = $('#sort-container');
const inputSize = $('#inputSize');
const shuffleBtn = $('#shuffleButton');
const bubbleBtn = $('#bubbleSortButton');
const insertionBtn = $('#insertionSortButton');
const selectionBtn = $('#selectionSortButton');

let arrayLength = 100; 
let sorted = false, sorting = false;
let sortFunction = bubbleSort;
buildArrayInDOM();

// Event Listeners
inputSize.change(e => {
  arrayLength = Math.min(Math.max(parseInt(e.target.value), minArrLength), maxArrLength);
  e.target.value = arrayLength;
  buildArrayInDOM();
});

bubbleBtn.click(e => {
  changeSort(bubbleSort);
});

insertionBtn.click(e => {
  changeSort(insertionSort);
});

selectionBtn.click(e => {
  changeSort(selectionSort);
});


shuffleBtn.click(shuffleArray);

//Helper functions
function changeSort(srtFunc) {
  sortFunction = srtFunc;
  sort();
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

function buildArrayInDOM() {
  sortContainer.empty();
  for (ii=0; ii<arrayLength; ii++) {
    sortContainer.append(
      `<div id="${ii}el" style="height: ${((ii+1)/arrayLength)*sortContainerViewportH}vh;"></div>`
    );
  }
  sorted = true;
  console.log('SORTED');
}

function sort() {
  console.log('STARTING SORT...');
  sorting = true;
  sortFunction();
}