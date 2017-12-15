const Project = require('../lib/Project.js');

jest.mock('../lib/helpers/ProjectHelper.js');
describe('Project test', () => {
  it('should perform 3 calls to the project', () => {
    const observer = [];
    const project = Project({}, observer);
    project.build('build arg supplied to copyPackageJSON');
    expect(observer[0]).toBe('copyAPI was called');
    expect(observer[1]).toBe('copyConfigs was called');
    expect(observer[2]).toBe('copyPackageJSON was called');
    expect(observer[3]).toBe('build arg supplied to copyPackageJSON');
  });
  it('should handle an error when build call to ProjectHelper throws an exception', () => {
    const observer = [];
    const project = Project({
      error () {
        Object.keys(arguments).forEach(key => {
          observer.push(arguments[key]);
        })
      }
    }, []);
    project.build();
    expect(observer[0]).toBe('failed');
    expect(observer[1]).toBe('create project');
    expect(observer[2]).toBe('copyPackageJSON threw exception');
  });
});
