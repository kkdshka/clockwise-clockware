const schedule = require('node-schedule');
const tokenLifetimesRepository = require('./repositories/tokenLifetimesRepository');

const deletingTask = schedule.scheduleJob('* * 1 * * *', () => {
    tokenLifetimesRepository.findAndDeleteExpiredTokens();
    console.log('deleting expired tokens');
});

module.exports = deletingTask;
