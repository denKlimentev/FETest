const Page = require('../Page')

class cartPage extends Page {

    get checkoutButton() {
        return $("[data-test=checkout]");
    }

}

module.exports = new cartPage();