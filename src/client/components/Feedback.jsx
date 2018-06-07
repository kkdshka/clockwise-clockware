import React from 'react';
import Localization from './Localization.jsx';
import strings from '../localization.js';
import restApiClient from "../restApiClient";

export default class Feedback extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservation: {}
        };
    }

    componentDidMount() {
        document.body.classList.add("customer-form");

        const {language} = this.props;
        strings.setLanguage(language);

        const reservationId = window.location.href.split('?')[1];
        restApiClient.getReservationById(reservationId)
            .then(reservation => this.setState({reservation}));
    }



    handleOnSubmitClick = () => {
        const {feedback, rating} = this.refs;
        const {reservation} = this.state;

        const feedbackData = {
            feedback: feedback.value,
            rating: rating.value,
            reservation_id: reservation.id
        };

        restApiClient.addFeedback(feedbackData);
    };

    componentWillUnmount() {
        document.body.classList.remove("customer-form");
    }

    update = () => {
        this.forceUpdate();
    };

    renderFeedbackForm() {
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
                                <select className="form-control" id="rating" ref="rating" defaultValue={5}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
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
                            <h4 className="text-center"><em>Clockwise Clockware</em></h4>
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
