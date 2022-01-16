const Page = require('../Page')

class cartPage extends Page {

    get cartTittle() {
        return $("//span[text() = 'Your Cart']");
    }

    get checkoutButton() {
        return $("[data-test=checkout]");
    }

}

module.exports = new cartPage();