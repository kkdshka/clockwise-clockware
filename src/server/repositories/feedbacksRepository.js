const db = require('../models');
const Feedback = db.feedback;
const Reservation = db.reservation;
const Watchmaker = db.watchmaker;
const Client = db.client;

//client = {name, city, email, id}
function addFeedback(feedback) {
    return Feedback.create(feedback)
        .catch(error => console.log(error));
}

function editFeedback(feedback) {
    return Feedback.update(feedback, {
        where: {
            id: feedback.id
        }
    }).catch(error => console.log(error));
}

function deleteFeedback(id) {
    return Feedback.destroy({
        where: {
            id: id
        }
    }).catch(error => console.log(error));
}

function getAllFeedbacks() {
    return Feedback.findAll({
        include: [{model: Client}, {model: Watchmaker}]
    }).catch(error => console.log(error));
}

function getTenLastFeedbacks() {
    return Feedback.findAll({
        include: [{model: Client}, {model: Watchmaker}],
        limit: 10,
        order: [['id', 'DESC']]
    }).catch(error => console.log(error));
}

function getAllWatchmakerFeedbacks(id) {
    return Feedback.findAll({
        where: {watchmaker_id: id}
    }).catch(error => console.log(error));
}

module.exports = {
    add: addFeedback,
    edit: editFeedback,
    delete: deleteFeedback,
    getAll: getAllFeedbacks,
    getTenLast: getTenLastFeedbacks,
    getAllWatchmakerFeedbacks: getAllWatchmakerFeedbacks
};