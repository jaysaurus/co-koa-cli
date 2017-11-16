const Component = require('./Component');
const CreateAction = require('./CreateAction');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'co.koa> '
});

module.exports = function CLIAction (root, echoHandler, argv) {
  const echo = echoHandler.load('cli');

  this.parse = key => {
    if (argv[key] !== undefined) {
      switch (key) {
        case 'create':
          let cwd = argv[key] ? argv[key] : process.cwd();
          echo.log('createProject', cwd);
          rl.prompt();
          rl.on('line',
            new CreateAction(
              rl, `${root}/dist`, cwd, echoHandler.load('create')).callback);
          return true;
        case 'createController':
        case 'createModel':
        case 'createService':
          new Component(echoHandler.load('create')).create(key, argv[key]);
          return true;
      }
      rl.on('close', () => {
        console.log('Good bye.');
        process.exit(0);
      });
      return false;
    }
  };
};
