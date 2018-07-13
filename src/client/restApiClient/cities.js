import axios from "axios/index";

function getCities(onSuccess, onError) {
    return axios.get('/admin/cities/cities-data')
        .then(res => {
            if(res.status === 200) {
                return onSuccess(res.data)
            } else {
                return onError("Unknown Error");
            }
        })
        .catch(error => onError(error.response.data));
}

function addCity(data, onSuccess, onError) {
    return axios.post('/admin/cities/', data)
        .then(res => {
            if(res.status === 201) {
                onSuccess();
            }   else {
                onError("Unknown Error");
            }
        })
        .catch(error => onError(error.response.data));
}

function editCity(data, onSuccess, onError) {
    return axios.put('/admin/cities/', data)
        .then(res => {
            if(res.status === 200) {
                onSuccess();
            }   else {
                onError("Unknown Error");
            }
        })
        .catch(error => onError(error.response.data));
}

function deleteCity(id, onSuccess, onError) {
    return axios.delete('/admin/cities/', {data: {id: id}})
        .then(res => {
            if(res.status === 200) {
                onSuccess();
            }   else {
                onError("Unknown Error", false);
            }
        })
        .catch(error => onError(error.response.data, error.response.status === 409));
}

module.exports = {
    getCities: getCities,
    addCity: addCity,
    editCity: editCity,
    deleteCity: deleteCity
};