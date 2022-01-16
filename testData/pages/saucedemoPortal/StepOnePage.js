const Page = require('../Page')

class StepOnePage extends Page {

    get firstNameInput() {
        return $("[data-test=firstName]");
    }

    get lastNameInput() {
        return $("[data-test=lastName]");
    }

    get postalCodeInput() {
        return $("[data-test=postalCode]");
    }

    get continueButton() {
        return $("[data-test=continue]");
    }

}

module.exports = new StepOnePage();