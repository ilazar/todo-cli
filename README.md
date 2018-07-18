# TODO app

- Item (id: Integer, text: String, isActive: Boolean, updated: Date, version: Integer)
- Features
  - show/filter items
  - add/edit/delete item

## Table of Contents

- [Create Project](#create-project)
- [Create Items](#create-items)
- [Create Item Type](#create-item-type)
- [Create Item Store](#create-item-store)
- [Create a Command Line Interface](#create-a-command-line-interface)
- [Create a Mock Item Resource Client](#create-a-mock-item-resource-client)
- [Restructure the Project as Client-Server](#restructure-the-project-as-client-server)
- [Provide a REST API](#provide-a-rest-api)
- [Provide Server-Side Notifications](#provide-server-side-notifications)


## Create Project
  - branch: 00-create-project
  - install [Node.js](https://nodejs.org/en/)
  - create a `package.json` file using [npm-init](https://docs.npmjs.com/cli/init)
  - install [backpack](https://github.com/jaredpalmer/backpack)
  - install [es2015+](https://www.npmjs.com/package/babel-preset-env)
  - install [babel-plugin-transform-object-rest-spread](https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread/)
  - install [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)

## Create Items
  - branch: 01-items
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

## Create Item Type
  - branch: 02-item-type
  - project structure: index, core/Issue, Item 
  - move object creation code from index to Item
  - write Item type 
    - [constructor function]
	- toString [prototype]
	- validate: returns a list of issues (type, text)
      - define Issue type within the core [module]
	
## Create Item Store
  - branch: 03-item-store
  - project structure: index, core/Issue, Item, ItemStore, utils/idGenerator
  - move todo list code from index to ItemStore
  - write ItemStore type [class, property]
    - [constructor]
	- find, insert, update, remove [method]
	- exception handling (throw validation errors) [error]
	- id generator [closure, IIF, generator function]

## Create a Command Line Interface
  - branch: 04-item-cli
  - project structure:
    - index, cli, core/Issue, Item, ItemStore, utils/idGenerator
  - create a generic cli tool (written as an es5 module) [callback, async IO (readline)]
  - write commands for 
    - add, update, delete item
	- mark item completed
	- show items
	- exception handling [catch errors, global error handler]
	
## Create a Mock Item Resource Client
  - branch: 05-item-rest-client
  - project structure:
    - index, cli, core/Issue, Item, ItemRestClient, ItemStore, utils/idGenerator
  - CLI uses ItemRestClient instead of using ItemStore
  - ItemRestClient mock implementation [setTimeout, promise, async-await]
    - create, read, update, delete
	- search

## Restructure the Project as Client-Server
  - branch: 06-client-server
  - project structure:
    - client: index, cli, ItemRestClient
	- shared: index, core/Issue, Item
	- server: index, ItemStore, utils/idGenerator
  - expose a sayHello http service returning `hello ${name}` [koa, http]
    - 200 ok, if name is present and it is not empty, 400 bad request otherwise
  - write a logger middleware [middleware]
  - write an exception handler middleware [middleware]

## Provide a REST API
  - branch: 07-item-rest-service
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
  
## Provide Server-Side Notifications
  - branch: 08-item-web-socket
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
