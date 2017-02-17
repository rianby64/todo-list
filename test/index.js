'use strict';
window.location.hash = "";
promise_test(function() { return new Promise(this.step_func((resolve, reject) => {
  document.querySelector('x-fragment').loaded.then((fragment) => {
    var counter = 0;
    fragment.querySelector('[hash=""]').addEventListener('show', this.step_func(e => {
      assert_true(fragment.querySelector('ul.tasks') instanceof HTMLElement);
      counter++;
      exit();
    }));
    fragment.querySelector('[hash="add"]').addEventListener('show', this.step_func(e => {
      counter++;
      assert_true(fragment.querySelector('input[name="description"]') instanceof HTMLElement);
      assert_true(fragment.querySelector('[action="add"]') instanceof HTMLElement);
      exit();
    }));

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
    input.value = "Task 1";
    var btnadd = document.querySelector('[action="add"]');
    btnadd.addEventListener('click', this.step_func(e => {
      var list = document.querySelector('ul.tasks');
      var task = list.lastElementChild;
      assert_true(task instanceof HTMLLIElement);
      assert_equals(task.querySelector('[name="description"]').textContent, input.value);
      assert_equals(task.querySelector('[name="id"]').textContent, list.querySelectorAll('li').length.toString());
      resolve();
    }));
    btnadd.dispatchEvent(new Event('click'));
  }));
}); }, "Add a new task");

promise_test(function() { return new Promise((resolve, reject) => {
  document.querySelector('x-fragment').loaded.then(this.step_func((fragment) => {
    var list = document.querySelector('ul.tasks');
    var task = list.lastElementChild;
    assert_true(task.querySelector('[action="edit"]') instanceof HTMLElement);
    resolve();
  }));
}); }, "Edit last added task");
