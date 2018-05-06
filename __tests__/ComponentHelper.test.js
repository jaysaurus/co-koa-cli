const ComponentHelper = require('../lib/helpers/ComponentHelper.js');

jest.mock('fs-extra');
describe('ComponentHelper tests', () => {
  test('parseTemplate reads through each line of the given co.koa template', () => {
    const fs = require('../__mocks__/fs-extra.js');
    fs.__setData('#name#\n#name#\nand a test line: #name#\n');
    const result = ComponentHelper('testDirectory').parseTemplate(
      'example',
      'test');
    const observer = fs.__getObserver('readFileSync');
    expect(observer[0]).toBe('testDirectory/example.co.koa');
    expect(result)
      .toBe('test\ntest\nand a test line: test\n');
  });
  test('parseTemplate reads through each line of the given co.koa template', () => {
    const fs = require('../__mocks__/fs-extra.js');
    fs.__setData('#name#\n#name#\nand a test line: #name#\n');
    const result = ComponentHelper('testDirectory').parseTemplate(
      'IntegrationTest',
      'test');
    const observer = fs.__getObserver('readFileSync');
    expect(observer[1]).toBe('testDirectory/IntegrationTest.co.koa');
    const integrationTestSuite = fs.__getObserver('readdirSync');
    expect(integrationTestSuite[0]).toBe(1);
    expect(result)
      .toBe('test\ntest\nand a test line: test\n');
  });
});
