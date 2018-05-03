import React from 'react';
import axios from "axios/index";
import Navigation from './Navigation.jsx';
import strings from '../localization.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }

    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    handleOnSubmit(event) {
        event.preventDefault();
        const data = {
            login: this.refs.login.value,
            password: this.refs.password.value
        };
        axios.post('/login', data, {
            withCredentials: true,
            validateStatus: status => status === 401 || status < 400
        })
            .then(res => {
                if (res.status === 200) {
                    window.location.href = "/";
                }
                else if (res.status === 401) {
                    console.log('error');
                    this.setState({error: true});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                <div className="col-sm-5">
                    <form className={'form mt-4'}>
                        {error && <div className="alert alert-danger">{strings.authenticationWarning}</div>}
                        <div className="form-group">
                            <label htmlFor="login">{strings.login + ":"}</label>
                            <input type="text" className="form-control" id="login" ref="login"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{strings.password + ":"}</label>
                            <input type="password" className="form-control" id="password" ref="password"/>
                        </div>
                        <button className="btn btn-primary"
                                onClick={(event) => this.handleOnSubmit(event)}>{strings.confirm}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }
}