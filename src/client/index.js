import React from 'react';
import ReactDOM from 'react-dom';
import Watchmakers from './components/Watchmakers.jsx';
import Home from './components/Home.jsx';
import AdminHome from './components/AdminHome.jsx';
import Clients from './components/Clients.jsx';
import Cities from './components/Cities.jsx';
import Reservations from './components/Reservations.jsx';
import Login from './components/Login.jsx';
import NotFound from './components/notfound.jsx';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CityTranslations from './cityTranslatios.js';
import Feedback from "./components/Feedback.jsx";
import AdminFeedbacks from "./components/AdminFeedbacks.jsx";
import Registration from "./components/Registration.jsx";
import SignIn from "./components/SignIn.jsx";
import PersonalPage from "./components/PersonalPage.jsx"

const cityTranslations = new CityTranslations(getLanguage());

function getLanguage() {
    return localStorage.getItem('language') || 'en';
}

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Home language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route path="/feedback"
                   render={() => <Feedback language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route exact path="/admin"
                   render={() => <AdminHome language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route path="/login" render={() => <Login language={getLanguage()}/>}/>
            <Route path="/admin/watchmakers"
                   render={() => <Watchmakers language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route path="/admin/feedbacks"
                   render={() => <AdminFeedbacks language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route path="/admin/clients"
                   render={() => <Clients language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route path="/admin/cities"
                   render={() => <Cities language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route path="/admin/reservations"
                   render={() => <Reservations language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route path="/sign-in"
                   render={() => <SignIn language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route path="/register"
                   render={() => <Registration language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route path="/personal-page"
                   render={() => <PersonalPage language={getLanguage()} cityTranslations={cityTranslations}/>}/>
            <Route render={() => <NotFound language={getLanguage()} cityTranslations={cityTranslations}/>}/>
        </Switch>
    </Router>,
    document.getElementById("root")
);
