// Boolean type

// true and false values
var done = true;
console.assert(typeof done === 'boolean');
done = false; // re-assign

// logical operators
console.assert(true && true === true);
console.assert(true && false === false);
console.assert(!true === false);
console.assert(!false === true);

// Boolean class - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean