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
          if (typeof componentType === 'string') {
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
          } else throw new Error('unrecognised component');
        } catch (e) {
          echo.error('failed', `create "${componentName}"`, e.message);
          process.exit(1);
        }
      }
    });
  }
});

module.exports = echo => Component(echo);
