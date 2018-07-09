import TodoStore from './todoStore';

const addTodo = (data, callback) => {
  const store = new TodoStore();
  const { todoText } = data;
  store.add(todoText);
  callback();
}

export default addTodo;