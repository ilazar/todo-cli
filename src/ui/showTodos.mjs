import TodoStore from './todoStore';

const showTodos = (data, callback) => {
  const store = new TodoStore();
  const { status } = data;
  store.show(status);
  callback();
}

export default showTodos;