#!/usr/bin/env node
// let path = require('path');
const echoHandler = require('echo-handler').configure({ messageFolder: `${__dirname}/lib/i18n` });
const getCreateCallback = require('./lib/createCallback');
const getYargOptions = require('./lib/yargOptions');
const options = getYargOptions(echoHandler.load('yargOptions'));
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'co.koa> '
});

let yargs = require('yargs')
  .options(options)
  .help()
  .alias('help', 'h');
let {argv} = yargs;
const echo = echoHandler.load('index');
try {
  let actionTaken = false;
  Object
    .keys(options)
    .forEach(key => {
      if (argv[key] !== undefined) {
        switch (key) {
          case 'create':
            let cwd = argv[key] ? argv[key] : process.cwd();
            echo.log('createProject', cwd);
            rl.prompt();
            rl.on('line', getCreateCallback(rl, `${__dirname}/dist`, cwd, echoHandler.load('create')));
            actionTaken = true;
            break;
          case 'createController':
          case 'createModel':
          case 'createService':
        }
        rl.on('close', () => {
          console.log('Good bye.');
          process.exit(0);
        });
      }
    });
  if (!actionTaken) echo.throw('noArguments');
} catch (e) {
  console.error(e.message);
  yargs.showHelp();
  process.exit(1);
}
