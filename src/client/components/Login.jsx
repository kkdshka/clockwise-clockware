import React from 'react';
import axios from "axios/index";
import Navigation from './Navigation.jsx';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
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
                    window.location.href = "/admin";
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

    render() {
        return <div>
            <div className="row">
                <div className="col">
                    <Navigation/>
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="col-sm-5">
                    <form className={'form mt-4'}>
                        {this.state.error && <div className="alert alert-danger">Неправильные логин или пароль</div>}
                        <div className="form-group">
                            <label htmlFor="login">Логин:</label>
                            <input type="text" className="form-control" id="login" ref="login"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль:</label>
                            <input type="password" className="form-control" id="password" ref="password"/>
                        </div>
                        <button className="btn btn-primary"
                                onClick={(event) => this.handleOnSubmit(event)}>Принять
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }
}