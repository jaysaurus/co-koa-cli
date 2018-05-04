const mongoose = require('mongoose');
const mongoosePlugin = require('co-koa-mongoose-plugin');
process.argv.push('-e');
process.argv.push('test');
const CoKoa = require('../co-koa-core/index.js');
module.exports = {
  init () {
    try {
      const coKoa = CoKoa(__dirname).launch();
      const harness = mongoosePlugin({
        connectionString: 'mongodb://localhost:27017/e-bard-test'
      });
      harness.init(coKoa.app, coKoa.$);
      return {
        $: coKoa.$,
        app: coKoa.app
          .use(coKoa.router.routes())
          .use(coKoa.router.allowedMethods())
          .listen(coKoa.port)
      };
    } catch (e) {
      console.error(
        e.message
          ? e.message
          : 'something unexpected brought the server down:');
    }
  },
  destroy (coKoa, done) {
    console.log('closing mongoose connection...');
    Object.keys(mongoose.connection.collections).forEach(collection => {
      mongoose.connection.collections[collection].drop(
        function (result) {},
        function (err) {
          console.error(`failed to drop ${collection} ${err}`);
        });
    });
    mongoose.disconnect(done);
  }
};
