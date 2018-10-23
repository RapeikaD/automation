let data = require("./data.js");
let loginPage = require("./loginPage.js");
let inbox = require("./inbox.js");
//let conf = require('conf.js')
//module.export = conf
//const ii=require ('./conf.js')
//var config = require("./conf.js")()


//тесты
describe('This is first ptr test which', function() {
	beforeEach(async function() {
		//browser.restart()
		browser.waitForAngularEnabled(false);
		browser.get(data.site);
	});


	
	it("should send email and verify Sent email", function() {
		//заходим в почту, создаем письмо и отправляем 2му пользователю
		//browser.waitForAngularEnabled(false);
		//browser.get(data.site)

		element(by.name('identifier')).sendKeys(data.EmailOne);
		//loginPage.idr.sendKeys(data.EmailOne);
		element(by.id('identifierNext')).click();
		//loginPage.idNext.click();
		browser.pause();
		element(by.name('password')).sendKeys(data.PassOne);
		//loginPage.password.sendKeys(data.PassOne);
		element(by.id('passwordNext')).click();
		//loginPage.passwordNext.click();		
		browser.wait(element(by.css(".T-I")).isPresent())
  		browser.sleep(data.timer)
  		//browser.wait(data.timer)  		
  		//browser.wait(element(by.className("tYe0Ve")).isPresent())
  		browser.get("https://mail.google.com/mail/#inbox?compose=new")
		browser.sleep(data.timer)
		//генерируем уникальное имя для письма и вводим шаблонный текст письма
		var number = Math.round((Math.random() * 100))
		var RandomTitle = "Hello dear client # " + number

		element(by.name('to')).sendKeys(data.EmailTwo)
		element(by.name('subjectbox')).sendKeys(RandomTitle)
		element(by.className('Am Al editable LW-avf')).sendKeys(' - You are the best!')
		
		browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('\uE007').perform();
		browser.get("https://mail.google.com/mail/#sent")
		browser.sleep(data.timer)

		//this check if header equal to generated one, if so - verify if body is equal to template
		let headerList = element.all(by.css('.bog'))
		let list = element.all(by.css('.y2'))

		for(var i = 0; i < headerList.length; i ++) {
			if (headerList[i] == RandomTitle) {
				expect(headerList.get(i).getText()).toBe(RandomTitle)
				expect(list.get(i).getText()).toBe(' - You are the best!')
				break;
			}
		}
	
		//browser.close()

	})

	it('should check presence of email sent from account 1', function() {
			//browser.restart()
		//browser.restart()
		//browser.waitForAngularEnabled(false);
		//browser.get(data.site)
		//заходим в почту 2м юзером для проверки получения отправленного письма
		element(by.name('identifier')).sendKeys(data.EmailTwo);
		element(by.id('identifierNext')).click();
		browser.pause();
		element(by.name('password')).sendKeys(data.PassTwo);
		element(by.id('passwordNext')).click();
		browser.wait(element(by.css(".T-I")).isPresent())

		let unreadedLetters = element.all(by.css('.zF'))
		let inboxHeaders = element.all(by.css('.bog'))
		let mailBody = element.all(by.css('.y2'))
		//получаем тайтлы последних писем и находим письмо с тайтлом сгенерированным первым юзером
		for(var e = 0; e < unreadedLetters.length; e++)
		if (unreadedLetters[e] == "test d" && inboxHeaders[e] == RandomTitle) {
			expect(mailBody.get(i).getText()).toBe(' - You are the best!')
			break;
		}
	})
	afterEach(async function() {
		browser.close()
		browser.restart()
	})
})