var decache = require('decache')
let data = require("./data.js");
let loginPage = require("./loginPage.js");
let inbox = require("./inbox.js");

//тесты
describe('This is first ptr test which', function() {
	beforeEach(function() {
		browser.waitForAngularEnabled(false);
		browser.get(data.site);//add in page Object
	});

	it("should send email and verify Sent email", function() {
		//заходим в почту, создаем письмо и отправляем 2му пользователю
		loginPage.enterName(data.EmailOne);
		loginPage.clickNext1();
		browser.pause();
		loginPage.enterPassword(data.PassOne);
		loginPage.clickNext2();
		browser.wait(element(by.css(".T-I")).isPresent())
  		browser.sleep(data.timer)
  		browser.get("https://mail.google.com/mail/#inbox?compose=new")
		browser.sleep(data.timer)
		
		//генерируем уникальное имя для письма и вводим шаблонный текст письма
		var number = Math.round((Math.random() * 100))
		var RandomTitle = "Hello dear client # " + number

		inbox.SendTo(data.EmailTwo)
		inbox.TypeTitle(RandomTitle)
		inbox.TypeDescription(data.BodyText)
		browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('\uE007').perform();
		browser.get("https://mail.google.com/mail/#sent")
		browser.sleep(data.timer)

		//this check if header equal to generated one, if so - verify if body is equal to template
		let headerList = element.all(by.css('.bog'))
		let list = element.all(by.css('.y2'))

		for(var i = 0; i < headerList.length; i ++) {
			if (headerList[i] == RandomTitle) {
				expect(headerList.get(i).getText()).toBe(RandomTitle)
				expect(list.get(i).getText()).toBe(' - ' + data.BodyText)
				break;
			}
		}
	})

	it('should check presence of email sent from account 1', function() {
		//заходим в почту 2м юзером для проверки получения отправленного письма
		loginPage.enterName(data.EmailTwo)
		loginPage.clickNext1()
		browser.pause();
		loginPage.enterPassword(data.PassTwo);
		loginPage.clickNext2();
		browser.wait(element(by.css(".T-I")).isPresent())
		browser.sleep(data.timer)

		let unreadedLetters = element.all(by.css('.zF'))
		let inboxHeaders = element.all(by.css('.bog'))
		let mailBody = element.all(by.css('.y2'))

		//получаем тайтлы последних писем и находим письмо с тайтлом сгенерированным первым юзером
		for(var e = 0; e < unreadedLetters.length; e++)
		if (unreadedLetters[e] == "test d" && inboxHeaders[e] == RandomTitle) {
			expect(mailBody.get(i).getText()).toBe(' - ' + data.BodyText)
			break;
		}
	})
	afterEach(function() {
		decache('./data.js');
		decache("./loginPage.js");
		decache("./inbox.js");

		browser.restart()

		data = require("./data.js");		
		loginPage = require("./loginPage.js");
		inbox = require("./inbox.js");

	})
})