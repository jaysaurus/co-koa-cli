'use strict';

const Component = require('./Component.js');
const Project = require('./Project.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'co.koa> '
});
const stampit = require('stampit');

const CLIAction = stampit({
  init ({ root, echoHandler, argv }) {
    const echo = echoHandler.load('cli');
    let success = false;
    function createProject (cwd) {
      echo.log('createProject', cwd);
      rl.question(echo.raw('name'), name => {
        rl.question(echo.raw('repository'), repository => {
          rl.question(echo.raw('author'), author => {
            success =
              Project(echoHandler.load('create'), root, cwd)
                .build({ author, name, repository });
            rl.close();
          });
        });
      });
      rl.on('close', () => {
        if (success) echo.log('success');
        else echo.log('abort');
        process.exit(0);
      });
    }

    this.parse = function (key) {
      if (argv[key] !== undefined) {
        switch (key) {
          case 'create':
            let cwd = argv[key] ? argv[key] : process.cwd();
            createProject(cwd);
            return true;
          case 'createController':
          case 'createModel':
          case 'createService':
            Component(echoHandler.load('create')).build(key, argv[key]);
            return true;
        }
      }
      rl.on('close', () => {
        process.exit(0);
      });
      return false;
    };
  }
});

module.exports = (root, echoHandler, argv) => CLIAction({ root, echoHandler, argv });
