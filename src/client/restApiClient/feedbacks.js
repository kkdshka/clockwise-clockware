import axios from "axios/index";

function getFeedbacks() {
    return axios.get('/admin/feedbacks/feedbacks-data')
        .then(res => res.data)
        .catch(error => error.response);
}

function addFeedback(data) {
    return axios.post('/admin/feedbacks/', data)
        .then(res => res)
        .catch(error => error.response);
}

function editFeedback(data) {
    return axios.put('/admin/feedbacks/', data)
        .then(res => res)
        .catch(error => error.response);
}

function deleteFeedback(id) {
    return axios.delete('/admin/feedbacks/', {data: {id: id}})
        .then(res => res)
        .catch(error => error.response);
}

function getTenLastFeedbacks() {
    return axios.get('/admin/feedbacks/10last')
        .then(res => res.data)
        .catch(error => error.response);
}

module.exports = {
    getFeedbacks: getFeedbacks,
    addFeedback: addFeedback,
    editFeedback: editFeedback,
    deleteFeedback: deleteFeedback,
    getTenLastFeedbacks: getTenLastFeedbacks
};