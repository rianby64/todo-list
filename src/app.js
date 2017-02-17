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
  var id = li.querySelector('[name="id"]');
  var description = li.querySelector('[name="description"]');
  description.textContent = input.value;
  list.appendChild(li);
  id.textContent = list.children.length;
});
