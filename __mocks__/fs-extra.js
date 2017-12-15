const fs = jest.genMockFromModule('fs-extra');

var observer = {
  copySync: [],
  ensureDirSync: [],
  outputFileSync: [],
  readFileSync: []
}

fs.copySync = function (from, to) {
  observer['copySync'].push({ from, to });
}

fs.ensureDirSync = function (dir) {
  observer['ensureDirSync'].push(dir);
}

fs.outputFileSync = function (file, template) {
  observer['outputFileSync'].push(file);
  observer['outputFileSync'].push(template);
}

var data = ""

fs.__setData = function (dat) {
  data = dat;
}

fs.readFileSync = function (dir) {
  observer['readFileSync'].push(dir);
  return data;
}

fs.__resetObserver = function (spy) {
  observer = Object.assign({}, {
    copySync: [],
    ensureDirSync: [],
    outputFileSync: [],
    readFileSync: []
  });
}

fs.__getObserver = function (type) {
  return observer[type];
}

module.exports = fs;
