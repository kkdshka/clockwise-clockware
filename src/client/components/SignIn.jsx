import React from 'react';
import axios from "axios/index";
import Navigation from './Navigation.jsx';
import strings from '../localization.js';
import {Link} from 'react-router-dom';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }

    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    handleOnSubmit = (event) => {

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
                            <input type="text" className="form-control" id="login" ref="login"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{strings.password + ":"}</label>
                            <input type="password" className="form-control" id="password" ref="password"/>
                        </div>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-primary"
                                    onClick={this.handleOnSubmitForm}>{strings.confirm}
                            </button>
                            <Link className="ml-auto" to="/register">{strings.register}</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}