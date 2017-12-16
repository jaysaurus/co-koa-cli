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
});
