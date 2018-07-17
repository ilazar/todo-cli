// prototypes

// constructor function
function Item(text, isActive) {
  this.text = text;
  this.isActive = isActive;
}

const item = new Item('js', true);
console.assert(item.text === 'js' && item.isActive);
console.assert(typeof item === 'object');
console.assert(item.toString() === '[object Object]');

console.assert(Item.prototype !== null);
console.assert(Object.keys(Item.prototype).length === 0);

Item.prototype.toString = function() {
  return `${this.text},${this.isActive}`
};

console.assert(Object.keys(Item.prototype).length === 1);
console.assert(item.toString() === 'js,true');

console.assert(item instanceof Item); // tests whether the prototype prop of
                                      // a constructor appears in the prototype chain

// classes