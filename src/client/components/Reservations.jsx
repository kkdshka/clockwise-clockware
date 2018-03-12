import React from 'react';
import {Link} from 'react-router-dom';
import axios from "axios/index";

export default class Reservations extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            modalCreate: 'closed',
            modalUpdate: 'closed',
            editing: {},
            cities: []
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
            date: this.refs.date.value
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
            '-' + pad(newDate.getUTCDate()) +
            ' ' + pad(newDate.getUTCHours()) +
            ':' + pad(newDate.getUTCMinutes()) +
            ':' + pad(newDate.getUTCSeconds());
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
                    <td>
                        <button
                            className="btn btn-warning"
                            onClick={() => this.handleOnEditClick(reservation)}>
                            <span className="fa fa-pencil"></span>
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.handleOnDeleteClick(reservation.id)}>
                            <span className="fa fa-remove"></span>
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
                        <label htmlFor="date">Дата (Формат: YYYY-MM-DD HH:MI:SS):</label>
                        <input type="text" className="form-control" id="date" ref="date"/>
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
                        <label htmlFor="date">Дата (Формат: YYYY-MM-DD HH:MI:SS):</label>
                        <input type="text" className="form-control" id="date" ref="date" defaultValue={this.dateToString(this.state.editing.date)} />
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
                <div className="col-md-6">
                    <div className="navbar navbar-light">
                        <Link className={'nav-link'} to={'/admin/clients'}>Клиенты</Link>
                        <Link className={'nav-link'} to={'/admin/watchmakers'}>Мастера</Link>
                        <Link className={'nav-link'} to={'/admin/cities'}>Города</Link>
                        <Link className={'nav-link'} to={'/admin/reservations'}>Бронирования</Link>
                    </div>
                    <h3 className="row justify-content-md-center">Клиенты</h3>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Город</th>
                            <th>Email</th>
                            <th>Размер часов</th>
                            <th>Дата</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderReservations()}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.setState({modalCreate: 'opened'})}>
                        <i className="fa fa-plus"></i> Добавить
                    </button>
                    <div className="row">{this.renderModalCreate()}</div>
                    <div className="row">{this.renderModalUpdate()}</div>
                </div>
            </div>
        );
    }
}
