// an object - collection of name-value pairs
// see Object - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

// empty object created using Object constructor
const a = new Object();

// empty object created using object literal
const b = {};

// object initialization using object literals
const updated = Date.now();
const identifier = 'id';
const todo = { // todo is a reference to an object
  text: 'learn js', // property
  completed: false,
  'version': 1,
  updated, // es6
  [identifier]: 1
};

// accessing property values
console.assert(todo.completed === false); // dot notation
console.assert(todo['completed'] === false); // bracket notation

// changing property value
todo.completed = true;
console.assert(todo.completed);

// adding a new property
todo._id = '1';
console.assert(todo._id === '1');

// deleting a property
delete todo._id;
console.assert(todo._id === undefined);

// symbols used as property identifiers
const s1 = Symbol('s1');
const c = {
  p1: 1,
  p2: '2',
  [s1]: 3
};
console.assert(c[s1] === 3);

// enumerable own properties
const keys = Object.keys(c); // see also Object.getOwnPropertyNames()
console.assert(JSON.stringify(keys) === '["p1","p2"]');

// symbol own properties
const symbols = Object.getOwnPropertySymbols(c);
console.assert(symbols.length === 1);
console.assert(c[symbols[0]] === 3);

// copying enumerable own properties (es5)
const d = Object.assign({}, c);
console.assert(JSON.stringify(d) === '{"p1":1,"p2":"2"}');
console.assert(c !== d); // different references
console.assert(JSON.stringify(c) === JSON.stringify(d)); // same content

// copying enumerable own properties (es6)
const e = { ...c };
console.assert(JSON.stringify(e) === '{"p1":1,"p2":"2"}');
console.assert(c !== e); // different references
console.assert(JSON.stringify(c) === JSON.stringify(e)); // same content

// destructuring
const f = {
  c,
  p3: 3
};
// instead of writing
// const p1 = f.c.p1, pTwo = f.c.p2, p3 = f.p3;
const { c: { p1, p2: pTwo }, p3 } = f;
console.assert(p1 === 1 && pTwo === '2' && p3 === 3);
