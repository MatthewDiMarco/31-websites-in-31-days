let elementsSwapped = false; 

async function swap(arr, idx1, idx2) {
  //arr[idx1].classList = 'selected';
  await sleep(50);
  let neighbour = arr[idx1].previousSibling;
  arr[idx2].after(arr[idx1]);
  neighbour === null ? sortContainer.prepend(arr[idx2]) : neighbour.after(arr[idx2]);
  elementsSwapped = true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  console.log('--bubbleSort--');
  let arr = sortContainer.children();
  let n = arr.length;
  for (ii=0; ii<n; ii++) {
    for (jj=0; jj<n-ii-1; jj++) {
      const currVal = parseInt(arr[jj].id); 
      const nextVal = parseInt(arr[jj+1].id); 
      if (currVal > nextVal) {
        elementsSwapped = false;
        await swap(arr, jj, jj+1);
        arr = sortContainer.children();
        while (!elementsSwapped) {/*spinlock*/}
      }
    }
  }
  console.log('DONE SORTING');
}

function insertionSort() {
  console.log('--insertionSort--');
}

function selectionSort() {
  console.log('--selectionSort--');
}