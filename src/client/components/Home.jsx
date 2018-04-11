import React from 'react';
import Order from './Order.jsx';
import Navigation from './Navigation.jsx';

export default class Home extends React.Component {
    componentWillMount() {
        document.body.classList.add("customer-form");
    }

    componentWillUnmount() {
        document.body.classList.remove("customer-form");
    }

    render() {
        return <div>
            <div className="custom-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h6>
                                <p className="h5 text-center"><em>Clockwise Clockware</em></p>
                                <p>Мы занимается ремонтом напольных часов с выездом на дом к клиентам.</p>
                                Оставьте заявку на ремонт и ожидайте мастера на выбранное время.
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
            <Order/>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center">
                                Свяжитесь с нами: <i className="fa fa-envelope-o"/> cklockware@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    }
}
