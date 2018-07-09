import React from 'react';
import Navigation from './Navigation.jsx';
import strings from '../localization.js';
import {Link} from 'react-router-dom';
import restApiClient from '../restApiClient';
import Auth from '../authentication';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            authorized: false
        };
    }

    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    handleOnSubmit = () => {
        const {email, password} = this.refs;

        const signInData = {
            email: email.value,
            password: password.value
        };

        restApiClient.signIn(signInData).then(() => {
            Auth.redirect('/personal-page');
        });
    };


    update = () => {
        this.forceUpdate();
    };

    render() {
        const {error} = this.state;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation update={this.update} language={this.props.language}/>
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="col-4 mt-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="text-center">{strings.signIn}</h4>
                        </div>
                    </div>
                    <form className={'form mt-4'}>
                        {error && <div className="alert alert-danger">{strings.authenticationWarning}</div>}
                        <div className="form-group">
                            <label htmlFor="email">{strings.email + ":"}</label>
                            <input type="text" className="form-control" id="login" ref="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{strings.password + ":"}</label>
                            <input type="password" className="form-control" id="password" ref="password"/>
                        </div>
                        <div className="d-flex align-items-center">
                            <button type="button" className="btn btn-primary"
                                    onClick={this.handleOnSubmit}>{strings.confirm}
                            </button>
                            <Link className="ml-auto" to="/register">{strings.signUp}</Link>
                        </div>
                        <div className="d-flex">
                            <Link className="ml-auto" to="/forgot-password">{strings.forgotPassword + "?"}</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}