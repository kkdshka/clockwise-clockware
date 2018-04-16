import React, {Component} from 'react';
import Navigation from './AdminNavigation.jsx';
import restApiClient from '../restApiClient/index';
import Modal from 'react-bootstrap4-modal';
import validation from '../validation';

export default class Watchmakers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchmakers: [],
            cities: [],
            isModalCreateOpened: false,
            isModalUpdateOpened: false,
            name: {isValid: false, message: ''},
            formError: false,
            editing: {},
        };
    }

    handleValidation = event => {
        const {isModalCreateOpened} = this.state;

        const modalName = isModalCreateOpened ? 'add' : 'edit';

        if (validation.isValidWatchmakerName(this.refs[modalName + "Name"].value)) {
            this.setState({name: {isValid: true, message: ''}});
            event.currentTarget.className = 'form-control form-control-sm is-valid';
        }
        else {
            this.setState({name: {isValid: false, message: "Имя не может быть пустым"}});
            event.currentTarget.className = 'form-control form-control-sm is-invalid';
        }
    };

    componentDidMount() {
        restApiClient.getWatchmakers()
            .then(watchmakers => this.setState({watchmakers: watchmakers}));

        restApiClient.getCities()
            .then(cities => this.setState({cities}));
    }

    handleOnEditClick = (watchmaker) => () => {
        this.setState({editing: watchmaker});
        this.openModalUpdate();
    };

    handleOnDeleteClick = (id) => () => {
        restApiClient.deleteWatchmaker(id);

        restApiClient.getWatchmakers()
            .then(watchmakers => this.setState({watchmakers: watchmakers}));
    };

    handleOnSubmitAdd = () => {
        const {name: {isValid}} = this.state;
        const {addName, addCity, addRating} = this.refs;

        if (!isValid) {
            this.setState({formError: true});
            return;
        }
        this.setState({formError: false});

        const data = {
            name: addName.value,
            city: addCity.value,
            rating: addRating.value
        };

        restApiClient.addWatchmaker(data);

        restApiClient.getWatchmakers()
            .then(watchmakers => this.setState({watchmakers: watchmakers}));

        this.hideModalCreate();
    };

    handleOnSubmitEdit = () => {
        const {editing: {id}} = this.state;
        const {editName, editCity, editRating} = this.refs;
        const data = {
            name: editName.value,
            city: editCity.value,
            rating: editRating.value,
            id: id
        };

        restApiClient.editWatchmaker(data);

        restApiClient.getWatchmakers()
            .then(watchmakers => this.setState({watchmakers: watchmakers}));

        this.hideModalUpdate();
    };

    renderWatchmakers() {
        const {watchmakers} = this.state;

        return watchmakers.map(watchmaker => {
            return <tr key={'watchmaker' + watchmaker.id}>
                <td>{watchmaker.name}</td>
                <td>{watchmaker.city}</td>
                <td>{watchmaker.rating}</td>
                <td>
                    <button type="button" className="btn btn-warning"
                            onClick={this.handleOnEditClick(watchmaker)}>
                        <i className="fa fa-pencil"/>
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger"
                            onClick={this.handleOnDeleteClick(watchmaker.id)}>
                        <i className="fa fa-remove"/>
                    </button>
                </td>
            </tr>
        });
    }

    renderCities() {
        const {cities} = this.state;

        return cities.map(city => {
            return <option key={'city' + city.id}>{city.name}</option>
        });
    }

    renderFormError() {
        const {formError} = this.state;

        if (formError) {
            return <div className="alert alert-danger">Заполните поля</div>
        }
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
        const {isModalCreateOpened, name: {message}} = this.state;

        if (isModalCreateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalCreate}>
                <div className="modal-header">
                    <h4 className="modal-title">Добавить мастера</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="add-name">Имя:</label>
                            <input type="text" className="form-control" id="add-name" ref="addName"
                                   onBlur={this.handleValidation}/>
                            <div className="invalid-feedback">{message}</div>
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
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitAdd}>
                        Принять
                    </button>
                    <button type="button" className="btn float-right" onClick={this.hideModalCreate}>
                        Закрыть
                    </button>
                </div>
            </Modal>
        }
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
        const {isModalUpdateOpened, editing: {name, city, rating}, name: {message}} = this.state;

        if (isModalUpdateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalUpdate}>
                <div className="modal-header">
                    <h4 className="modal-title">Изменить мастера</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="edit-name">Имя:</label>
                            <input type="text" className="form-control" id="edit-name" ref="editName"
                                   defaultValue={name}
                                   onBlur={this.handleValidation}/>
                            <div className="invalid-feedback">{message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-city">Город:</label>
                            <select className="form-control" id="edit-city" ref="editCity"
                                    defaultValue={city}>
                                {this.renderCities()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-rating">Рейтинг:</label>
                            <select className="form-control" id="edit-rating" ref="editRating"
                                    defaultValue={rating}>
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
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitEdit}>
                        Принять
                    </button>
                    <button type="button" className="btn float-right" onClick={this.hideModalUpdate}>
                        Закрыть
                    </button>
                </div>
            </Modal>
        }
    }

    render() {
        return <div className="container">
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