(() => {
  'use strict';

  document.querySelector('[hash="tasks"] [hash="([a-z]+)"]').addEventListener('show', (e) => {
    var filter = e.detail.param1;
    var frame = e.detail.router;
    var tasks = [].slice.call(frame.querySelectorAll('li'));
    tasks.forEach(task => {
      task.hidden = false;
      if (filter === 'all') { return; }
      if (task.getAttribute('status') !== filter) {
        task.hidden = true;
      }
    });
  });

  document.querySelector('[hash="task"] [hash="new"]')
    .addEventListener('show', () => {
      var input = document.querySelector('input[name="description"]');
      input.value = '';
    });

  document.querySelector('[action="add"]')
    .addEventListener('click', () => {
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
      li.setAttribute('status', 'active');
      edit.href = `#task/${id.textContent}`;

      li.querySelector('[status="done"]').addEventListener('click', e => {
        li.setAttribute('status', 'done');
      });

      li.querySelector('[status="active"]').addEventListener('click', e => {
        li.setAttribute('status', 'active');
      });

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
