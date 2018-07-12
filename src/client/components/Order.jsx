import React from 'react';
import restApiClient from '../restApiClient/index';
import Modal from 'react-bootstrap4-modal';
import strings from '../localization.js';
import moment from 'moment-timezone';
import timeHelper from '../timeHelper';
import stringHelper from "../stringHelper";
import validation from '../validation';

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            freeWatchmakers: [],
            chosenWatchmaker: {},
            reservation: {},
            isConfirmationOpened: false,
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

    handleValidation = (fieldName, message) => event => {
        const {validationResult, citiesById} = this.state;

        if(fieldName === 'time') {
            validation.validate(fieldName, event.currentTarget, {
                time: this.refs.time.value,
                date: this.refs.date.value,
                timezone: citiesById[this.refs.city.value].timezone
            }, (isValid) => {
                this.setState({
                    validationResult: {
                        ...validationResult,
                        [fieldName]: {isValid: isValid, message: isValid ? '' : message}
                    }
                });
            });
            return;
        }

        validation.validate(fieldName, event.currentTarget, this.refs[fieldName].value, (isValid) => {
            this.setState({
                validationResult: {
                    ...validationResult,
                    [fieldName]: {isValid: isValid, message: isValid ? '' : message}
                }
            });
        })
    };

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
        const {citiesById, validationResult} = this.state;

        if (!validation.isValidData(validationResult)) {
            this.setState({formError: true});
            return;
        }
        else {
            this.setState({formError: false});
        }

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

        restApiClient.getFreeWatchmakers({
            params: {
                city_id: params.city_id,
                start_time: params.start_time,
                finish_time: params.finish_time
            }
        }).then(freeWatchmakers => {
            this.setState({freeWatchmakers: freeWatchmakers});
            this.openModal();
        });

        this.setState({reservation: params});
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
                    this.setState({isConfirmationOpened: true});
                }
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
        const {isConfirmationOpened, reservation: {email}} = this.state;

        return <Modal visible={isConfirmationOpened} onClickBackdrop={() => 'Click ok!'}>
            <div className="modal-body">
                <div className="container">
                    <div className="alert alert-success row">
                        <div className="col">
                            <h5>{strings.confirmationMessage + ": " + email}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className={'btn btn-success float-right'}
                        onClick={() => window.location.href = window.location.href}>Ok
                </button>
            </div>
        </Modal>
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
                <td className="align-middle"><img src={watchmaker.avatar} /></td>
                <td className="align-middle">{watchmaker.name}</td>
                <td className="align-middle">{watchmaker.rating}</td>
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

    hideConfirmation = () => {
        this.setState({
            isConfirmationOpened: false
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
                <th />
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
            {feedbacks.map(feedback => {
                if (feedback.feedback.length > 0) {
                    return <li className="list-group-item" key={'feedback' + feedback.id}>
                        <div className="row">
                            <div className="border img col-2">
                                <i className="fa fa-user-secret"/>
                            </div>
                            <div className="col-10 ">
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
        const {forCustomer} = this.props;
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
                    {forCustomer ? this.renderFeedbacks() : ''}
                </div>
            </div>
        </div>
    }
}