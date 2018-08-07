const fs = require('fs');

if (fs.existsSync('./node_modules')) {
  const mongoosePlugin = require('co-koa-mongoose-plugin');
  const CoKoa = require('co-koa-core');
  try {
    const coKoa = CoKoa(__dirname).launch(mongoosePlugin(
      // { // mongoose configuration options go here.
      //
      // }
    ));
    coKoa // koa-router is exposed below as "coKoa.router"
      .app
      .use(coKoa.router.routes())
      .use(coKoa.router.allowedMethods())
      .listen(coKoa.port);
  } catch (e) {
    console.error(
      e.message
        ? e.message
        : 'something unexpected brought the server down:');
  }
} else console.error('you must run "npm install" before running a new Co.Koa instance');
