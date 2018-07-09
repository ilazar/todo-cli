import TodoStore from './todoStore';

const doneTodos = (data, callback) => {
  const store = new TodoStore();
  const {
    todoId,
    todoText,
  } = data;
  store.update(todoId, todoText);
  callback();
}

export default doneTodos;