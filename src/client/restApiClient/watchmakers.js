import axios from "axios/index";

function getWatchmakers() {
    return axios.get('/admin/watchmakers/watchmakers-data')
        .then(res => res.data)
        .catch(error => error.response);
}

function addWatchmaker(data) {
    return axios.post('/admin/watchmakers/', data)
        .then(res => res)
        .catch(error => error.response);
}

function addWatchmakerAvatar(avatar) {
    return axios.post('/admin/watchmakers/watchmaker-avatar', avatar)
        .then(res => res)
        .catch(error => error.response);
}

function editWatchmaker(data) {
    return axios.put('/admin/watchmakers/', data)
        .then(res => res)
        .catch(error => error.response);
}

function deleteWatchmaker(id) {
    return axios.delete('/admin/watchmakers/', {data: {id: id}})
        .then(res => res)
        .catch(error => error.response);
}

function getFreeWatchmakers(params) {
    return axios.get('/admin/watchmakers/free-watchmakers', params)
        .then(res => res.data)
        .catch(error => error.response);
}

module.exports = {
    getWatchmakers: getWatchmakers,
    addWatchmaker: addWatchmaker,
    editWatchmaker: editWatchmaker,
    deleteWatchmaker: deleteWatchmaker,
    getFreeWatchmakers: getFreeWatchmakers,
    addWatchmakerAvatar: addWatchmakerAvatar
};