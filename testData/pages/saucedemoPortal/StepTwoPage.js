const Page = require('../Page')

class StepTwoPage extends Page {

    get overviewTittle() {
        return $("//span[text() = 'Checkout: Overview']");
    }

    get finishButton() {
        return $("[data-test=finish]");
    }

    get summaryInfoBox() {
        return $("div[class='summary_info']");
    }

    get subtotalLabel() {
        return $(".//div[@class = 'summary_subtotal_label']");
    }

    get taxLabel() {
        return $(".//div[@class = 'summary_tax_label']");
    }

    get totalLabel() {
        return $(".//div[@class = 'summary_total_label']");
    }
}

module.exports = new StepTwoPage();