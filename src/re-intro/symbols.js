// Symbol - see http://exploringjs.com/es6/ch_symbols.html

var s1 = Symbol(); // factory returning unique values of type 'symbol'
console.assert(typeof s1 === 'symbol'); // symbol is a type

var s2 = Symbol('foo');
var s3 = Symbol('foo');
console.assert(s2 !== s3); // 'foo' is a description used only for debugging
console.assert(s2.toString() === 'Symbol(foo)');

// Symbols can be used as an identifier for object properties (unique property keys)

// Symbols can be used to represent enumerations instead of using strings