exports.config = {
    framework: 'jasmine2',// or use jasmine?
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./tests/spec.js'],
    params: {
        emailURL: 'https://mail.google.com/mail/',
        defaultTimeout: 10000,
        url: 'https://gmail.com'
    },


//подключаем Allure со скриншотами
    onPrepare: function () {
        let AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
        //logger code:
        let log4js = require('log4js');
        global.logger = require('log4js').getLogger();
        global.logger.level = 'info';
        global.EC = protractor.ExpectedConditions
    }
};




	


