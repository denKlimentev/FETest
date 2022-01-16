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


exports.calculation = (numberOne, numberTwo) => {
    const one = +numberOne.toString().replace('$', '');
    const two = +numberTwo.toString().replace('$', '');
    return `$${one + two}`
};