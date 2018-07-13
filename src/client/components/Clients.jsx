import React from 'react';
import Navigation from './AdminNavigation.jsx';
import restApiClient from '../restApiClient/index';
import Modal from 'react-bootstrap4-modal';
import validation from "../validation";
import strings from '../localization.js';
import DeleteButton from "./DeleteButton.jsx";
import stringHelper from "../stringHelper";

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
            foreignKeyConstraintError: false,
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

    handleValidation = (fieldName, message) => event => {
        const {validationResult, isModalCreateOpened} = this.state;

        const modalName = isModalCreateOpened ? 'add' : 'edit';

        validation.validate(fieldName, event.currentTarget, this.refs[modalName + stringHelper.capitalize(fieldName)].value, (isValid) => {
            this.setState({
                validationResult: {
                    ...validationResult,
                    [fieldName]: {isValid: isValid, message: isValid ? '' : message}
                }
            });
        })
    };

    handleOnEditClick = (client) => () => {
        this.setState({editing: client});
        this.openModalUpdate();
    };

    handleOnDeleteClick = (id) => () => {
        const {clients} = this.state;

        restApiClient.deleteClient(id)
            .then(res => {
                if (res.status === 200) {
                    restApiClient.getClients()
                        .then(clients => this.setState({clients: clients}));
                }
                else if (res.status === 409 && res.data === "Foreign key constraint error") {
                    this.setState({foreignKeyConstraintError: true});
                }
            });
    };

    handleOnSubmitAdd = () => {
        const {addName, addEmail} = this.refs;
        const {validationResult} = this.state;

        const data = {
            name: addName.value,
            email: addEmail.value
        };

        if (!validation.isValidData(validationResult)) {
            this.setState({formError: true});
            return;
        }
        else {
            this.setState({formError: false});
        }

        restApiClient.addClient(data)
            .then((res) => {
                if (res.status === 201) {
                    restApiClient.getClients()
                        .then(clients => this.setState({clients: clients}));
                }
            });


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

        restApiClient.editClient(data)
            .then(() => {
                restApiClient.getClients()
                    .then(clients => this.setState({clients: clients}));
            });


        this.hideModalUpdate();
    };

    renderForeignKeyConstraintError() {
        const {foreignKeyConstraintError} = this.state;

        if (foreignKeyConstraintError) {
            return <div className="alert alert-danger">{strings.foreignKeyConstraintError}</div>
        }
    }

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
                    <DeleteButton handleDelete={this.handleOnDeleteClick(client.id)}
                                  deletingMessage={strings.deletingMessage}/>
                </td>
            </tr>
        });
    }

    openModalCreate = () => {
        this.setState({
            isModalCreateOpened: true,
            formError: false
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
            isModalUpdateOpened: true,
            formError: false
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
                    <Navigation active="clients" update={this.update} language={language}
                                cityTranslations={cityTranslations}/>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-md-5">
                    {this.renderForeignKeyConstraintError()}
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
                <div className="col-md-1">
                    <div>{this.renderModalCreate()}</div>
                    <div>{this.renderModalUpdate()}</div>
                </div>
            </div>
        </div>
    }
}
