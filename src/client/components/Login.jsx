import React from 'react';
import axios from "axios/index";

export default class Login extends React.Component {
    handleOnSubmit(event) {
        event.preventDefault();
        const data = {
            login: this.refs.login.value,
            password: this.refs.password.value
        };
        axios.post('/login', data, {withCredentials: true})
            .then(res => {
                if (res.status === 200) {
                    window.location.href = "/admin";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return <div className="row">
            <div className="col">
                <form className={'form'}>
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
    }
}