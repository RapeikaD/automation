let inbox = function () {

	let receiver = 	element(by.name('to'));
	let mailTitle = element(by.name('subjectbox'));
	let mailDescription = element(by.className('Am Al editable LW-avf'));

	let unreadedLetters = element.all(by.css('.zF'));
	let inboxHeaders = element.all(by.css('.bog'));
	let mailBody = element.all(by.css('.y2'));

	this.SendTo = function (to) {
		receiver.sendKeys(to)
	}

	this.TypeTitle = function (title) {
		mailTitle.sendKeys(title)
	}

	this.TypeDescription = function(description) {
		mailDescription.sendKeys(description)
	} 
}
module.exports = new inbox()