const AbstractHelper = require('../lib/helpers/AbstractHelper.js');

describe('AbstractHelper test', () => {
  test('parseLine replaces co.koa #variables# in a line with supplied object values', () => {
    const result = AbstractHelper().parseLine('test data: #foo#, #bar#', {foo: 'result1 populated', bar: 'result2 populated'});
    expect(result).toBe('test data: result1 populated, result2 populated');
  });
  test('parseLine will return #variables# if supplied object without appropriate object', () => {
    const line = 'test data: #foo#, #bar#'
    const result = AbstractHelper().parseLine(line, {});
    expect(result).toBe(line);
  });
  test('parseLine is not supplied an object and returns the line without alteration', () => {
    const line = 'test data: #foo#, #bar#'
    const result = AbstractHelper().parseLine(line, 1);
    expect(result).toBe(line);
  });
});
