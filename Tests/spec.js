var decache = require('decache');

var AllureReporter = require('jasmine-allure-reporter');

let data = require("../Data/data.js");
let loginPage = require("../Pages/loginPage.js");
let inbox = require("../Pages/inbox.js");

//login function
let login = function (login,password) {
    loginPage.enterName(login);
    loginPage.submitLogin();
    browser.pause();
    loginPage.enterPassword(password);
    loginPage.submitPassword();
    browser.wait(element(by.css(".T-I")).isPresent());
    browser.sleep(data.timer);
};

//тесты
describe('This is first ptr test which', function() {
	beforeEach(function() {
		loginPage.open(data.site)
	});

	it("should send email and verify Sent email", function() {
		//заходим в почту, создаем письмо и отправляем 2му пользователю
		login(data.senderEmail,data.PassOne);
  		inbox.newDraft(data.timer);
		
		//генерируем уникальное имя для письма и вводим шаблонный текст письма
		var number = Math.round((Math.random() * 100));
		var RandomTitle = "Hello dear client # " + number;

		inbox.SendTo(data.receiverEmail);
		inbox.TypeTitle(RandomTitle);
		inbox.TypeDescription(data.BodyText);
		inbox.Send(data.timer);

		//this check if header equal to generated one, if so - verify if body is equal to template
		let headerList = element.all(by.css('.bog'));
		let list = element.all(by.css('.y2'));

		for(var i = 0; i < headerList.length; i ++) {
			if (headerList[i] == RandomTitle) {
				expect(headerList.get(i).getText()).toBe(RandomTitle);
				expect(list.get(i).getText()).toBe(' - ' + data.BodyText);
				break;
			}
		}
	});

	it('should check presence of email sent from account 1', function() {

        login(data.receiverEmail,data.PassTwo);
		let unreadedLetters = element.all(by.css('.zF'));
		let inboxHeaders = element.all(by.css('.bog'));
		let mailBody = element.all(by.css('.y2'));

		//получаем тайтлы последних писем и находим письмо с тайтлом сгенерированным первым юзером
		for(var e = 0; e < unreadedLetters.length; e++)
		if (unreadedLetters[e] == "test d" && inboxHeaders[e] == RandomTitle) {
			expect(mailBody.get(i).getText()).toBe(' - ' + data.BodyText);
			break;
		}
	});

	afterEach(function() {
		decache("../Data/data.js");
		decache("../Pages/loginPage.js");
		decache("../Pages/inbox.js");

		browser.restart();

		data = require("../Data/data.js");
		loginPage = require("../Pages/loginPage.js");
		inbox = require("../Pages/inbox.js");

	})
});