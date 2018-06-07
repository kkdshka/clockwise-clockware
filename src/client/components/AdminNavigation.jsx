import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Localization from './Localization.jsx';
import strings from '../localization.js';

export default class AdminNavigation extends React.Component {
    componentDidMount() {
        strings.setLanguage(this.props.language);
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
                    window.location.href = '/login';
                }
            });
    }

    render() {
        const {update, cityTranslations} = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className={"nav-item" + this.highlightIfActive("home")}>
                        <Link className="nav-link" to="/admin">{strings.main}</Link>
                    </li>
                    <li className={"nav-item" + this.highlightIfActive("clients")}>
                        <Link className="nav-link" to="/admin/clients">{strings.clients}</Link>
                    </li>
                    <li className={"nav-item" + this.highlightIfActive("watchmakers")}>
                        <Link className="nav-link" to="/admin/watchmakers">{strings.watchmakers}</Link>
                    </li>
                    <li className={"nav-item" + this.highlightIfActive("cities")}>
                        <Link className="nav-link" to="/admin/cities">{strings.cities}</Link>
                    </li>
                    <li className={"nav-item" + this.highlightIfActive("reservations")}>
                        <Link className="nav-link" to="/admin/reservations">{strings.reservations}</Link>
                    </li>
                    <li className={"nav-item" + this.highlightIfActive("feedbacks")}>
                        <Link className="nav-link" to="/admin/feedbacks">{strings.feedbacks}</Link>
                    </li>
                    <li className={"nav-item"}>
                        <button className={"btn btn-secondary"}
                                onClick={(event) => this.handleOnLogoutClick(event)}>{strings.logout}
                        </button>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className={"nav-item"}>
                        <Localization update={update} cityTranslations={cityTranslations} color="secondary"/>
                    </li>
                </ul>
            </nav>
        );
    }
}
