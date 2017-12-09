'use strict';

const stampit = require('stampit');
const ProjectHelper = require('./helpers/ProjectHelper.js');
const Project = stampit({
  init ({ echo, from, to, rl }) {
    const helper = ProjectHelper(from, to);

    Object.assign(this, {
      async build (packageData) {
        try {
          helper
            .copyAPI()
            .copyConfigs()
            .copyPackageJSON(packageData);
        } catch (e) {
          echo.error('failed', 'create project', e.message);
        }
      }
    });
  }
});

module.exports = (echo, from, to, rl) => Project({ echo, from, to, rl });
// module.exports = function Project (rl, from, to, echo) {
//   function create (from, to) {
//     console.log('Attempting to copy core files...');
//     fs.copy(from, to, err => {
//       if (err) {
//         console.error(err);
//         return process.exit(1);
//       } else {
//         console.log('Files Copied!');
//         ['controllers', 'models', 'services', 'views'].forEach(it => {
//           fs.ensureDirSync(`${to}/api/${it}`);
//         });
//         fs.ensureDirSync(`${to}/i18n`);
//         return process.exit(0);
//       }
//     });
//   }
//
//   this.callback = async (line) => {
//     try {
//       if (typeof line === 'string' && line.length > 0) {
//         switch (line[0].toLowerCase()) {
//           case 'y':
//             return create(from, to);
//           case 'n':
//             echo.log('abort');
//             return process.exit(0);
//         }
//       }
//       echo.log('invalidCommand');
//       rl.prompt();
//     } catch (e) {
//       echo.log('failed', 'create project', e.message);
//       process.exit(1);
//     }
//   };
// };
