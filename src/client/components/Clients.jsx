import React from 'react';
import Navigation from './AdminNavigation.jsx';
import restApiClient from '../restApiClient/index';
import Modal from 'react-bootstrap4-modal';
import validation from "../validation";
import strings from '../localization.js';

export default class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            cities: [],
            isModalCreateOpened: false,
            isModalUpdateOpened: false,
            validationResult: {
                name: {isValid: false, message: ''},
                email: {isValid: false, message: ''},
            },
            formError: false,
            editing: {},
        };
    }

    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    componentDidMount() {
        restApiClient.getClients()
            .then(clients => this.setState({clients: clients}));
    }

    validator(fieldName, element, message) {
        const {isModalCreateOpened, validationResult} = this.state;

        function capitalize(string) {
            return string.replace(/(?:^|\s)\S/g, function (l) {
                return l.toUpperCase();
            });
        }

        const modalName = isModalCreateOpened ? 'add' : 'edit';

        if (validation['isValid' + capitalize(fieldName)](this.refs[modalName + capitalize(fieldName)].value)) {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: true, message: ''}}});
            element.className = 'form-control form-control-sm is-valid';
        }
        else {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: false, message: message}}});
            element.className = 'form-control form-control-sm is-invalid';
        }
    }

    handleValidation = (type, message) => event => this.validator(type, event.currentTarget, message);

    handleOnEditClick = (client) => () => {
        this.setState({editing: client});
        this.openModalUpdate();
    };

    handleOnDeleteClick = (id) => () => {
        restApiClient.deleteClient(id);

        restApiClient.getClients()
            .then(clients => this.setState({clients: clients}));
    };

    handleOnSubmitAdd = () => {
        const {addName, addEmail} = this.refs;

        const data = {
            name: addName.value,
            email: addEmail.value
        };

        if (!validation.isValidClient(data)) {
            this.setState({formError: true});
            return;
        }
        else {
            this.setState({formError: false});
        }

        restApiClient.addClient(data);

        restApiClient.getClients()
            .then(clients => this.setState({clients: clients}));

        this.hideModalCreate();
    };

    handleOnSubmitEdit = () => {
        const {editing: {id}} = this.state;
        const {editName, editEmail} = this.refs;

        const data = {
            name: editName.value,
            email: editEmail.value,
            id: id
        };

        restApiClient.editClient(data);

        restApiClient.getClients()
            .then(clients => this.setState({clients: clients}));

        this.hideModalUpdate();
    };

    renderFormError() {
        const {formError} = this.state;

        if (formError) {
            return <div className="alert alert-danger">{strings.fillFields}</div>
        }
    }

    renderClients() {
        const {clients} = this.state;

        return clients.map(client => {
            return <tr key={'client' + client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>
                    <button type="button" className="btn btn-warning" onClick={this.handleOnEditClick(client)}>
                        <i className="fa fa-pencil"/>
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger"
                            onClick={this.handleOnDeleteClick(client.id)}>
                        <i className="fa fa-remove"/>
                    </button>
                </td>
            </tr>
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
        const {isModalCreateOpened, validationResult} = this.state;

        if (isModalCreateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalCreate}>
                <div className="modal-header">
                    <h4 className="modal-title">{strings.addClient}</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="add-name">{strings.name + ":"}</label>
                            <input type="text" className="form-control" id="add-name" ref="addName"
                                   onBlur={this.handleValidation('name', strings.nameWarning)}/>
                            <div className="invalid-feedback">{validationResult.name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-email">{strings.email + ":"}</label>
                            <input type="text" className="form-control" id="add-email" ref="addEmail"
                                   onBlur={this.handleValidation('email', strings.emailWarning)}/>
                            <div className="invalid-feedback">{validationResult.email.message}</div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitAdd}>
                        {strings.confirm}
                    </button>
                    <button type="button" className="btn float-right" onClick={this.hideModalCreate}>
                        {strings.close}
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
        const {isModalUpdateOpened, editing: {name, email}, validationResult} = this.state;

        if (isModalUpdateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalUpdate}>
                <div className="modal-header">
                    <h4 className="modal-title">{strings.editClient}</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="edit-name">{strings.name + ":"}</label>
                            <input type="text" className="form-control" id="edit-name" ref="editName"
                                   defaultValue={name}
                                   onBlur={this.handleValidation('name', strings.nameWarning)}/>
                            <div className="invalid-feedback">{validationResult.name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-email">{strings.email + ":"}</label>
                            <input type="text" className="form-control" id="edit-email" ref="editEmail"
                                   defaultValue={email}
                                   onBlur={this.handleValidation('email', strings.emailWarning)}/>
                            <div className="invalid-feedback">{validationResult.email.message}</div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitEdit}>
                        {strings.confirm}
                    </button>
                    <button type="button" className="btn float-right"
                            onClick={this.hideModalUpdate}>{strings.close}</button>
                </div>
            </Modal>
        }
    }

    update = () => {
        this.forceUpdate();
    };

    render() {
        const {language, cityTranslations} = this.props;

        return <div className="container">
            <div className="row">
                <div className="col-sm">
                    <Navigation active="clients" update={this.update} language={language} cityTranslations={cityTranslations}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <h4 className="row justify-content-md-center">{strings.clients}</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>{strings.name}</th>
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
                        <i className="fa fa-plus"/> {strings.add}
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
