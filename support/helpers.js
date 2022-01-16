'use strict';
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

exports.click = (element) => {
    element.waitForClickable();
    element.click();
};

exports.setValue = (element, value) => {
    element.waitForClickable();
    element.setValue(value);
};

exports.getProductDescriptionInTheList = (productName) => {
  return $(`//*[contains(text(), '${productName}')]//ancestor::div[contains(@class, 'item_description')]`);
};

exports.calculation = (numberOne, numberTwo) => {
    const one = parseFloat(numberOne.toString().replace('$', ''));
    const two = parseFloat(numberTwo.toString().replace('$', ''));
    return `$${one + two}`
};