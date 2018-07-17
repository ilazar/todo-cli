require("regenerator-runtime/runtime");
require('./re-intro');

// data

const items = [];

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
const i1 = { text: 'learn js', isActive: true };
const i2 = { text: 'learn node', isActive: false };
console.log(i1, i2);

console.log('add items');
items.push(i1);
insert(i2);
console.log(items);

console.log('change item');
i1.id = 1;
items[1].id = 2;
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

