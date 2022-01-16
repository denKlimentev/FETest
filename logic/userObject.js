'use strict';

const h = require("../support/helpers");
const user = require("../testData/userData.js");
const CartPage = require("../testData/pages/saucedemoPortal/cartPage.js");
const ProductListPage = require("../testData/pages/saucedemoPortal/productListPage.js");
const LoginPage = require('../testData/pages/saucedemoPortal/loginPage');
const StepOnePage = require("../testData/pages/saucedemoPortal/stepOnePage.js");
const StepTwoPage = require("../testData/pages/saucedemoPortal/stepTwoPage.js");

class userObject {
  login = (login, password) => {
    LoginPage.open('/')
    h.setValue(LoginPage.userName_input,login)
    h.setValue(LoginPage.password_input,password)
    h.click(LoginPage.submitBtn)
  };

  addProductToCart = (productName) => {
    const element = ProductListPage.getProductDescriptionInTheList(productName);
    element.waitForDisplayed();
    element.$(ProductListPage.addToCart_button).click()
    ProductListPage.shopping_cart_link.$(ProductListPage.span).waitForDisplayed()
  }

  goToCartPage = () => {
    CartPage.open('/cart.html');
    CartPage.cart_tittle.waitForDisplayed();
  }

  clickCheckoutGotoStepOne = () => {
    h.click(CartPage.checkout_button)
  }

  putRandomDataAndCompleteStepOne = () => {
    const userBody = user.getBody();
    h.setValue(StepOnePage.firstName_input,userBody.firstName);
    h.setValue(StepOnePage.lastName_input,userBody.lastName);
    h.setValue(StepOnePage.postalCode_input, userBody.zipCode);
    h.click(StepOnePage.continue_button);
    StepTwoPage.overview_tittle.waitForDisplayed();
    return userBody;
  }

  finishBuy = () => {
    h.click(StepTwoPage.finish_button)
  }
}

module.exports = new userObject();
