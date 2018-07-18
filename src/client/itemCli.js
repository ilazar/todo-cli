import readline from 'readline';
import Item from '../shared/Item';
import { createItem, getItems, removeItem, subscribe } from './itemService';

const cli = (() => {
  const commandMap = {};
  let errorHandler = null;

  const start = () => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.on('line', async input => {
      const [name, ...args] = input.split(' ');
      const command = commandMap[name];
      if (command) {
        try {
          await command.actionFn(args.length > 0 ? args[0] : null);
          console.log(`command ${name} done`);
        } catch(error) {
          if (errorHandler) {
            errorHandler(error);
          } else {
            throw error;
          }
        }
      } else {
        console.log(`unknown command ${name}`);
      }
    })
  };

  return {
    command: (name, description, actionFn) => {
      commandMap[name] = { name, description, actionFn };
    },
    setErrorHandler: handler => errorHandler = handler,
    start
  }
})();

const itemCli = () => {
  subscribe(items => console.log('items updated', items));
  cli.command('show', 'Show items', async () => {
    console.log(await getItems({}));
  });
  cli.command('add', 'Add item', async (args) => {
    try {
      await createItem(new Item(args, true));
    } catch(error) {
      console.log(error.issues);
    }
  });
  cli.command('remove', 'Remove item by id', async (args) => {
    await removeItem(parseInt(args));
  });
  cli.setErrorHandler(error => console.log(error));
  cli.start();
};

export default itemCli;
