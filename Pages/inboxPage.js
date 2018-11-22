let chance = require('chance');
chance = new chance();

let inboxPage = function () {

    let receiver = element(by.name('to'));
    let mailTitle = element(by.name('subjectbox'));
    let mailDescription = element(by.css('div[aria-label="Message Body"]'));

    //collect all titles for further check presence of required one
    let headerList = element.all(by.css('.bog'));
    let list = element.all(by.css('.y2'));

    //variables to look for email received from first user
    let unreadedLetters = element.all(by.css('span[email="retestd1@gmail.com"]'));
    let inboxHeaders = element.all(by.css('.bog'));
    let mailBody = element.all(by.css('.y2'));

    this.SendTo = function (to) {
        receiver.sendKeys(to)
    };

    this.TypeTitle = function (title) {
        mailTitle.sendKeys(title)
    };

    this.TypeDescription = function (description) {
        mailDescription.sendKeys(description)
    };

    this.newDraft = function () {
        browser.get("https://mail.google.com/mail/#inbox?compose=new");
        browser.wait(element(by.name('to')).isPresent());
    };

    this.Send = function () {
        browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('\uE007').perform();
        browser.get("https://mail.google.com/mail/#sent");
    };
    //looks like this functions are not working
    this.createdEmailCheck = function (RandomTitle, BodyText) {
        for (let i = 0; i < headerList.length; i++) {
            if (headerList[i] == RandomTitle) {
                //expect(headerList.get(i).getText()).toBe(RandomTitle);
                expect(list.get(i).getText()).toBe(' - ' + BodyText + "EXTRA INFO FOR TEST");
                break;
            }
        }
    };

    this.checkForRequiredEmail = function (RandomTitle, BodyText) {
        for (let e = 0; e < unreadedLetters.length; e++)
            if (unreadedLetters[e] == "test d" && inboxHeaders[e] == RandomTitle) {
                expect(mailBody.get(i).getText()).toBe(' - ' + BodyText);
                break;
            }
    };

    let Title = 0;
    this.typeRandomTitle = function () {
        for (let i = 0; i < 10; i++) {
            Title += chance.letter()
        }
        return Title
    }

};
module.exports = new inboxPage();