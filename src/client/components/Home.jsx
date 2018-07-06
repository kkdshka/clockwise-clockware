import React from 'react';
import Order from './Order.jsx';
import Localization from './Localization.jsx';
import strings from '../localization.js';
import {Link} from 'react-router-dom';
import Auth from '../authentication';

export default class Home extends React.Component {
    componentWillMount() {
        document.body.classList.add("customer-form");

        const {language} = this.props;

        strings.setLanguage(language);
    }

    componentWillUnmount() {
        document.body.classList.remove("customer-form");
    }

    update = () => {
        this.forceUpdate();
    };

    handleSignOut = () => {
        Auth.deauthenticateUser();
        Auth.redirect('/');
    };

    renderLinks() {
        if(!Auth.isUserAuthenticated()) {
            return <div className="d-flex mt-1">
                <Link className="ml-auto btn btn-link" to="/sign-in">{strings.signIn}</Link>
                <Link className="ml-auto btn btn-link" to="/register">{strings.signUp}</Link>
            </div>
        }
        return <div className="d-flex mt-1">
            <Link className="ml-auto btn btn-link" to="/personal-page">{strings.personalPage}</Link>
            <button type='button' className="ml-auto btn btn-link" onClick={this.handleSignOut}>{strings.signOut}</button>
        </div>
    }

    render() {
        const {cityTranslations} = this.props;

        return <div>
            <div className="custom-header">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-9">
                            <h4 className="text-center"><em>Clockwise Clockware</em></h4>
                            <h5>{strings.header}</h5>
                        </div>
                        <div className="col-3">
                            <div className="d-flex justify-content-end">
                                <Localization update={this.update} color="outline-secondary"
                                              cityTranslations={cityTranslations}/>
                            </div>
                            {this.renderLinks()}
                        </div>
                    </div>
                </div>
            </div>
            <Order cityTranslations={cityTranslations} forCustomer={true}/>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <div className="text-center">
                                {strings.contactUs + ": "}<i className="fa fa-envelope-o"/> cklockware@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    }
}
