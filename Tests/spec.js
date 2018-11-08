let decache = require('decache');
let AllureReporter = require('jasmine-allure-reporter');
let data = require("../Data/data.js");
let loginPage = require("../Pages/loginPage.js");
let inboxPage = require("../Pages/inboxPage.js");
let RandomTitle = inboxPage.typeRandomTitle();//генерируем уникальное имя для письма и вводим шаблонный текст письма

//login function
let login = function (login, password) {
    loginPage.enterName(login);
    loginPage.submitLogin();
    browser.pause();
    loginPage.enterPassword(password);
    loginPage.submitPassword(data.timer);
    browser.wait(element(by.css(".T-I")).isPresent());
    browser.sleep(data.timer);
};

//тесты
describe('This is first ptr test which', function () {
    beforeEach(function () {
        loginPage.open(data.site)
    });

    it("should send email and verify Sent email", function () {
        login(data.senderEmail, data.PassOne);//заходим в почту, создаем письмо и отправляем 2му пользователю
        inboxPage.newDraft(data.timer);
        inboxPage.SendTo(data.receiverEmail);
        inboxPage.TypeTitle(RandomTitle);//get data from inboxPage
        inboxPage.TypeDescription(data.BodyText);
        inboxPage.Send(data.timer);
        inboxPage.createdEmailCheck(RandomTitle, data.BodyText);//this check if header equal to generated one, if so - verify if body is equal to template
    });

    it('should check presence of email sent from account 1', function () {
        login(data.receiverEmail, data.PassTwo);//заходим в почту 2м юзером
        inboxPage.checkForRequiredEmail(RandomTitle, data.BodyText);//получаем тайтлы последних писем и находим письмо с тайтлом сгенерированным первым юзером
    });

    afterEach(function () {
        decache("../Data/data.js");
        decache("../Pages/loginPage.js");
        decache("../Pages/inboxPage.js");
        browser.restart();
        data = require("../Data/data.js");
        loginPage = require("../Pages/loginPage.js");
        inboxPage = require("../Pages/inboxPage.js");
    })
});