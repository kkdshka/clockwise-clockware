const db = require('../models');
const Feedback = db.feedback;
const Reservation = db.reservation;
const Watchmaker = db.watchmaker;
const Client = db.client;

//client = {name, city, email, id}
function addFeedback(feedback) {
    return Feedback.create(feedback);
}

function editFeedback(feedback) {
    return Feedback.update(feedback, {
        where: {
            id: feedback.id
        }
    });
}

function deleteFeedback(id) {
    return Feedback.destroy({
        where: {
            id: id
        }
    });
}

function getAllFeedbacks() {
    return Feedback.findAll({
        include: [{model: Reservation, include: {model: Client}}, {model: Watchmaker}]
    });
}

function getTenLastFeedbacks() {
    return Feedback.findAll({
        include: [{model: Reservation, include: {model: Watchmaker}}],
        limit: 10,
        order: [['id', 'DESC']]
    });
}

function getAllWatchmakerFeedbacks(id) {
    return Feedback.findAll({
        where: {watchmaker_id: id}
    });
}

module.exports = {
    add: addFeedback,
    edit: editFeedback,
    delete: deleteFeedback,
    getAll: getAllFeedbacks,
    getTenLast: getTenLastFeedbacks,
    getAllWatchmakerFeedbacks: getAllWatchmakerFeedbacks
};