import axios from "axios/index";

function getCities() {
    return axios.get('/admin/cities/data')
        .then(res => res.data)
        .catch(error => console.log(error));
}

function addCity(data) {
    return axios.post('/admin/cities/', data)
        .catch(error => console.log(error));
}

function editCity(data) {
    return axios.put('/admin/cities/', data)
        .catch(error => console.log(error));
}

function deleteCity(id) {
    return axios.delete('/admin/cities/', {data: {id: id}})
        .catch(error => console.log(error));
}

module.exports = {
    getCities: getCities,
    addCity: addCity,
    edit: editCity,
    deleteCity: deleteCity
};