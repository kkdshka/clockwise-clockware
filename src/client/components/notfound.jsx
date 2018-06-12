import React from 'react';
import Navigation from './Navigation.jsx';
import strings from '../localization.js';

export default class NotFound extends React.Component {
    componentWillMount() {
        strings.setLanguage(this.props.language);
    }

    update = () => {
        this.forceUpdate();
    };

    render() {
        const {language, cityTranslations} = this.props;

        return (
            <div>
                <Navigation language={language} cityTranslations={cityTranslations} update={this.update}/>
                <h2>{strings.notFound}</h2>
            </div>
        );
    }
}