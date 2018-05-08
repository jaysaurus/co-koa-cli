'use strict';

const stampit = require('stampit');

const YargOptions = stampit({
  init (echo) {
    this.describe = function () {
      return {
        create: {
          describe: echo.raw('argvCreate'),
          string: true
        },
        createController: {
          describe: echo.raw('argvMessageLong', 'Controller'),
          string: true
        },
        createIntegrationTest: {
          describe: echo.raw('argvMessageShort', 'Jest Integration Test'),
          string: true
        },
        createModel: {
          describe: echo.raw('argvMessageShort', 'Model'),
          string: true
        },
        createService: {
          describe: echo.raw('argvMessageLong', 'Service'),
          string: true
        },
        createUnitTest: {
          describe: echo.raw('argvMessageShort', 'Jest Unit Test'),
          string: true
        }
      };
    };
  }
});

module.exports = echo => YargOptions(echo);
