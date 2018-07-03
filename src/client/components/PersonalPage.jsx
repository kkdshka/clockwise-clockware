import React from 'react';
import axios from "axios/index";
import Navigation from './Navigation.jsx';
import strings from '../localization.js';

export default class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }

    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    update = () => {
        this.forceUpdate();
    };

    render() {
        const {error} = this.state;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation update={this.update} language={this.props.language}/>
                </div>
            </div>
        </div>
    }
}