const Component = require('../lib/Component.js');

jest.mock('../lib/helpers/ComponentHelper.js');
jest.mock('fs-extra');
describe('Component tests', () => {
  test('build should manufacture a component if there is a component name', () => {
    let exitValue = undefined;
    let logValue = [];
    process.exit = (arg) => exitValue = arg;
    process.cwd = () => 'dir';
    const component = Component({
      log (value, a, b) {
        logValue.push(value);
        logValue.push(a);
        logValue.push(b);
      }
    });
    component.build('createSomething', 'Example');
    expect(logValue[0]).toBe('successComponent');
    expect(logValue[1]).toBe('Example');
    expect(logValue[2]).toBe('dir/api/somethings');
    const fs = require('../__mocks__/fs-extra.js');
    const observer = fs.__getObserver('outputFileSync');
    expect(observer[0]).toBe('dir/api/somethings/ExampleSomething.js');
    expect(observer[1]).toBe('test');
    expect(exitValue).toBe(0);

    component.build('createModel', 'Example')
    expect(observer[2]).toBe('dir/api/models/Example.js');

    component.build('createIntegrationTest', 'Example');
    expect(observer[4]).toBe('dir/_test/Example.integration.test.js');
  });
  test('build returns an error message because no component name was supplied', () => {
    let exitValue = undefined;
    let logValue = [];
    process.exit = (arg) => exitValue = arg;
    const component = Component({
      error (value, a) {
        logValue.push(value);
        logValue.push(a);
      }
    });
    component.build('createSomething', '');
    expect(logValue[0]).toBe('noName');
    expect(logValue[1]).toBe('Something');
    expect(exitValue).toBe(0);
  });
  test('build handles exceptions with correct exit code and error message', () => {
    let exitValue = undefined;
    let logValue = [];
    process.exit = (arg) => exitValue = arg;
    const component = Component({
      error (value, a, b) {
        logValue.push(value);
        logValue.push(a);
        logValue.push(b);
      }
    });
    component.build(1); // build supplied invalid data type
    expect(logValue[0]).toBe('failed');
    expect(logValue[1]).toBe('create "undefined"');
    expect(logValue[2]).toBe('unrecognised component');
    expect(exitValue).toBe(1);
  });
});
