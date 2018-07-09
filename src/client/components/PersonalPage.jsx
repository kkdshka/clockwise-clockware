import React from 'react';
import Navigation from './Navigation.jsx';
import strings from '../localization.js';
import restApiClient from '../restApiClient';
import moment from 'moment';

export default class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            error: false
        };
    }

    componentWillMount() {
        strings.setLanguage(this.props.language);
        restApiClient.getPersonalPage();
    }

    componentDidMount() {
        restApiClient.getClientReservations().then(reservation => {
            this.setState({reservations: reservation});
        });
    }

    renderReservations() {
        const {reservations} = this.state;
        const {cityTranslations} = this.props;

        return reservations.map(reservation => {
            return <tr key={'reservation' + reservation.id}>
                <td>{reservation.client.name}</td>
                <td>{cityTranslations.getName(reservation.city_id)}</td>
                <td>{reservation.client.email}</td>
                <td>{strings[reservation.clock_size]}</td>
                <td>{moment(reservation.start_time).format('DD.MM.YYYY HH:mm')}</td>
                <td>{reservation.watchmaker.name}</td>
            </tr>
        });
    }

    update = () => {
        this.forceUpdate();
    };

    render() {
        const {error} = this.state;

        return <div className="container">
            <div className="row">
                <div className="col">
                    <Navigation update={this.update} language={this.props.language}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2 className="text-center mt-4">{strings.personalPage}</h2>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>{strings.name}</th>
                            <th>{strings.city}</th>
                            <th>{strings.email}</th>
                            <th>{strings.clockSize}</th>
                            <th>{strings.date}</th>
                            <th>{strings.watchmaker}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderReservations()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}