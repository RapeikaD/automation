let loginPage = function () {

	let idr = element(by.name('identifier'));
	let idNext = element(by.id('identifierNext'));
	let password = element(by.name('password'));
	let passwordNext = element(by.id('passwordNext'));
	
	this.enterName = function(email) {
		idr.sendKeys(email)
	};

	this.clickNext1 = function() {
		idNext.click()
	};

	this.enterPassword = function(pas) {
		password.sendKeys(pas)
	};

	this.clickNext2 = function() {
		passwordNext.click()
	};

}
module.exports = new loginPage();