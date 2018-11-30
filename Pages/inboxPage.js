let inboxPage = function () {

    let receiver = element(by.name('to'));
    let mailTitle = element(by.name('subjectbox'));
    let mailDescription = element(by.css('div[aria-label="Message Body"]'));
    let unreadedLetters = element.all(by.css('tr[class="zA zE"]'));//element.all(by.css('span[email="retestd1@gmail.com"]'));

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

    this.createdEmailCheck = function (title) {
        console.log(`Generated title is: ` + `${title}`);
        expect(this.getElementWithTitle(title).isPresent());
        console.log('Email is present in "sent" folder.');
    };

    this.checkForRequiredEmail = function (title, senderName, bodyText) {
        for (let i = 0; i < 40; i++ ) {
        unreadedLetters.get(i).getAttribute("span").getText().then( function (rt2) {
                if (rt2.indexOf(title) != -1 && rt2.indexOf(senderName) != -1 && rt2.indexOf(bodyText) != -1) {
                    console.log("Required Message: " + rt2);
                    console.log("Message received successfully.")
                }
            });break;
        };
    };
};
module.exports = new inboxPage();