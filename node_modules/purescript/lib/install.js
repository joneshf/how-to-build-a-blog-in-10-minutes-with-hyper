'use strict';

const path = require('path');

const binBuild = require('bin-build');
const BinWrapper = require('bin-wrapper');
const log = require('logalot');
const pursPath = require('..');
const {BASE_URL, SOURCE_URL} = require('.');

const bin = new BinWrapper()
  .src(`${BASE_URL}macos.tar.gz`, 'darwin')
  .src(`${BASE_URL}linux64.tar.gz`, 'linux')
  .src(`${BASE_URL}win64.tar.gz`, 'win32')
  .dest(path.dirname(pursPath));

const allowDifferentUserFlag = ' --allow-different-user'.repeat(Number(process.platform !== 'win32'));

bin.use(path.basename(pursPath)).run(['--help'], runErr => {
  if (runErr) {
    log.warn(runErr.message);
    log.warn('pre-build test failed');
    log.info('compiling from source');

    binBuild()
      .src(SOURCE_URL)
      .cmd(`stack setup${allowDifferentUserFlag}`)
      .cmd(`stack install${allowDifferentUserFlag} --local-bin-path ${bin.dest()}`)
      .run(buildErr => {
        if (buildErr) {
          log.error(buildErr.stack);
        } else {
          log.success('built successfully');
        }
      });
    return;
  }

  log.success('pre-build test passed successfully');
});
