import Todo from './todo';
import genereateUniqueId from './utils/genereateUniqueId';

const SUPPORTED_TODO_STATUS = ['active', 'all', 'completed'];
let singletonInstance;

class TodoStore {
  constructor() {
    if (!singletonInstance) {
      singletonInstance = this;
    }
    this.todos = [];
    return singletonInstance;
  }

  /**
   * Function to add a todo item
   * @param {string} text - the todo text
  */
  add(text) {
    const todo = new Todo(text);
    const id = genereateUniqueId();
    const todoItem = {
      id,
      ...todo,
    };
    this.todos.push(todoItem);
    console.log('Todos list:', this.todos);
  }

  /**
   * Function to clear todo items
   * @param {string} status - one of 'active' | 'all' | 'completed'
  */
  clear(status) {
    let todos;
    const statusIndex = SUPPORTED_TODO_STATUS.findIndex(supportedStatus => supportedStatus === status);
    const isSupportedStatus = statusIndex >= 0;
  
    if (!status || !isSupportedStatus) {
      console.log('Todo status unknown:', status);
      return;
    }

    if (status === 'active') {
      todos = this.todos.filter(todo => todo.completed);
    }

    if (status === 'all') {
      todos = [];
    }

    if (status === 'completed') {
      todos = this.todos.filter(todo => !todo.completed);
    }
    this.todos = todos;
    console.log('Todos list:', todos);
  }

  /**
   * Function to mark todo as done
   * @param {Array} ids - a list of todo id to be marked as done
  */
  done(ids) {
    ids.map(id => {
      const todo = this.todos.find(todo => todo.id === id);
      const index = this.todos.findIndex(todo => todo.id === id);
      const updatedTodo = {
        ...todo,
        completed: true,
      };
      this.todos.splice(index, 1, updatedTodo);
    });
    console.log('Todos list:', this.todos);
  }

  /**
   * Function to delete todos
   * @param {Array} ids - a list of todo id to be deleted
  */
  delete(ids) {
    ids.map(id => {
      const index = this.todos.findIndex(todo => todo.id === id);
      const removedTodo = this.todos.splice(index, 1);
      console.log('Removed todo:', removedTodo);
    });
    console.log('Todos list:', this.todos);
  }

  /**
   * Function to display todo items
   * @param {string} status - one of 'active' | 'all' | 'completed'
  */
  show(status) {
    let todos;
    const statusIndex = SUPPORTED_TODO_STATUS.findIndex(supportedStatus => supportedStatus === status);
    const isSupportedStatus = statusIndex >= 0;

    if (!status || !isSupportedStatus) {
      console.log('Todo status unknown:', status);
      return;
    }

    if (status === 'active') {
      todos = this.todos.filter(todo => !todo.completed);
    }

    if (status === 'all') {
      todos = this.todos;
    }

    if (status === 'completed') {
      todos = this.todos.filter(todo => todo.completed);
    }
    console.log(`${status} todos items:`, todos);
  }

  /**
   * Function to update a todo item
   * @param {string} id - the id of todo item
   * @param {string} text - the text to be update
  */
  update(id, text) {
    const todo = this.todos.find(todo => todo.id === id);
    const index = this.todos.findIndex(todo => todo.id === id);
    const updatedTodo = {
      ...todo,
      text,
      updated: Date.now(),
      version: todo.version + 1,
    };
    this.todos.splice(index, 1, updatedTodo);
    console.log('Todos list:', this.todos);
  }

};

export default TodoStore;