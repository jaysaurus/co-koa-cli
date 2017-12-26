[![Build Status](https://travis-ci.org/jaysaurus/co-koa-cli.svg?branch=master)](https://travis-ci.org/jaysaurus/co-koa-cli)
[![Coverage Status](https://coveralls.io/repos/github/jaysaurus/co-koa-cli/badge.svg?branch=master)](https://coveralls.io/github/jaysaurus/co-koa-cli?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/jaysaurus/co-koa-cli.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/jaysaurus/co-koa-cli/badge.svg)](https://snyk.io/test/github/jaysaurus/co-koa-cli)

# co-koa-cli
A Command Line Interface for installing and managing Co.Koa applications

**Installation of co-koa-cli**
co-koa-cli is available to install on NPM:
`npm i co-koa-cli -g`

**Installing a new Co.Koa project on your system**
with the co-koa-cli installed, in terminal, simply navigate to a desired directory in terminal and type:
`co-koa-cli --create`

fill in a few details (these can be changed afterwards by modifying your project's package.json)
once installation is finished, type `npm install` to download the project's core dependencies.

That's it, you're all setup.  go to /config/config.json and wire up your <a href="https://www.mongodb.com/">mongoDB</a> connection! (Co.Koa **requires** a running MongoDB instance in order to launch.  Please visit <a href="https://www.mongodb.com/">mongoDB</a> for more information);

**Options**
```
  --version           Show version number                              [boolean]

  --create            build a new Co.Koa application in your current working
                      directory or, if supplied, an absolute directory. Ensure
                      you have permission to write!                     [string]

  --createController  creates a Co.Koa Controller. Must be supplied with a name
                      (without the word "Controller" appended to it).   [string]

  --createModel       creates a Co.Koa Model. Must be supplied with a name.
                                                                        [string]

  --createService     creates a Co.Koa Service. Must be supplied with a name
                      (without the word "Service" appended to it).      [string]

  --help, -h          Show help                                        [boolean]
```
