import React from 'react';
import Order from './Order.jsx';
import Navigation from './AdminNavigation.jsx';

export default class Home extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm">
                    <Navigation active="home"/>
                    <Order/>
                </div>
            </div>
        );
    }
}
