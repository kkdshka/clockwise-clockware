import React from 'react';
import Navigation from './AdminNavigation.jsx';
import Modal from 'react-bootstrap4-modal';
import restApiClient from '../restApiClient/index';
import validation from '../validation';
import strings from '../localization.js';

export default class Cities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            isModalCreateOpened: false,
            isModalUpdateOpened: false,
            name: {isValid: false, message: ''},
            formError: false,
            editing: {},
        };
    }

    componentDidMount() {
        strings.setLanguage(this.props.language);
        restApiClient.getCities()
            .then(cities => this.setState({cities: cities}));
    }

    handleValidation = event => {
        const {isModalCreateOpened} = this.state;

        const modalName = isModalCreateOpened ? 'add' : 'edit';

        if (validation.isValidWatchmakerName(this.refs[modalName + "Name"].value)) {
            this.setState({name: {isValid: true, message: ''}});
            event.currentTarget.className = 'form-control form-control-sm is-valid';
        }
        else {
            this.setState({name: {isValid: false, message: strings.notEmptyNameWarning}});
            event.currentTarget.className = 'form-control form-control-sm is-invalid';
        }
    };

    handleOnEditClick = (city) => () => {
        this.openModalUpdate();
        this.setState({editing: city});
    };

    handleOnDeleteClick = (id) => () => {
        restApiClient.deleteCity(id);

        restApiClient.getCities()
            .then(cities => this.setState({cities: cities}));
    };

    handleOnSubmitAdd = () => {
        const {name} = this.state;

        if (!name.isValid) {
            this.setState({formError: true});
            return;
        }
        this.setState({formError: false});

        const data = {
            name: this.refs.addName.value,
        };

        restApiClient.addCity(data);

        restApiClient.getCities()
            .then(cities => this.setState({cities: cities}));

        this.hideModalCreate();
    };

    handleOnSubmitEdit = () => {
        const {editing: {id}} = this.state;

        const data = {
            name: this.refs.editName.value,
            id: id
        };

        restApiClient.editCity(data)
            .catch(error => console.log(error));

        restApiClient.getCities()
            .then(cities => this.setState({cities: cities}))
            .catch(error => console.log(error));

        this.hideModalUpdate();
    };

    renderCities() {
        const {cities} = this.state;

        return cities.map(city => {
            return <tr key={'city' + city.id}>
                <td>{city.name}</td>
                <td>
                    <button type="button" className="btn btn-warning" onClick={this.handleOnEditClick(city)}>
                        <i className="fa fa-pencil"/>
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={this.handleOnDeleteClick(city.id)}>
                        <i className="fa fa-remove"/>
                    </button>
                </td>
            </tr>
        });
    }

    renderFormError() {
        const {formError} = this.state;

        if (formError) {
            return <div className="alert alert-danger">{strings.fillFields}</div>
        }
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
        const {isModalCreateOpened, name: {message}} = this.state;

        if (isModalCreateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalCreate}>
                <div className="modal-header">
                    <h4 className="modal-title">{strings.addCity}</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="add-name">{strings.name + ":"}</label>
                            <input type="text" className="form-control" id="add-name" ref="addName"
                                   onBlur={this.handleValidation}/>
                            <div className="invalid-feedback">{message}</div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitAdd}>
                        {strings.confirm}
                    </button>
                    <button type="button" className="btn float-right"
                            onClick={this.hideModalCreate}>{strings.close}</button>
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
        const {isModalUpdateOpened, editing: {name}, name: {message}} = this.state;

        if (isModalUpdateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalUpdate}>
                <div className="modal-header">
                    <h4>{strings.editCity}</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="edit-name">{strings.name + ":"}</label>
                            <input type="text" className="form-control" id="edit-name" ref="editName"
                                   defaultValue={name}
                                   onBlur={this.handleValidation}/>
                            <div className="invalid-feedback">{message}</div>
                        </div>
                    </form>
                </div>
                <div className={'modal-footer'}>
                    <button type="button" className="btn btn-primary"
                            onClick={this.handleOnSubmitEdit}>{strings.confirm}</button>
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
        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation active="cities" update={this.update} language={this.props.language}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-4">
                    <h4 className="row justify-content-md-center">{strings.cities}</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>{strings.name}</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderCities()}
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success" onClick={this.openModalCreate}>
                        <i className="fa fa-plus"/> {strings.add}
                    </button>
                </div>
                <div className="col-sm-4">
                    <div>{this.renderModalCreate()}</div>
                    <div>{this.renderModalUpdate()}</div>
                </div>
            </div>
        </div>
    }
}
