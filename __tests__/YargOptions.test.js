const YargOptions = require('../lib/YargOptions.js');

const observer = [];
const test = YargOptions({
  raw () {
    Object.keys(arguments).forEach(key => { observer.push(arguments[key]); });
  }
})['describe']();

describe('YargOptions test', () => {
  it('should have create that returns argvCreate string', () => {
    expect(observer[0]).toBe('argvCreate');
  });
  it('should have createController that returns argvMessageLong string', () => {
    expect(observer[1]).toBe('argvMessageLong');
    expect(observer[2]).toBe('Controller');
  });
  it('should have createModel that returns argvMessageShort string', () => {
    expect(observer[3]).toBe('argvMessageShort');
    expect(observer[4]).toBe('Model');
  });
  it('should have createService that returns argvMessageLong string', () => {
    expect(observer[5]).toBe('argvMessageLong');
    expect(observer[6]).toBe('Service');
  });
});
