'use strict';

document.querySelector('[hash=""]').addEventListener('show', e => {
  var frame = e.detail.router;
});

document.querySelector('[hash="add"]').addEventListener('show', e => {
  var frame = e.detail.router;
});

document.querySelector('[action="add"]').addEventListener('click', e => {
  var frame = document.querySelector('[hash="add"]');
  var list = document.querySelector('ul.tasks');
  var input = document.querySelector('input[name="description"]');

  var li = document.importNode(frame.querySelector('template').content, true);
  var description = li.querySelector('span');
  description.textContent = input.value;
  list.appendChild(li);
});
