'use strict';
const h = require('../../support/helpers');
const assert = require('soft-assert');
const userObject = require('../../logic/userObject.js');
const testAccts = require('../../testData/testAccounts.json');
const pages = require('../../testData/pages/PageFactory.js');

const productName = 'Sauce Labs Backpack';
const tax = 2.40;
describe('Automate the purchase flow ', () => {
    let user;

    beforeEach('Precondition : login', () => {
        user = new userObject();
        user.login(testAccts.standardUser, testAccts.password)
    });

    it('Purchase flow', () => {
        user.addProductToCart(productName);
        const itemPrice = pages.ProductListPage.getProductDescriptionInTheList(productName)
            .$(pages.ProductListPage.itemPrice_div)
            .getText();

        assert.softAssert(
            pages.ProductListPage.shopping_cart_link.$(pages.ProductListPage.span).getText()
            , '1'
            , 'Number of purchases must be one'
        );
        assert.softTrue(
            pages.ProductListPage.getProductDescriptionInTheList(productName).$(pages.ProductListPage.remove_button).isDisplayed()
            , 'Button removed in added product must be visible'
        );

        user.goToCartPage();
        assert.softAssert(pages.CartPage.itemName_div.getText(), productName);
        assert.softContains(pages.CartPage.itemPrice_div.getText(), itemPrice);

        user.clickCheckoutGotoStepOne();
        user.putRandomDataAndCompleteStepOne();

        assert.softAssert(pages.StepTwoPage.itemName_div.getText(), productName);
        assert.softAssert(pages.StepTwoPage.itemPrice_div.getText(), itemPrice);
           assert.softContains(
               pages.StepTwoPage.summaryInfo_box.$(pages.StepTwoPage.subtotal_label).getText()
            , itemPrice
            , 'Subtotal must be equel item price'
        );
        assert.softContains(
            pages.StepTwoPage.summaryInfo_box.$(pages.StepTwoPage.tax_label).getText()
            , `$${tax}`
            , 'Tax must be equel defalte tax'
        );
        assert.softContains(
            pages.StepTwoPage.summaryInfo_box.$(pages.StepTwoPage.total_label).getText()
            , `${h.calculation(tax, itemPrice)}`
            , 'total must be equel defalte tax + item price'
        );

        user.finishBuy()
        pages.CompletePage.complete_message.waitForDisplayed()
        assert.softAssert(pages.CompletePage.complete_message.getText(), 'THANK YOU FOR YOUR ORDER')
        assert.softAssertAll();
    });
});
