module.exports = (env, envConfig, mongoose) => {
  switch (env) {
    case 'development':
    case 'test':
      if (mongoose) {
        mongoose.Promise = global.Promise;
        mongoose
          .connect(envConfig['mongoDB_URI'])
          .catch(e => { console.error(e.message); });
        envConfig.mongoose = mongoose;
      }
      return envConfig;

    case process.env.NODE_ENV:
      return envConfig; // <- LIVE DEPLOYMENT GOES HERE

    default:
      return null;
  }
};
