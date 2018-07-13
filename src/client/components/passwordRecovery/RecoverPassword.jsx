import React from 'react';
import Navigation from '../Navigation.jsx';
import strings from '../../localization.js';
import restApiClient from '../../restApiClient/index';
import Auth from "../../authentication";
import validation from '../../validation';

export default class RecoverPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formError: false,
            passwordDoesNotMatchError: false,
            confirmation: false,
            validationResult: {
                password: {isValid: false, message: ""},
                repeatPassword: {isValid: false, message: ""}
            },
            seconds: 3,
            unknownError: false
        };
    }

    componentWillMount() {
        strings.setLanguage(this.props.language);
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

    handleOnSubmit = () => {
        const {validationResult} = this.state;
        const {password, repeatPassword} = this.refs;

        if (validation.isValidData(validationResult)) {
            this.setState({formError: true});
            return;
        } else {
            this.setState({formError: false});
        }

        let recoveryData;
        if (password.value === repeatPassword.value) {
            recoveryData = {
                plaintextPassword: password.value,
                token: window.location.href.split('?token=')[1]
            };
            this.setState({passwordDoesNotMatchError: false});
        }
        else {
            this.setState({passwordDoesNotMatchError: true});
            return;
        }

        restApiClient.changePassword(recoveryData).then((res) => {
            if (res.status === 204) {
                this.setState({confirmation: true});

                const timerId = setInterval(() => {
                    this.setState(prevState => ({seconds: prevState.seconds - 1}));
                }, 1000);

                setTimeout(() => {
                    restApiClient.destroyToken(window.location.href.split('?token=')[1]).then((res) => {
                        if (res.status === 204) {
                            clearInterval(timerId);
                            Auth.redirect('/');
                        } else {
                            this.setState({unknownError: true});
                        }
                    });
                }, 3000);
            }
            else {
                this.setState({unknownError: true});
            }
        });
    };

    renderErrors = () => {
        const {passwordDoesNotMatchError, formError, unknownError} = this.state;

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
        if (unknownError) {
            return <div className="alert alert-danger">
                {strings.unknownError}
            </div>
        }
    };

    update = () => {
        this.forceUpdate();
    };

    render() {
        const {confirmation, validationResult: {password, repeatPassword}, seconds} = this.state;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation update={this.update} language={this.props.language}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    {this.renderErrors()}
                    {confirmation && <div className="alert alert-success">
                        {strings.changedPasswordConfirmation + " " + seconds + " " + strings.seconds}
                    </div>}
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