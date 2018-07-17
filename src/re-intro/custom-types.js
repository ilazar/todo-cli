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

class B {
  constructor({ p }) {
    this.p = p;
  }
  method() {
    return this.p;
  }
  static staticMethod(b) {
    return b.p;
  }
}

const b = new B({ p: 'b' });
console.assert(b instanceof B);
console.assert(b.p === 'b');
console.assert(b.method() === 'b');
console.assert(B.staticMethod(b) === 'b');

class D extends B {
  constructor({ q, ...rest }) {
    super(rest);
    this.q = q;
  }
  method() {
    return super.method() + this.q;
  }
}

const d = new D({ p: 'b', q: 'd' });
console.assert(d instanceof B && d instanceof B);
console.assert(d.p === 'b' && d.q === 'd');
console.assert(d.method() === 'bd');
