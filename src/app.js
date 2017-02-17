(() => {
  'use strict';

  document.querySelector('[hash="tasks"]').addEventListener('show', () => {
  });

  document.querySelector('[hash="task"] [hash="new"]').addEventListener('show', () => {
    var input = document.querySelector('input[name="description"]');
    input.value = '';
  });

  document.querySelector('[action="add"]').addEventListener('click', () => {
    var frame = document.querySelector('[hash="task"]');
    var list = document.querySelector('ul.tasks');
    var input = document.querySelector('input[name="description"]');

    var tmpl = document.importNode(frame.querySelector('template').content, true);

    var li = tmpl.querySelector('li');
    var id = tmpl.querySelector('[name="id"]');
    var edit = tmpl.querySelector('[action="edit"]');
    var description = tmpl.querySelector('[name="description"]');

    list.appendChild(tmpl);

    description.textContent = input.value;
    id.textContent = list.children.length;
    li.id = 'task-' + id.textContent;
    edit.href = `#task/${id.textContent}`;

    input.value = '';
  });

  document.querySelector('[hash="task"] [hash="([0-9]+)"]')
    .addEventListener('show', e => {
      var id = document.querySelector('input[name="id"]');
      var input = document.querySelector('input[name="description"]');
      var task = document.querySelector('#task-' + e.detail.param1);
      var description = task.querySelector('[name="description"]');

      id.value = e.detail.param1;
      input.value = description.textContent;
    });

  document.querySelector('[hash="task"] [hash="([0-9]+)"] [action="edit"]')
    .addEventListener('click', () => {
      var id = document.querySelector('input[name="id"]');
      var input = document.querySelector('input[name="description"]');
      var task = document.querySelector('#task-' + id.value);
      var description = task.querySelector('[name="description"]');

      description.textContent = input.value;
    });
})();
