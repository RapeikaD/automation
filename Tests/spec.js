let decache = require('decache');
let AllureReporter = require('jasmine-allure-reporter');
let data = require("../Data/data.js");
let loginPage = require("../Pages/loginPage.js");
let inboxPage = require("../Pages/inboxPage.js");
let chance = require('chance');
chance = new chance();

//generate random title
let RandomTitle = chance.string({length: 7});

describe('This is first protractor test which', function () {
    beforeEach(function () {
        loginPage.open()
    });

    it("should send email and verify Sent email", function () {
        loginPage.logIn(data.senderEmail, data.PassOne);//log in gmail via 1st user
        inboxPage.createNewDraft();//create new message
        inboxPage.typeReceiverEmail(data.receiverEmail);//type receiver
        inboxPage.typeTitle(RandomTitle);//type email title
        inboxPage.typeDescription(data.BodyText);//type email description
        inboxPage.send();
        inboxPage.openSentFolder();
        console.log(`Generated title is: ` + `${RandomTitle}`);//title
        expect(inboxPage.getElementWithTitle(RandomTitle).isPresent());//verify if header equal to generated one, if so - verify if body is equal to template
        console.log('Email is present in "sent" folder.');
    });

    it('should check presence of email sent from account 1', function () {
        loginPage.logIn(data.receiverEmail, data.PassTwo);//log in gmail via 2nd user
        inboxPage.findIndexOfRequiredEmail(RandomTitle).then(function (emailIndex) {
            console.log("Required Email was found. Email Index: " + emailIndex);
            //expect((element.all(by.css('tr[class="zA zE"]')).get(emailIndex).getAttribute("span").getText()).includes(data.senderName)).isEqual(true);
            inboxPage.verifyEmailTitle(emailIndex, RandomTitle);
            inboxPage.verifySenderName(emailIndex, data.senderName);
            inboxPage.verifyEmailBody(emailIndex, data.BodyText);
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
    })
});