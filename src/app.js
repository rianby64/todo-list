'use strict';

document.querySelector('[hash=""]').addEventListener('show', e => {
  var frame = e.detail.router;
});

document.querySelector('[hash="add"]').addEventListener('show', e => {
  var frame = e.detail.router;
});

document.querySelector('[action="add"]').addEventListener('click', e => {
  var list = document.querySelector('ul.tasks');
  var input = document.querySelector('input[name="description"]');
  var li = document.createElement('li');
  var description = document.createElement('span');
  description.setAttribute('name', 'description');
  description.textContent = input.value;
  li.appendChild(description);
  list.appendChild(li);
});
