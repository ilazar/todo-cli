import { ItemRestClient } from './ItemRestClient';

let cachedItems = null;

const subscribers = [];

export const subscribe = listener => subscribers.push(listener);

const itemRestClient = new ItemRestClient();

export const createItem = async (item) => {
  const createdItem = await itemRestClient.create(item);
  onCreatedItem(item);
};

export const onCreatedItem = item => {
  const index = cachedItems.findIndex(item => createdItem.id === item.id);
  if (index === -1) {
    cachedItems.push(createdItem);
    notifyUpdates();
  }
};

export const getItems = async () => {
  if (cachedItems) {
    return cachedItems;
  }
  cachedItems = await itemRestClient.search({});
  notifyUpdates();
};

const notifyUpdates = () => subscribers.forEach(listener => listener(cachedItems));

export const removeItem = async (id) => {
  await itemRestClient.remove(id);
  onRemovedItem({ id });
};

export const onRemovedItem = ({ id }) => {
  const index = cachedItems.findIndex(item => id === item.id);
  if (index !== -1) {
    cachedItems.splice(index, 1);
  }
  notifyUpdates();
};

export const onUpdatedItem = item => {
  const index = cachedItems.findIndex(it => item.id === it.id);
  if (index !== -1) {
    cachedItems.splice(index, 1, item);
  } else {
    cachedItems.push(item);
  }
  notifyUpdates();
};
