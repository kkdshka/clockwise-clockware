import React from 'react';
import Order from './Order.jsx';
import Navigation from './AdminNavigation.jsx';
import strings from '../localization.js';

export default class Home extends React.Component {
    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    update = () => {
        this.forceUpdate();
    };

    render() {
        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation active="home" update={this.update} language={this.props.language}/>
                    <Order/>
                </div>
            </div>
        </div>
    }
}
