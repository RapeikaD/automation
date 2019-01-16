let data = require("../Data/data.js");

let inboxPage = function () {
    let receiver = element(by.name('to'));
    let mailTitle = element(by.name('subjectbox'));
    let mailDescription = element(by.css('div[aria-label="Message Body"]'));
    let allLetters = element.all(by.css('tr[class="zA zE"]'));

    this.getElementWithTitle = function (title) {
        return element(by.xpath(`//span[text()="${title}"]`));
    };

    this.typeReceiverEmail = function (to) {
        receiver.sendKeys(to)
    };

    this.typeTitle = function (title) {
        mailTitle.sendKeys(title)
    };

    this.typeDescription = function (description) {
        mailDescription.sendKeys(description)
    };

    this.createNewDraft = function () {
        browser.get(`${browser.params.emailURL}` + `?#inbox?compose=new`);
    };

    this.send = function () {
        browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('\uE007').perform();
        browser.wait(element(by.xpath('//span[text()="Message sent."]')).isPresent());
    };

    this.openSentFolder = function () {
        browser.get(`${browser.params.emailURL}` + `#sent`);
        browser.wait(element(by.xpath('//span[text()="To: "]')).isPresent());
        console.log('"Sent" folder is opened.')
    };
//My function to find email index
    this.findIndexOfRequiredEmail = function (title) {
        var deferred = protractor.promise.defer();
        for (let letterCounter = 0; letterCounter < data.emailAmount; letterCounter++) {
            allLetters.get(letterCounter).getAttribute("span").getText().then(function (letter) {
                if (letter.includes(title)) {
                    return deferred.fulfill(letterCounter);
                } else {
                    return deferred.reject(reason);
                }
            });
            return deferred.promise;
        }
    };
    /* Katarina`s function to find index of Required Email
        this.getIndexOfEmailWithTitle = function (title) {
            var deferred = protractor.promise.defer();
            allLetters.getAttribute("span").each(function success(element, index) {
                    element.getText().then(function (text) {
                        if (text.includes(title + 'r')) {
                            return deferred.fulfill(index)
                        }
                    });
                },
                function error(reason) {
                    // Reject our promise and pass the reason from the getText rejection.
                    deferred.reject(reason);
                });
            return deferred.promise;
        };
    */

//this function verify if Title of received Email is equal to generated
    this.verifyEmailTitle = function (emailIndex, title) {
        allLetters.get(emailIndex).getAttribute("span").getText().then(function (letter) {
            if (letter.includes(title)) {
                console.log("Message title is correct");
                expect(letter.includes(title)).toEqual(true);
            } else {
                console.log("`Title` is incorrect ")
            }
        });
    };
//this function verify if Sender Name of received Email is equal to person who sent message
    this.verifySenderName = function (emailIndex, senderName) {
        allLetters.get(emailIndex).getAttribute("span").getText().then(function (letter) {
            if (letter.includes(senderName)) {
                console.log("Sender Name is correct.");
                expect(letter.includes(senderName)).toEqual(true);
            } else {
                console.log("`Sender Name`is incorrect ")
            }
        });
    };
//this function verify if body text in Received Email is equal to generated one.
    this.verifyEmailBody = function (emailIndex, bodyText) {
        allLetters.get(emailIndex).getAttribute("span").getText().then(function (letter) {
            if (letter.includes(bodyText)) {
                console.log("Body Text is correct. ");
                expect(letter.includes(bodyText)).toEqual(true);
            } else {
                console.log("`Body Text` is incorrect. ")
            }
        });
    };
};
module.exports = new inboxPage();