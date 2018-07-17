require("regenerator-runtime/runtime");
require('./re-intro');

import Item from './Item';
import { ItemStore } from './ItemStore';

const itemStore = new ItemStore();

try {
  const item = itemStore.insert(new Item('js', false));
  console.log(item);
  itemStore.insert(new Item('node', true));
  itemStore.update({ id: 1 }, { isActive: false });
  itemStore.remove({ text: 'js' });
  console.log(itemStore.find({}));
  console.log(itemStore.count({}));
  itemStore.insert(new Item());
} catch(error) {
  console.log(error.issues);
}

