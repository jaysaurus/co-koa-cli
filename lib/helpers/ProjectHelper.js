'use strict';

const fs = require('fs-extra');
const stampit = require('stampit');

const ProjectHelper = stampit(require('./AbstractHelper.js'), {
  props: {
    baseDir: null,
    dist: null,
    to: null
  },

  init ({ baseDir, to }) {
    this.baseDir = baseDir;
    this.dist = `${baseDir}/dist`;
    this.to = to;
  },

  methods: {
    copyAPI () {
      fs.copySync(this.dist, this.to);
      [ 'controllers',
        'models/types',
        'models/validators',
        'services',
        'views/helpers',
        'views/layouts',
        'views/partials' ].forEach(it => {
          fs.ensureDirSync(`${this.to}/api/${it}`);
        });
      console.log('API copied');
      return this;
    },

    copyConfigs () {
      fs.copySync(this.dist, this.to);
      [ 'config',
        'i18n',
        'public/html',
        'public/css',
        'public/js'
      ].forEach(it => {
        fs.ensureDirSync(`${this.to}/${it}`);
      });
      console.log('configs copied');
      return this;
    },

    copyPackageJSON (packageData) {
      const file = fs.readFileSync(`${this.baseDir}/dist/package.json`)
          .toString()
          .split('\n').reduce(
            (file, line) => {
              return `${file}${this.parseLine(line, packageData)}\n`;
            }, '').replace(/\n$/, '');
      fs.outputFileSync(`${this.to}/package.json`, file);
      console.log('package.json setup');
      return this;
    }
  }
});

module.exports = (baseDir, to) => ProjectHelper({ baseDir, to });
