const Page = require('../Page')

class CompletePage extends Page {

    get completeMessage() {
        return $(".complete-header");
    }

}

module.exports = new CompletePage();