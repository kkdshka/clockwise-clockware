import React from 'react';
import Order from './Order.jsx';
import Navigation from './AdminNavigation.jsx';
import strings from '../localization.js';

export default class Home extends React.Component {
    componentWillMount() {
        const {language} = this.props;

        strings.setLanguage(language);
    }

    update = () => {
        this.forceUpdate();
    };

    render() {
        const {cityTranslations, language} = this.props;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation active="home" update={this.update} language={language}
                                cityTranslations={cityTranslations}/>
                    <Order cityTranslations={cityTranslations} forCustomer={false}/>
                </div>
            </div>
        </div>
    }
}
