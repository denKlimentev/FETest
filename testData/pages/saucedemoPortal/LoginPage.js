const Page = require('../Page')

class LoginPage extends Page {

    get userNameInput() {
        return $("[data-test=username]");
    }

    get passwordInput() {
        return $("[data-test=password]");
    }

    get submitBtn() {
        return $("[data-test=login-button]");
    }

}

module.exports = new LoginPage();