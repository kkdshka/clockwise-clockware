import React from 'react';
import {Link} from 'react-router-dom';
import axios from "axios/index";

export default class Clients extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            modalCreate: 'closed',
            modalUpdate: 'closed',
            editing: {},
            cities: []
        };
    }

    componentDidMount() {
        axios.get('/admin/clients/data')
            .then(res => {
                const clients = res.data;
                this.setState({clients: clients});
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

    handleOnEditClick(client) {
        this.setState({modalUpdate: 'opened'});
        this.setState({editing: client});
    }

    handleOnDeleteClick(id) {
        axios.delete('/admin/clients/', {data: {id: id}})
            .then(res => {
                const clients = res.data;
                this.setState({clients: clients});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitAdd() {
        const data = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            email: this.refs.email.value
        };
        axios.post('/admin/clients/', data)
            .then(res => {
                const clients = res.data;
                this.setState({modalCreate: 'closed'});
                this.setState({clients: clients});
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
            id: this.state.editing.id
        };
        axios.put('/admin/clients/', data)
            .then(res => {
                const clients = res.data;
                this.setState({modalUpdate: 'closed'});
                this.setState({clients: clients});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderClients() {
        const clients = [];
        this.state.clients.map(client =>
            clients.push(
                <tr key={'client' + client.id}>
                    <td>{client.name}</td>
                    <td>{client.city}</td>
                    <td>{client.email}</td>
                    <td>
                        <button
                            className="btn btn-warning"
                            onClick={() => this.handleOnEditClick(client)}>
                            <span className="fa fa-pencil"></span>
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.handleOnDeleteClick(client.id)}>
                            <span className="fa fa-remove"></span>
                        </button>
                    </td>
                </tr>));
        return clients;
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
                        <input type="text" className="form-control" id="email" ref="email" defaultValue={this.state.editing.email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Город:</label>
                        <select className="form-control" id="city" ref="city" defaultValue={this.state.editing.city}>
                            {this.renderCities()}
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
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderClients()}
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
