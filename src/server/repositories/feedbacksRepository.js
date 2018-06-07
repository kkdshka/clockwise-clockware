const db = require('../models');
const Feedback = db.feedback;
const Reservation = db.reservation;
const Watchmaker = db.watchmaker;

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
        include: [{model: Reservation, include: {model: Watchmaker}}]
    });
}

module.exports = {
    add: addFeedback,
    edit: editFeedback,
    delete: deleteFeedback,
    getAll: getAllFeedbacks
};