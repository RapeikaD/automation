//var info = require('./data.json')
//var info = json.parse(data);
//let package = require("/package.json")
let data = require("./data.js")


describe('This is first ptr test which', function() {
	it("should send email and verify Sent email", function() {

		browser.waitForAngularEnabled(false);

		//browser.get('http://gmail.com/');
		browser.get(data.site)
		//element(by.name('identifier')).sendKeys('Retestd1@gmail.com');
		//element(by.name('identifier')).sendKeys(info.EmailOne);
		element(by.name('identifier')).sendKeys(data.EmailOne);
		element(by.id('identifierNext')).click();
		browser.pause();
		//element(by.name('password')).sendKeys('strongerpassword!');
		element(by.name('password')).sendKeys(data.PassOne);
		element(by.id('passwordNext')).click();
		browser.wait(element(by.css(".T-I")).isPresent())
  		//browser.sleep(5000)
  		browser.sleep(data.timer)
  		browser.get("https://mail.google.com/mail/#inbox?compose=new")
		//browser.sleep(5000)
		browser.sleep(data.timer)

		var number = Math.round((Math.random()*100))
		var RandomTitle = "Hello dear client # " + number

		//element(by.name('to')).sendKeys('Retestd2@gmail.com')
		element(by.name('to')).sendKeys(data.EmailTwo)
		element(by.name('subjectbox')).sendKeys(RandomTitle)
		element(by.className('Am Al editable LW-avf')).sendKeys('You are the best!')
		
		browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('\uE007').perform();
		browser.get("https://mail.google.com/mail/#sent")
		//browser.sleep(5000)
		browser.sleep(data.timer)

		//this check if header equal to generated one, if so - verify if body is equal to template
		let headerList = element.all(by.css('.bog'))
		let list = element.all(by.css('.y2'))

		for(var i = 0; i < headerList.length; i ++) {
			if (headerList[i] == RandomTitle) {
				expect(headerList.get(i).getText()).toBe(RandomTitle)
				//expect(list.get(i).getText()).toBe(' - You are the best!')
				expect(list.get(i).getText()).toBe(data.BodyText)
				break;
			}
		}
	
		browser.close()

	})

	it('should check presence of email sent from account 1', function() {
			
		browser.restart()
		browser.waitForAngularEnabled(false);
		browser.get('http://gmail.com/')
		

		//element(by.name('identifier')).sendKeys('Retestd2@gmail.com');
		element(by.name('identifier')).sendKeys(data.EmailTwo);
		element(by.id('identifierNext')).click();
		browser.pause();
		//element(by.name('password')).sendKeys('strongerpassword!');
		element(by.name('password')).sendKeys(data.PassTwo);
		element(by.id('passwordNext')).click();
		browser.wait(element(by.css(".T-I")).isPresent())

		let unreadedLetters = element.all(by.css('.zF'))
		let inboxHeaders = element.all(by.css('.bog'))
		let mailBody = element.all(by.css('.y2'))

		for(var e = 0; e < unreadedLetters.length; e++)
		if (unreadedLetters[e] == "test d" && inboxHeaders[e] == RandomTitle) {
			//expect(mailBody.get(i).getText()).toBe(' - You are the best!')
			expect(mailBody.get(i).getText()).toBe(data.BodyText)
			break;
		}
	})
})