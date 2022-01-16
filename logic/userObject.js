'use strict';

const h = require("../support/helpers");
const user = require("../testData/userData.js");
const pages = require('../testData/pages/PageFactory');

class userObject {
    login = (login, password) => {
        if (password === undefined || login === undefined) {
            throw new TypeError('login and password is not provide');
        }
        pages.LoginPage.open('/')
        h.setValue(pages.LoginPage.userName_input, login)
        h.setValue(pages.LoginPage.password_input, password)
        h.click(pages.LoginPage.submitBtn)
    };

    getRandomProductName = () => {
        const productList = pages.ProductListPage.item_names;
        return productList[Math.floor(Math.random() * productList.length)].getText();
    }

    addProductToCart = (productName) => {
        if (productName === undefined || productName === "") {
            throw new TypeError('product name is not provide');
        }
        const element = pages.ProductListPage.getProductDescriptionInTheList(productName);
        element.scrollIntoView()
        element.waitForClickable()
        h.findElementInParent(element, pages.ProductListPage.addToCart_button).click();
        h.findElementInParent(pages.ProductListPage.shopping_cart_link, pages.ProductListPage.span).waitForDisplayed();
    }

    getPrise = (productName) => {
        if (productName === undefined || productName === "") {
            throw new TypeError('product name is not provide');
        }
        const itemPrice = h.findElementInParent(
            pages.ProductListPage.getProductDescriptionInTheList(productName)
            , pages.ProductListPage.itemPrice_div).getText();
        return +itemPrice.toString().replace('$', '')
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
