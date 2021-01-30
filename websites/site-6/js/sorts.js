let elementsSwapped = false; 

async function bubbleSort() {
  console.log('--bubbleSort--');
  let arr = sortContainer.children();
  let n = arr.length;
  for (ii=0; ii<n; ii++) {
    for (jj=0; jj<n-ii-1; jj++) {
      const currVal = parseInt(arr[jj].id); 
      const nextVal = parseInt(arr[jj+1].id); 
      if (!sorting) return; // yikes...
      if (currVal > nextVal) {
        elementsSwapped = false;
        await swap(arr, jj, jj+1);
        arr = sortContainer.children(); // update with DOM
        while (!elementsSwapped) {/*spinlock*/}
      }
    }
  }
  console.log('DONE SORTING');
  sorting = false; 
  sorted = true;
}

async function selectionSort() {
  console.log('--selectionSort--');
  let arr = sortContainer.children();
  let n = arr.length;
  for (ii=0; ii<n-1; ii++) {
    let minIdx = ii;
    for (jj=ii+1; jj<n; jj++) {
      const currVal = parseInt(arr[jj].id); 
      const minVal = parseInt(arr[minIdx].id); 
      if (currVal < minVal) {
        minIdx = jj;
      }
    }
    if (!sorting) return; // yikes...
    elementsSwapped = false;
    await swap(arr, ii, minIdx);
    arr = sortContainer.children(); // update with DOM
    while (!elementsSwapped) {/*spinlock*/}
  }
  console.log('DONE SORTING');
  sorting = false; 
  sorted = true;
}

async function swap(arr, idx1, idx2) {
  if (sorting) {
    arr[idx1].classList = 'selected';
    arr[idx2].classList = 'selected';
    let neighbour = arr[idx1].previousSibling;
    arr[idx2].after(arr[idx1]);
    neighbour === null ? sortContainer.prepend(arr[idx2]) : neighbour.after(arr[idx2]);
    elementsSwapped = true;
    if (sortSpeed > 0) { await sleep(sortSpeed); }
    arr[idx1].classList = '';
    arr[idx2].classList = '';
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}