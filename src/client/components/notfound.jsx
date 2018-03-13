import React from 'react';
import Navigation from './Navigation.jsx';

export default class NotFound extends React.Component {
    render() {
        return (
            <div>
                <h2>Ресурс не найден</h2>
                <Navigation/>
            </div>
        );
    }
}