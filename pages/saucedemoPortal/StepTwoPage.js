const Page = require('../Page')

class StepTwoPage extends Page {

    get finishButton() {
        return $("[data-test=finish]");
    }

    get summaryInfoBox() {
        return $(".summary_info");
    }

    get subtotalLabel() {
        return $(".summary_subtotal_label");
    }

    get taxLabel() {
        return $(".summary_tax_label");
    }

    get totalLabel() {
        return $(".summary_total_label");
    }
}

module.exports = new StepTwoPage();