'use strict';

const stampit = require('stampit');

const YargOptions = stampit({
  init (echo) {
    Object.assign(this, {
      describe () {
        return {
          create: {
            describe: echo.raw('argvCreate'),
            string: true
          },
          createController: {
            describe: echo.raw('argvMessageLong', 'Controller'),
            string: true
          },
          createModel: {
            describe: echo.raw('argvMessageShort', 'Model'),
            string: true
          },
          createService: {
            describe: echo.raw('argvMessageLong', 'Service'),
            string: true
          }
        };
      }
    });
  }
});

module.exports = echo => YargOptions(echo);
