import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Watchmakers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchmakers: [],
            modalCreate: 'closed',
            modalUpdate: 'closed',
            editing: {},
            cities: []
        };
    }

    componentDidMount() {
        axios.get('/admin/watchmakers/data')
            .then(res => {
                const watchmakers = res.data;
                this.setState({watchmakers});
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

    handleOnEditClick(watchmaker) {
        this.setState({modalUpdate: 'opened'});
        this.setState({editing: watchmaker});
    }

    handleOnDeleteClick(id) {
        axios.delete('/admin/watchmakers/', {data: {id: id}})
            .then(res => {
                const watchmakers = res.data;
                this.setState({watchmakers});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitAdd() {
        const data = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            rating: this.refs.rating.value
        };
        axios.post('/admin/watchmakers/', data)
            .then(res => {
                const watchmakers = res.data;
                this.setState({modalCreate: 'closed'});
                this.setState({watchmakers});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitEdit() {
        const data = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            rating: this.refs.rating.value,
            id: this.state.editing.id
        };
        axios.put('/admin/watchmakers/', data)
            .then(res => {
                const watchmakers = res.data;
                this.setState({modalCreate: 'closed'});
                this.setState({watchmakers});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderWatchmakers() {
        const watchmakers = [];
        this.state.watchmakers.map(watchmaker =>
            watchmakers.push(
                <tr key={'watchmaker' + watchmaker.id}>
                    <td>{watchmaker.name}</td>
                    <td>{watchmaker.city}</td>
                    <td>{watchmaker.rating}</td>
                    <td>
                        <button
                            className="btn btn-warning"
                            onClick={() => this.handleOnEditClick(watchmaker)}>
                            <span className="fa fa-pencil"></span>
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.handleOnDeleteClick(watchmaker.id)}>
                            <i className="fa fa-remove"></i>
                        </button>
                    </td>
                </tr>));
        return watchmakers;
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
                        <label htmlFor="city">Город:</label>
                        <select className="form-control" id="city" ref="city">
                            {this.renderCities()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Рейтинг:</label>
                        <select className="form-control" id="rating" ref="rating">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
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
                        <label htmlFor="city">Город:</label>
                        <select className="form-control" id="city" ref="city" defaultValue={this.state.editing.city}>
                            {this.renderCities()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Рейтинг:</label>
                        <select className="form-control" id="rating" ref="rating"
                                defaultValue={this.state.editing.rating}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleOnSubmitEdit.bind(this)}>Принять</button>
                    <button className="btn float-right" onClick={() => this.setState({modalUpdate: 'closed'})}>Закрыть</button>
                </form>
            );
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="navbar navbar-light">
                        <Link className={'nav-link'} to={'/admin/clients'}>Клиенты</Link>
                        <Link className={'nav-link'} to={'/admin/watchmakers'}>Мастера</Link>
                        <Link className={'nav-link'} to={'/admin/cities'}>Города</Link>
                        <Link className={'nav-link'} to={'/admin/reservations'}>Бронирования</Link>
                    </div>
                    <h3 className="row justify-content-md-center">Мастера</h3>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Город</th>
                            <th>Рейтинг</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderWatchmakers()}
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