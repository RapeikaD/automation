let loginPage = function () {

	let idr = element(by.name('identifier'));
	let idNext = element(by.id('identifierNext'));
	let password = element(by.name('password'));
	let passwordNext = element(by.id('passwordNext'));
	
	this.enterName = function(email) {
		idr.sendKeys(email)
	};

	this.submitLogin = function() {
		idNext.click()
	};

	this.enterPassword = function(pas) {
		password.sendKeys(pas)
	};

	this.submitPassword = function(delay) {
		passwordNext.click();
        //browser.wait(element(by.css(".T-I")).isPresent());
        //browser.sleep(delay);
	};

	this.open = function(link) {
        browser.waitForAngularEnabled(false);
        browser.get(link);
	};

};
module.exports = new loginPage();