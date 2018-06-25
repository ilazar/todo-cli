// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
// an array is an object

// array literal
const a = [1, 'hello'];
console.assert(typeof a === 'object'); // an array is an object
console.assert(Array.isArray(a)); // testing if an instance is an array

// array constructor
const b = new Array(2);
b[0] = 1; // set value
console.assert(typeof b === 'object');
console.assert(Array.isArray(b));
console.assert(b[1] === undefined);

// accessing elements & length
const c = [1, 2];
console.assert(c[0] === 1 && c[1] === 2);
console.assert(typeof c.length === 'number' && c.length === 2); // readonly

// map

// filter

// reduce

// slice

// splice

// some

// find

// findIndex