import React from 'react';
import Navigation from './AdminNavigation.jsx';
import Modal from 'react-bootstrap4-modal';
import restApiClient from '../restApiClient/index';
import validation from '../validation';
import strings from '../localization.js';
import SelectTimezone from './SelectTimezone.jsx';
import translations from "../localization";
import DeleteButton from "./DeleteButton.jsx";
import stringHelper from "../stringHelper";

export default class Cities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            isModalCreateOpened: false,
            isModalUpdateOpened: false,
            validationResult: {
                ruName: {isValid: false, message: ""},
                enName: {isValid: false, message: ""},
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
        restApiClient.getCities()
            .then(cities => this.setState({cities: cities}));
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

    handleOnEditClick = (city) => () => {
        this.openModalUpdate();
        this.setState({editing: city});
    };

    handleOnDeleteClick = (id) => () => {
        const {cities} = this.state;

        restApiClient.deleteCity(id)
            .then(res => {
                if (res.status === 200) {
                    restApiClient.getCities()
                        .then(cities => this.setState({cities: cities}));
                }
                else if (res.status === 409 && res.error === "Foreign key constraint error") {
                    this.setState({foreignKeyConstraintError: true});
                }
            });
    };

    handleOnSubmitAdd = () => {
        const {validationResult} = this.state;
        const {cityTranslations} = this.props;

        if (!validation.isValidData(validationResult)) {
            this.setState({formError: true});
            return;
        } else {
            this.setState({formError: false});
        }

        const data = {
            name: this.refs.addEnName.value,
            timezone: this.refs.addTimezone.value,
            translations: [
                {language: 'ru', name: this.refs.addRuName.value},
                {language: 'en', name: this.refs.addEnName.value}
            ]
        };

        restApiClient.addCity(data).then(() => {
            cityTranslations.onCitiesChange();
            restApiClient.getCities()
                .then(cities => this.setState({cities: cities}));
        }).catch(error => console.log(error));


        this.hideModalCreate();
    };

    handleOnSubmitEdit = () => {
        const {editing: {id}} = this.state;
        const {cityTranslations} = this.props;

        const data = {
            name: this.refs.editEnName.value,
            timezone: this.refs.editTimezone.value,
            id: id,
            translations: [
                {id: cityTranslations.getId(id, 'ru'), language: 'ru', name: this.refs.editRuName.value, city_id: id},
                {id: cityTranslations.getId(id, 'en'), language: 'en', name: this.refs.editEnName.value, city_id: id}
            ]
        };

        restApiClient.editCity(data).then(() => {
            cityTranslations.onCitiesChange();
            restApiClient.getCities()
                .then(cities => this.setState({cities: cities}))
                .catch(error => console.log(error));
        }).catch(error => console.log(error));


        this.hideModalUpdate();
    };

    renderCities() {
        const {cities} = this.state;
        const {cityTranslations} = this.props;

        return cities.map(city => {
            return <tr key={'city' + city.id}>
                <td>{cityTranslations.getName(city.id)}</td>
                <td>{translations.timezoneTranslations[city.timezone] || ''}</td>
                <td>
                    <button type="button" className="btn btn-warning" onClick={this.handleOnEditClick(city)}>
                        <i className="fa fa-pencil"/>
                    </button>
                </td>
                <td>
                    <DeleteButton handleDelete={this.handleOnDeleteClick(city.id)}
                                  deletingMessage={strings.deletingMessage}/>
                </td>
            </tr>
        });
    }

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
        const {isModalCreateOpened, validationResult: {ruName, enName}} = this.state;

        if (isModalCreateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalCreate}>
                <div className="modal-header">
                    <h4 className="modal-title">{strings.addCity}</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="add-en-name">{strings.enName + ":"}</label>
                            <input type="text" className="form-control" id="add-en-name" ref="addEnName"
                                   onBlur={this.handleValidation('enName', strings.notEmptyNameWarning)}/>
                            <div className="invalid-feedback">{enName.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-ru-name">{strings.ruName + ":"}</label>
                            <input type="text" className="form-control" id="add-ru-name" ref="addRuName"
                                   onBlur={this.handleValidation('ruName', strings.notEmptyNameWarning)}/>
                            <div className="invalid-feedback">{ruName.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-timezone">{strings.timezone + ":"}</label>
                            <select className={'form-control'} id="add-timezone" ref="addTimezone"
                                    defaultValue='Europe/Kiev'>
                                <SelectTimezone/>
                            </select>
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
        const {isModalUpdateOpened, editing, validationResult: {ruName, enName}} = this.state;
        const {cityTranslations} = this.props;

        if (isModalUpdateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalUpdate}>
                <div className="modal-header">
                    <h4>{strings.editCity}</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="edit-en-name">{strings.enName + ":"}</label>
                            <input type="text" className="form-control" id="edit-en-name" ref="editEnName"
                                   defaultValue={cityTranslations.getTranslation(editing.id, 'en')}
                                   onBlur={this.handleValidation('enName', strings.notEmptyNameWarning)}/>
                            <div className="invalid-feedback">{enName.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-ru-name">{strings.ruName + ":"}</label>
                            <input type="text" className="form-control" id="edit-ru-name" ref="editRuName"
                                   defaultValue={cityTranslations.getTranslation(editing.id, 'ru')}
                                   onBlur={this.handleValidation('ruName', strings.notEmptyNameWarning)}/>
                            <div className="invalid-feedback">{ruName.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-timezone">{strings.timezone + ":"}</label>
                            <select className={'form-control'} id="edit-timezone" ref="editTimezone"
                                    defaultValue={editing.timezone}>
                                <SelectTimezone/>
                            </select>
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
        restApiClient.getCities(strings.getLanguage())
            .then(cities => {
                this.setState({cities: cities})
            });
        this.forceUpdate();
    };

    render() {
        const {cityTranslations, language} = this.props;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation active="cities" update={this.update} language={language}
                                cityTranslations={cityTranslations}/>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-md-4">
                    {this.renderForeignKeyConstraintError()}
                    <h4 className="row justify-content-md-center">{strings.cities}</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>{strings.name}</th>
                            <th>{strings.timezone}</th>
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
