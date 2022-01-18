class Page {
    constructor() {
        this.title = 'My Page';
    }

    open(path) {
        browser.url(path);
    }

    get span() {
        return $("span");
    }

    get itemNameDiv() {
        return $(".inventory_item_name");
    }

    get itemPriceDiv() {
        return $(".inventory_item_price");
    }

}

module.exports = Page;