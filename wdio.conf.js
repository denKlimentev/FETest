const hostUrl = process.env.HOST;
const testDirectory = process.env.testDirectory;
const allure = require('allure-commandline')

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
    reporters: [
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableMochaHooks: true,
                disableWebdriverScreenshotsReporting: false,
                disableWebdriverStepsReporting: true
            }
        ]
    ],
    afterStep: function (test, scenario, {error, duration, passed}) {
        if (error) {
            browser.takeScreenshot();
        }
    },
    afterTest: function (test, context, {error, result, duration, passed, retries}) {
        if (passed) {
            console.log('\x1b[33m%s\x1b[0m', '  √ ' + test.title + ' - pass');
        }

        if (error) {
            console.log('\x1b[31m%s\x1b[0m', test.title + ' - ' + 'fail');
            console.log('\nError occurred on:\n' + browser.getUrl());
        }
    },
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
};
