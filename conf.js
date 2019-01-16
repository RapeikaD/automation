exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./tests/spec.js'],
    url: 'https://gmail.com',
    params: {
        emailURL: 'https://mail.google.com/mail/'
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true;
    },

//подключаем Allure со скриншотами
    onPrepare: function () {

        //browser.ignoreSynchronization = true;//this handle function and their promises

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
    }
};



	


