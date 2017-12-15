const fs = jest.genMockFromModule('fs-extra');

var outputFileSync = [];

fs.outputFileSync = function (file, template) {
  outputFileSync.push(file);
  outputFileSync.push(template);
}

fs.__setOutputFileSync = function (spy) {
  outputFileSync = spy
}

fs.__getOutputFileSync = function () {
  return outputFileSync;
}

module.exports = fs;
