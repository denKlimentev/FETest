'use strict';

const h = require("../support/helpers");
const user = require("../testData/userData.js");
const pages = require('../testData/pages/pageFactory');

class UserObject {
    login(login, password) {
        if (!password || !login) {
            throw new TypeError('login and password is not provide');
        }
        pages.loginPage.open('/')
        h.setValue(pages.loginPage.userNameInput, login)
        h.setValue(pages.loginPage.passwordInput, password)
        h.click(pages.loginPage.submitBtn)
    };

    getRandomProductName() {
        const productList = pages.productListPage.itemNames;
        return productList[Math.floor(Math.random() * productList.length)].getText();
    }

    addProductToCart = (productName) => {
        if (!productName) {
            throw new TypeError('product name is not provide');
        }
        const element = pages.productListPage.getProductDescriptionInTheList(productName);
        element.scrollIntoView()
        element.waitForClickable()
        h.findElementInParent(element, pages.productListPage.addToCartButton).click();
        h.findElementInParent(pages.productListPage.shoppingCartLink, pages.productListPage.span).waitForDisplayed();
    }

    getPrise(productName) {
        if (!productName) {
            throw new TypeError('product name is not provide');
        }
        const itemPrice = h.findElementInParent(
            pages.productListPage.getProductDescriptionInTheList(productName)
            , pages.productListPage.itemPriceDiv).getText();
        return +itemPrice.toString().replace('$', '')
    }

    goToCartPage() {
        pages.cartPage.open('/cart.html');
        pages.cartPage.cartTittle.waitForDisplayed();
    }

    clickCheckoutGotoStepOne() {
        h.click(pages.cartPage.checkoutButton);
    }


    clickCheckoutGotoStepTwo() {
        h.click(pages.stepOnePage.continueButton);
        pages.stepTwoPage.overviewTittle.waitForDisplayed();
    }

    putRandomData() {
        const userBody = user.getBody();
        h.setValue(pages.stepOnePage.firstNameInput, userBody.firstName);
        h.setValue(pages.stepOnePage.lastNameInput, userBody.lastName);
        h.setValue(pages.stepOnePage.postalCodeInput, userBody.zipCode);
        return userBody;
    }

    finishStepTwo() {
        h.click(pages.stepTwoPage.finishButton);
    }
}

module.exports = new UserObject();
