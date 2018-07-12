import React from 'react';
import strings from '../localization.js';
import restApiClient from '../restApiClient';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Reservations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            cities: [],
            watchmakers: [],
            filter: {
                citiesId: [],
                watchmakersId: [],
                fromDate: "",
                toDate: ""
            },
            selectedCities: [],
            selectedWatchmakers: []
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

    handleCityChange = (selectedCities) => {
        this.setState({selectedCities});
    };

    handleWatchmakerChange = (selectedWatchmakers) => {
        this.setState({selectedWatchmakers})
    };

    handleOnChange = fieldName => event => {
        const {filter} = this.state;

        this.setState({filter: {...filter, [fieldName]: event.currentTarget.value}});
    };

    handleOnSubmit = () => {
        const {onSubmit} = this.props;
        const {filter, selectedCities, selectedWatchmakers} = this.state;

        filter.citiesId = selectedCities.map(city => {
            return {city_id: city.value};
        });

        filter.watchmakersId = selectedWatchmakers.map(watchmaker => {
            return {watchmaker_id: watchmaker.value};
        });
        onSubmit(filter);
    };

    citiesOptions() {
        const {cities} = this.state;
        const {cityTranslations} = this.props;

        return cities.map(city => {
            return {value: city.id, label: cityTranslations.getName(city.id)};
        });
    }

    watchmakersOptions() {
        const {watchmakers} = this.state;

        return watchmakers.map(watchmaker => {
            return {value: watchmaker.id, label: watchmaker.name};
        });
    }

    renderFilterForm() {
        const {filter, selectedCities, selectedWatchmakers} = this.state;

        return <form className="border rounded  p-2">
            <div className="row">
                <div className="col">
                    <label htmlFor="city">{strings.city + ":"}</label>
                    <Select
                        name="city"
                        value={selectedCities}
                        onChange={this.handleCityChange}
                        options={this.citiesOptions()}
                        multi
                        closeOnSelect={false}
                    />
                </div>
                <div className="col">
                    <label htmlFor="watchmaker">{strings.watchmaker + ":"}</label>
                    <Select
                        name="watchmakers"
                        value={selectedWatchmakers}
                        onChange={this.handleWatchmakerChange}
                        options={this.watchmakersOptions()}
                        multi
                        closeOnSelect={false}
                    />
                </div>
                <div className="col">
                    <label htmlFor="fromDate">{strings.from + ":"}</label>
                    <input type="date" className="form-control mr-2" id="from-date" ref="fromDate"
                           onChange={this.handleOnChange('fromDate')} value={filter.fromDate}/>
                </div>
                <div className="col">
                    <label htmlFor="toDate">{strings.to + ":"}</label>
                    <input type="date" className="form-control mr-2" id="to-date" ref="toDate"
                           onChange={this.handleOnChange('toDate')} value={filter.toDate}/>
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
