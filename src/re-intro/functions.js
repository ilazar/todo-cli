// es5 function definition
function add(a, b) { // a, b parameters, function scope
  const c = a + b; // local variable, block scope
  return c;
}
console.assert(typeof add === 'function');
console.assert(add(1, 2) === 3);
console.assert(add(1, 2, 3) === 3); // third params ignored by add

// arguments - array representing all passed arguments
function addAll() {
  var sum = 0; // function scope
  for (let i = 0, j = arguments.length; i < j; i++) { // i, block scope
    sum += arguments[i];
  }
  return sum;
}
console.assert(addAll(1, 2, 3) === 6);

// es6 arrow functions
const add2 = (a, b) => a + b;
const addAll2 = (...args) => { // rest params
  let sum = 0;
  for (let value of args) {
    sum += value;
  }
  return sum;
};
console.assert(add2(1, 2) === 3 && addAll(1, 2, 3) === 6);

// returns undefined when no return is made
let f = () => {};
console.assert(f() === undefined);

// returning references to objects created by functions
f = () => ({ p1: 1 });
console.assert(f().p1 === 1);

// inner functions used to write code top-down
function g() {
  const a = 1;
  g1(); // function definitions are hoisted (used/called before declaration)
  g2(a);
  function g1() {} // can use a
  function g2(x) {} // use x, preferred
}

// closures - returning functions
const plus = x =>
    y => x + y;
const inc = plus(1);
// param x (= 1) not destroyed after the plus call stack is destroyed
// kept alive in a closure - an object created to store the variables used by
// the returned function y => x + y
console.assert(inc(2) === 3);

// closures - returning objects, immediately invoked function
const idGen = (() => { // typical js module
  let lastId = 0; // private representation, variable kept by a closure
  return { // public interface, an object
    next: () => ++lastId // having a method which uses a local variable
  }
})(); //invoke function
console.assert(Object.keys(idGen).length === 1);
console.assert(idGen.next() === 1);
console.assert(idGen.next() === 2);

// iterators - accessing items of a collection one at the time, while
// keeping track of the current position
const makeIterator = array => {
  let nextIndex = 0;
  return { // iterator
    next: () =>
      (nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true })
  }
};
const it = makeIterator(['foo', 'bar']);
const next = it.next();
console.assert(next.value === 'foo' && next.done === false);
console.assert(it.next().value === 'bar');
console.assert(it.next().done);

// generators - functions that maintain their own state
// writing iterative algorithms which can be paused and resumed
function* sayHello(name) {
  if (!name) {
    name = yield "your name please";
  }
  return `hello ${name}`;
}
const gen = sayHello(); // returns an object that can be used to control the behavior of say hello
const firstResult = gen.next(); // sayHello execution begins now
console.assert(firstResult.value === 'your name please' && !firstResult.done); // sayHello is paused
const secondResult = gen.next('john'); // sayHello is resumed, passing 'John' to sayHello
console.assert(secondResult.value === 'hello john' && secondResult.done); // execution stops, no next result

// iterables - objects providing iterators according to the standard conventions
const myObj = {};
myObj[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
};
let i = 0;
for (let value of myObj) {
  console.assert(value === ++i);
}
console.assert(JSON.stringify([...myObj]) === '[1,2]');