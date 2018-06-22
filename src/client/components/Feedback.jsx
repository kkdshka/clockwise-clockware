import React from 'react';
import Rating from 'react-rating';
import Localization from './Localization.jsx';
import strings from '../localization.js';
import restApiClient from "../restApiClient";

export default class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservation: {},
            rating: 5
        };
    }

    componentDidMount() {
        document.body.classList.add("customer-form");

        const {language} = this.props;
        strings.setLanguage(language);

        const reservationId = Buffer.from(String(window.location.href.split('?token=')[1] || ''), 'base64').toString('ascii');
        restApiClient.getReservationById(reservationId)
            .then(reservation => this.setState({reservation}));
    }


    handleOnSubmitClick = () => {
        const {feedback} = this.refs;
        const {reservation, rating} = this.state;
        console.log(reservation);

        const feedbackData = {
            feedback: feedback.value,
            rating: rating,
            client_id: reservation.client_id,
            watchmaker_id: reservation.watchmaker_id,
            token: window.location.href.split('?token=')[1]
        };

        restApiClient.addFeedback(feedbackData);
        window.location.href = '/';
    };

    componentWillUnmount() {
        document.body.classList.remove("customer-form");
    }

    update = () => {
        this.forceUpdate();
    };

    renderFeedbackForm() {
        const {rating} = this.state;

        return <div className="container">
            <div className="row mt-4">
                <div className="col col-sm-5 offset-sm-1">
                    <form className="custom-form">
                        <div className="form-group">
                            <h5>{strings.askFeedback}</h5>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="feedback">{strings.feedback + ":"}</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" rows="5" id="feedback" ref="feedback"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-4 col-form-label" htmlFor="rating">{strings.rating + ":"}</label>
                            <div className="col-sm-8">
                                <Rating start={0} stop={5} initialRating={rating} onChange={(rating) => {
                                    this.setState({rating: rating})
                                }}
                                        emptySymbol="fa fa-star-o fa-2x star-color"
                                        fullSymbol="fa fa-star fa-2x star-color"/>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary"
                                onClick={this.handleOnSubmitClick}>{strings.confirm}</button>
                    </form>
                </div>
            </div>
        </div>
    }

    render() {
        const {cityTranslations} = this.props;

        return <div>
            <div className="custom-header">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <a className="nav-link text-center" href='/'><h3><em>Clockwise Clockware</em></h3></a>
                        </div>
                        <div className="col-1 align-self-center">
                            <Localization update={this.update} color="outline-secondary"
                                          cityTranslations={cityTranslations}/>
                        </div>
                    </div>
                </div>
            </div>
            {this.renderFeedbackForm()}
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <div className="text-center">
                                {strings.contactUs + ": "}<i className="fa fa-envelope-o"/> cklockware@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    }
}
