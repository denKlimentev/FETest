const hostUrl = process.env.HOST;
const testDirectory = process.env.testDirectory;

exports.config = {
  specs: ['./test/' + testDirectory + '/*.js'],
  exclude: ['path/to/excluded/files'],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--disable-infobars', '--window-size=1920,1440']
      }
    }
  ],
  logLevel: 'error', // Level of logging verbosity: trace | debug | info | warn | error | silent
  baseUrl: hostUrl,
  waitforTimeout: 30000,
  connectionRetryTimeout: 30000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },
  afterTest: function (test, context, {error, result, duration, passed, retries}) {
    if (passed) {
      console.log('\x1b[33m%s\x1b[0m', '  √ ' + test.title + ' - pass');
    }

    if (error) {
      console.log('\x1b[31m%s\x1b[0m', test.title + ' - ' + 'fail');
      console.log('\nError occurred on:\n' + browser.getUrl());
    }
  }
};
