const mongoose = require('mongoose');
const mongoosePlugin = require('co-koa-mongoose-plugin');
process.argv.push('-e');
process.argv.push('test');
const CoKoa = require('co-koa-core');
module.exports = {
  init ({ port = 3000, type = 'unit' }) {
    try {
      const coKoa = CoKoa(__dirname).launch();
      if (type === 'integration') {
        const harness = mongoosePlugin({
          connectionString: 'mongodb://localhost:27017/e-bard-test'
        });
        harness.init(coKoa.app, coKoa.$);
      }
      return {
        $: coKoa.$,
        app: type === 'integration'
          ? coKoa.app
            .use(coKoa.router.routes())
            .use(coKoa.router.allowedMethods())
            .listen(port)
          : {}
      };
    } catch (e) {
      console.error(
        e.message
          ? e.message
          : 'something unexpected brought the server down:');
    }
  },
  async destroy (coKoa, done) {
    console.log('closing mongoose connection...');
    Object.keys(mongoose.connection.collections).forEach(collection => {
      mongoose.connection.collections[collection].drop(
        function (result) {},
        function (err) {
          console.error(`failed to drop ${collection} ${err}`);
        });
    });
    await mongoose.disconnect(done);
  }
};
