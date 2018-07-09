import vorpalModule from 'vorpal';
import addTodo from './addTodo.mjs';
import clearTodos from './clearTodos.mjs';
import deleteTodos from './deleteTodos.mjs';
import doneTodos from './doneTodos.mjs';
import showTodos from './showTodos.mjs';
import updateTodos from './updateTodos.mjs';

const vorpal = vorpalModule();
 
vorpal
  .command('todo add <todoText>', 'Create a new todo. Example: `todo add "Read Game of Thornes book."`')
  .action(function(args, callback) {
    this.log('todo add:', args.todoText);
    addTodo(args, callback);
  });

vorpal
  .command('todo clear <status>', 'Deletes all todos or a subset of them. Example: `todo delete "all"')
  .action(function(args, callback) {
    this.log('todo clear:', args.status);
    clearTodos(args, callback);
  });

vorpal
  .command('todo delete [ids...]', 'Deletes a todo(s). Example: `todo delete "id1" "id2"`')
  .action(function(args, callback) {
    this.log('todo delete:', args.ids);
    deleteTodos(args, callback);
  });

vorpal
  .command('todo done [ids...]', 'Marks a todo(s) as done. Example: `todo done "id1" "id2"`')
  .action(function(args, callback) {
    this.log('todo done:', args.ids);
    doneTodos(args, callback);
  });
vorpal
  .command('todo show <status>', 'Lists all todo or a subset of them. Example: `todo show "active"`')
  .action(function(args, callback) {
    this.log('todo show:', args.status);
    showTodos(args, callback);
  });

vorpal
  .command('todo update <todoId> <todoText>', 'Allows to update the text of a specific todo. Example: `todo update "id1" "Read Lord of the Rings book."')
  .action(function(args, callback) {
    this.log('todo update:', { ...args });
    updateTodos(args, callback)
  });

vorpal
  .delimiter('todo-cli$')
  .show();