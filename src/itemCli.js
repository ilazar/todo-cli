import readline from 'readline';
import Item from './Item';

const cli = (() => {
  const commandMap = {};
  let errorHandler = null;

  const start = () => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.on('line', input => {
      const [name, ...args] = input.split(' ');
      const command = commandMap[name];
      if (command) {
        try {
          command.actionFn(args.length > 0 ? args[0] : null, () => {
            console.log(`command ${name} done`);
          })
        } catch(error) {
          if (errorHandler) {
            errorHandler(error);
          } else {
            throw error;
          }
        }
      } else {
        console.log(`unknown command`);
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

const itemCli = itemStore => {
  cli.command('show', 'Show items', (_, done) => {
    console.log(itemStore.find({}));
    done();
  });
  cli.command('add', 'Add item', (args, done) => {
    try {
      console.log(itemStore.insert(new Item(args, true)));
    } catch(error) {
      console.log(error.issues);
    }
    done();
  });
  cli.command('remove', 'Remove item by id', (args, done) => {
    console.log(itemStore.remove(parseInt(args)));
    done();
  });
  cli.setErrorHandler = error => console.log(error.issue);
  cli.start();
};

export default itemCli;
