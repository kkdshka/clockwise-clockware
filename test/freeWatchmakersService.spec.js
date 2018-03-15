const chai = require('chai');
const path = require('path');
const expect = chai.expect;
chai.should();

const FreeWatchmakers = require('../src/server/models/freeWatchmakersService');

describe('FreeWatchmakers', () => {
    describe('repairing time', () => {
        let clock;

        beforeEach(() => {
            clock = new FreeWatchmakers({clockSize: 'medium', city: 'Днепр', date: '1970-01-01', time: '09:00'});
        });

        it('returns repairing time', () => {
            clock.repairingTime.should.to.deep.equal(new Date('1970-01-01T02:00+02:00'));
        });

        it('returns finish repairing time', () => {
            clock.finishTime.should.equal('11:00');
        });
    });
});