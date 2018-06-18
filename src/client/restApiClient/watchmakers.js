import axios from "axios/index";

function getWatchmakers() {
    return axios.get('/admin/watchmakers/watchmakers-data')
        .then(res => res.data)
        .catch(error => console.log(error));
}

function addWatchmaker(data) {
    return axios.post('/admin/watchmakers/', data)
        .catch(error => console.log(error));
}

function editWatchmaker(data) {
    return axios.put('/admin/watchmakers/', data)
        .catch(error => console.log(error));
}

function deleteWatchmaker(id) {
    return axios.delete('/admin/watchmakers/', {data: {id: id}})
        .catch(error => {
            return {
                error: error.response.data,
                status: error.response.status
            }
        });
}

function getFreeWatchmakers(params) {
    return axios.get('/admin/watchmakers/free-watchmakers', params)
        .then(res => res.data)
        .catch(error => console.log(error));
}

module.exports = {
    getWatchmakers: getWatchmakers,
    addWatchmaker: addWatchmaker,
    editWatchmaker: editWatchmaker,
    deleteWatchmaker: deleteWatchmaker,
    getFreeWatchmakers: getFreeWatchmakers
};