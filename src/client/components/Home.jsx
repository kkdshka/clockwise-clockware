import React from 'react';
import Order from './Order.jsx';
import Navigation from './Navigation.jsx';

export default class Home extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm">
                    <div className="row">
                        <div className="col-sm-6">
                            <h6>
                                <p>Компания Clockwise Clockware занимается ремонтом напольных часов с выездом на дом к
                                    клиентам.</p>
                                <p>Оставьте заявку на ремонт и ожидайте мастера на выбранное время.</p>
                            </h6>
                        </div>
                    </div>
                    <Order/>
                </div>
            </div>
        );
    }
}
