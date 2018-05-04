const testHarness = require('../app.test.harness.js');
const coKoa = testHarness.init();
describe('Demonstrative Integration Test Suite', async () => {
  test('An integration test', async () => {
    try {
      // EXAMPLE:
      // const Example = coKoa.$('Example');
      // const eg = await new Example({ name: 'I am an example' }).save();
      // expect(typeof eg).toBe('object');
      expect('test').toBe('test');
    } catch (e) {
      console.error(e.message)
    }
  });

  afterAll((done) => {
    coKoa.app.close() // Make sure to close the Koa app listener
    testHarness.destroy(done) // optionally empty the test database
  });
});
