(() => {
  'use strict';

  document.querySelector('[hash=""]').addEventListener('show', e => {
    var frame = e.detail.router;
    return frame;
  });

  document.querySelector('[hash="add"]').addEventListener('show', e => {
    var frame = e.detail.router;
    return frame;
  });

  document.querySelector('[action="add"]').addEventListener('click', () => {
    var frame = document.querySelector('[hash="add"]');
    var list = document.querySelector('ul.tasks');
    var input = document.querySelector('input[name="description"]');

    var li = document.importNode(frame.querySelector('template').content, true);
    var id = li.querySelector('[name="id"]');
    var edit = li.querySelector('[action="edit"]');
    var description = li.querySelector('[name="description"]');
    description.textContent = input.value;
    list.appendChild(li);
    id.textContent = list.children.length;

    edit.href = `#add/${id.textContent}`;
    input.value = '';
  });
})();
