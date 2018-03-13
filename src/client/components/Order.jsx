import React from 'react';
import axios from "axios/index";

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: []
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

    handleOnSubmit() {
        const data = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            email: this.refs.email.value,
            clockSize: this.refs.clockSize.value,
            date: this.refs.date.value,
            time: this.refs.time.value
        };
        console.log(data);
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form className={'form'}>
                        <div className="form-group">
                            <label htmlFor="name">Имя:</label>
                            <input type="text" className="form-control" id="name" ref="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Email:</label>
                            <input type="text" className="form-control" id="email" ref="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Город:</label>
                            <select className="form-control" id="city" ref="city" >
                                {this.renderCities()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="clock-size">Размер часов:</label>
                            <select className="form-control" id="clock-size" ref="clockSize" >
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
                        <button className="btn btn-primary" onClick={this.handleOnSubmit.bind(this)}>Принять</button>
                    </form>
                </div>
            </div>
        );
    }
}