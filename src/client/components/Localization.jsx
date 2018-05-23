import React from 'react';
import strings from '../localization.js';

export default class Localization extends React.Component {
    setLanguageToEnglish = () => {
        const {cityTranslations} = this.props;

        cityTranslations.changeLanguage('en');
        localStorage.setItem('language', 'en');
        strings.setLanguage('en');
        this.props.update();
    };

    setLanguageToRussian = () => {
        const {cityTranslations} = this.props;

        cityTranslations.changeLanguage('ru');
        localStorage.setItem('language', 'ru');
        strings.setLanguage('ru');
        this.props.update();
    };

    render() {
        return <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className={("btn btn-" + this.props.color)}
                    onClick={this.setLanguageToEnglish}>English
            </button>
            <button type="button" className={("btn btn-" + this.props.color)}
                    onClick={this.setLanguageToRussian}>Русский
            </button>
        </div>
    }
}
