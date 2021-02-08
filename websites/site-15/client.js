const container = $('#container');
const input = $('#input');
const btn = $('#btn');

function moveNote(el, xx, yy) {
  el.style.left = (xx - parseInt(el.getAttribute('data-offset-x'))) + 'px';
  el.style.top = (yy - parseInt(el.getAttribute('data-offset-y'))) + 'px';
}

function dragHandler(e) {
  const box = e.target.getBoundingClientRect(); 
  e.target.classList.add('dragging');
  e.target.setAttribute('data-offset-x', e.clientX - box.left);
  e.target.setAttribute('data-offset-y', e.clientY - box.top);
  moveNote(e.target, e.pageX, e.pageY);
}

function editHandler(e) {
  e.stopPropagation();
  const txt = e.target.innerHTML;
  e.target.innerHTML = '';
  e.target.previousSibling.style.display = 'block';
  e.target.previousSibling.innerHTML = txt;
}

$(window).on('mousemove', e => {
  if (document.querySelector('.dragging')) {
    moveNote(document.querySelector('.dragging'), e.pageX, e.pageY);
  }
})

$(window).on('mouseup', e => {
  if (document.querySelector('.dragging')) {
    document.querySelector('.dragging').classList.remove('dragging');
  }
});

$(window).on('mousedown', e => {
  const notes = container.children();
  for (ii = 0; ii < notes.length; ii++) {
    const content = $(notes[ii]).children()[0];
    const txtarea = $(content).children()[0];
    if (txtarea.style.display !== 'none') {
      const txt = $(content).children()[1];
      txt.innerHTML = txtarea.value === '' ? '[enter text]' : txtarea.value;
      txtarea.style.display = 'none';
    }
  } 
})

btn.on('click', e => {
  spawnNote(input[0].value);
})

function spawnNote(msg) {
  const note = document.createElement('div');
  const con = document.createElement('div');
  const txt = document.createElement('div');
  const edit = document.createElement('TEXTAREA');

  note.classList = 'note';
  note.style.top = '150px';
  note.style.left = '50%';

  con.classList = 'note-content';
  txt.innerHTML = msg === '' ? 'Enter a note' : msg; 

  edit.style.display = 'none';
  edit.innerHTML = con.innerHTML;

  $(con).append(edit);
  $(con).append(txt);
  $(note).append(con);
  $(note).on('mousedown', dragHandler);
  $(txt).on('mousedown', editHandler);
  $(con).on('mousedown', e => {e.stopPropagation()})

  container.append(note);
}