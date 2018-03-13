import React from 'react';
import Order from './Order.jsx';
import Navigation from './Navigation.jsx';

export default class Home extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <Navigation/>
                    <Order/>
                </div>
            </div>
        );
    }
}
