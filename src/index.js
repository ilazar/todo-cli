require("regenerator-runtime/runtime");
require('./re-intro');

console.log('Hello World');

const getTime = () => new Date().toUTCString();
const completed = false;
const text = '1. Create a todo item.';
const updated = getTime();
const version = 1;

// Todo item
const item = {
  completed,
  text,
  updated,
  version,
};

console.log('Item object: ', item);

// Create item - object constructor
// function Item(completed, text) {
//   this.completed = completed;
//   this.text = text;
//   this.updated = function() { return Date().toUTCString() };
//   this.version = 1;
// }
// const myItem = new Item(completed, text);
// console.log('myItem text: ', myItem.completed);
// console.log('myItem text: ', myItem.text);
// console.log('myItem text: ', myItem.updated());
// console.log('myItem text: ', myItem.version);


// Create item - object constructor - prototype
function Item(completed, text) {
  this.completed = completed;
  this.text = text;
}

Item.prototype.updated = function() {
  return new Date().toUTCString();
}
Item.prototype.version = 1;

const myItem = new Item(completed, text);
console.log('myItem updated: ', myItem.updated());
//Update item
console.log('myItem version: ', myItem.version);
myItem.version = 2;
console.log('myItem updated version: ', myItem.version);


// Create item - arrow function
/*
* @params {String} itemText - the text of the item
* @return {Object} the item 
*/
const createItem = itemText => ({
  completed: false,
  text: itemText,
  updated: new Date().toUTCString(),
  version: 1,
});

const firstItem = createItem('1. Buy popcorn.');
const secondItem = createItem('2. Watch one episode of Game of Thrones.');
console.log('First item: ', firstItem);
console.log('Second item: ', secondItem);

//Update item
console.log('first item status: ', firstItem.completed);
const updatedItem = Object.assign({}, {
  ...firstItem,
  completed: true,
  version: 2,
});
console.log('first item original: ', firstItem);
console.log('first item updated: ', updatedItem);

// TODO List
const todoList = [];

// Add item to list
const addItem = item => todoList.push(item);
addItem(firstItem);
addItem(secondItem);
console.log('todo list: ', todoList);

// Get item by id

// Get a shallow/deep copy of todos

// Update item

// Filter by status

// Counte items

// Sort by a given property
