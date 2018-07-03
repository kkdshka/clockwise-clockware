import React from 'react';
import Order from './Order.jsx';
import Localization from './Localization.jsx';
import strings from '../localization.js';
import {Link} from 'react-router-dom';

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

    render() {
        const {cityTranslations} = this.props;

        return <div>
            <div className="custom-header">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-10">
                            <h4 className="text-center"><em>Clockwise Clockware</em></h4>
                            <h5>{strings.header}</h5>
                        </div>
                        <div className="col-2">
                            <div className="row justify-content-end">
                                <Localization update={this.update} color="outline-secondary"
                                              cityTranslations={cityTranslations}/>
                            </div>
                            <div className="row mt-2 justify-content-between">
                                <div className="col-10">
                                    <Link className="nav-link" to="/sign-in">{strings.signIn}</Link>
                                </div>
                                <div className="col-1">
                                    <Link className="nav-link" to="/register">{strings.register}</Link>
                                </div>
                            </div>
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
