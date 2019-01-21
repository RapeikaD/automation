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
        browser.wait(element(by.xpath('//span[text()="Message sent."]')).isPresent(), browser.params.defaultTimeout, "Element `Message sent` wasn`t found");//new
    };

    this.openSentFolder = function () {
        browser.get(`${browser.params.emailURL}` + `#sent`);
        browser.wait(element(by.xpath('//span[text()="To: "]')).isPresent(), browser.params.defaultTimeout, "Element `To:` wasn`t found");//new
    };

    this.createAndSendEmail = function (title) {
        this.createNewDraft();//create new message
        this.typeReceiverEmail(data.receiverEmail);//type receiver
        this.typeTitle(title);//type email title
        this.typeDescription(data.BodyText);//type email description
        this.send();
    };
//this function finds email index
    this.findIndexOfRequiredEmail = function (title) {
        var deferred = protractor.promise.defer();
        for (let messageNumber = 0; messageNumber < data.emailAmount; messageNumber++) {
            allLetters.get(messageNumber).getAttribute("span").getText().then(function (message) {
                if (message.includes(title)) {
                    return deferred.fulfill(messageNumber);
                } else {
                    return deferred.reject(reason);
                }
            });
            return deferred.promise;
        }
    };
//this function get text of required Email
    this.getEmailText = function (emailIndex, title) {
        var deferred = protractor.promise.defer();
        allLetters.get(emailIndex).getAttribute("span").getText().then(function (message) {
            if (message.includes(title)) {
                return deferred.fulfill(message);
            } else {
                return deferred.reject(reason);
            }
        });
        return deferred.promise;
    };
};
module.exports = new inboxPage();