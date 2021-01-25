//Credit: Dev Ed (https://www.youtube.com/watch?v=Ttf3CEsEwMQ) for the helpful tute.
const searchBtn = document.getElementById('search-btn');
const addItemBtn = document.getElementById('add-item-btn');
const addItemInput = document.getElementById('addtaskbar'); 

// Search
searchBtn.addEventListener('click', e => {
  console.log('SEARCH');
});

// Add Item
addItemBtn.addEventListener('click', e => {
  addItem(addItemInput.value);
});

function addItem(desc) {
  let div = document.createElement('div');
  let li = document.createElement('li');
  div.classList = 'list-item';

  li.innerHTML = desc;

  let crossIcon = document.createElement('i');
  crossIcon.classList = 'material-icons';
  crossIcon.innerHTML = 'close'; 
  let checkIcon = document.createElement('i');
  checkIcon.classList = 'material-icons';
  checkIcon.innerHTML = 'check';

  let crossBtn = document.createElement('button');
  crossBtn.classList = 'cross-btn';
  crossBtn.appendChild(crossIcon);
  crossBtn.addEventListener('click', e => {
    let todo = e.target.parentElement;
    if (!e.target.classList.contains('cross-btn')) { // if we touched the icon...
      todo = todo.parentElement;
    }
    todo.remove();
  })
  let checkBtn = document.createElement('button');
  checkBtn.classList = 'check-btn';
  checkBtn.appendChild(checkIcon);
  checkBtn.addEventListener('click', e => {
    div.classList.contains('completed') ? 
      div.classList.remove('completed') : div.classList.add('completed');
  })

  div.appendChild(li);
  div.appendChild(checkBtn);
  div.appendChild(crossBtn);
  document.querySelector('.todo-list').appendChild(div); 

  addItemInput.value = '';
}

function searchFilter() {

}