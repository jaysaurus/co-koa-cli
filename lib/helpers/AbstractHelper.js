'use strict';

const stampit = require('stampit');

module.exports = stampit({
  init () {},
  methods: {
    parseLine (line, tokenMap) {
      if (typeof tokenMap === 'object') {
        return line.replace(/#([a-z]+)#/g, (pattern, val) => {
          for (let i in tokenMap) {
            if (i === val) return tokenMap[i];
          }
          return pattern;
        });
      } else return line;
    }
  }
});
