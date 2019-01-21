let decache = require('decache');
let AllureReporter = require('jasmine-allure-reporter');
let data = require("../Data/data.js");
let loginPage = require("../Pages/loginPage.js");
let inboxPage = require("../Pages/inboxPage.js");
let chance = require('chance');
chance = new chance();

//generate random title
let randomTitle = chance.string({length: 7});

describe('This is first protractor test which', () => {
    beforeAll(async () => {
        loginPage.open();
        logger.info('Login page is opened.');
        loginPage.logIn(data.senderEmail, data.PassOne);
        logger.info('Login succesfull!');
        inboxPage.createAndSendEmail(randomTitle);
        logger.info('Email was successfully generated.');
        decache("../Data/data.js");
        decache("../Pages/loginPage.js");
        decache("../Pages/inboxPage.js");
        browser.restart();
        data = require("../Data/data.js");
        loginPage = require("../Pages/loginPage.js");
        inboxPage = require("../Pages/inboxPage.js");
    });

    beforeEach(function () {
        loginPage.open();
    });

    it("should send email and verify Sent email", function () {
        loginPage.logIn(data.senderEmail, data.PassOne);
        logger.info(`Generated title is: ` + `${randomTitle}`);//log in gmail via 1st user
        inboxPage.openSentFolder();
        logger.info('Sent folder is opened.');
        expect(inboxPage.getElementWithTitle(randomTitle).isPresent(), "Error Message ????");//verify if header equal to generated one, if so - verify if body is equal to template
    });

    it('should check presence of email sent from account 1', function () {
        loginPage.logIn(data.receiverEmail, data.PassTwo);//log in gmail via 2nd user
        logger.info('Login successfull.(Receiver)');
        inboxPage.findIndexOfRequiredEmail(randomTitle).then(function (emailIndex) {
            inboxPage.getEmailText(emailIndex, randomTitle).then(function (text) {
                logger.info('Required email was found. Email Index: ' + emailIndex);
                expect(text.includes(randomTitle)).toEqual(true, logger.info('Email Title is correct!'));//negative case is not working properly
                expect(text.includes(data.senderName)).toEqual(true, logger.info('Sender Name is correct!'));
                expect(text.includes(data.BodyText)).toEqual(true, logger.info('Body text is correct!'));
            });
        });
    });

    afterEach(function () {
        decache("../Data/data.js");
        decache("../Pages/loginPage.js");
        decache("../Pages/inboxPage.js");
        browser.restart();
        data = require("../Data/data.js");
        loginPage = require("../Pages/loginPage.js");
        inboxPage = require("../Pages/inboxPage.js");
    });
});