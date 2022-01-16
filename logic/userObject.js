'use strict';

const h = require("../support/helpers");
const user = require("../testData/userData.js");
const pages = require('../testData/pages/PageFactory');

class userObject {
    login = (login, password) => {
        pages.LoginPage.open('/')
        h.setValue(pages.LoginPage.userName_input, login)
        h.setValue(pages.LoginPage.password_input, password)
        h.click(pages.LoginPage.submitBtn)
    };

    addProductToCart = (productName) => {
        const element = pages.ProductListPage.getProductDescriptionInTheList(productName);
        element.waitForDisplayed();
        element.$(pages.ProductListPage.addToCart_button).click()
        pages.ProductListPage.shopping_cart_link.$(pages.ProductListPage.span).waitForDisplayed()
    }

    goToCartPage = () => {
        pages.CartPage.open('/cart.html');
        pages.CartPage.cart_tittle.waitForDisplayed();
    }

    clickCheckoutGotoStepOne = () => {
        h.click(pages.CartPage.checkout_button);
    }

    putRandomDataAndCompleteStepOne = () => {
        const userBody = user.getBody();
        h.setValue(pages.StepOnePage.firstName_input, userBody.firstName);
        h.setValue(pages.StepOnePage.lastName_input, userBody.lastName);
        h.setValue(pages.StepOnePage.postalCode_input, userBody.zipCode);
        h.click(pages.StepOnePage.continue_button);
        pages.StepTwoPage.overview_tittle.waitForDisplayed();
        return userBody;
    }

    finishBuy = () => {
        h.click(pages.StepTwoPage.finish_button);
    }
}

module.exports = userObject;
