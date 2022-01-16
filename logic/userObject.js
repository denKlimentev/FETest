'use strict';

const h = require("../support/helpers");
const loginPage = require("../testData/saucedemoPortal/pages/loginPage.json");
const cartPage = require("../testData/saucedemoPortal/pages/cartPage.json");
const stepOnePage = require("../testData/saucedemoPortal/pages/stepOnePage.json");
const stepTwoPage = require("../testData/saucedemoPortal/pages/stepTwoPage.json");
const basePage = require('../testData/saucedemoPortal/pages/basePage.json');
const user = require("../testData/userData.js");
const productListPage = require("../testData/saucedemoPortal/pages/productListPage");

class userObject {
  login = (login, password) => {
    browser.url('/');
    h.setValue($(loginPage.userName_input),login)
    h.setValue($(loginPage.password_input),password)
    h.click($(loginPage.login_button));
  };

  addProductToCart = (productName) => {
    const element = h.getProductDescriptionInTheList(productName);
    element.waitForDisplayed();
    element.$(productListPage.addToCart_button).click();
    $(productListPage.shopping_cart_link).$(basePage.span).waitForDisplayed();
  }

  goToCartPage = () => {
    browser.url('/cart.html');
    $(cartPage.cart_tittle).waitForDisplayed();
  }

  clickCheckoutGotoStepOne = () => {
    h.click($(cartPage.checkout_button))
  }

  putRandomDataAndCompleteStepOne = () => {
    const userBody = user.getBody();
    h.setValue($(stepOnePage.firstName_input),userBody.firstName);
    h.setValue($(stepOnePage.lastName_input),userBody.lastName);
    h.setValue($(stepOnePage.postalCode_input), userBody.zipCode);
    h.click($(stepOnePage.continue_button));
    $(stepTwoPage.overview_tittle).waitForDisplayed();
    return userBody;
  }

  finishBuy = () => {
    h.click($(stepTwoPage.finish_button))
  }
}

module.exports = userObject;
