let inboxPage = function () {

    let receiver = element(by.name('to'));
    let mailTitle = element(by.name('subjectbox'));
    let mailDescription = element(by.css('div[aria-label="Message Body"]'));

    //collect all titles for further check presence of required one
    let headerList = element.all(by.css('.bog'));
    //let headerList = element(by.xpath('//span[text()='+ spec.RandomTitle +']'));
    let list = element.all(by.css('.y2'));

    //variables to look for email received from first user
    let unreadedLetters = element.all(by.css('span[email="retestd1@gmail.com"]'));
    let inboxHeaders = element.all(by.css('.bog'));
    let mailBody = element.all(by.css('.y2'));

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
        browser.get("https://mail.google.com/mail/#inbox?compose=new");
        //browser.get($.emailURL + '#inbox?compose=new');
        browser.wait(element(by.name('to')).isPresent());
    };

    this.send = function () {
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

   // this.createdEmailCheck = function (RandomTitle) {
      //  expect(headerList.getText()).toBe(RandomTitle);
    //};

    this.checkForRequiredEmail = function (RandomTitle, BodyText) {
        for (let e = 0; e < unreadedLetters.length; e++)
            if (unreadedLetters[e] == "test d" && inboxHeaders[e] == RandomTitle) {
                expect(mailBody.get(i).getText()).toBe(' - ' + BodyText);
                break;
            }
    };

};
module.exports = new inboxPage();