import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component{
    render(){
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <Link className="btn-link" to={'/admin/clients'}>Clients</Link>
                        <Link className="btn-link" to={'/admin/watchmakers'}>Watchmakers</Link>
                        <Link className="btn-link" to={'/admin/cities'}>Cities</Link>
                        <Link className="btn-link" to={'/admin/reservations'}>Reservations</Link>
                    </div>
                    <h2 className={'row'}>Home</h2>
                </div>
            </div>
        );
    }
}
