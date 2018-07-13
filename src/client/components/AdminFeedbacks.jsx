import React from 'react';
import Navigation from './AdminNavigation.jsx';
import restApiClient from '../restApiClient/index';
import strings from '../localization.js';

export default class AdminFeedbacks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbacks: [],
        };
    }

    componentDidMount() {
        strings.setLanguage(this.props.language);

        restApiClient.getFeedbacks()
            .then(res => {
                res.status === 200 ? this.setState({feedbacks: res.data}) : null;
            });
    }

    renderFeedbacks() {
        const {feedbacks} = this.state;

        return feedbacks.map(feedback => {
            return <tr key={'feedback' + feedback.id}>
                <td>{feedback.watchmaker.name}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.feedback}</td>
                <td>{feedback.client.email}</td>
            </tr>
        });
    }

    update = () => {
        this.forceUpdate();
    };

    render() {
        const {language, cityTranslations} = this.props;

        return <div className="container">
            <div className="row">
                <div className="col-sm">
                    <Navigation active="feedbacks" update={this.update} language={language} cityTranslations={cityTranslations}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <h4 className="row justify-content-md-center">{strings.feedbacks}</h4>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>{strings.watchmakerName}</th>
                            <th>{strings.rating}</th>
                            <th>{strings.feedback}</th>
                            <th>{strings.clientEmail}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderFeedbacks()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}
