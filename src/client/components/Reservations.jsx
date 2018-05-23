import React from 'react';
import Navigation from './AdminNavigation.jsx';
import restApiClient from '../restApiClient/index';
import validation from '../validation.js';
import Modal from 'react-bootstrap4-modal';
import strings from '../localization.js';

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
        const {language} = this.props;

        strings.setLanguage(language);

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
            cityId: addCity.value,
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
            cityId: editCity.value,
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
        const newDate = new Date(date);
        return newDate.toLocaleDateString();
    }

    renderFormError() {
        const {formError} = this.state;
        if (formError) {
            return <div className="alert alert-danger">{strings.fillFields}</div>
        }
    }

    isToday(date) {
        return new Date().toLocaleDateString() === new Date(date).toLocaleDateString();
    }

    renderReservations() {
        const {reservations} = this.state;
        const {cityTranslations} = this.props;

        return reservations.map(reservation => {
            return <tr className={this.isToday(reservation.date) ? 'table-info' : ''}
                       key={'reservation' + reservation.id}>
                <td>{reservation.name}</td>
                <td>{cityTranslations.getName(reservation.city_id)}</td>
                <td>{reservation.email}</td>
                <td>{strings[reservation.clock_size]}</td>
                <td>{this.dateToString(reservation.date)}</td>
                <td>{reservation.start_time}</td>
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
        const {cityTranslations} = this.props;

        return cities.map(city => {
            return <option key={'city' + city.id} value={city.id}>{cityTranslations.getName(city.id)}</option>
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
                    <h4 className="modal-title">{strings.addReservation}</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="add-name">{strings.name + ":"}</label>
                            <input type="text" className="form-control" id="add-name" ref="addName"
                                   onBlur={this.handleValidation('name', strings.nameWarning)}/>
                            <div className="invalid-feedback">{name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-email">{strings.email}</label>
                            <input type="text" className="form-control" id="add-email" ref="addEmail"
                                   onBlur={this.handleValidation('email', strings.emailWarning)}/>
                            <div className="invalid-feedback">{email.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-city">{strings.city + ":"}</label>
                            <select className="form-control" id="add-city" ref="addCity">
                                {this.renderCities()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-clock-size">{strings.clockSize + ":"}</label>
                            <select className="form-control" id="add-clock-size" ref="addClockSize">
                                <option value="small">{strings.small}</option>
                                <option value="medium">{strings.medium}</option>
                                <option value="large">{strings.large}</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-date">{strings.date}</label>
                            <input type="date" className="form-control" id="add-date" ref="addDate"
                                   onBlur={this.handleValidation('date', strings.dateWarning)}/>
                            <div className="invalid-feedback">{date.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-time">{strings.time}</label>
                            <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control"
                                   id="add-time" ref="addTime"
                                   onBlur={this.handleValidation('time', strings.timeWarning)}/>
                            <div className="invalid-feedback">{time.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-watchmaker">{strings.watchmaker}</label>
                            <select className="form-control" id="add-watchmaker" ref="addWatchmakerId">
                                {this.renderWatchmakers()}
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitAdd}>
                        {strings.confirm}
                    </button>
                    <button type="button" className="btn float-right" onClick={this.hideModalCreate}>
                        {strings.close}
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
                    <h4 className="modal-title">{strings.editReservation}</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="edit-name">{strings.name + ":"}</label>
                            <input type="text" className="form-control" id="edit-name" ref="editName"
                                   defaultValue={name}
                                   onBlur={this.handleValidation('name', strings.nameWarning)}/>
                            <div className="invalid-feedback">{validationResult.name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-name">{strings.email + ":"}</label>
                            <input type="text" className="form-control" id="edit-email" ref="editEmail"
                                   defaultValue={email}
                                   onBlur={this.handleValidation('email', strings.emailWarning)}/>
                            <div className="invalid-feedback">{validationResult.email.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-city">{strings.city}</label>
                            <select className="form-control" id="edit-city" ref="editCity"
                                    defaultValue={city}>
                                {this.renderCities()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-clock-size">{strings.clockSize + ":"}</label>
                            <select className="form-control" id="edit-clock-size" ref="editClockSize"
                                    defaultValue={clockSize}>
                                <option value="small">{strings.small}</option>
                                <option value="medium">{strings.medium}</option>
                                <option value="large">{strings.large}</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-date">{strings.date + ":"}</label>
                            <input type="date" className="form-control" id="edit-date" ref="editDate"
                                   defaultValue={this.dateToString(date)}
                                   onBlur={this.handleValidation('date', strings.dateWarning)}/>
                            <div className="invalid-feedback">{validationResult.date.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-time">{strings.time + ":"}</label>
                            <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control"
                                   id="edit-time"
                                   ref="editTime" defaultValue={time}
                                   onBlur={this.handleValidation('time', strings.timeWarning)}/>
                            <div className="invalid-feedback">{validationResult.time.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-watchmaker">{strings.watchmaker + ":"}</label>
                            <select className="form-control" id="edit-watchmaker" ref="editWatchmakerId">
                                {this.renderWatchmakers()}
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitEdit}>
                        {strings.confirm}
                    </button>
                    <button type="button" className="btn float-right"
                            onClick={this.hideModalUpdate}>{strings.close}</button>
                </div>
            </Modal>
        }
    }

    update = () => {
        restApiClient.getCities()
            .then(cities => this.setState({cities}));
        this.forceUpdate();
    };

    render() {
        const {cityTranslations, language} = this.props;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation active="reservations" update={this.update} language={language}
                                cityTranslations={cityTranslations}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <h4 className="row justify-content-md-center">{strings.reservations}</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>{strings.name}</th>
                            <th>{strings.city}</th>
                            <th>{strings.email}</th>
                            <th>{strings.clockSize}</th>
                            <th>{strings.date}</th>
                            <th>{strings.time}</th>
                            <th>{strings.watchmaker}</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderReservations()}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={this.openModalCreate}>
                        <i className="fa fa-plus"/> {strings.add}
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
