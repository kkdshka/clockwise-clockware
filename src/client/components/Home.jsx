import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component{

    renderReservationForm() {

    }

    render(){
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="navbar navbar-light">
                        <Link className={'nav-link'} to={'/admin/clients'}>Clients</Link>
                        <Link className={'nav-link'} to={'/admin/watchmakers'}>Watchmakers</Link>
                        <Link className={'nav-link'} to={'/admin/cities'}>Cities</Link>
                        <Link className={'nav-link'} to={'/admin/reservations'}>Reservations</Link>
                    </div>
                    <h2 className={'row'}>Home</h2>
                </div>
            </div>
        );
    }
}
