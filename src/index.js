require("regenerator-runtime/runtime");
require('./re-intro');

// data
import Item from './Item';

const items = [];

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

const insert = item => items.push(item);

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
      console.log('*****');
      items.splice(i, 1);
    }
  }
};

const find = props => items
  .filter(item => match(props, item))
  .map(item => ({ ...item }));

const count = props => items
  .reduce((acc, item) => (match(props, item) ? acc + 1 : acc), 0);

// ui

console.log('add js and node items');
const jsItem = new Item('js', true);
insert(jsItem);
insert(new Item('node', false));
console.log(find({}));

console.log('validate');
console.log(jsItem.validate());
console.log(new Item().validate());

console.log('find by text, then by status');
console.log(find({ text: 'node' }));
console.log(find({ isActive: true} ));

console.log('update');
update({ id: 2 }, { isActive: true });
console.log(find({}));

console.log('remove');
remove({ text: 'js' });
console.log(find({}));

console.log('count');
console.log(count({ }));

