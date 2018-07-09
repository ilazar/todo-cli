import TodoStore from './todoStore';

const clearTodos = (data, callback) => {
  const store = new TodoStore();
  const { status } = data;
  store.clear(status);
  callback();
}

export default clearTodos;