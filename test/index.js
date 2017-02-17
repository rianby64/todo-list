'use strict';
window.location.hash = "";
promise_test(function() { return new Promise(this.step_func((resolve, reject) => {
  document.querySelector('x-fragment').loaded.then((fragment) => {
    var counter = 0;
    var handler1 = this.step_func(e => {
      assert_true(fragment.querySelector('ul.tasks') instanceof HTMLElement);
      counter++;
      fragment.querySelector('[hash=""]').removeEventListener('show', handler1);
      exit();
    });
    var handler2 = this.step_func(e => {
      counter++;
      assert_true(fragment.querySelector('input[name="description"]') instanceof HTMLElement);
      assert_true(fragment.querySelector('[action="add"]') instanceof HTMLElement);
      fragment.querySelector('[hash="add"]').removeEventListener('show', handler2);
      exit();
    });
    fragment.querySelector('[hash=""]').addEventListener('show', handler1);
    fragment.querySelector('[hash="add"]').addEventListener('show', handler2);

    function exit() {
      if (counter === 2) {
        resolve();
      }
    }

    window.location.hash = "add";
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
      var list = document.querySelector('ul.tasks');
      var task = list.lastElementChild;
      assert_true(task instanceof HTMLLIElement);
      assert_equals(task.querySelector('[name="description"]').textContent, text);
      assert_equals(task.querySelector('[name="id"]').textContent, list.querySelectorAll('li').length.toString());
      assert_equals(input.value, "");
      btnadd.removeEventListener('click', handler);
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
    var editRoute = document.querySelector('[hash="add"] [hash="([0-9]+)"]');
    var handler = this.step_func(e => {
      editRoute.removeEventListener('show', handler);
      assert_equals(e.detail.param1, task.querySelector('[name="id"]').textContent);
      resolve();
    });
    editRoute.addEventListener('show', handler);
    edit.dispatchEvent(new MouseEvent('click'));
  }));
}); }, "Edit last added task");
