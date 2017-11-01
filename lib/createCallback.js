var fs = require('fs-extra');

function create (from, to) {
  console.log('Attempting to copy core files...');
  fs.copy(from, to, err => {
    if (err) {
      console.error(err);
      return process.exit(1);
    } else {
      console.log('Files Copied!');
      ['controllers', 'models', 'services', 'views'].forEach(it => {
        fs.ensureDirSync(`${to}/api/${it}`);
      });
      fs.ensureDirSync(`${to}/i18n`);
      return process.exit(0);
    }
  });
}

module.exports = function createCallback (rl, from, to, echo) {
  return async (line) => {
    try {
      if (typeof line === 'string' && line.length > 0) {
        switch (line[0].toLowerCase()) {
          case 'y':
            create(from, to);
            return;
          case 'n':
            echo.log('abort');
            return process.exit(0);
        }
      }
      echo.log('invalidCommand');
      rl.prompt();
    } catch (e) {
      echo.log('failed', 'create project', e.message);
      process.exit(1);
    }
  };
};
