const Page = require('../Page')

class ProductListPage extends Page {

    get shoppingCartLink() {
        return $("[class=shopping_cart_link]");
    }

    get addToCartButton() {
        return $(".//button[text()= 'Add to cart']");
    }

    get removeButton() {
        return $(".//button[text()= 'Remove']");
    }

    get itemNames() {
        return $$("[class='inventory_item_name']");
    }

    getProductDescriptionInTheList = (productName) => {
        if(!productName) {
            throw new TypeError('productName is not provide');
        }
        return $(`//*[contains(text(), '${productName}')]//ancestor::div[contains(@class, 'item_description')]`);
    };
};

module.exports = new ProductListPage();

