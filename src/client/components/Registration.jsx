import React from 'react';
import strings from '../localization.js';

const validation = require('../validation');
import Navigation from './Navigation.jsx';
import {Link} from 'react-router-dom';
import restApiClient from '../restApiClient/index';
import Auth from "../authentication";
import stringHelper from "../stringHelper";


export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validationResult: {
                name: {isValid: false, message: ''},
                email: {isValid: false, message: ''},
                password: {isValid: false, message: ''},
            },
            formError: false,
            passwordDoesNotMatchError: false,
            confirmation: false,
            alreadyExistsError: false
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

        if (validation['isValid' + capitalize(fieldName)](this.refs[fieldName].value)) {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: true, message: ''}}});
            element.className = 'form-control form-control-sm is-valid';
        }
        else {
            this.setState({validationResult: {...validationResult, [fieldName]: {isValid: false, message: message}}});
            element.className = 'form-control form-control-sm is-invalid';
        }
    }

    handleValidation = (fieldName, message) => event => {
        const {validationResult} = this.state;

        validation.validate(fieldName, event.currentTarget, this.refs[fieldName].value, (isValid) => {
            this.setState({
                validationResult: {
                    ...validationResult,
                    [fieldName]: {isValid: isValid, message: isValid ? '' : message}
                }
            });
        })
    };

    handleOnSubmitForm = () => {
        const {name, email, password, confirmPassword, validationResult} = this.refs;

        if (password.value !== confirmPassword.value) {
            this.setState({passwordDoesNotMatchError: true});
            return;
        } else {
            this.setState({passwordDoesNotMatchError: false});
        }

        const data = {
            name: name.value,
            email: email.value,
            plaintextPassword: password.value
        };

        if (!validation.isValidData(validationResult)) {
            this.setState({formError: true});
            return;
        }
        else {
            this.setState({formError: false});
        }

        restApiClient.addClient(data).then((res) => {
            if (res.status === 201) {
                Auth.redirect('/success');
            }
            else {
                this.setState({alreadyExistsError: true});
            }
        });
    };

    update = () => {
        this.forceUpdate();
    };

    renderErrors = () => {
        const {passwordDoesNotMatchError, formError, alreadyExistsError} = this.state;

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
        if (alreadyExistsError) {
            return <div className="alert alert-danger">
                {strings.clientAlreadyExistsError}
            </div>
        }
    };

    render() {
        const {validationResult: {name, email, password}} = this.state;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation update={this.update} language={this.props.language}/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-4 mt-4">
                    {this.renderErrors()}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="text-center">{strings.signUp}</h4>
                        </div>
                    </div>
                    <form className="form mt-4" onSubmit={this.handleOnSubmitForm}>
                        <div className="form-group">
                            <label htmlFor="name">{strings.name + ":"}</label>
                            <input type="text" className="form-control " id="name" ref="name"
                                   onBlur={this.handleValidation('name', strings.nameWarning)}/>
                            <div className="invalid-feedback">{name.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{strings.email + ":"}</label>
                            <input type="text" className="form-control " id="email" ref="email"
                                   onBlur={this.handleValidation('email', strings.emailWarning)}/>
                            <div className="invalid-feedback">{email.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{strings.password + ":"}</label>
                            <input type="password" className="form-control " id="password" ref="password"
                                   onBlur={this.handleValidation('password', strings.passwordWarning)}/>
                            <div className="invalid-feedback">{password.message}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">{strings.repeatPassword + ":"}</label>
                            <input type="password" className="form-control " id="confirm-password" ref="confirmPassword"
                                   onBlur={this.handleValidation('password', strings.passwordWarning)}/>
                            <div className="invalid-feedback">{password.message}</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <button type="button" className="btn btn-primary"
                                    onClick={this.handleOnSubmitForm}>{strings.confirm}
                            </button>
                            <Link className="ml-auto" to="/sign-in">{strings.signIn}</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}