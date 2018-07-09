// see https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
// callbacks

// success callback function
function successCallback(number) {
  return `Even number: ${number}`;
}

// failure callback function
function failureCallback(number) {
  return `Odd number: ${number}`;
}

// pass callback functions as arguments
function calculateEvenNumber(number, successCallback, failureCallback) {
  if (number % 2 === 0) {
    // invoke success callback function
    return successCallback(number);
  } else {
    // invoke failure callback function
    return failureCallback(number);
  }
}

console.assert(calculateEvenNumber(8, successCallback, failureCallback) === 'Even number: 8');
console.assert(calculateEvenNumber(13, successCallback, failureCallback) === 'Odd number: 13');

// see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
// promises

function calculateEvenNumber(number) {
  return new Promise((resolve, reject) => {
    if (number % 2 === 0) {
      resolve(number);
    } else {
      reject(number);
    }
  });
}

function onResolve(number) {
  return `Even number: ${number}`;
}

function onReject(number) {
  throw new Error(`Odd number: ${number}`);
}

// promise is resolved
calculateEvenNumber(8)
  .then(onResolve, onReject)
  .then(value => console.assert(value === 'Even number: 8'));

// promise is rejected
calculateEvenNumber(13)
  .then(onResolve, onReject)
  .catch(error => console.assert(error.message === 'Odd number: 13'));

// Promise.all:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// promise will resolve only if all the promise passed are resolved
// if one of the promise fails then the promise is rejected
const promise1 = Promise.resolve(1);
const promise2 = 2;
const promise3 = new Promise(resolve => resolve(3));

Promise.all([promise1, promise2, promise3]).then(values => console.assert(values.toString() === '1,2,3'));


// async-await
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function calculateEvenNumber(number) {
  return new Promise((resolve, reject) => {
    if (number % 2 === 0) {
      setTimeout(() => resolve(`Even number: ${number}`), 100);
    } else {
      reject(new Error(`Odd number: ${number}`));
    }
  });
}

async function foo(number) {
  const result = await calculateEvenNumber(number);
  return result;
}

foo(8).then(value => console.assert(value === 'Even number: 8'));
foo(13).catch(error => console.assert(error.message === 'Odd number: 13'));
