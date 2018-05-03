import React from 'react';
import {Link} from 'react-router-dom';
import Localization from './Localization.jsx';
import strings from '../localization.js';

export default class Navigation extends React.Component {
    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">{strings.main}</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className={"nav-item"}>
                            <Localization update={this.props.update} color="secondary"/>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
