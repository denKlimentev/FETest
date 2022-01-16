'use strict';
const h = require('../../support/helpers');
const assert = require('soft-assert');
const userObject = require('../../logic/userObject.js');
const testAccts = require('../../testData/testAccounts.json');
const pages = require('../../testData/pages/PageFactory.js');

const tax = 0.08;
describe('Automate the purchase flow ', () => {
    let user, productName ;

    beforeEach('Precondition : login', () => {
        user = new userObject();
        user.login(testAccts.standardUser, testAccts.password)
        productName = user.getRandomProductName();
        console.log(productName);
    });

    it('Purchase flow', () => {
        user.addProductToCart(productName);
        const itemPrice = user.getPrise(productName)
        const itemTax = parseFloat(itemPrice * tax).toFixed(2);

        assert.softAssert(
            h.findElementInParent(pages.ProductListPage.shopping_cart_link, pages.ProductListPage.span).getText()
            , '1'
            , 'Number of purchases must be one'
        );
        assert.softTrue(
            h.findElementInParent(pages.ProductListPage.getProductDescriptionInTheList(productName),pages.ProductListPage.remove_button).isDisplayed()
            , 'Button removed in added product must be visible'
        );

        user.goToCartPage();
        assert.softAssert(pages.CartPage.itemName_div.getText(), productName);
        assert.softContains(pages.CartPage.itemPrice_div.getText(), `$${itemPrice}`);

        user.clickCheckoutGotoStepOne();
        user.putRandomDataAndCompleteStepOne();

        assert.softAssert(pages.StepTwoPage.itemName_div.getText(), productName);
        assert.softAssert(pages.StepTwoPage.itemPrice_div.getText(), `$${itemPrice}`);
        assert.softContains(
            h.findElementInParent(pages.StepTwoPage.summaryInfo_box, pages.StepTwoPage.subtotal_label).getText()
            , `$${itemPrice}`
            , 'Subtotal must be equel item price'
        );
        assert.softContains(
            h.findElementInParent(pages.StepTwoPage.summaryInfo_box, pages.StepTwoPage.tax_label).getText()
            , `$${itemTax}`
            , 'Tax must be equel defalte tax'
        );
        assert.softContains(
            h.findElementInParent(pages.StepTwoPage.summaryInfo_box, pages.StepTwoPage.total_label).getText()
            , `$${parseFloat(+itemPrice + +itemTax).toFixed(2)}`
            , 'total must be equel defalte tax + item price'
        );

        user.finishBuy()
        pages.CompletePage.complete_message.waitForDisplayed()
        assert.softAssert(pages.CompletePage.complete_message.getText(), 'THANK YOU FOR YOUR ORDER')
        assert.softAssertAll();
    });
});
