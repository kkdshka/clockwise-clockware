import React from 'react';
import strings from '../localization.js';
import Navigation from './Navigation.jsx';
import {Link} from 'react-router-dom';

export default class RegistrationSuccess extends React.Component {
    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    update = () => {
        this.forceUpdate();
    };

    render() {
        return <div className={'container'}>
            <div className="row">
                <div className="col">
                    <Navigation update={this.update} language={this.props.language}/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col col-lg-6 mt-4">
                    <div className="alert alert-success">
                        {strings.confirmRegistration + " "}<Link to="/sign-in">{strings.signIn}</Link>
                    </div>
                </div>
            </div>
        </div>
    }
}