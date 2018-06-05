import React from 'react';
import moment from 'moment-timezone';
import translations from '../localization.js';

export default class SelectTimezone extends React.Component {
    renderOptions() {
        const selectorOptions = moment.tz.names();
        selectorOptions.sort((firstTimezoneName, secondTimezoneName) => {
            return parseFloat(moment.tz(firstTimezoneName).format('Z').replace(':', '.')) - parseFloat(moment.tz(secondTimezoneName).format('Z').replace(':', '.'));
        });
        return selectorOptions.map((timezone) => {
            const timezoneOffset = moment.tz(timezone).format('Z') || '';
            return <option key={timezone} id={timezone}
                                    value={timezone}>{"(UTC" + timezoneOffset + ") " + translations.timezoneTranslations[timezone]}</option>
        });
    }

    render() {
        return [this.renderOptions()];
    }
}
