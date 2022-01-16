const ProductListPage = require('./saucedemoPortal/productListPage.js');
const StepOnePage = require('./saucedemoPortal/stepOnePage.js');
const StepTwoPage = require('./saucedemoPortal/stepTwoPage.js');
const CompletePage = require('./saucedemoPortal/completePage.js');
const CartPage = require("./saucedemoPortal/cartPage.js");
const LoginPage = require('./saucedemoPortal/loginPage');

class PageFactory {

     get ProductListPage () { return ProductListPage}
     get StepTwoPage () { return StepTwoPage}
     get StepOnePage () { return StepOnePage}
     get CompletePage () { return CompletePage}
     get CartPage () { return CartPage}
     get LoginPage () { return LoginPage}

}

 module.exports = new PageFactory();