const btn = $('#addBtn');
$(btn).on('click', e => {
  $('#container').append(spawnDraggable());
});
$('body, html').mousedown(function(e) { e.preventDefault(); });// Prevent Defaults

const moveElement = (el, xx, yy) => {
  const halfWidth = (el.clientWidth/2);
  const halfHeight = (el.clientHeight/2);
  el.style.left = (xx - halfWidth) + 'px';
  el.style.top = (yy - halfHeight) + 'px';
}

const dragHandler = (e) => {
  e.target.classList.add('dragging');
  e.target.style.z
  moveElement(e.target, e.pageX, e.pageY);
}

$(window).on('mousemove', e => {
  if (document.querySelector('.dragging')) {
    moveElement(document.querySelector('.dragging'), e.pageX, e.pageY);
  }
})
$(window).on('mouseup', e => {
  if (document.querySelector('.dragging')) {
    document.querySelector('.dragging').classList.remove('dragging');
  }
});

const spawnDraggable = () => {
  const div = document.createElement('div');
  div.classList = 'draggable';
  div.style.top = `${Math.floor(Math.random()*($(document).height() - 100))}px`;
  div.style.left = `${Math.floor(Math.random()*($(document).width() - 100))}px`;
  div.style.backgroundColor = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
  $(div).on('mousedown', dragHandler);
  return div;
}
