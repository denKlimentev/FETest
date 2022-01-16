class Page {
    constructor() {
        this.title = 'My Page';
    }

    open(path) {
        browser.url(path);
    }

    get span() {
        return $(".//span");
    }

    get itemNameDiv() {
        return $(".//div[contains(@class, 'item_name')]");
    }

    get itemPriceDiv() {
        return $(".//div[contains(@class, 'item_price')]");
    }

}

module.exports = Page;