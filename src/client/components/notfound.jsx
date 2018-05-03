import React from 'react';
import Navigation from './Navigation.jsx';
import strings from '../localization.js';

export default class NotFound extends React.Component {
    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    render() {
        return (
            <div>
                <Navigation language={this.props.language}/>
                <h2>{strings.notFound}</h2>
            </div>
        );
    }
}