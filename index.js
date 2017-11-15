#!/usr/bin/env node
'use strict';
const echoHandler = require('echo-handler').configure({ messageFolder: `${__dirname}/lib/i18n` });

const CLIAction = require('./lib/CLIAction');
const YargOptions = require('./lib/YargOptions');
const options = new YargOptions(echoHandler.load('yargOptions')).describe();

let yargs = require('yargs')
  .options(options)
  .help()
  .alias('help', 'h');

let {argv} = yargs;

const echo = echoHandler.load('index');
try {
  let actionTaken = false;
  const cliAction = new CLIAction(__dirname, echoHandler, argv, actionTaken);

  for (const key in options) {
    if (!actionTaken) actionTaken = cliAction.parse(key);
    else break;
  }

  if (!actionTaken) echo.throw('noArguments');
} catch (e) {
  console.error(e.message);
  yargs.showHelp();
  process.exit(1);
}
