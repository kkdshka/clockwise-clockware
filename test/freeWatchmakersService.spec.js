const chai = require('chai');
const path = require('path');
const expect = chai.expect;
chai.should();

const FreeWatchmakers = require('../src/server/models/freeWatchmakersService');

describe('FreeWatchmakers', () => {
    describe('repairing time', () => {
        let freeWatchmakers;

        beforeEach(() => {
            freeWatchmakers = new FreeWatchmakers({clockSize: 'medium', city: 'Днепр', date: '2018-03-16', time: '09:00'});
        });

        it('returns repairing time', () => {
            freeWatchmakers.repairingTime.should.to.deep.equal(new Date('1970-01-01T02:00+02:00'));
        });

        it('returns finish repairing time', () => {
            freeWatchmakers.finishTime.should.equal('11:00');
        });

    });
});