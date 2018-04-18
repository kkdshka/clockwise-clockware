import React from 'react';
import Navigation from './AdminNavigation.jsx';
import restApiClient from '../restApiClient/index';
import validation from '../validation.js';
import Modal from 'react-bootstrap4-modal';

export default class Reservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            cities: [],
            watchmakers: [],
            isModalCreateOpened: false,
            isModalUpdateOpened: false,
            validationResult: {
                name: {isValid: false, message: ''},
                email: {isValid: false, message: ''},
                date: {isValid: false, message: ''},
                time: {isValid: false, message: ''},
            },
            formError: false,
            editing: {},
        };
    }

    componentDidMount() {
        restApiClient.getReservations()
            .then(reservations => this.setState({reservations: reservations}));

        restApiClient.getCities()
            .then(cities => this.setState({cities}));

        restApiClient.getWatchmakers()
            .then(watchmakers => this.setState({watchmakers}));
    }

    validator(fieldName, element, message) {
        const {validationResult, isModalCreateOpened} = this.state;

        function capitalize(string) {
            return string.replace(/(?:^|\s)\S/g, function (l) {
                return l.toUpperCase();
            });
        }

        const modalName = isModalCreateOpened ? 'add' : 'edit';

        if (fieldName === 'time') {
            if (validation.isValidTime(this.refs[modalName + 'Time'].value, this.refs[modalName + 'Date'].value)) {
                this.setState({validationResult: {...validationResult, time: {isValid: true, message: ''}}});
                element.className = 'form-control form-control-sm is-valid';
            }
            else {
                this.setState({validationResult: {...validationResult, time: {isValid: false, message: message}}});
                element.className = 'form-control form-control-sm is-invalid';
            }
            return;
        }

        if (validation['isValid' + capitalize(fieldName)](this.refs[modalName + capitalize(fieldName)].value)) {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: true, message: ''}}});
            element.className = 'form-control form-control-sm is-valid';
        }
        else {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: false, message: message}}});
            element.className = 'form-control form-control-sm is-invalid';
        }
    }

    handleValidation = (type, message) => event => this.validator(type, event.currentTarget, message);

    handleOnEditClick = (reservations) => () => {
        this.setState({editing: reservations});
        this.openModalUpdate();
    };

    handleOnDeleteClick = (id) => () => {
        restApiClient.deleteReservation(id);

        restApiClient.getReservations()
            .then(reservations => this.setState({reservations: reservations}));
    };

    handleOnSubmitAdd = () => {
        const {addName, addEmail, addCity, addClockSize, addDate, addTime, addWatchmakerId} = this.refs;

        const data = {
            name: addName.value,
            city: addCity.value,
            email: addEmail.value,
            clockSize: addClockSize.value,
            date: addDate.value,
            time: addTime.value,
            watchmakerId: addWatchmakerId.value
        };

        if (!validation.isValidReservation(data)) {
            this.setState({formError: true});
            return;
        }
        else {
            this.setState({formError: false});
        }

        restApiClient.addReservation(data);

        restApiClient.getReservations()
            .then(reservations => this.setState({reservations: reservations}));

        this.hideModalCreate();
    };

    handleOnSubmitEdit = () => {
        const {editing: {id}} = this.state;
        const {editName, editEmail, editCity, editClockSize, editDate, editTime, editWatchmakerId} = this.refs;

        const data = {
            name: editName.value,
            city: editCity.value,
            email: editEmail.value,
            clockSize: editClockSize.value,
            date: editDate.value,
            time: editTime.value,
            watchmakerId: editWatchmakerId.value,
            id: id
        };

        restApiClient.editReservation(data);

        restApiClient.getReservations()
            .then(reservations => this.setState({reservations: reservations}));

        this.hideModalUpdate();
    };

    dateToString(date) {
        const newDate = new Date(date.split('T')[0]);
        return newDate.toLocaleDateString();
    }

    renderFormError() {
        const {formError} = this.state;
        if (formError) {
            return <div className="alert alert-danger">Заполните поля</div>
        }
    }

    renderReservations() {
        const {reservations} = this.state;

        return reservations.map(reservation => {
            return <tr key={'reservation' + reservation.id}>
                <td>{reservation.name}</td>
                <td>{reservation.city}</td>
                <td>{reservation.email}</td>
                <td>{reservation.clockSize}</td>
                <td>{this.dateToString(reservation.date)}</td>
                <td>{reservation.time}</td>
                <td>{reservation.watchmaker.name}</td>
                <td>
                    <button type="button" className="btn btn-warning"
                            onClick={this.handleOnEditClick(reservation)}>
                        <i className="fa fa-pencil"/>
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger"
                            onClick={this.handleOnDeleteClick(reservation.id)}>
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

    renderWatchmakers() {
        const {watchmakers} = this.state;

        return watchmakers.map(watchmaker => {
            return <option key={'watchmaker' + watchmaker.id} value={watchmaker.id}>{watchmaker.name}</option>
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
        const {isModalCreateOpened, validationResult: {name, date, email, time}} = this.state;

        if (isModalCreateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalCreate}>
                <div className="modal-header">
                    <h4 className="modal-title">Добавить заказ</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="add-name">Имя:</label>
                            <input type="text" className="form-control" id="add-name" ref="addName"
                                   onBlur={this.handleValidation('name', 'Имя не может быть короче трех букв')}/>
                            <div className="invalid-feedback">{name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-email">Email:</label>
                            <input type="text" className="form-control" id="add-email" ref="addEmail"
                                   onBlur={this.handleValidation('email', 'Введите правильный почтовый адрес')}/>
                            <div className="invalid-feedback">{email.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-city">Город:</label>
                            <select className="form-control" id="add-city" ref="addCity">
                                {this.renderCities()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-clock-size">Размер часов:</label>
                            <select className="form-control" id="add-clock-size" ref="addClockSize">
                                <option>Маленькие</option>
                                <option>Средние</option>
                                <option>Большие</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-date">Дата:</label>
                            <input type="date" className="form-control" id="add-date" ref="addDate"
                                   onBlur={this.handleValidation('date', 'Введите дату с сегодняшней')}/>
                            <div className="invalid-feedback">{date.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-time">Время:</label>
                            <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control"
                                   id="add-time" ref="addTime"
                                   onBlur={this.handleValidation('time', 'Выберите время с 9:00 до 18:00 или если выбрана сегодняшняя дата - позже текущего времени')}/>
                            <div className="invalid-feedback">{time.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-watchmaker">Мастер:</label>
                            <select className="form-control" id="add-watchmaker" ref="addWatchmakerId">
                                {this.renderWatchmakers()}
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
        const {isModalUpdateOpened, editing: {name, email, time, date, city, clockSize}, validationResult} = this.state;

        if (isModalUpdateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalUpdate}>
                <div className="modal-header">
                    <h4 className="modal-title">Изменить заказ</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="edit-name">Имя:</label>
                            <input type="text" className="form-control" id="edit-name" ref="editName"
                                   defaultValue={name}
                                   onBlur={this.handleValidation('name', 'Имя не может быть короче трех букв')}/>
                            <div className="invalid-feedback">{validationResult.name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-name">Email:</label>
                            <input type="text" className="form-control" id="edit-email" ref="editEmail"
                                   defaultValue={email}
                                   onBlur={this.handleValidation('email', 'Введите правильный почтовый адрес')}/>
                            <div className="invalid-feedback">{validationResult.email.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-city">Город:</label>
                            <select className="form-control" id="edit-city" ref="editCity"
                                    defaultValue={city}>
                                {this.renderCities()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-clock-size">Размер часов:</label>
                            <select className="form-control" id="edit-clock-size" ref="editClockSize"
                                    defaultValue={clockSize}>
                                <option>Маленькие</option>
                                <option>Средние</option>
                                <option>Большие</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-date">Дата:</label>
                            <input type="date" className="form-control" id="edit-date" ref="editDate"
                                   defaultValue={this.dateToString(date)}
                                   onBlur={this.handleValidation('date', 'Введите дату с сегодняшней')}/>
                            <div className="invalid-feedback">{validationResult.date.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-time">Время:</label>
                            <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control"
                                   id="edit-time"
                                   ref="editTime" defaultValue={time}
                                   onBlur={this.handleValidation('time', 'Выберите время с 9:00 до 18:00 или если выбрана сегодняшняя дата - позже текущего времени')}/>
                            <div className="invalid-feedback">{validationResult.time.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-watchmaker">Мастер:</label>
                            <select className="form-control" id="edit-watchmaker" ref="editWatchmakerId">
                                {this.renderWatchmakers()}
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitEdit}>
                        Принять
                    </button>
                    <button type="button" className="btn float-right" onClick={this.hideModalUpdate}>Закрыть</button>
                </div>
            </Modal>
        }
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation active="reservations"/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <h4 className="row justify-content-md-center">Бронирования</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Город</th>
                            <th>Email</th>
                            <th>Размер часов</th>
                            <th>Дата</th>
                            <th>Время</th>
                            <th>Мастер</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderReservations()}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={this.openModalCreate}>
                        <i className="fa fa-plus"/> Добавить
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">{this.renderModalCreate()}</div>
            </div>
            <div className="row">
                <div className="col">{this.renderModalUpdate()}</div>
            </div>
        </div>
    }
}
