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
    function getSuffixByType (t) {
      switch (t) {
        case 'Model': return '';
        case 'IntegrationTest': return '.integration.test';
        case 'UnitTest': return '.unit.test';
        default: return t;
      }
    }
    function getOutputDirectoryByType (t) {
      switch (t) {
        case 'IntegrationTest':
        case 'UnitTest': return `${process.cwd()}/_test`;
        default: return `${process.cwd()}/api/${t.toLowerCase()}s`
      }
    }

    this.build = function (componentType, componentName) {
      try {
        if (typeof componentType === 'string') {
          const type = componentType.replace(/^create/i, '');
          if (componentName) {
            const name = firstLetterToUpper(componentName);
            const dir = getOutputDirectoryByType(type, process.cwd());
            const template = helper.parseTemplate(type, name, dir);
            fs.outputFileSync(
              `${dir}/${name + getSuffixByType(type)}.js`,
              template);
            echo.log('successComponent', name, dir);
          } else echo.error('noName', type);
          process.exit(0);
        } else throw new Error('unrecognised component');
      } catch (e) {
        echo.error('failed', `create "${componentName}"`, e.message);
        process.exit(1);
      }
    };
  }
});

module.exports = echo => Component(echo);
