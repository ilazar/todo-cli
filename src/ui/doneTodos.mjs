import TodoStore from './todoStore';

const doneTodos = (data, callback) => {
  const store = new TodoStore();
  const { ids } = data;
  store.done(ids);
  callback();
}

export default doneTodos;