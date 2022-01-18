const Page = require('../Page')

//TODO https://webdriver.io/docs/pageobjects/  official documentation PO can return selector or WebElement so
//TODO getProductDescriptionInTheList return WebElement so construction non-inclusive SOLID
class ProductListPage extends Page {

    get shoppingCartLink() {
        return $(".shopping_cart_link");
    }

    get addToCartButton() {
        return $("[data-test^=add-to-cart-]");
    }

    get removeButton() {
        return $("[data-test^=remove-]");
    }

    get itemNames() {
        return $$(".inventory_item_name");
    }

    getProductDescriptionInTheList = (productName) => {
        if(!productName) {
            throw new TypeError('productName is not provide');
        }
        return $(`//*[contains(text(), '${productName}')]//ancestor::div[contains(@class, 'item_description')]`);
    };
};

module.exports = new ProductListPage();

