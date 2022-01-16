'use strict';

const faker = require('faker');

exports.getBody = () => {
    faker.locale = 'en_US';

    return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    zipCode: faker.address.zipCode('#####'),
}};
