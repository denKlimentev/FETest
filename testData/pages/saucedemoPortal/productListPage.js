const Page =  require('../Page')

class productListPage extends Page {

  get shopping_cart_link () { return $( "[class=shopping_cart_link]") }
  get addToCart_button () { return $( ".//button[text()= 'Add to cart']") }
  get remove_button () { return $(".//button[text()= 'Remove']") }

  getProductDescriptionInTheList = (productName) => {
    return $(`//*[contains(text(), '${productName}')]//ancestor::div[contains(@class, 'item_description')]`);
  };

}

module.exports = new productListPage()

