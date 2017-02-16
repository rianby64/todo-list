'use strict';
window.location.hash = "";
promise_test(() => { return new Promise((resolve, reject) => {
  document.querySelector('x-fragment').loaded.then((fragment) => {
    var counter = 0;
    fragment.querySelector('[hash=""]').addEventListener('show', e => {
      counter++;
      exit();
    });
    fragment.querySelector('[hash="add"]').addEventListener('show', e => {
      counter++;
      exit();
    });

    function exit() {
      if (counter === 2) {
        resolve();
      }
    }

    window.location.hash = "add";
    window.location.hash = "";
  });

}); }, "Routers are present");
