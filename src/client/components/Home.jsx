import React from 'react';
import Order from './Order.jsx';
import Localization from './Localization.jsx';
import strings from '../localization.js';

export default class Home extends React.Component {
    componentWillMount() {
        document.body.classList.add("customer-form");
        strings.setLanguage(this.props.language);
    }

    componentWillUnmount() {
        document.body.classList.remove("customer-form");
    }

    update = () => {
        this.forceUpdate();
    };

    render() {
        return <div>
            <div className="custom-header">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <h4 className="text-center"><em>Clockwise Clockware</em></h4>
                            <h5>{strings.header}</h5>
                        </div>
                        <div className="col-1 align-self-center">
                            <Localization update={this.update} color="outline-secondary"/>
                        </div>
                    </div>
                </div>
            </div>
            <Order/>
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
