'use strict';

const fs = require('fs-extra');
const stampit = require('stampit');

const ComponentHelper = require('./helpers/ComponentHelper.js');

const Component = stampit({
  init (echo) {
    const helper = ComponentHelper(`${__dirname}/templates`);

    function firstLetterToUpper (n) {
      return n.charAt(0).toUpperCase() + n.slice(1);
    }

    Object.assign(this, {
      build (componentType, componentName) {
        try {
          const type = componentType.replace(/^create/i, '');
          if (componentName) {
            const name = firstLetterToUpper(componentName);
            const template = helper.parseTemplate(type, name);
            const suffix = type !== 'Model' ? type : '';
            const dir = `${process.cwd()}/api/${type.toLowerCase()}s`;
            fs.outputFileSync(
              `${dir}/${name + suffix}.js`,
              template);
            echo.log('successComponent', name, dir);
          } else echo.error('noName', type);
          process.exit(0);
        } catch (e) {
          echo.error('failed', `create "${componentName}"`, e.message);
          process.exit(1);
        }
      }
    });
  }
});

module.exports = echo => Component(echo);
  //
  // module.exports = function Component (echo) {
  //
  //   function parseTemplate (type, name) {
  //     const template =
  //       fs.readFileSync(`${__dirname}/templates/${type}.co.koa`)
  //         .toString()
  //         .split('\n').reduce(
  //           (file, line) => {
  //             return file + line.replace(/#name#/g, firstLetterToUpper(name)) + '\n';
  //           }, '').replace(/\n$/, '');
  //     return template;
  //   }
  //
  //   this.create = (componentType, componentName) => {
  //     const type = componentType.replace(/^create/i, '');
  //     if (componentName) {
  //       const name = firstLetterToUpper(componentName);
  //       const template = parseTemplate(type, name);
  //       const suffix = type !== 'Model' ? type : '';
  //       fs.outputFileSync(
  //         `${process.cwd()}/api/${type.toLowerCase()}s/${name + suffix}.js`,
  //         template);
  //     } else echo.error('noName', type);
  //     process.exit(0);
  //   };
  // };
