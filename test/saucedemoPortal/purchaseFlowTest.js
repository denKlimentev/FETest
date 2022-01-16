'use strict';
const h = require('../../support/helpers');
const assert = require('soft-assert');
const user = require('../../logic/userObject.js');
const testAccts = require('../../testData/testAccounts.json');
const ProductListPage = require('../../testData/pages/saucedemoPortal/productListPage.js');
const StepTwoPage = require('../../testData/pages/saucedemoPortal/stepTwoPage.js');
const CompletePage = require('../../testData/pages/saucedemoPortal/completePage.js');
const CartPage = require("../../testData/pages/saucedemoPortal/cartPage.js");

const productName = 'Sauce Labs Backpack';
const tax = 2.40;
describe('Automate the purchase flow ', () => {

    beforeEach('Precondition : login', () => {
        user.login(testAccts.standardUser, testAccts.password)
    });

    it('Purchase flow', () => {
        user.addProductToCart(productName);
        const itemPrice = ProductListPage.getProductDescriptionInTheList(productName)
            .$(ProductListPage.itemPrice_div)
            .getText();

        assert.softAssert(
            ProductListPage.shopping_cart_link.$(ProductListPage.span).getText()
            , '1'
            , 'Number of purchases must be one'
        );
        assert.softTrue(
            ProductListPage.getProductDescriptionInTheList(productName).$(ProductListPage.remove_button).isDisplayed()
            , 'Button removed in added product must be visible'
        );

        user.goToCartPage();
        assert.softAssert(CartPage.itemName_div.getText(), productName);
        assert.softContains(CartPage.itemPrice_div.getText(), itemPrice);

        user.clickCheckoutGotoStepOne();
        user.putRandomDataAndCompleteStepOne();

        assert.softAssert(StepTwoPage.itemName_div.getText(), productName);
        assert.softAssert(StepTwoPage.itemPrice_div.getText(), itemPrice);
           assert.softContains(
            StepTwoPage.summaryInfo_box.$(StepTwoPage.subtotal_label).getText()
            , itemPrice
            , 'Subtotal must be equel item price'
        );
        assert.softContains(
            StepTwoPage.summaryInfo_box.$(StepTwoPage.tax_label).getText()
            , `$${tax}`
            , 'Tax must be equel defalte tax'
        );
        assert.softContains(
            StepTwoPage.summaryInfo_box.$(StepTwoPage.total_label).getText()
            , `${h.calculation(tax, itemPrice)}`
            , 'total must be equel defalte tax + item price'
        );

        user.finishBuy()
        CompletePage.complete_message.waitForDisplayed()
        assert.softAssert(CompletePage.complete_message.getText(), 'THANK YOU FOR YOUR ORDER')
        assert.softAssertAll();
    });
});
