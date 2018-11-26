let data = require("../Data/data.js");


let loginPage = function () {
    let EC = protractor.ExpectedConditions;
    let passFieldLocator = 'div[id="password"] input[name="password"]'
	let idr = element(by.name('identifier'));
	let password = element(by.name('password'));
    let data = require("../Data/data.js");

    this.logIn = function (login, password) {
        this.enterName(login);
        this.submit();
        browser.wait(EC.visibilityOf($(passFieldLocator)), 10000);
        this.enterPassword(password);
        this.submit();
        browser.wait(element(by.css(".T-I")).isPresent());
        browser.wait(EC.visibilityOf($('div[role="navigation"]')), 10000);
    };
	
	this.enterName = function(email) {
		idr.sendKeys(email)
	};

	this.enterPassword = function(pas) {
		password.sendKeys(pas)
	};

	this.submit = function() {
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
	};

	this.open = function() {
        browser.waitForAngularEnabled(false);
        browser.get(data.site);
	};
};
module.exports = new loginPage();