class Todo {
  constructor(text, completed = false, updated = Todo.timestamp(), version = 0) {
    this.completed = completed;
    this.text = text;
    this.updated = updated;
    this.version = version;
  }

  static timestamp() {
    return Date.now();
  }
}

export default Todo;