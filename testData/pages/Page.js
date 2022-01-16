 class Page {
    constructor() {
        this.title = 'My Page'
    }

     open (path) {
        browser.url(path)
    }

     get span () { return $(".//span") }

     get itemName_div () { return $(".//div[contains(@class, 'item_name')]") }

     get itemPrice_div () { return $(".//div[contains(@class, 'item_price')]") }

}

 module.exports =  Page