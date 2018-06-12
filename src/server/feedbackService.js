const watchmakerRepository = require('./repositories/watchmakersRepository');
const feedBacksRepository = require('./repositories/feedbacksRepository');
const db = require('./models');
const Watchmaker = db.watchmaker;

async function changeWatchmakersRating(watchmakerId) {
    try {
        const watchmaker = await Watchmaker.findById(watchmakerId).then(watchmaker => watchmaker.get());

        const watchmakerFeedbacks = await feedBacksRepository.getAllWatchmakerFeedbacks(watchmakerId);
        const feedbackRatings = watchmakerFeedbacks.map((feedback) => feedback.get().rating);

        const feedbacksCount = feedbackRatings.length;

        if(feedbacksCount > 0) {
            const ratingsSum = feedbackRatings.reduce((accumulator, feedbackRating) => {
                return Number(accumulator) + Number(feedbackRating);
            });
            watchmaker.rating =  Math.round(ratingsSum / feedbacksCount);
            watchmakerRepository.edit(watchmaker);
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    changeWatchmakersRating: changeWatchmakersRating
};