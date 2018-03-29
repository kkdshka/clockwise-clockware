import React from 'react';
import Navigation from './AdminNavigation.jsx';
import axios from "axios/index";

export default class Clients extends React.Component {
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
        this.setState({modalUpdate: 'opened', editing: client});
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
                this.setState({modalCreate: 'closed', clients: clients});
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
                this.setState({modalUpdate: 'closed', clients: clients});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderClients() {
        return this.state.clients.map(client => {
            return <tr key={'client' + client.id}>
                <td>{client.name}</td>
                <td>{client.city}</td>
                <td>{client.email}</td>
                <td>
                    <button
                        className="btn btn-warning"
                        onClick={() => this.handleOnEditClick(client)}>
                        <i className="fa fa-pencil"/>
                    </button>
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => this.handleOnDeleteClick(client.id)}>
                        <i className="fa fa-remove"/>
                    </button>
                </td>
            </tr>
        });
    }

    renderCities() {
        return this.state.cities.forEach(city => {
            return <option key={'city' + city.id}>{city.name}</option>
        });
    }

    renderModalCreate() {
        if (this.state.modalCreate === 'opened') {
            return (
                <form>
                    <h4>Добавить клиента</h4>
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
                    <h4>Изменить клиента</h4>
                    <div className="form-group">
                        <label htmlFor="name">Имя:</label>
                        <input type="text" className="form-control" id="name" ref="name"
                               defaultValue={this.state.editing.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Email:</label>
                        <input type="text" className="form-control" id="email" ref="email"
                               defaultValue={this.state.editing.email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Город:</label>
                        <select className="form-control" id="city" ref="city" defaultValue={this.state.editing.city}>
                            {this.renderCities()}
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleOnSubmitEdit.bind(this)}>Принять</button>
                    <button className="btn float-right" onClick={() => this.setState({modalUpdate: 'closed'})}>Закрыть
                    </button>
                </form>
            );
        }
    }

    render() {
        return <div>
            <div className="row">
                <div className="col-sm">
                    <Navigation active="clients"/>
                </div>
            </div>
            <div className="row mt-4">
                <div className={'col-md-6'}>
                    <h4 className="row justify-content-md-center">Клиенты</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Город</th>
                            <th>Email</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderClients()}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.setState({modalCreate: 'opened'})}>
                        <i className="fa fa-plus"/> Добавить
                    </button>
                </div>
                <div className="col-md-6">
                    <div>{this.renderModalCreate()}</div>
                    <div>{this.renderModalUpdate()}</div>
                </div>
            </div>
        </div>
    }
}
