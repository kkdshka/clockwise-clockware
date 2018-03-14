import React from 'react';
import Navigation from './AdminNavigation.jsx';
import axios from "axios/index";

export default class Reservations extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            modalCreate: 'closed',
            modalUpdate: 'closed',
            editing: {},
            cities: [],
            watchmakers: []
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

    handleOnEditClick(reservations) {
        this.setState({modalUpdate: 'opened'});
        this.setState({editing: reservations});
    }

    handleOnDeleteClick(id) {
        axios.delete('/admin/reservations/', {data: {id: id}})
            .then(res => {
                const reservations = res.data;
                this.setState({reservations: reservations});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitAdd() {
        const data = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            email: this.refs.email.value,
            clockSize: this.refs.clockSize.value,
            date: this.refs.date.value,
            time: this.refs.time.value,
            watchmakerId: this.refs.watchmakerId.value
        };
        axios.post('/admin/reservations/', data)
            .then(res => {
                const reservations = res.data;
                this.setState({modalCreate: 'closed'});
                this.setState({reservations: reservations});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitEdit() {
        const data = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            email: this.refs.email.value,
            clockSize: this.refs.clockSize.value,
            date: this.refs.date.value,
            time: this.refs.time.value,
            id: this.refs.id.value
        };
        axios.put('/admin/reservations/', data)
            .then(res => {
                const reservations = res.data;
                this.setState({modalUpdate: 'closed'});
                this.setState({reservations: reservations});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
            '-' + pad(newDate.getUTCDate());
    }

    renderReservations() {
        const reservations = [];
        this.state.reservations.map(reservation =>
            reservations.push(
                <tr key={'reservation' + reservation.id}>
                    <td>{reservation.name}</td>
                    <td>{reservation.city}</td>
                    <td>{reservation.email}</td>
                    <td>{reservation.clockSize}</td>
                    <td>{this.dateToString(reservation.date)}</td>
                    <td>{reservation.time}</td>
                    <td>
                        <button
                            className="btn btn-warning"
                            onClick={() => this.handleOnEditClick(reservation)}>
                            <i className="fa fa-pencil" />
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.handleOnDeleteClick(reservation.id)}>
                            <i className="fa fa-remove" />
                        </button>
                    </td>
                </tr>));
        return reservations;
    }

    renderCities() {
        const cities = [];
        this.state.cities.forEach(city => {
            cities.push(<option key={'city' + city.id}>{city.name}</option>);
        });
        return cities;
    }

    renderWatchmakers() {
        const watchmakers = [];
        this.state.watchmakers.forEach(watchmaker => {
            watchmakers.push(<option key={'watchmaker' + watchmaker.id} value={watchmaker.id}>{watchmaker.name}</option>);
        });
        return watchmakers;
    }

    renderModalCreate() {
        if (this.state.modalCreate === 'opened') {
            return (
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Имя:</label>
                        <input type="text" className="form-control" id="name" ref="name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email:</label>
                        <input type="text" className="form-control" id="email" ref="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Город:</label>
                        <select className="form-control" id="city" ref="city">
                            {this.renderCities()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clock-size">Размер часов:</label>
                        <select className="form-control" id="clock-size" ref="clockSize">
                            <option>Маленькие</option>
                            <option>Средние</option>
                            <option>Большие</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Дата:</label>
                        <input type="date" className="form-control" id="date" ref="date" />
                        <label htmlFor="time">Время:</label>
                        <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control" id="time" ref="time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Мастер:</label>
                        <select className="form-control" id="watchmaker" ref="watchmakerId">
                            {this.renderWatchmakers()}
                        </select>
                    </div>
                    <button type={'button'} className="btn btn-primary"
                            onClick={this.handleOnSubmitAdd.bind(this)}>Принять
                    </button>
                    <button type={'button'} className="btn float-right"
                            onClick={() => this.setState({modalCreate: 'closed'})}>Закрыть
                    </button>
                </form>
            );
        }
    }

    renderModalUpdate() {
        if (this.state.modalUpdate === 'opened') {
            return (
                <form className={'form'}>
                    <div className="form-group">
                        <label htmlFor="name">Имя:</label>
                        <input type="text" className="form-control" id="name" ref="name"
                               defaultValue={this.state.editing.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email:</label>
                        <input type="text" className="form-control" id="email" ref="email" defaultValue={this.state.editing.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Город:</label>
                        <select className="form-control" id="city" ref="city" defaultValue={this.state.editing.city} >
                            {this.renderCities()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="clock-size">Размер часов:</label>
                        <select className="form-control" id="clock-size" ref="clockSize" defaultValue={this.state.editing.clockSize} >
                            <option>Маленькие</option>
                            <option>Средние</option>
                            <option>Большие</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Дата:</label>
                        <input type="date" className="form-control" id="date" ref="date" />
                        <label htmlFor="time">Время:</label>
                        <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control" id="time" ref="time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Мастер:</label>
                        <select className="form-control" id="watchmaker" ref="watchmakerId">
                            {this.renderWatchmakers()}
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleOnSubmitEdit.bind(this)}>Принять</button>
                    <button className="btn float-right" onClick={() => this.setState({modalUpdate: 'closed'})}>Закрыть</button>
                </form>
            );
        }
    }

    render(){
        return (
            <div className="row">
                <div className="col-ms">
                    <Navigation active="reservations"/>
                    <h3 className="row justify-content-md-center">Бронирования</h3>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Город</th>
                            <th>Email</th>
                            <th>Размер часов</th>
                            <th>Дата</th>
                            <th>Время</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderReservations()}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.setState({modalCreate: 'opened'})}>
                        <i className="fa fa-plus" /> Добавить
                    </button>
                    <div className="row">{this.renderModalCreate()}</div>
                    <div className="row">{this.renderModalUpdate()}</div>
                </div>
            </div>
        );
    }
}
