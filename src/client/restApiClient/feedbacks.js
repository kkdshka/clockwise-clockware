import axios from "axios/index";

function getFeedbacks() {
    return axios.get('/admin/feedbacks/feedbacks-data')
        .then(res => res.data)
        .catch(error => console.log(error));
}

function addFeedback(data) {
    return axios.post('/admin/feedbacks/', data)
        .catch(error => console.log(error));
}

function editFeedback(data) {
    return axios.put('/admin/feedbacks/', data)
        .catch(error => console.log(error));
}

function deleteFeedback(id) {
    return axios.delete('/admin/feedbacks/', {data: {id: id}})
        .catch(error => console.log(error));
}

function getTenLastFeedbacks() {
    return axios.get('/admin/feedbacks/10last')
        .then(res => res.data)
        .catch(error => console.log(error));
}

module.exports = {
    getFeedbacks: getFeedbacks,
    addFeedback: addFeedback,
    editFeedback: editFeedback,
    deleteFeedback: deleteFeedback,
    getTenLastFeedbacks: getTenLastFeedbacks
};