'use strict';

const stampit = require('stampit');
const ProjectHelper = require('./helpers/ProjectHelper.js');
const Project = stampit({
  init ({ echo, from, to, rl }) {
    const helper = ProjectHelper(from, to);

    Object.assign(this, {
      async build (packageData) {
        try {
          helper
            .copyAPI()
            .copyConfigs()
            .copyPackageJSON(packageData);
        } catch (e) {
          echo.error('failed', 'create project', e.message);
        }
      }
    });
  }
});

module.exports = (echo, from, to, rl) => Project({ echo, from, to, rl });
