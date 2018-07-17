require("regenerator-runtime/runtime");
require('./re-intro');

// data

const items = [];

function Item(text, isActive) {
  this.text = text;
  this.isActive = isActive;
}

function insert(item) {
  items.push(item);
}

const findOne = id => items.find(item => item.id === id);

const match = (props, item) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (props[key] !== item[key]) {
      return false;
    }
  }
  return true;
};

const find = props => items
  .filter(item => match(props, item))
  .map(item => ({ ...item }));

const update = (props, item) => {
  items.forEach((it, index) => {
    if (match(props, it)) {
      Object.assign(items[index], item);
    }
  });
};

const remove = props => {
  for (let i = items.length - 1; i >= 0; i--) {
    if (match(props, items[i])) {
      items.splice(i, 1);
    }
  }
};

const count = props => items
  .reduce((acc, item) => (match(props, item) ? acc + 1 : acc), 0);

// ui

console.log('create items');
const isActive = false;
const text = '1. Create a todo item.';
const version = 1;
const updated = Date.now();

const i0 = { isActive, text, updated, version };
const i1 = { text: 'learn js', isActive: true };
const i2 = new Item('learn node', false);
console.log(i0, i1, i2);

console.log('add items');
items.push(i0);
insert(i1);
insert(i2);
console.log(items);

console.log('change item');
i1.id = 1;
items[2].id = 2;
console.log(items);

console.log('findOne by id');
console.log(findOne(1));
console.log(findOne(3));
findOne(1).id = 10;
console.log(items);

console.log('find by props');
console.log(find({ id: 2 }));
console.log(find({ isActive: true} ));

console.log('update');
update({ id: 2 }, { isActive: true });
console.log(find({}));

console.log('remove');
remove({ id: 2 });
console.log(find({}));

console.log('count');
console.log(count({ id: 10 }));
console.log(count({ }));

