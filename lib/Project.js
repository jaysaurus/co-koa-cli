'use strict';

const stampit = require('stampit');
const ProjectHelper = require('./helpers/ProjectHelper.js');
const Project = stampit({
  init ({ echo, from, to }) {
    const helper = ProjectHelper(from, to);

    this.build = function (packageData) {
      try {
        helper
          .copyAPI()
          .copyConfigs()
          .copyPackageJSON(packageData);
        return true;
      } catch (e) {
        echo.error('failed', 'create project', e.message);
      }
    };
  }
});

module.exports = (echo, from, to) => Project({ echo, from, to });
