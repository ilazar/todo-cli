import { Issue, SEVERITY, ValidationError } from './core';
import Item from './Item';
import { idGenerator } from './utils';

this.items = [];

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

const ensureValidItem = item => {
  if (!item) {
    throw new ValidationError([new Issue(SEVERITY.WARNING, 'item', 'Invalid argument')]);
  }
  const issues = item.validate();
  if (issues.length > 0) {
    throw new ValidationError(issues);
  }
};

const fetch = (url, { method = 'GET', body = {}}) => // mock implementation
  new Promise((resolve, reject) => setTimeout(() => {
    try {
      const [base, id] = url.split('/');
      switch (method) {
        case 'GET': {
          if (id) {
            resolve(items.find(item => item.id === id));
          } else {
            resolve(
              items
                .filter(item => match(props, item))
                .map(item => ({...item}))
            );
          }
          break;
        }
        case 'POST': {
          const item = {...body};
          item.id = idGenerator.next();
          ensureValidItem(item);
          items.push(item);
          resolve(item);
          break;
        }
        case 'PUT': {
          const item = {...body};
          ensureValidItem(item);
          const index = items.findIndex(it => item.id === it.id);
          if (index !== -1) {
            items[index] = item;
            resolve(item);
          } else {
            reject(new ApiError(new Issue(SEVERITY.INFO, 'id', 'Item not found')));
          }
          break;
        }
        case 'DELETE': {
          const index = items.findIndex(it => item.id === it.id);
          if (index !== -1) {
            items.splice(index, 1);
          }
          resolve();
          break;
        }
      }
    } catch(error) {
      resolve(new ApiError(error instanceof ValidationError
        ? error.issues
        : [new ApiError(new Issue(SEVERITY.ERROR, 'api', 'Unexpected error'))]));
    }
  }, 100));

export class ItemRestClient {
  async create(item) {
    return await fetch('items', { method: 'GET' });
  }

  async read(id) {
    return await fetch(`items/${id}`, { method: 'GET' });
  }

  async update(item) {
    return await fetch(`items/${item.id}`, { method: 'PUT', body: item });
  }

  async remove(id) {
    return await fetch(`items/${item.id}`, { method: 'DELETE' });
  }

  async search(props) {
    const params = Object.keys(props).map(key => `&${key}=${props[key]}`);
    return await fetch(`items?${params.length > 0 ? params.substring(1) : ''}`, { method: 'GET' });
  }
}
