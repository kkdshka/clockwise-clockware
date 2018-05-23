import React from 'react';
import Navigation from './AdminNavigation.jsx';
import Modal from 'react-bootstrap4-modal';
import restApiClient from '../restApiClient/index';
import validation from '../validation';
import strings from '../localization.js';
import moment from 'moment-timezone';

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
        restApiClient.getCities()
            .then(cities => this.setState({cities: cities}));
        strings.setLanguage(this.props.language);
    }

    handleValidation = (fieldName) => event => {
        const {isModalCreateOpened} = this.state;
        const modalName = isModalCreateOpened ? 'add' : 'edit';

        if (validation.isValidName(this.refs[modalName + fieldName].value)) {
            this.setState({name: {isValid: true, message: ''}});
            event.currentTarget.className = 'form-control is-valid';
        }
        else {
            this.setState({name: {isValid: false, message: strings.notEmptyNameWarning}});
            event.currentTarget.className = 'form-control is-invalid';
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
        const {cityTranslations} = this.props;

        if (!name.isValid) {
            this.setState({formError: true});
            return;
        }
        this.setState({formError: false});

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
                <td>{city.timezone || ''}</td>
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

    // renderTimezoneSelect() {
    //     return moment.tz.names().map((timezone) => {
    //         return <option id={timezone}>{timezone}</option>
    //     });
    // }

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
                            <label htmlFor="add-en-name">{strings.enName + ":"}</label>
                            <input type="text" className="form-control" id="add-en-name" ref="addEnName"
                                   onBlur={this.handleValidation('EnName')}/>
                            <div className="invalid-feedback">{message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-ru-name">{strings.ruName + ":"}</label>
                            <input type="text" className="form-control" id="add-ru-name" ref="addRuName"
                                   onBlur={this.handleValidation('RuName')}/>
                            <div className="invalid-feedback">{message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-timezone">{strings.timezone + ":"}</label>
                            <select className="form-control" id="add-timezone" ref="addTimezone">
                                <option value="Europe/Kiev">{strings.timezoneUkraine}</option>
                                <option value="US/Eastern">{strings.timezoneUSA}</option>
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
            isModalUpdateOpened: true
        });
    };

    hideModalUpdate = () => {
        this.setState({
            isModalUpdateOpened: false
        });
    };

    renderModalUpdate() {
        const {isModalUpdateOpened, editing, name: {message}} = this.state;
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
                                   onBlur={this.handleValidation('EnName')}/>
                            <div className="invalid-feedback">{message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-ru-name">{strings.ruName + ":"}</label>
                            <input type="text" className="form-control" id="edit-ru-name" ref="editRuName"
                                   defaultValue={cityTranslations.getTranslation(editing.id, 'ru')}
                                   onBlur={this.handleValidation('RuName')}/>
                            <div className="invalid-feedback">{message}</div>
                            <div className="form-group">
                                <label htmlFor="edit-timezone">{strings.timezone + ":"}</label>
                                <input type="text" className="form-control" id="edit-timezone" ref="editTimezone"/>
                            </div>
                            <select className="form-control" id="edit-timezone" ref="editTimezone">
                                <option value="Europe/Kiev">{strings.timezoneUkraine}</option>
                                <option value="US/Eastern">{strings.timezoneUSA}</option>
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
            <div className="row mt-4">
                <div className="col-sm-4">
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
