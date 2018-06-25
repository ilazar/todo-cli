// Number type

// integer
console.assert(typeof 1 === 'number');
console.assert(typeof parseInt('1') === 'number'); // global func

// float
console.assert(typeof 1.5 === 'number');
console.assert(typeof parseFloat('1.5') === 'number'); // global func

// infinity
console.assert(1 / 0 === Infinity);
console.assert(typeof Infinity === 'number');

// not a number
console.assert(typeof NaN === 'number');
console.assert((NaN === NaN) === false);
console.assert(isNaN(0 / 0)); // global function
console.assert(isNaN(NaN + 1));
console.assert(isNaN(parseInt('a')));

// Number class - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
var a = Number(1);
console.assert(typeof a === 'number');

var b = new Number(1); // wrapper object
console.assert(typeof b === 'object');

// arithmetic operations
console.assert(1 + 2 * 3 === 7);
console.assert((1 + 2) * 3 === 9);

// bitwise operations
console.assert((1 & 2) === (parseInt('01', 2) & parseInt('10', 2))); // 0
console.assert((1 | 2) === (parseInt('01', 2) | parseInt('10', 2))); // 3
