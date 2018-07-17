import { Issue, SEVERITY, ValidationError } from './core';
import Item from './Item';
import { idGenerator } from './utils';

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

export class ItemStore {
  constructor() {
    this.items = [];
  }

  insert(item) {
    ItemStore.ensureValidItem(item);
    item.id = idGenerator.next();
    this.items.push({ ...item });
    return item;
  }

  update(props, item) {
    let count = 0;
    this.items.forEach((it, index) => {
      if (match(props, it)) {
        const updatedItem = Object.assign(new Item(), this.items[index], item);
        ItemStore.ensureValidItem(updatedItem);
        Object.assign(this.items[index], item);
        count++;
      }
    });
    return count;
  }

  remove(props) {
    let count = 0;
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (match(props, this.items[i])) {
        this.items.splice(i, 1);
        count++;
      }
    }
    return count;
  }

  find(props) {
    return this.items
      .filter(item => match(props, item))
      .map(item => ({ ...item }));
  }

  count(props) {
    return this.items
      .reduce((acc, item) => (match(props, item) ? acc + 1 : acc), 0);
  }

  static ensureValidItem(item) {
    if (!item) {
      throw new ValidationError([new Issue(SEVERITY.WARNING, 'item', 'Invalid argument')]);
    }
    const issues = item.validate();
    if (issues.length > 0) {
      throw new ValidationError(issues);
    }
  }
}
