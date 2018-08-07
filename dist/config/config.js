module.exports = {
  'cors': {
    'allowMethods': 'GET,HEAD,PUT,POST,DELETE,PATCH',
    'origin': '*',
    'exposeHeaders': 'x-requested-with, Content-Type, origin, authorization, accept, content-type, x-experience-api-version, client-security-token',
    'maxAge': 3600,
    'credentials': true,
    'keepHeadersOnError': true
  },
  'defaultLanguage': 'en',
  'dependencyRegister': {},
  'environment': {
    'test': {
      'port': 3000
    },
    'development': {
      'port': 3000
    }
  },
  'messageFolder': './i18n/',
  'optionalModules': {
    'koa-hbs-renderer': true,
    'koa-locale': true,
    '@koa/cors': true
  },
  'welcomeMessage': false
};
