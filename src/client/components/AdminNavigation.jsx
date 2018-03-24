import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AdminNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    highlightIfActive(menuItem) {
        if (menuItem === this.props.active) {
            return " active";
        }
    }

    handleOnLogoutClick(event) {
        event.preventDefault();
        axios.get('/logout')
            .then(res => {
                if (res.status === 200) {
                    window.location.href = '/admin';
                }
            });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className={"nav-item" + this.highlightIfActive("home")}>
                        <Link className="nav-link" to="/admin">Главная</Link>
                    </li>
                    <li className={"nav-item" + this.highlightIfActive("clients")}>
                        <Link className="nav-link" to="/admin/clients">Клиенты</Link>
                    </li>
                    <li className={"nav-item" + this.highlightIfActive("watchmakers")}>
                        <Link className="nav-link" to="/admin/watchmakers">Мастера</Link>
                    </li>
                    <li className={"nav-item" + this.highlightIfActive("cities")}>
                        <Link className="nav-link" to="/admin/cities">Города</Link>
                    </li>
                    <li className={"nav-item" + this.highlightIfActive("reservations")}>
                        <Link className="nav-link" to="/admin/reservations">Бронирования</Link>
                    </li>
                    <button className={"btn btn-secondary"} onClick={(event) => this.handleOnLogoutClick(event)}>Выйти
                    </button>
                </ul>
            </nav>
        );
    }
}
