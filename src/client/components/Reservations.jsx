import React from 'react';
import Navigation from './AdminNavigation.jsx';
import axios from "axios/index";
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
            editing: {},
        };
    }

    componentDidMount() {
        axios.get('/admin/reservations/data')
            .then(res => {
                const reservations = res.data;
                this.setState({reservations: reservations});
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

        axios.get('/admin/watchmakers/data')
            .then(res => {
                const watchmakers = res.data;
                this.setState({watchmakers});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnEditClick = (reservations) => () => {
        this.setState({editing: reservations});
        this.openModalUpdate();
    };

    handleOnDeleteClick = (id) => () => {
        axios.delete('/admin/reservations/', {data: {id: id}})
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/admin/reservations/data')
            .then(res => {
                const reservations = res.data;
                this.setState({reservations: reservations});
            })
            .catch(function (error) {
                console.log(error);
            });
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
        axios.post('/admin/reservations/', data)
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/admin/reservations/data')
            .then(res => {
                const reservations = res.data;
                this.setState({reservations: reservations});
            })
            .catch(function (error) {
                console.log(error);
            });
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
        axios.put('/admin/reservations/', data)
            .catch(function (error) {
                console.log(error);
            });
        axios.get('/admin/reservations/data')
            .then(res => {
                const reservations = res.data;
                this.setState({reservations: reservations});
            })
            .catch(function (error) {
                console.log(error);
            });
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
                        <div className="form-group">
                            <label htmlFor="add-name">Имя:</label>
                            <input type="text" className="form-control" id="add-name" ref="addName"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-email">Email:</label>
                            <input type="text" className="form-control" id="add-email" ref="addEmail"/>
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
                            <input type="date" className="form-control" id="add-date" ref="addDate"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-time">Время:</label>
                            <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control"
                                   id="add-time"
                                   ref="addTime"/>
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
                        <div className="form-group">
                            <label htmlFor="edit-name">Имя:</label>
                            <input type="text" className="form-control" id="edit-name" ref="editName"
                                   defaultValue={this.state.editing.name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-name">Email:</label>
                            <input type="text" className="form-control" id="edit-email" ref="editEmail"
                                   defaultValue={this.state.editing.email}/>
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
                                   defaultValue={this.dateToString(this.state.editing.date)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-time">Время:</label>
                            <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control"
                                   id="edit-time"
                                   ref="editTime" defaultValue={this.state.editing.time}/>
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
        return <div>
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
