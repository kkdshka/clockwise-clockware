import React from 'react';
import {Link} from 'react-router-dom';

export default class Navigation extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Главная</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
