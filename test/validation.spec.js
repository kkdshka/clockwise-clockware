const chai = require('chai');
const assert = chai.assert;

const validation = require('../src/server/validation');

describe('validation', () => {

    describe('is valid name', () => {
        it('returns true', () => {
            assert.isTrue(validation.isValidName('nia'));
        });

        it('returns true', () => {
            assert.isFalse(validation.isValidName('hi'));
        });
    });

    describe('is valid email', () => {
        it('returns true', () => {
            assert.isTrue(validation.isValidEmail('nia@nia.com'));
        });

        it('returns false', () => {
            assert.isFalse(validation.isValidEmail('niania'));
        });
    });

    describe('is valid date', () => {
        it('returns true', () => {
            assert.isTrue(validation.isValidDate('2018.05.21'));
        });

        it('returns false', () => {
            assert.isFalse(validation.isValidDate('2018.02.21'));
        });
    });

    describe('is valid time', () => {
        it('returns true', () => {
            assert.isTrue(validation.isValidTime('09:00'));
        });

        it('returns false', () => {
            assert.isFalse(validation.isValidTime('08:00'));
        });
    });

});