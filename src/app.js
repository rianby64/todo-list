(() => {
  'use strict';

  document.querySelector('[hash="tasks"] [hash="([a-z]+)"]')
    .addEventListener('show', (e) => {
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

})();
