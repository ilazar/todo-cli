## Description
A lightweight CLI(Command-Line Interface) that helps to manage a todo list application.

## Run
Navigate to the /src/ui path and run the following command:
```node --experimental-modules cli.mjs```

## Usage

* ```todo add <todoText>``` - Create a new todo. Example: ```todo add 'Read Game of Thornes book.'```
* ```todo clear <'active'|'all'|'completed'>``` - Deletes all todos or a subset of them. Example: ```todo delete 'all'```
* ```todo delete [ids...]``` - Deletes a todo(s). Example: ```todo delete 'id1' 'id2'```
* ```todo done [ids...]``` - Marks a todo(s) as done. Example: ```todo done 'id1' 'id2'```
* ```todo show <'active'|'all'|'completed'>``` - Lists all todo or a subset of them. Example: ```todo show 'active'```
* ```todo update <todoId> <todoText>``` - Allows to update the text of a specific todo. Example: ```todo update 'id1', 'Read Lord of the Rings book.'```
* ```help``` - Displays all availables commands