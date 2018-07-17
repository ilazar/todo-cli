// setTimeout - sets a timer which executes a function once, after the timer expires
setTimeout(() => console.assert(true), 10);

// callbacks
const taskCallback = ({ name, duration = 10 }, callback) => setTimeout(() => {
  if (duration > 100) { // max duration
    callback(new Error(`${name} timeout`));
  }  else {
    callback(null, name);
  }
}, duration);

// chaining: a then b (if a fails, then b should not be executed)
taskCallback({ name: 'a' }, (err, a) => {
  if (err) {
    console.assert(err.message === 'a timeout');
  } else {
    console.assert(a === 'a');
    taskCallback({ name: 'b' }, (err, b) => {
      if (err) {
        console.assert(err.message === 'b timeout');
      } else {
        console.assert(b === 'b');
      }
    });
  }
});

// callback hell: a then b then c (if any fails, the next tasks should not be executed)
// exercise

// parallel execution: a & b in parallel, then c (if one of a or b fails, the other should be cancelled and c should not execute)
(() => {
  let a = null;
  let b = null;
  let error = null;
  taskCallback({ name: 'a', duration: 20 }, (err, res) => {
    if (err) {
      error = err;
    } else {
      a = res;
    }
  });
  taskCallback({ name: 'b', duration: 30 }, (err, res) => {
    if (err) {
      error = err;
    } else {
      b = res;
    }
  });
  const join = () => {
    if (a && b) {
      console.assert(`${a}${b}` === 'ab');
      taskCallback({ name: 'c' }, (err, res) => {
        if (err) {
          console.assert(e.message.includes('timeout'));
        } else {
          console.assert(`${a}${b}${res}` === 'abc');
        }
      });
    } else if (error) {
      console.assert(error.message.includes('timeout'));
    } else {
      setTimeout(join, 5);
    }
  };
  join();
})();

// promises - represent the eventual completion (or failure) of an asynchronous
// operation, and its resulting value
const taskPromise = ({ name, duration = 10 }) =>
  new Promise((resolve, reject) => setTimeout(() => {
    if (duration > 100) { // max duration
      reject(new Error(`${name} timeout`));
    }  else {
      resolve(name);
    }}, duration)
  );

// chaining: a then b (if a fails, then b should not be executed)
taskPromise({ name: 'a' })
  .then(a => {
    taskPromise({ name: 'b' })
      .then(b => {
        console.assert(`${a}${b}` === 'ab');
      })
      .catch(err => console.assert(err.message === 'b timeout'));
  })
  .catch(err => console.assert(err.message === 'a timeout'));

// parallel execution: a & b in parallel, then c (if one of a or b fails, the other should be cancelled and c should not execute)
Promise.all([taskPromise({ name: 'a' }), taskPromise({ name: 'b' })])
  .then(res1 => {
    console.assert(`${res1.join('')}` === 'ab');
    taskPromise({ name: 'c' })
      .then(res2 => console.assert(`${res1.join('')}${res2}` === 'abc'))
  })
  .catch(err => console.assert(err.message.includes('timeout')));

// async-await
// chaining: a then b (if a fails, then b should not be executed)
(async () => {
  try {
    const a = await taskPromise({ name: 'a' });
    const b = await taskPromise({ name: 'b' });
    console.assert(`${a}${b}` === 'ab');
  } catch(err) {
    console.assert(err.message.includes('timeout'));
  }
})();

// parallel execution: a & b in parallel, then c (if one of a or b fails, the other should be cancelled and c should not execute)
(async () => {
  try {
    const [a, b] = await Promise.all([taskPromise({ name: 'a' }), taskPromise({ name: 'b' })]);
    const c = await taskPromise({ name: 'c' });
    console.assert(`${a}${b}${c}` === 'abc');
  } catch(err) {
    console.assert(err.message.includes('timeout'));
  }
})();
