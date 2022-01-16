const Page = require('../Page')

class CompletePage extends Page {

    get completeMessage() {
        return $("h2[class='complete-header']");
    }

}

module.exports = new CompletePage();