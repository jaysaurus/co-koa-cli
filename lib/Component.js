'use strict';

const fs = require('fs-extra');

module.exports = function Component (echo) {
  function firstLetterToUpper (n) {
    return n.charAt(0).toUpperCase() + n.slice(1);
  }

  function parseTemplate (type, name) {
    const template =
      fs.readFileSync(`${__dirname}/templates/${type}.co.koa`)
        .toString()
        .split('\n').reduce(
          (file, line) => {
            return file + line.replace(/#name#/g, firstLetterToUpper(name)) + '\n';
          }, '').replace(/\n$/, '');
    return template;
  }

  this.create = (componentType, componentName) => {
    const type = componentType.replace(/^create/i, '');
    if (componentName) {
      const name = firstLetterToUpper(componentName);
      const template = parseTemplate(type, name);
      const suffix = type !== 'Model' ? type : '';
      fs.outputFileSync(
        `${process.cwd()}/api/${type.toLowerCase()}s/${name + suffix}.js`,
        template);
    } else echo.error('noName', type);
    process.exit(0);
  };
};
