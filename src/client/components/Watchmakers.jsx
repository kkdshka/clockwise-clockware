import React, {Component} from 'react';
import Navigation from './AdminNavigation.jsx';
import axios from 'axios';
import Modal from 'react-bootstrap4-modal';

export default class Watchmakers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchmakers: [],
            cities: [],
            isModalCreateOpened: false,
            isModalUpdateOpened: false,
            editing: {},
        };
    }

    componentDidMount() {
        axios.get('/admin/watchmakers/data')
            .then(res => {
                const watchmakers = res.data;
                this.setState({watchmakers});
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('/admin/cities/data')
            .then(res => {
                const cities = res.data;
                this.setState({cities});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnEditClick(watchmaker) {
        this.setState({editing: watchmaker});
        this.openModalUpdate();
    }

    handleOnDeleteClick(id) {
        axios.delete('/admin/watchmakers/', {data: {id: id}})
            .then(res => {
                const watchmakers = res.data;
                this.setState({watchmakers});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitAdd() {
        const data = {
            name: this.refs.addName.value,
            city: this.refs.addCity.value,
            rating: this.refs.addRating.value
        };
        axios.post('/admin/watchmakers/', data)
            .then(res => {
                const watchmakers = res.data;
                this.setState({watchmakers: watchmakers});
                this.hideModalCreate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitEdit() {
        const data = {
            name: this.refs.editName.value,
            city: this.refs.editCity.value,
            rating: this.refs.editRating.value,
            id: this.state.editing.id
        };
        axios.put('/admin/watchmakers/', data)
            .then(res => {
                const watchmakers = res.data;
                this.setState({watchmakers: watchmakers});
                this.hideModalUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderWatchmakers() {
        return this.state.watchmakers.map(watchmaker => {
            return <tr key={'watchmaker' + watchmaker.id}>
                    <td>{watchmaker.name}</td>
                    <td>{watchmaker.city}</td>
                    <td>{watchmaker.rating}</td>
                    <td>
                        <button type="button" className="btn btn-warning"
                                onClick={() => this.handleOnEditClick(watchmaker)}>
                            <i className="fa fa-pencil"/>
                        </button>
                    </td>
                    <td>
                        <button type="button" className="btn btn-danger"
                                onClick={() => this.handleOnDeleteClick(watchmaker.id)}>
                            <i className="fa fa-remove"/>
                        </button>
                    </td>
            </tr>
        });
    }

    renderCities() {
        return this.state.cities.map(city => {
            return <option key={'city' + city.id}>{city.name}</option>
        });
    }

    openModalCreate = () => {
        this.setState({
            isModalCreateOpened: true
        });
    };

    hideModalCreate = () => {
        this.setState({
            isModalCreateOpened: false
        });
    };

    renderModalCreate() {
        return <Modal visible={this.state.isModalCreateOpened} onClickBackdrop={this.hideModalCreate}>
            <div className="modal-header">
                <h4 className="modal-title">Добавить мастера</h4>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="add-name">Имя:</label>
                        <input type="text" className="form-control" id="add-name" ref="addName"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="add-city">Город:</label>
                        <select className="form-control" id="add-city" ref="addCity">
                            {this.renderCities()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="add-rating">Рейтинг:</label>
                        <select className="form-control" id="add-rating" ref="addRating">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitAdd.bind(this)}>
                    Принять
                    </button>
                <button type="button" className="btn float-right" onClick={this.hideModalCreate}>
                    Закрыть
                    </button>
            </div>
        </Modal>
    }

    openModalUpdate = () => {
        this.setState({
            isModalUpdateOpened: true
        });
    };

    hideModalUpdate = () => {
        this.setState({
            isModalUpdateOpened: false
        });
    };

    renderModalUpdate() {
        return <Modal visible={this.state.isModalUpdateOpened} onClickBackdrop={this.hideModalUpdate}>
            <div className="modal-header">
                <h4 className="modal-title">Изменить мастера</h4>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="edit-name">Имя:</label>
                        <input type="text" className="form-control" id="edit-name" ref="editName"
                               value={this.state.editing.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-city">Город:</label>
                        <select className="form-control" id="edit-city" ref="editCity" value={this.state.editing.city}>
                            {this.renderCities()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-rating">Рейтинг:</label>
                        <select className="form-control" id="edit-rating" ref="editRating"
                                value={this.state.editing.rating}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitEdit.bind(this)}>
                    Принять
                </button>
                <button type="button" className="btn float-right" onClick={this.hideModalUpdate}>
                    Закрыть
                    </button>
            </div>
        </Modal>
    }

    render() {
        return <div>
            <div className="row">
                <div className="col">
                    <Navigation active="watchmakers"/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-4">
                    <h4 className="row justify-content-md-center">Мастера</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Город</th>
                            <th>Рейтинг</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderWatchmakers()}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={this.openModalCreate}>
                        <i className="fa fa-plus"/> Добавить
                    </button>
                </div>
                <div className="col-md-4 ml-4">
                    <div>{this.renderModalCreate()}</div>
                    <div>{this.renderModalUpdate()}</div>
                </div>
            </div>
        </div>
    }
}