jest.mock('readline');
jest.mock('../lib/Project');
describe('CLIAction tests', () => {
    const CLIAction = require('../lib/CLIAction.js');
    var cwdUsed = false;
    var callCount = 0
    var exitCalled = false;

    // this is a work around for some strrrrrange jest mock behaviour.
    function callCWD() {
      return (callCount < 1)
        ? {'create': 'someURL'}
        : {'create': null} // contrive to make the second test have a null object
    }

    const createObserver = [];
    const logObserver = [];
    process.cwd = () => cwdUsed = true;
    process.exit = (val) => exitCalled = true;


    test('create project runs through all the mocked calls successfully', () => {
      const action = CLIAction(createObserver, {
        load (value) {
          if (value === 'create' && callCount++ > 0 ) {
            return false; // 2nd create is forced into aborting by proxy
          }
          return {
            log (string) {
              logObserver.push(string);
            },
            raw (string) {
              return string
            }
          }
        }
      }, callCWD());
      const result = action.parse('create');
      expect(result).toBe(true);
      expect(exitCalled).toBe(true);
      expect(createObserver.length).toBe(1);
      expect(createObserver[0]).toEqual({'author':'author','name':'name','repository':'repository'});
      expect(logObserver[0]).toEqual('createProject');
      expect(logObserver[1]).toEqual('success');
      const readline = require('readline');
      const readlineObserver = readline.__getObservers();
      expect(readlineObserver).toEqual(
        {"close": true,
        "interfaceCreated": true,
        "on": ["close"],
        "question": ["name", "repository", "author"]}
      );
    });
    test('create project runs is mocked into firing an abort call', () => {
      const action = CLIAction(createObserver, {
        load (value) {
          if (value === 'create' && callCount++ > 0 ) {
            return false; // 2nd create is forced into aborting by proxy
          }
          return {
            log (string) {
              logObserver.push(string);
            },
            raw (string) {
              return string
            }
          }
        }
      }, callCWD());
      exitCalled = false;
      // empty the logObserver, we need to use it again
      logObserver.pop();
      logObserver.pop();
      const result = action.parse('create');
      expect(result).toBe(true);
      expect(exitCalled).toBe(true);
      expect(logObserver[0]).toEqual('createProject');
      expect(logObserver[1]).toEqual('abort');
      expect(cwdUsed).toBe(true);
    });

    jest.mock('../lib/Component');
    test('createController requests a createController component', () => {
      const observer = [];
      const action = CLIAction('dir', { load () { return observer; } }, { createController: 'test' });
      const result = action.parse('createController');
      expect(result).toBe(true);
      expect(observer[0]).toBe('createController');
      expect(observer[1]).toBe('test');
    });
    test('createController requests a createModel component', () => {
      const observer = [];
      const action = CLIAction('dir', { load () { return observer; } }, { createModel: 'test' });
      const result = action.parse('createModel');
      expect(result).toBe(true);
      expect(observer[0]).toBe('createModel');
      expect(observer[1]).toBe('test');
    });
    test('createController requests a createService component', () => {
      const observer = [];
      const action = CLIAction('dir', { load () { return observer; } }, { createService: 'test' });
      const result = action.parse('createService');
      expect(result).toBe(true);
      expect(observer[0]).toBe('createService');
      expect(observer[1]).toBe('test');
    });

    test('supplied optionset is not found (and contrived onClose event fire)', () => {
      exitCalled = false;
      const action = CLIAction('url',  { load () { return true; } }, { unknown: undefined });
      action.parse('unknown')
      const readline = require('readline');
      const readlineObserver = readline.__getObservers();
      expect(readlineObserver.on.length).toBe(3); // ie. this time round another call to close has been added;
      expect(readlineObserver.on[2]).toBe('close');
      expect(exitCalled).toBe(true);
    })
  });
