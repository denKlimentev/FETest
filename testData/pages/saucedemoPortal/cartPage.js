const Page =  require('../Page')

class cartPage extends Page {

  get cart_tittle () { return $( "//span[text() = 'Your Cart']") }
  get checkout_button () { return $("[data-test=checkout]") }

}

module.exports = new cartPage()