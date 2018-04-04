import React from 'react';
import Navigation from './AdminNavigation.jsx';
import axios from "axios/index";
import Modal from 'react-bootstrap4-modal';

export default class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            cities: [],
            isModalCreateOpened: false,
            isModalUpdateOpened: false,
            editing: {},
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
        this.setState({editing: client});
        this.openModalUpdate();
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
            name: this.refs.addName.value,
            city: this.refs.addCity.value,
            email: this.refs.addEmail.value
        };
        axios.post('/admin/clients/', data)
            .then(res => {
                const clients = res.data;
                this.setState({clients: clients});
                this.hideModalCreate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitEdit() {
        const data = {
            name: this.refs.editName.value,
            city: this.refs.editCity.value,
            email: this.refs.editEmail.value,
            id: this.state.editing.id
        };
        axios.put('/admin/clients/', data)
            .then(res => {
                const clients = res.data;
                this.setState({clients: clients});
                this.hideModalUpdate();
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
                    <button type="button" className="btn btn-warning" onClick={() => this.handleOnEditClick(client)}>
                        <i className="fa fa-pencil"/>
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger"
                            onClick={() => this.handleOnDeleteClick(client.id)}>
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
        return <Modal visible={this.state.isModalCreateOpened} onClickBackdrop={this.hideModalCreate}>
            <div className="modal-header">
                <h4 className="modal-title">Добавить клиента</h4>
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
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitAdd.bind(this)}>
                    Принять
                </button>
                <button type="button" className="btn float-right" onClick={this.hideModalCreate}>
                    Закрыть
                </button>
            </div>
        </Modal>
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
        return <Modal visible={this.state.isModalUpdateOpened} onClickBackdrop={this.hideModalUpdate}>
            <div className="modal-header">
                <h4 className="modal-title">Изменить клиента</h4>
            </div>
            <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="edit-name">Имя:</label>
                        <input type="text" className="form-control" id="edit-name" ref="editName"
                               value={this.state.editing.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-email">Email:</label>
                        <input type="text" className="form-control" id="edit-email" ref="editEmail"
                               value={this.state.editing.email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-city">Город:</label>
                        <select className="form-control" id="edit-city" ref="editCity"
                                value={this.state.editing.city}>
                            {this.renderCities()}
                        </select>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitEdit.bind(this)}>
                    Принять
                </button>
                <button type="button" className="btn float-right" onClick={this.hideModalUpdate}>Закрыть</button>
            </div>
        </Modal>
    }

    render() {
        return <div>
            <div className="row">
                <div className="col-sm">
                    <Navigation active="clients"/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
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
                    <button className="btn btn-success" onClick={this.openModalCreate}>
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
