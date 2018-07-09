import TodoStore from './todoStore';

const deleteTodos = (data, callback) => {
  const store = new TodoStore();
  const { ids } = data;
  store.delete(ids);
  callback();
}

export default deleteTodos;