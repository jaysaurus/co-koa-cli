const ProjectHelper = require('../lib/helpers/ProjectHelper.js');

jest.mock('fs-extra');
describe('ProjectHelper tests', () => {
  const projectHelper = ProjectHelper('from', 'destination')
  const fs = require('../__mocks__/fs-extra.js');

  test('projectHelper performs copyAPI fs tasks', () => {
    projectHelper.copyAPI();
    const spy1 = fs.__getObserver('copySync')[0];
    expect(spy1.from).toBe('from/dist')
    expect(spy1.to).toBe('destination')
    const spy2 = fs.__getObserver('ensureDirSync');
    let i = 0;
    [ 'controllers',
      'models/types',
      'models/validators',
      'services',
      'views/helpers',
      'views/layouts',
      'views/partials' ].forEach(file => {
        expect(spy2[i++]).toBe(`destination/api/${file}`);
      });
  });

  test('projectHelper performs copyConfigs fs task', () => {
    fs.__resetObserver();
    projectHelper.copyConfigs();
    const spy1 = fs.__getObserver('copySync')[0];
    expect(spy1.from).toBe('from/dist');
    expect(spy1.to).toBe('destination');
    const spy2 = fs.__getObserver('ensureDirSync');
    let i = 0;
    ['config', 'i18n'].forEach(it => {
      expect(spy2[i++]).toBe(`destination/${it}`);
    });
  });

  test('projectHelper performs copyPackageJSON fs task', () => {
    fs.__resetObserver();
    fs.__setData('test #variable#');
    projectHelper.copyPackageJSON({variable: 'data was injected'});
    const spy1 = fs.__getObserver('readFileSync')[0];
    expect(spy1).toBe('from/lib/templates/package.co.koa');
    const spy2 = fs.__getObserver('outputFileSync');
    expect(spy2[0]).toBe('destination/package.json');
    expect(spy2[1]).toBe('test data was injected');
  });
})
