import React from 'react';
import restApiClient from '../restApiClient/index';
import Modal from 'react-bootstrap4-modal';
import strings from '../localization.js';
import moment from 'moment-timezone';
import timeHelper from '../timeHelper';

const validation = require('../validation');

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            freeWatchmakers: [],
            chosenWatchmaker: {},
            reservation: {},
            confirmation: 'closed',
            validationResult: {
                name: {isValid: false, message: ''},
                email: {isValid: false, message: ''},
                date: {isValid: false, message: ''},
                time: {isValid: false, message: ''},
            },
            formError: false,
            selectWatchmakerError: false,
            isModalOpened: false,
            citiesById: {},
            feedbacks: []
        };
    }

    componentDidMount() {
        restApiClient.getCities()
            .then(cities => {
                this.setState({cities: cities});
                this.setState({
                    citiesById: cities.reduce((citiesById, city) => {
                        citiesById[city.id] = city;
                        return citiesById;
                    }, {})
                });
            });

        restApiClient.getTenLastFeedbacks()
            .then(feedbacks => this.setState({feedbacks}));
    }

    validator(fieldName, element, message) {
        const {validationResult} = this.state;

        if (fieldName === 'time') {
            if (validation.isValidTime(this.refs.time.value, this.refs.date.value)) {
                this.setState({validationResult: {...validationResult, time: {isValid: true, message: ''}}});
                element.className = 'form-control form-control-sm is-valid';
            }
            else {
                this.setState({validationResult: {...validationResult, time: {isValid: false, message: message}}});
                element.className = 'form-control form-control-sm is-invalid';
            }
            return;
        }

        function capitalize(string) {
            return string.replace(/(?:^|\s)\S/g, function (l) {
                return l.toUpperCase();
            });
        }

        if (validation['isValid' + capitalize(fieldName)](this.refs[fieldName].value)) {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: true, message: ''}}});
            element.className = 'form-control form-control-sm is-valid';
        }
        else {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: false, message: message}}});
            element.className = 'form-control form-control-sm is-invalid';
        }
    }

    handleValidation = (type, message) => event => this.validator(type, event.currentTarget, message);

    renderFormError() {
        const {formError} = this.state;

        if (formError) {
            return <div className="alert alert-danger">{strings.fillFields}</div>
        }
    }

    renderChooseWatchmakersError() {
        const {selectWatchmakerError} = this.state;
        if (selectWatchmakerError) {
            return <div className="alert alert-danger">{strings.chooseWatchmaker}</div>
        }

    }

    handleOnSubmitForm = (event) => {
        event.preventDefault();
        const {name, city, email, clockSize, date, time} = this.refs;
        const {citiesById} = this.state;

        const timezone = citiesById[city.value].timezone;
        const startMoment = moment.tz(date.value + " " + time.value, timezone);

        const params = {
            name: name.value,
            city_id: city.value,
            email: email.value,
            clock_size: clockSize.value,
            start_time: timeHelper.getStartTime(startMoment),
            finish_time: timeHelper.getFinishTime(startMoment, clockSize.value),
            emailMessage: strings.emailMessage + moment(date.value + " " + time.value).format('DD.MM.YYYY HH:mm'),
            feedbackEmailMessage: strings.feedbackEmailMessage,
            timezone: timezone
        };

        if (!validation.isValidReservation(params)) {
            this.setState({formError: true});
            return;
        }
        else {
            this.setState({formError: false});
        }

        restApiClient.getFreeWatchmakers({
            params: {
                city_id: params.city_id,
                start_time: params.start_time,
                finish_time: params.finish_time
            }
        }).then(freeWatchmakers => this.setState({freeWatchmakers: freeWatchmakers}));

        this.setState({reservation: params});
        this.openModal();
    };

    handleOnSubmitWatchmaker = (event) => {
        const {chosenWatchmaker, reservation, reservation: {name, email}} = this.state;
        event.preventDefault();

        if (Object.keys(chosenWatchmaker).length === 0) {
            this.setState({selectWatchmakerError: true});
            return;
        }
        else {
            this.setState({selectWatchmakerError: false});
        }

        restApiClient.addReservation(reservation)
            .then(res => {
                if (res.status === 201) {
                    this.setState({confirmation: 'opened'});
                }
            });
        restApiClient.addClient({
            name: name,
            email: email,
        });

        this.hideModal();
    };

    handleOnWatchmakerClick = (watchmaker) => () => {
        const {reservation} = this.state;
        this.setState({
            reservation: {
                ...reservation,
                watchmaker_id: watchmaker.id,
            },
            chosenWatchmaker: watchmaker
        });
    };

    renderConfirmation() {
        const {confirmation, reservation: {email}} = this.state;

        if (confirmation === 'opened') {
            return (
                <div className="alert alert-success">
                    <h5>{strings.confirmationMessage + ": " + email}</h5>
                </div>
            )
        }
    }

    isActive(watchmakerId) {
        const {chosenWatchmaker: {id}} = this.state;

        if (id === watchmakerId) {
            return 'table-active'
        }
        else {
            return "";
        }
    }

    renderWatchmakers() {
        const {freeWatchmakers} = this.state;

        return freeWatchmakers.map(watchmaker => {
            return <tr key={'watchmaker' + watchmaker.id} className={this.isActive(watchmaker.id)}
                       onClick={this.handleOnWatchmakerClick(watchmaker)}>
                <td>{watchmaker.name}</td>
                <td>{watchmaker.rating}</td>
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

    openModal = () => {
        this.setState({
            isModalOpened: true
        });
    };

    hideModal = () => {
        this.setState({
            isModalOpened: false
        });
    };

    renderFreeWatchmakers() {
        const {freeWatchmakers} = this.state;

        if (freeWatchmakers.length === 0) {
            return (<h5>{strings.noWatchmakersMessage}</h5>);
        }
        return <table className="table table-striped table-hover">
            <thead>
            <tr>
                <th>{strings.name}</th>
                <th>{strings.rating}</th>
            </tr>
            </thead>
            <tbody>
            {this.renderWatchmakers()}
            </tbody>
        </table>
    }

    renderChooseWatchmakers() {
        const {isModalOpened, freeWatchmakers} = this.state;

        return <Modal visible={isModalOpened} onClickBackdrop={this.hideModal}>
            <div className="modal-header">
                {this.renderChooseWatchmakersError()}
                <h5 className="modal-title">{strings.chooseWatchmaker + ":"}</h5>
            </div>
            <div className="modal-body">
                <form>
                    {this.renderFreeWatchmakers()}
                </form>
            </div>
            <div className="modal-footer">
                <button id="submit-watchmaker" className="btn btn-primary" onClick={this.handleOnSubmitWatchmaker}
                        disabled={freeWatchmakers.length === 0}>
                    {strings.confirm}
                </button>
                <button type="button" className="btn float-right" onClick={this.hideModal}>{strings.close}</button>
            </div>
        </Modal>
    }

    renderFeedbacks() {
        const {feedbacks} = this.state;

        return <ul className="feedback-list list-group">
            {/*<li className="list-group-item"><h6>{strings.feedbacks}</h6></li>*/}
            {feedbacks.map(feedback => {
                if (feedback.feedback.length > 0) {
                    return <li className="list-group-item" key={'feedback' + feedback.id}>
                        <div className="row">
                            <div className="img col-3">
                                <i className="border  fa fa-user-secret"/>
                            </div>
                            <div className="col-8 ">
                                {feedback.feedback}
                            </div>
                        </div>
                    </li>
                }
            })}
        </ul>
    }

    minDate() {
        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        const date = new Date();
        return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
    }

    render() {
        const {validationResult: {name, email, time, date}} = this.state;
        return <div className="container">
            <div className="row mt-4">
                <div className="col col-sm-5 offset-sm-1">
                    {this.renderFormError()}
                    {this.renderConfirmation()}
                    {this.renderChooseWatchmakers()}
                    <form className="custom-form">
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="name">{strings.name + ":"}</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control " id="name" ref="name"
                                       onBlur={this.handleValidation('name', strings.nameWarning)}/>
                                <div className="invalid-feedback">{name.message}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="name">{strings.email + ":"}</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="email" ref="email"
                                       onBlur={this.handleValidation('email', strings.emailWarning)}/>
                                <div className="invalid-feedback">{email.message}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="city">{strings.city + ":"}</label>
                            <div className="col-sm-8">
                                <select className="form-control" id="city"
                                        ref="city">{this.renderCities()}</select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label"
                                   htmlFor="clock-size">{strings.clockSize + ":"}</label>
                            <div className="col-sm-8">
                                <select className="form-control" id="clock-size" ref="clockSize">
                                    <option value="small">{strings.small}</option>
                                    <option value="medium">{strings.medium}</option>
                                    <option value="large">{strings.large}</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="date">{strings.date + ":"}</label>
                            <div className="col-sm-8">
                                <input type="date" min={this.minDate()} className="form-control" id="date" ref="date"
                                       onBlur={this.handleValidation('date', strings.dateWarning)}/>
                                <div className="invalid-feedback">{date.message}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="time">{strings.time + ":"}</label>
                            <div className="col-sm-8">
                                <input type="time" min="09:00" max="18:00" step={60 * 60} //one hour
                                       className="form-control" id="time" ref="time"
                                       onBlur={this.handleValidation('time', strings.timeWarning)}/>
                                <div className="invalid-feedback">{time.message}</div>
                            </div>
                        </div>
                        <button className="btn btn-primary"
                                onClick={this.handleOnSubmitForm}>{strings.confirm}
                        </button>
                    </form>
                    {this.renderFeedbacks()}
                </div>
            </div>
        </div>
    }
}