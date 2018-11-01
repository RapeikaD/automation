let inbox = function () {

	let receiver = 	element(by.name('to'));
	let mailTitle = element(by.name('subjectbox'));
	let mailDescription = element(by.className('Am Al editable LW-avf'));

	let unreadedLetters = element.all(by.css('.zF'));
	let inboxHeaders = element.all(by.css('.bog'));
	let mailBody = element.all(by.css('.y2'));

	this.SendTo = function (to) {
		receiver.sendKeys(to)
	};

	this.TypeTitle = function (title) {
		mailTitle.sendKeys(title)
	};

	this.TypeDescription = function(description) {
		mailDescription.sendKeys(description)
	};

	this.newDraft = function (delay) {
        browser.get("https://mail.google.com/mail/#inbox?compose=new");
        browser.sleep(delay);
    };

    this.Send = function (delay) {
        browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('\uE007').perform();
        browser.get("https://mail.google.com/mail/#sent");
        browser.sleep(delay);
    }

};
module.exports = new inbox();