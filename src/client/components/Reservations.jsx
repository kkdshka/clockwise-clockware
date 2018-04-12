import React from 'react';
import Navigation from './AdminNavigation.jsx';
import restApiClient from '../restApiClient';
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
            name: {isValid: false, message: ''},
            email: {isValid: false, message: ''},
            date: {isValid: false, message: ''},
            time: {isValid: false, message: ''},
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
        function capitalize(string) {
            return string.replace(/(?:^|\s)\S/g, function (l) {
                return l.toUpperCase();
            });
        }

        const modalName = this.state.isModalCreateOpened ? 'add' : 'edit';

        if (validation['isValid' + capitalize(fieldName)](this.refs[modalName + capitalize(fieldName)].value)) {
            this.setState({[fieldName]: {isValid: true, message: ''}});
            element.className = 'form-control form-control-sm is-valid';
        }
        else {
            this.setState({[fieldName]: {isValid: false, message: message}});
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
        const data = {
            name: this.refs.addName.value,
            city: this.refs.addCity.value,
            email: this.refs.addEmail.value,
            clockSize: this.refs.addClockSize.value,
            date: this.refs.addDate.value,
            time: this.refs.addTime.value,
            watchmakerId: this.refs.addWatchmakerId.value
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
        const data = {
            name: this.refs.editName.value,
            city: this.refs.editCity.value,
            email: this.refs.editEmail.value,
            clockSize: this.refs.editClockSize.value,
            date: this.refs.editDate.value,
            time: this.refs.editTime.value,
            watchmakerId: this.refs.editWatchmakerId.value,
            id: this.state.editing.id
        };

        restApiClient.editReservation(data);

        restApiClient.getReservations()
            .then(reservations => this.setState({reservations: reservations}));

        this.hideModalUpdate();
    };

    dateToString(date) {
        const newDate = new Date(date);

        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        return newDate.getUTCFullYear() +
            '-' + pad(newDate.getUTCMonth() + 1) +
            '-' + pad(newDate.getUTCDate() + 1);
    }

    renderFormError() {
        if (this.state.formError) {
            return <div className="alert alert-danger">Заполните поля</div>
        }
    }

    renderReservations() {
        return this.state.reservations.map(reservation => {
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
        return this.state.cities.map(city => {
            return <option key={'city' + city.id}>{city.name}</option>
        });
    }

    renderWatchmakers() {
        return this.state.watchmakers.map(watchmaker => {
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
        if (this.state.isModalCreateOpened) {
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
                            <div className="invalid-feedback">{this.state.name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-email">Email:</label>
                            <input type="text" className="form-control" id="add-email" ref="addEmail"
                                   onBlur={this.handleValidation('email', 'Введите правильный почтовый адрес')}/>
                            <div className="invalid-feedback">{this.state.email.message}</div>
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
                            <div className="invalid-feedback">{this.state.date.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-time">Время:</label>
                            <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control"
                                   id="add-time" ref="addTime"
                                   onBlur={this.handleValidation('time', 'Выберите время с 9:00 до 18:00')}/>
                            <div className="invalid-feedback">{this.state.time.message}</div>
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
        if (this.state.isModalUpdateOpened) {
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
                                   defaultValue={this.state.editing.name}
                                   onBlur={this.handleValidation('name', 'Имя не может быть короче трех букв')}/>
                            <div className="invalid-feedback">{this.state.name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-name">Email:</label>
                            <input type="text" className="form-control" id="edit-email" ref="editEmail"
                                   defaultValue={this.state.editing.email}
                                   onBlur={this.handleValidation('email', 'Введите правильный почтовый адрес')}/>
                            <div className="invalid-feedback">{this.state.email.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-city">Город:</label>
                            <select className="form-control" id="edit-city" ref="editCity"
                                    defaultValue={this.state.editing.city}>
                                {this.renderCities()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-clock-size">Размер часов:</label>
                            <select className="form-control" id="edit-clock-size" ref="editClockSize"
                                    defaultValue={this.state.editing.clockSize}>
                                <option>Маленькие</option>
                                <option>Средние</option>
                                <option>Большие</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-date">Дата:</label>
                            <input type="date" className="form-control" id="edit-date" ref="editDate"
                                   defaultValue={this.dateToString(this.state.editing.date)}
                                   onBlur={this.handleValidation('date', 'Введите дату с сегодняшней')}/>
                            <div className="invalid-feedback">{this.state.date.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-time">Время:</label>
                            <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control"
                                   id="edit-time"
                                   ref="editTime" defaultValue={this.state.editing.time}
                                   onBlur={this.handleValidation('time', 'Выберите время с 9:00 до 18:00')}/>
                            <div className="invalid-feedback">{this.state.time.message}</div>
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
