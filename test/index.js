'use strict';
window.location.hash = "";
promise_test(function() { return new Promise(this.step_func((resolve, reject) => {
  document.querySelector('x-fragment').loaded.then((fragment) => {
    var counter = 0;
    var handler1 = this.step_func(e => {
      fragment.querySelector('[hash=""]').removeEventListener('show', handler1);
      assert_true(fragment.querySelector('ul.tasks') instanceof HTMLElement);
      counter++;
      exit();
    });
    var handler2 = this.step_func(e => {
      fragment.querySelector('[hash="task"]').removeEventListener('show', handler2);
      counter++;
      assert_true(fragment.querySelector('input[name="description"]') instanceof HTMLElement);
      assert_true(fragment.querySelector('[action="add"]') instanceof HTMLElement);
      exit();
    });
    fragment.querySelector('[hash=""]').addEventListener('show', handler1);
    fragment.querySelector('[hash="task"]').addEventListener('show', handler2);

    function exit() {
      if (counter === 2) {
        resolve();
      }
    }

    window.location.hash = "task";
    window.location.hash = "";
  });
})); }, "Routers are present");

promise_test(function() { return new Promise((resolve, reject) => {
  document.querySelector('x-fragment').loaded.then(this.step_func((fragment) => {
    var input = document.querySelector('input[name="description"]');
    var text = "Task 1";
    input.value = text;
    var btnadd = document.querySelector('[action="add"]');
    var handler = this.step_func(e => {
      btnadd.removeEventListener('click', handler);
      var list = document.querySelector('ul.tasks');
      var task = list.lastElementChild;
      assert_true(task instanceof HTMLLIElement);
      assert_equals(task.querySelector('[name="description"]').textContent, text);
      assert_equals(task.querySelector('[name="id"]').textContent, list.querySelectorAll('li').length.toString());
      assert_equals(input.value, "");
      resolve();
    });
    btnadd.addEventListener('click', handler);
    btnadd.dispatchEvent(new MouseEvent('click'));
  }));
}); }, "Add a new task");

promise_test(function() { return new Promise((resolve, reject) => {
  document.querySelector('x-fragment').loaded.then(this.step_func((fragment) => {
    var list = document.querySelector('ul.tasks');
    var task = list.lastElementChild;

    var edit = task.querySelector('[action="edit"]');
    assert_true(edit instanceof HTMLElement);

    var handler = this.step_func(e => {
      var router = e.detail.router;
      router.removeEventListener('show', handler);
      var edit = router.querySelector('[action="edit"]');
      var text = "Edited task 1";
      var input = document.querySelector('input[name="description"]');
      assert_equals(e.detail.param1, task.querySelector('[name="id"]').textContent);
      assert_equals(input.value, "Task 1");
      assert_true(edit instanceof HTMLElement);
      input.value = text;

      var handler1 = this.step_func(e => {
        edit.removeEventListener('click', handler1);
        var description = task.querySelector('[name="description"]');
        assert_equals(description.textContent, text);
        resolve();
      });
      edit.addEventListener('click', handler1);
      edit.dispatchEvent(new MouseEvent('click'));

    });
    var editRoute = document.querySelector('[hash="task"] [hash="([0-9]+)"]');
    editRoute.addEventListener('show', handler);
    edit.dispatchEvent(new MouseEvent('click'));
  }));
}); }, "Edit last added task");
