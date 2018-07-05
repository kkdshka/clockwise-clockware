import React from 'react';
import {Link} from 'react-router-dom';
import Localization from './Localization.jsx';
import strings from '../localization.js';

export default class Navigation extends React.Component {
    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    renderLink() {
        if(window.location.pathname === '/sign-in') {
            return <Link className="nav-link" to="/register">{strings.signUp}</Link>
        }
        return <Link className="nav-link" to="/sign-in">{strings.signIn}</Link>
    }

    render() {
        const {update, cityTranslations} = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">{strings.main}</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className={"nav-item pr-4"}>
                            {this.renderLink()}
                        </li>
                        <li className={"nav-item"}>
                            <Localization update={update} cityTranslations={cityTranslations} color="secondary"/>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
