// String type
var a = 'js'; // reference to an immutable object
console.assert(typeof a === 'string');

// string content
console.assert(a[0] === 'j' && a[1] === 's');
console.assert(typeof a.length === 'number' && a.length === 2); // readonly

// equality
a = 'node'; // reference to a new immutable object
var b = 'node'; // reference to a new immutable object
var c = b;
console.assert(a === b); // referenced values are equal
console.assert(b === c); // references are equal

// comparison
console.assert('aa' < 'ab');
console.assert('ab' > 'aa');

// methods - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
console.assert('abc'.indexOf('b') === 1);
console.assert('abc'.indexOf('bb') === -1);
