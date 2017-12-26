#!/usr/bin/env node

'use strict';

const echoHandler = require('echo-handler').configure({ messageFolder: `${__dirname}/lib/i18n` });
const yargs = require('yargs');

const CLIAction = require('./lib/CLIAction');
const YargOptions = require('./lib/YargOptions');
const options = YargOptions(echoHandler.load('yargOptions')).describe();

const {argv} =
  yargs
    .options(options)
    .help()
    .alias('help', 'h');

const echo = echoHandler.load('index');
try {
  let actionTaken = false;
  const cliAction = CLIAction(__dirname, echoHandler, argv);

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
