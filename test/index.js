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
    fragment.querySelector('[hash="add"]').addEventListener('show', this.step_func(e => {

      resolve();
    }));

    window.location.hash = "add";
  }));
}); }, "Add a new task");
