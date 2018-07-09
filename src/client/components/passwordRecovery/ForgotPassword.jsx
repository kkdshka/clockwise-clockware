import React from 'react';
import Navigation from '../Navigation.jsx';
import strings from '../../localization.js';
import {Link} from 'react-router-dom';
import restApiClient from '../../restApiClient/index';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmation: false,
        };
    }

    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    handleOnSubmit = () => {
        const {email} = this.refs;

        const recoveryData = {
            email: email.value,
            message: strings.passwordRecoveryEmailMessage
        };

        restApiClient.sendLink(recoveryData).then(() => {
            this.setState({confirmation: true});
        });
    };


    update = () => {
        this.forceUpdate();
    };

    render() {
        const {confirmation} = this.state;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation update={this.update} language={this.props.language}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    {confirmation && <div className="alert alert-success">{strings.sendLinkConfirmation}</div>}
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="col-4 mt-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="text-center">{strings.passwordRecovery}</h4>
                        </div>
                    </div>
                    <form className={'form mt-4'}>
                        <div className="form-group">
                            <label htmlFor="email">{strings.email + ":"}</label>
                            <input type="text" className="form-control" id="login" ref="email"/>
                        </div>
                        <div className="d-flex align-items-center">
                            <button type="button" className="btn btn-primary"
                                    onClick={this.handleOnSubmit}>{strings.confirm}
                            </button>
                            <Link className="ml-auto" to="/register">{strings.signUp}</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}