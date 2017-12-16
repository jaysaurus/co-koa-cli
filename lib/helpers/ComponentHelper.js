'use strict';

const fs = require('fs-extra');
const stampit = require('stampit');

const AbstractHelper = require('./AbstractHelper.js');

const ComponentHelper = stampit(AbstractHelper, {
  init (templateDir) {
    Object.assign(this, {
      parseTemplate (type, name) {
        const template =
          fs.readFileSync(`${templateDir}/${type}.co.koa`)
            .toString()
            .split('\n')
            .reduce((file, line) => {
              return file + this.parseLine(line, { name }) + '\n';
            }, '')
            .replace(/\n$/, '');
        return template;
      }
    });
  }
});
module.exports = (templateDir) => ComponentHelper(templateDir);
