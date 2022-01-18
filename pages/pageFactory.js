const ProductListPage = require('./saucedemoPortal/ProductListPage.js');
const StepOnePage = require('./saucedemoPortal/StepOnePage.js');
const StepTwoPage = require('./saucedemoPortal/StepTwoPage.js');
const CompletePage = require('./saucedemoPortal/CompletePage.js');
const CartPage = require("./saucedemoPortal/CartPage.js");
const LoginPage = require('./saucedemoPortal/LoginPage');

const pageFactory = {

    get productListPage() {
        return ProductListPage;
    },

    get stepTwoPage() {
        return StepTwoPage;
    },

    get stepOnePage() {
        return StepOnePage;
    },

    get completePage() {
        return CompletePage;
    },

    get cartPage() {
        return CartPage;
    },

    get loginPage() {
        return LoginPage;
    }

}

module.exports = pageFactory;