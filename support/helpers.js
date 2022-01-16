'use strict';
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

exports.click = (element) => {
    if (element === undefined) {
        throw new TypeError('element is not provide');
    }
    element.waitForClickable();
    element.click();
};

exports.setValue = (element, value) => {
    if (element === undefined || value === undefined) {
        throw new TypeError('element and value is not provide');
    }
    element.waitForClickable();
    element.setValue(value);
};

exports.findElementInParent = (parent, element) => {
    if (parent === undefined || element === undefined) {
        throw new TypeError('parent and element is not provide');
    }
    return parent.$(element.selector)
}