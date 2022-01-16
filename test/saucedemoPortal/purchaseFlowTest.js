'use strict';
const h = require('../../support/helpers');
const assert = require('soft-assert');
const User = require('../../logic/UserObject.js');
const testAccts = require('../../testData/testAccounts.json');
const pages = require('../../testData/pages/pageFactory.js');

const tax = 0.08;
describe('Automate the purchase flow ', () => {
    let productName, itemPrice, itemTax;

    before('Precondition : login and get random product', () => {
        User.login(testAccts.standardUser, testAccts.password)
        productName = User.getRandomProductName();
        console.log('Product name : '+productName);
    });

    it('Add Product in cart', () => {
        User.addProductToCart(productName);

        itemPrice = User.getPrise(productName)
        itemTax = parseFloat(itemPrice * tax).toFixed(2);

        assert.softAssert(
            h.findElementInParent(pages.productListPage.shoppingCartLink, pages.productListPage.span).getText()
            , '1'
            , 'Number of purchases must be one'
        );
        assert.softTrue(
            h.findElementInParent(pages.productListPage.getProductDescriptionInTheList(productName), pages.productListPage.removeButton).isDisplayed()
            , 'Button removed in added product must be visible');
        assert.softAssertAll();
    });

    it('Check product in cart', () => {
        User.goToCartPage();

        assert.softAssert(pages.cartPage.itemNameDiv.getText(), productName);
        assert.softContains(pages.cartPage.itemPriceDiv.getText(), `$${itemPrice}`);
        assert.softAssertAll();
    });

    it('Processing Step 1', () => {
        User.clickCheckoutGotoStepOne();

        const userBody = User.putRandomData();

        assert.softAssert(pages.stepOnePage.firstNameInput.getValue(), userBody.firstName);
        assert.softAssert(pages.stepOnePage.lastNameInput.getValue(), userBody.lastName);
        assert.softAssert(pages.stepOnePage.postalCodeInput.getValue(), userBody.zipCode);

        User.clickCheckoutGotoStepTwo();

        assert.softAssertAll();

    });

    it('Processing Step 2', () => {
        assert.softAssert(pages.stepTwoPage.itemNameDiv.getText(), productName);
        assert.softAssert(pages.stepTwoPage.itemPriceDiv.getText(), `$${itemPrice}`);
        assert.softContains(
            h.findElementInParent(pages.stepTwoPage.summaryInfoBox, pages.stepTwoPage.subtotalLabel).getText()
            , `$${itemPrice}`
            , 'Subtotal must be equel item price'
        );
        assert.softContains(
            h.findElementInParent(pages.stepTwoPage.summaryInfoBox, pages.stepTwoPage.taxLabel).getText()
            , `$${itemTax}`
            , 'Tax must be equel defalte tax'
        );
        assert.softContains(
            h.findElementInParent(pages.stepTwoPage.summaryInfoBox, pages.stepTwoPage.totalLabel).getText()
            , `$${parseFloat(+itemPrice + +itemTax).toFixed(2)}`
            , 'total must be equel defalte tax + item price'
        );

        User.finishStepTwo()

        assert.softAssertAll();
    });

    it('Finish Buy Page', () => {
        pages.completePage.completeMessage.waitForDisplayed();
        assert.softAssert(pages.completePage.completeMessage.getText(), 'THANK YOU FOR YOUR ORDER');
        assert.softAssertAll();
    });

});
