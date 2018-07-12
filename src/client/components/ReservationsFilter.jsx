import React from 'react';
import strings from '../localization.js';
import restApiClient from '../restApiClient';

export default class Reservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            cities: [],
            watchmakers: [],
            filter: {
                city_id: "",
                watchmaker_id: "",
                fromDate: "",
                toDate: ""
            }
        };
    }

    handleOnClick = () => {
        const {opened} = this.state;

        if (opened) {
            this.setState({opened: !opened});
        } else {
            restApiClient.getCities().then((cities) => {
                this.setState({cities: cities});
                restApiClient.getWatchmakers().then((watchmakers) => {
                    this.setState({watchmakers: watchmakers});
                    this.setState({opened: !opened});
                });
            });
        }
    };

    handleOnChange = fieldName => event => {
        const {filter} = this.state;

        this.setState({filter: {...filter, [fieldName]: event.currentTarget.value}});
    };

    handleOnSubmit = () => {
        const {onSubmit} = this.props;
        const {filter} = this.state;

        onSubmit(filter);
    };

    renderCities() {
        const {cities} = this.state;
        const {cityTranslations} = this.props;

        return cities.map(city => {
            return <option key={'city' + city.id} value={city.id}>{cityTranslations.getName(city.id)}</option>
        });
    }

    renderWatchmakers() {
        const {watchmakers} = this.state;

        return watchmakers.map(watchmaker => {
            return <option key={'watchmaker' + watchmaker.id} value={watchmaker.id}>{watchmaker.name}</option>
        });
    }

    renderFilterForm() {
        return <form className="border rounded  p-2">
            <div className="row">
                <div className="col">
                    <label htmlFor="city">{strings.city + ":"}</label>
                    <select className="form-control mr-2" id="city" ref="city"
                            onChange={this.handleOnChange('city_id')} >
                        <option value="">{strings.all}</option>
                        {this.renderCities()}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="watchmaker">{strings.watchmaker + ":"}</label>
                    <select className="form-control mr-2" id="watchmaker" ref="watchmaker"
                            onChange={this.handleOnChange('watchmaker_id')}>
                        <option value="">{strings.all}</option>
                        {this.renderWatchmakers()}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="fromDate">{strings.from + ":"}</label>
                    <input type="date" className="form-control mr-2" id="from-date" ref="fromDate"
                           onChange={this.handleOnChange('fromDate')}/>
                </div>
                <div className="col">
                    <label htmlFor="toDate">{strings.to + ":"}</label>
                    <input type="date" className="form-control mr-2" id="to-date" ref="toDate"
                           onChange={this.handleOnChange('toDate')}/>
                </div>
                <div className="col align-self-end">
                    <button type="button" className="btn btn-primary" onClick={this.handleOnSubmit}>
                        {strings.confirm}
                    </button>
                </div>
            </div>
        </form>
    }

    render() {
        const {opened} = this.state;

        return <div className="container">
            <div className="row">
                <div className="col-1">
                    <button className="btn btn-secondary" type="button" onClick={this.handleOnClick}>
                        {strings.filter}
                    </button>
                </div>
                <div className="col-11">
                    {opened && this.renderFilterForm()}
                </div>
            </div>
        </div>
    }
}
