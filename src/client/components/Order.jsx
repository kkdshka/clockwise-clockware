import React from 'react';
import axios from "axios/index";

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            freeWatchmakers: [],
            chooseWatchmakers: 'closed',
            chosenWatchmaker: {},
            reservation: {},
            confirmation: 'closed'
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

    renderCities() {
        const cities = [];
        this.state.cities.forEach(city => {
            cities.push(<option key={'city' + city.id}>{city.name}</option>);
        });
        return cities;
    }

    handleOnSubmitForm(event) {
        event.preventDefault();
        this.setState({
            reservation: {
                name: this.refs.name.value,
                city: this.refs.city.value,
                email: this.refs.email.value,
                clockSize: this.refs.clockSize.value,
                date: this.refs.date.value,
                time: this.refs.time.value
            }
        });
        axios.get('/admin/watchmakers/free-watchmakers', {
            params: {
                city: this.state.reservation.city,
                clockSize: this.state.reservation.clockSize,
                date: this.state.reservation.date,
                time: this.state.reservation.time
            }
        })
            .then(res => {
                const freeWatchmakers = res.data;
                this.setState({freeWatchmakers});
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({chooseWatchmakers: 'opened'})
    }

    handleOnSubmitWatchmaker(event) {
        event.preventDefault();
        console.log(this.state.reservation);
        axios.post('/admin/reservations/', this.state.reservation)
            .then(res => {
                this.setState({chooseWatchmakers: 'closed'});
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({confirmation: 'opened'});
    }

    handleOnWatchmakerClick(watchmaker, event) {
        this.setState({chosenWatchmaker: watchmaker});
        event.currentTarget.classList.add("table-active");
        this.setState({
            reservation: {
                ...this.state.reservation,
                watchmakerId: watchmaker.id
            }
        });
    }

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

    renderWatchmakers() {
        const watchmakers = [];
        this.state.freeWatchmakers.forEach(watchmaker =>
            watchmakers.push(
                <tr key={'watchmaker' + watchmaker.id}
                    onClick={(event) => this.handleOnWatchmakerClick(watchmaker, event)}>
                    <td>{watchmaker.name}</td>
                    <td>{watchmaker.city}</td>
                    <td>{watchmaker.rating}</td>
                </tr>));
        return watchmakers;
    }

    renderChooseWatchmakers() {
        if (this.state.chooseWatchmakers === "opened") {
            if (this.state.freeWatchmakers.length === 0) {
                return (<h5>Свободных мастеров на ваше время нет</h5>);
            }
            return (
                <div>
                    <h5>Выберите мастера:</h5>
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
                    <button className="btn btn-primary"
                            onClick={(event) => this.handleOnSubmitWatchmaker(event)}>Принять
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <form className={'form'}>
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
                            <input type="date" className="form-control" id="date" ref="date"/>
                            <label htmlFor="time">Время:</label>
                            <input type="time" min="09:00" max="18:00" step={60 * 60} className="form-control" id="time"
                                   ref="time"/>
                        </div>
                        <button className="btn btn-primary"
                                onClick={(event) => this.handleOnSubmitForm(event)}>Принять
                        </button>
                    </form>
                </div>
                <div className={'col'}>{this.renderChooseWatchmakers()}</div>
                <div className={'col'}>{this.renderConfirmation()}</div>
            </div>
        );
    }
}