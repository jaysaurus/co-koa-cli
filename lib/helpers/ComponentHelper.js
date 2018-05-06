'use strict';

const fs = require('fs-extra');
const stampit = require('stampit');

const AbstractHelper = require('./AbstractHelper.js');

const ComponentHelper = stampit(AbstractHelper, {
  init (templateDir) {
    function buildComponentVars (type, name, dir) {
      let componentVars = { name };
      if (type === 'IntegrationTest') {
        componentVars.port = 3000 + fs.readdirSync(dir).length;
      }
      return componentVars;
    }

    this.parseTemplate = function (type, name, dir) {
      const template =
        fs.readFileSync(`${templateDir}/${type}.co.koa`)
          .toString()
          .split('\n')
          .reduce((file, line) => {
            return file + this.parseLine(line, buildComponentVars(type, name, dir)) + '\n';
          }, '')
          .replace(/\n$/, '');
      return template;
    };
  }
});
module.exports = (templateDir) => ComponentHelper(templateDir);
