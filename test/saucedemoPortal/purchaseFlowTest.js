'use strict';
const h = require('../../support/helpers');
const assert = require('soft-assert');
const userObject = require('../../logic/userObject.js');
const user = new userObject();
const testAccts = require('../../testData/testAccounts.json');
const productListPage = require('../../testData/saucedemoPortal/pages/productListPage');
const stepTwoPage = require('../../testData/saucedemoPortal/pages/stepTwoPage.json');
const basePage = require('../../testData/saucedemoPortal/pages/basePage.json');
const completePage = require('../../testData/saucedemoPortal/pages/completePage.json');

const productName = 'Sauce Labs Backpack';
const tax = 2.40;
describe('Automate the purchase flow ', () => {

    beforeEach('Precondition : login', () => {
        user.login(testAccts.standardUser, testAccts.password)
    });

    it('Purchase flow', () => {
        user.addProductToCart(productName);
        const itemPrice = h
            .getProductDescriptionInTheList(productName)
            .$(basePage.itemPrice_div)
            .getText();

        assert.softAssert(
            $(productListPage.shopping_cart_link).$(basePage.span).getText()
            , '1'
            , 'Number of purchases must be one'
        );
        assert.softTrue(
            h.getProductDescriptionInTheList(productName).$(productListPage.remove_button).isDisplayed()
            , 'Button removed in added product must be visible'
        );

        user.goToCartPage();
        assert.softAssert($(basePage.itemName_div).getText(), productName);
        assert.softContains($(basePage.itemPrice_div).getText(), itemPrice);

        user.clickCheckoutGotoStepOne();
        user.putRandomDataAndCompleteStepOne();

        assert.softAssert($(basePage.itemName_div).getText(), productName);
        assert.softAssert($(basePage.itemPrice_div).getText(), itemPrice);
           assert.softContains(
            $(stepTwoPage.summaryInfo_box).$(stepTwoPage.subtotal_label).getText()
            , itemPrice
            , 'Subtotal must be equel item price'
        );
        assert.softContains(
            $(stepTwoPage.summaryInfo_box).$(stepTwoPage.tax_label).getText()
            , `$${tax}`
            , 'Tax must be equel defalte tax'
        );
        assert.softContains(
            $(stepTwoPage.summaryInfo_box).$(stepTwoPage.total_label).getText()
            , `${h.calculation(tax, itemPrice)}`
            , 'total must be equel defalte tax + item price'
        );

        user.finishBuy()
        $(completePage.complete_message).waitForDisplayed()
        assert.softAssert($(completePage.complete_message).getText(), 'THANK YOU FOR YOUR ORDER')
        assert.softAssertAll();
    });
});
