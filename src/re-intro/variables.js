// VARIABLES

// undefined
var a; // not initialized
console.assert(a === undefined); // undefined is a value and a keyword
console.assert(typeof undefined === 'undefined'); // undefined is also a type

// null
a = null; // special value for "it does not reference any object"
console.assert(a === null);
console.assert(typeof a === 'object'); // object is a type

// read-only variables - cannot be re-assigned
const b = 1;
// b = 2; // error

// let variables - can change their value
let c = 2;
c = 3;
console.assert(c === 3);

// module scope - variables declared with var/const/let, not inside of a function or object
// they can be accessed within the same file (module) but not in other files
