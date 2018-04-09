import React from 'react';
import axios from "axios/index";
import Modal from 'react-bootstrap4-modal';

const validation = require('../validation');

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            freeWatchmakers: [],
            chooseWatchmakers: 'closed',
            chosenWatchmaker: {},
            reservation: {},
            confirmation: 'closed',
            name: {isValid: false, message: ''},
            email: {isValid: false, message: ''},
            date: {isValid: false, message: ''},
            time: {isValid: false, message: ''},
            formError: false,
            selectWatchmakerError: false
        };
    }

    componentDidMount() {
        axios.get('/admin/cities/data')
            .then(res => {
                const cities = res.data;
                this.setState({cities});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    validator(fieldName, element, message) {
        function capitalize(string) {
            return string.replace(/(?:^|\s)\S/g, function (l) {
                return l.toUpperCase();
            });
        }

        if (validation['isValid' + capitalize(fieldName)](this.refs[fieldName].value)) {
            this.setState({[fieldName]: {isValid: true, message: ''}});
            element.className = 'form-control form-control-sm is-valid';
        }
        else {
            this.setState({[fieldName]: {isValid: false, message: message}});
            element.className = 'form-control form-control-sm is-invalid';
        }
    }

    handleValidation = (type, message) => event => this.validator(type, event.currentTarget, message);

    renderFormError() {
        if (this.state.formError) {
            return <div className="alert alert-danger">Заполните поля</div>
        }
    }

    renderChooseWatchmakersError() {
        if (this.state.selectWatchmakerError) {
            return <div className="alert alert-danger">Выберите мастера</div>
        }
    }

    handleOnSubmitForm = (event) => {
        event.preventDefault();
        const params = {
            params: {
                name: this.refs.name.value,
                city: this.refs.city.value,
                email: this.refs.email.value,
                clockSize: this.refs.clockSize.value,
                date: this.refs.date.value,
                time: this.refs.time.value
            }
        };
        if (!validation.isValidReservation(params.params)) {
            this.setState({formError: true});
            return;
        }
        else {
            this.setState({formError: false});
        }
        axios.get('/admin/watchmakers/free-watchmakers', params)
            .then(res => {
                const freeWatchmakers = res.data;
                this.setState({freeWatchmakers: freeWatchmakers});
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({reservation: params.params});
        this.openModal();
    };

    handleOnSubmitWatchmaker = (event) => {
        event.preventDefault();
        if (Object.keys(this.state.chosenWatchmaker).length === 0) {
            this.setState({selectWatchmakerError: true});
            return;
        }
        else {
            this.setState({selectWatchmakerError: false});
        }
        axios.post('/admin/reservations/', this.state.reservation)
            .then(res => {
                this.hideModal();
                this.setState({chooseWatchmakers: 'closed'});
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.post('/admin/clients', {
            name: this.state.reservation.name,
            email: this.state.reservation.email,
            city: this.state.reservation.city
        });
        this.setState({confirmation: 'opened'});
    };

    handleOnWatchmakerClick = (watchmaker) => () => {
        this.setState({
            reservation: {
                ...this.state.reservation,
                watchmakerId: watchmaker.id,
            },
            chosenWatchmaker: watchmaker
        });
    };

    renderConfirmation() {
        if (this.state.confirmation === 'opened') {
            return (
                <div>
                    <h5>
                        Ваш заказ принят.
                        Подтверждение отправлено на почту: {this.state.reservation.email}
                    </h5>
                </div>
            )
        }
    }

    isActive(watchmakerId) {
        if (this.state.chosenWatchmaker.id === watchmakerId) {
            return 'table-active'
        }
        else {
            return "";
        }
    }

    renderWatchmakers() {
        return this.state.freeWatchmakers.map(watchmaker => {
            return <tr key={'watchmaker' + watchmaker.id} className={this.isActive(watchmaker.id)}
                       onClick={this.handleOnWatchmakerClick(watchmaker)}>
                <td>{watchmaker.name}</td>
                <td>{watchmaker.city}</td>
                <td>{watchmaker.rating}</td>
            </tr>
        });
    }

    renderCities() {
        return this.state.cities.map(city => {
            return <option key={'city' + city.id}>{city.name}</option>
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

    renderIfNoFreeWatchmakers() {
        if (this.state.freeWatchmakers.length === 0) {
            return (<h5>Свободных мастеров на ваше время нет</h5>);
        }
    }

    renderChooseWatchmakers() {
        return <Modal visible={this.state.isModalOpened} onClickBackdrop={this.hideModal}>
            <div className="modal-header">
                {this.renderChooseWatchmakersError()}
                <h5 className="modal-title">Выберите мастера:</h5>
            </div>
            <div className="modal-body">
                <form>
                    {this.renderIfNoFreeWatchmakers()}
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Город</th>
                            <th>Рейтинг</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderWatchmakers()}
                        </tbody>
                    </table>
                </form>
            </div>
            <div className="modal-footer">
                <button className="btn btn-primary" onClick={this.handleOnSubmitWatchmaker}>
                    Принять
                </button>
                <button type="button" className="btn float-right" onClick={this.hideModal}>Закрыть</button>
            </div>
        </Modal>
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
        return <div>
            <div className="row mt-4">
                <div className="col-sm-5">
                    {this.renderFormError()}
                    <form className={'form'}>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="name">Имя:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control " id="name" ref="name"
                                       onBlur={this.handleValidation('name', 'Имя не может быть короче трех букв')}/>
                                <div className="invalid-feedback">{this.state.name.message}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="name">Email:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="email" ref="email"
                                       onBlur={this.handleValidation('email', 'Введите правильный почтовый адрес')}/>
                                <div className="invalid-feedback">{this.state.email.message}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="city">Город:</label>
                            <div className="col-sm-8">
                                <select className="form-control" id="city"
                                        ref="city">{this.renderCities()}</select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="clock-size">Размер часов:</label>
                            <div className="col-sm-8">
                                <select className="form-control" id="clock-size" ref="clockSize">
                                    <option>Маленькие</option>
                                    <option>Средние</option>
                                    <option>Большие</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="date">Дата:</label>
                            <div className="col-sm-8">
                                <input type="date" min={this.minDate()} className="form-control" id="date" ref="date"
                                       onBlur={this.handleValidation('date', 'Введите дату с сегодняшней')}/>
                                <div className="invalid-feedback">{this.state.date.message}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="time">Время:</label>
                            <div className="col-sm-8">
                                <input type="time" min="09:00" max="18:00" step={60 * 60} //one hour
                                       className="form-control" id="time" ref="time"
                                       onBlur={this.handleValidation('time', 'Выберите время с 9:00 до 18:00')}/>
                                <div className="invalid-feedback">{this.state.time.message}</div>
                            </div>
                        </div>
                        <button className="btn btn-primary"
                                onClick={this.handleOnSubmitForm}>Принять
                        </button>
                    </form>
                </div>
                <div className={'col'}>{this.renderChooseWatchmakers()}</div>
                <div className={'col'}>{this.renderConfirmation()}</div>
            </div>
        </div>
    }
}