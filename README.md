# TODO app

- Item (id: Integer, text: String, isActive: Boolean, updated: Date, version: Integer)
- Features
  - show/filter items
  - add/edit/delete item

Branches

- [01-create-project](./doc/01-create-project.md)
- [02-re-intro](./doc/02-re-intro.md)

## 1. Create items
  - project structure: index (having two parts: data and ui - console.log)
  - create a todo item [object, string, boolean, number, constructor function]
  - create a todo item list - items [array]
  - update an item by mutating its properties in ui part [mutability]
  - write functions to:
    - add item [array.push]
	- get item by id [array.find, arrow function]
	- get a shallow/deep copy of todos [array.map, immutability]
	- update item [array.find, splice]
	- remove item by id [array.splice]
    - filter by status [array.filter]
	- count items [array.reduce]
	- sort by a given property (e.g. text, updated) asc/desc [array.sort]

## 2. Create Item type
  - project structure: index, core/Issue, Item 
  - move object creation code from index to Item
  - write Item type 
    - [constructor function]
	- toString [prototype]
	- validate: returns a list of issues (type, text)
      - define Issue type within the core [module]
	
## 3. Create ItemStore
  - project structure: index, core/Issue, Item, ItemStore, utils/idGenerator
  - move todo list code from index to ItemStore
  - write ItemStore type [class, property]
    - [constructor]
	- find, insert, update, remove [method]
	- exception handling (throw validation errors) [error]
	- id generator [closure, IIF, generator function]

## 4. Create a command line interface
  - project structure:
    - index, cli, core/Issue, Item, ItemStore, utils/idGenerator
  - create a generic cli tool (written as an es5 module) [callback, async IO (readline)]
  - write commands for 
    - add, update, delete item
	- mark item completed
	- show items
	- exception handling [catch errors, global error handler]
	
## 5. Create a mock item resource client
  - project structure:
    - index, cli, core/Issue, Item, ItemRestClient, ItemStore, utils/idGenerator
  - CLI uses ItemRestClient instead of using ItemStore
  - ItemRestClient mock implementation [setTimeout, promise, async-await]
    - create, read, update, delete
	- search

## 6. Restructure the project as client-server 
  - project structure:
    - client: index, cli, ItemRestClient
	- shared: index, core/Issue, Item
	- server: index, ItemStore, utils/idGenerator
  - expose a sayHello http service returning `hello ${name}` [koa, http]
    - 200 ok, if name is present and it is not empty, 400 bad request otherwise
  - write a logger middleware [middleware]
  - write an exception handler middleware [middleware]

## 7. Provide a REST API 
  - project structure:
    - client: index, cli, ItemRestClient
	- shared: index, core/Issue, Item
	- server: index, ItemRouter, ItemStore, utils/idGenerator
  - define ItemRouter (which uses ItemStore)
    - create/post
	- read/get - use ETag, Last-Modified, If-Modified-Since headers, and 304 Not Modified 
    - update/put,patch - handle version conflict
	- delete/delete
	- search/get - use lastUpdated param, and 304 Not Modified
  - refactor ItemRestClient to use the REST API
  
## 8. Provide server-side notifications
  - project structure:
    - client: index, cli, ItemService, ItemWsClient, ItemRestClient
	- shared: index, core/Issue, Item
	- server: index, ItemRouter, ItemStore, utils/idGenerator
  - change ItemRouter to notify item changes
    - create/post - notify created
    - update/put,patch - notify updated
	- delete/delete - notify deleted
  - add ItemWsClient to receive server notifications
  - add ItemService to
    - use ItemWsClient, and ItemRestClient
	- use an inmemory cache and to reduce the network operations

## 9. Prepare an html client
  - project structure:
    - public: index.html, index.css
    - client, shared, server
  - add a middleware to serve statically the public artifacts
  - add input elements to create and update an item
  - add an unnumbered list to show items
  - define css rules

## 10. Add components to show items (angular style)
  - project structure:
    - public:
	  - index.html, index.css
	  - index.js
	  - App.js - component showing ItemList
	  - ItemList.js - component with an inner template ItemListTemplate producing an html fragment
	  - ItemService.js, ItemWsClient.js, ItemRestClient.js
  - App and ItemList defined as components having a simple onInit - onDestroy lifecycle
  - ItemList shows a loading text before items are fetched
  - discuss component state changes
  - implement a simple UI update mechanism and use it when the fetch operation is completed

## 11. Add components to handle items (angular style)
  - project structure:
    - public:
	  - index.html, index.css
	  - index.js
	  - App.js - component showing ItemEdit and ItemList
	  - ItemList.js, ItemEdit.js
	  - ItemService.js, ItemWsClient.js, ItemRestClient.js
  - create and update items handled by ItemEdit; delete item handled by ItemList
  - discuss event handling

## 12. Refactor components lifecycle and rendering (react style)
  - project structure:
    - public:
	  - index.html, index.css
	  - index.js
	  - App.js - component showing ItemEdit and ItemList
	  - ItemList.js, ItemEdit.js
	  - ItemService.js, ItemWsClient.js, ItemRestClient.js
  - add a render method to components lifecycle
  - discuss component properties and state

## 13. Use a flux architecture (react style)
  - project structure:
    - public:
	  - index.html, index.css
	  - index.js
	  - App.js - component showing ItemEdit and ItemList
	  - ItemList.js, ItemEdit.js
	  - Store.js, Provider.js, ItemService.js, ItemWsClient.js, ItemRestClient.js
  - implement a simple redux Store
  - refactor ItemService in terms of actions and reducers
  - write a simple Provider and provide the store to the entire App

  
# JavaScript (8h)

## JS elements

- Primitive types (numbers, strings, booleans)
- Objects
- Arrays
- Functions
- Closures
- Generators
- Callbacks

## Create a todo-cli app
- Use node https://nodejs.org/api/readline.html
- Architecture: ui, store

## JS elements

- Custom types
- Async programming (promise, async await)

## Create a todo-server
- Use koa, and ws
- Architecture: router, store

# HTML, CSS (4h)

## HTML elements
## CSS elements
## Create a todo-web app

# OOP (4h)

## 

## Refactor todo-web app

# FP (4h)

## 

## Refactor todo-web app

# React (8h)

## 

- Code design
- Code quality
- Best practices

## Refactor todo-web app

