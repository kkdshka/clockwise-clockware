import React from 'react';
import {Link} from 'react-router-dom';

export default class AdminNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    highlightIfActive(menuItem) {
        if(menuItem === this.props.active) {
            return " active";
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarNav">
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
                    </ul>
                </div>
            </nav>
        );
    }
}
