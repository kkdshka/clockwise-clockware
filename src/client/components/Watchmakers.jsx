import React, {Component} from 'react';
import Navigation from './AdminNavigation.jsx';
import restApiClient from '../restApiClient/index';
import Modal from 'react-bootstrap4-modal';
import validation from '../validation';
import strings from '../localization.js';
import DeleteButton from "./DeleteButton.jsx";
import CloudinaryUploadWidget from './CloudinaryUploadWidget.jsx';
import stringHelper from '../stringHelper';

export default class Watchmakers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchmakers: [],
            cities: [],
            isModalCreateOpened: false,
            isModalUpdateOpened: false,
            validationResult: {
                name: {isValid: false, message: ''},
                avatar: {isValid: false, message: ''},
            },
            formError: false,
            foreignKeyConstraintError: false,
            editing: {},
            uploadedImageUrl: '',
            selectedFile: ''
        };
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

    componentDidMount() {
        const {language} = this.props;
        strings.setLanguage(language);

        restApiClient.getWatchmakers()
            .then(watchmakers => this.setState({watchmakers: watchmakers}));
    }

    handleOnEditClick = (watchmaker) => () => {
        this.setState({editing: watchmaker});
        this.openModalUpdate();
    };

    handleOnDeleteClick = (id) => () => {
        const {watchmakers} = this.state;

        restApiClient.deleteWatchmaker(id)
            .then(res => {
                if (res.status === 200) {
                    restApiClient.getWatchmakers()
                        .then(watchmakers => this.setState({watchmakers: watchmakers}));
                }
                else if (res.status === 409 && res.error === "Foreign key constraint error") {
                    this.setState({foreignKeyConstraintError: true});
                }
            });
    };

    handleOnSubmitAdd = (e) => {
        const {validationResult, selectedFile} = this.state;
        const {addName, addCity, addRating} = this.refs;

        if (!validationResult.name.isValid) {
            this.setState({formError: true});
            return;
        }
        this.setState({formError: false});

        const data = {
            name: addName.value,
            city_id: addCity.value,
            rating: addRating.value,
        };

        restApiClient.addWatchmaker(data).then((res) => {
            if (selectedFile) {
                const avatar = new FormData();
                avatar.append('file', selectedFile);
                avatar.append('id', res.id);
                restApiClient.addWatchmakerAvatar(avatar).then(() => {
                    restApiClient.getWatchmakers()
                        .then(watchmakers => this.setState({watchmakers: watchmakers}));
                });
            } else {
                restApiClient.getWatchmakers()
                    .then(watchmakers => this.setState({watchmakers: watchmakers}));
            }
        });

        this.hideModalCreate();
    };

    handleOnSubmitEdit = () => {
        const {editing: {id}, selectedFile} = this.state;
        const {editName, editCity, editRating} = this.refs;

        const data = {
            name: editName.value,
            city_id: editCity.value,
            rating: editRating.value,
            id: id
        };

        restApiClient.editWatchmaker(data).then(() => {
            if (selectedFile) {
                const avatar = new FormData();
                avatar.append('file', selectedFile);
                avatar.append('id', id);
                restApiClient.addWatchmakerAvatar(avatar)
                    .then(() => {
                        restApiClient.getWatchmakers()
                            .then(watchmakers => this.setState({watchmakers: watchmakers}));
                    });
            } else {
                restApiClient.getWatchmakers()
                    .then(watchmakers => this.setState({watchmakers: watchmakers}));
            }
        });

        this.hideModalUpdate();
    };

    renderWatchmakers() {
        const {watchmakers} = this.state;
        const {cityTranslations} = this.props;

        return watchmakers.map(watchmaker => {
            return <tr key={'watchmaker' + watchmaker.id}>
                <td className="align-middle"><CloudinaryUploadWidget
                    resultHandler={this.onUploadImageResultHandler}
                    url={watchmaker.avatar}
                    entity={watchmaker}
                /></td>
                <td className="align-middle">{watchmaker.name}</td>
                <td className="align-middle">{cityTranslations.getName(watchmaker.city_id)}</td>
                <td className="align-middle">{watchmaker.rating}</td>
                <td className="align-middle">
                    <button type="button" className="btn btn-warning"
                            onClick={this.handleOnEditClick(watchmaker)}>
                        <i className="fa fa-pencil"/>
                    </button>
                </td>
                <td className="align-middle">
                    <DeleteButton handleDelete={this.handleOnDeleteClick(watchmaker.id)}
                                  deletingMessage={strings.deletingMessage}/>
                </td>
            </tr>
        });
    }

    onUploadImageResultHandler = (result, watchmaker) => {
        if (result) {
            const imageURL = result[0].url;
            watchmaker.avatar = imageURL;
            restApiClient.editWatchmaker(watchmaker)
                .then(() => {
                    restApiClient.getWatchmakers()
                        .then(watchmakers => this.setState({watchmakers: watchmakers}));
                });
        }
    };

    renderCities() {
        const {cities} = this.state;
        const {cityTranslations} = this.props;

        return cities.map(city => {
            return <option key={'city' + city.id} value={city.id}>{cityTranslations.getName(city.id)}</option>
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
        restApiClient.getCities()
            .then(cities => this.setState({cities}));
        this.setState({
            isModalCreateOpened: true,
            formError: false
        });
    };

    hideModalCreate = () => {
        this.setState({
            isModalCreateOpened: false,
        });
    };

    renderModalCreate() {
        const {isModalCreateOpened, validationResult: {name, avatar}} = this.state;

        if (isModalCreateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalCreate}>
                <div className="modal-header">
                    <h4 className="modal-title">{strings.addWatchmaker}</h4>
                </div>
                <div className="modal-body">
                    <form>
                        {this.renderFormError()}
                        <div className="form-group">
                            <label htmlFor="add-name">{strings.name + ":"}</label>
                            <input type="text" className="form-control" id="add-name" ref="addName"
                                   onBlur={this.handleValidation('name', strings.nameWarning)}/>
                            <div className="invalid-feedback">{name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-city">{strings.city + ":"}</label>
                            <select className="form-control" id="add-city" ref="addCity">
                                {this.renderCities()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-rating">{strings.rating + ":"}</label>
                            <select className="form-control" id="add-rating" ref="addRating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-avatar">{strings.avatar + ":"}</label>
                            <input type="file" className="form-control-file" id="add-avatar" ref="addAvatar"
                                   onChange={this.handleValidation('avatar', strings.notValidImageWarning)}/>
                            <div className="invalid-feedback">{avatar.message}</div>
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
        restApiClient.getCities()
            .then(cities => this.setState({cities}));
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
        const {isModalUpdateOpened, editing: {name, city, rating}, validationResult} = this.state;

        if (isModalUpdateOpened) {
            return <Modal visible={true} onClickBackdrop={this.hideModalUpdate}>
                <div className="modal-header">
                    <h4 className="modal-title">{strings.editWatchmaker}</h4>
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
                            <label htmlFor="edit-city">{strings.city + ":"}</label>
                            <select className="form-control" id="edit-city" ref="editCity"
                                    defaultValue={city.id}>
                                {this.renderCities()}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-rating">{strings.rating + ":"}</label>
                            <select className="form-control" id="edit-rating" ref="editRating"
                                    defaultValue={rating}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-avatar">{strings.avatar + ":"}</label>
                            <input type="file" className="form-control-file" id="edit-avatar" ref="editAvatar"
                                   onChange={this.handleValidation('avatar', strings.notValidImageWarning)}/>
                            <div className="invalid-feedback">{validationResult.avatar.message}</div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmitEdit}>
                        {strings.confirm}
                    </button>
                    <button type="button" className="btn float-right" onClick={this.hideModalUpdate}>
                        {strings.close}
                    </button>
                </div>
            </Modal>
        }
    }

    update = () => {
        restApiClient.getCities(strings.getLanguage())
            .then(cities => this.setState({cities}));
        this.forceUpdate();
    };

    render() {
        const {cityTranslations, language} = this.props;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation active="watchmakers" update={this.update} language={language}
                                cityTranslations={cityTranslations}/>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-md-8">
                    {this.renderForeignKeyConstraintError()}
                    <h4 className="row justify-content-md-center">{strings.watchmakers}</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th/>
                            <th>{strings.name}</th>
                            <th>{strings.city}</th>
                            <th>{strings.rating}</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderWatchmakers()}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={this.openModalCreate}>
                        <i className="fa fa-plus"/> {strings.add}
                    </button>
                </div>
                <div className="col-md-4 ml-4">
                    <div>{this.renderModalCreate()}</div>
                    <div>{this.renderModalUpdate()}</div>
                </div>
            </div>
        </div>
    }
}