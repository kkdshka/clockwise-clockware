import React from 'react';
import Navigation from '../Navigation.jsx';
import strings from '../../localization.js';
import {Link} from 'react-router-dom';
import restApiClient from '../../restApiClient/index';

const validation = require('../../validation');

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formError: false,
            passwordDoesNotMatchError: false,
            confirmation: false,
            validationResult: {
                password: {isValid: false, message: ""},
                repeatPassword: {isValid: false, message: ""}
            }
        };
    }

    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    validator(fieldName, element, message) {
        const {validationResult} = this.state;

        function capitalize(string) {
            return string.replace(/(?:^|\s)\S/g, function (l) {
                return l.toUpperCase();
            });
        }

        if (validation.isValidPassword(this.refs[fieldName].value)) {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: true, message: ''}}});
            element.className = 'form-control form-control-sm is-valid';
        }
        else {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: false, message: message}}});
            element.className = 'form-control form-control-sm is-invalid';
        }
    }

    handleValidation = (type, message) => event => this.validator(type, event.currentTarget, message);

    handleOnSubmit = () => {
        const {validationResult} = this.state;
        const {password, repeatPassword} = this.refs;
        let recoveryData;

        if (!validationResult.password.isValid || !validationResult.repeatPassword.isValid) {
            this.setState({formError: true});
            return;
        } else {
            this.setState({formError: false});
        }

        if (password.value === repeatPassword.value) {
            recoveryData = {
                plaintPassword: password.value,
                token: window.location.href.split('?token=')[1]
            };
            this.setState({passwordDoesNotMatchError: false});
        }
        else {
            this.setState({passwordDoesNotMatchError: true});
            return;
        }

        restApiClient.changePassword(recoveryData).then((res) => {
            if (res.status === 200) {
                this.setState({confirmation: true});
            }
        });
    };

    renderErrors = () => {
        const {passwordDoesNotMatchError, formError} = this.state;

        if (formError) {
            return <div className="alert alert-danger">
                {strings.fillFields}
            </div>
        }
        if (passwordDoesNotMatchError) {
            return <div className="alert alert-danger">
                {strings.passwordDoesNotMatchError}
            </div>
        }
    };

    update = () => {
        this.forceUpdate();
    };

    render() {
        const {confirmation, validationResult: {password, repeatPassword}, passwordDoesNotMatchError} = this.state;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation update={this.update} language={this.props.language}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    {this.renderErrors()}
                    {confirmation && <div className="alert alert-success">{strings.changedPasswordConfirmation}</div>}
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="col-4 mt-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="text-center">{strings.enterNewPassword}</h4>
                        </div>
                    </div>
                    <form className={'form mt-4'}>
                        <div className="form-group">
                            <label htmlFor="password">{strings.password + ":"}</label>
                            <input type="password" className="form-control" id="password" ref="password"
                                   onBlur={this.handleValidation('password', strings.passwordWarning)}/>
                            <div className="invalid-feedback">{password.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeatPassword">{strings.repeatPassword + ":"}</label>
                            <input type="password" className="form-control" id="repeat-password" ref="repeatPassword"
                                   onBlur={this.handleValidation('repeatPassword', strings.passwordWarning)}/>
                            <div className="invalid-feedback">{repeatPassword.message}</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <button type="button" className="btn btn-primary"
                                    onClick={this.handleOnSubmit}>{strings.confirm}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}