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

function getLanguage() {
    return localStorage.getItem('language') || 'en';
}

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Home language={getLanguage()}/>}/>
            <Route exact path="/admin" render={() => <AdminHome language={getLanguage()}/>}/>
            <Route path="/login" render={() => <Login language={getLanguage()}/>}/>
            <Route path="/admin/watchmakers" render={() => <Watchmakers language={getLanguage()}/>}/>
            <Route path="/admin/clients" render={() => <Clients language={getLanguage()}/>}/>
            <Route path="/admin/cities" render={() => <Cities language={getLanguage()}/>}/>
            <Route path="/admin/reservations" render={() => <Reservations language={getLanguage()}/>}/>
            <Route render={() => <NotFound language={getLanguage()}/>}/>
        </Switch>
    </Router>,
    document.getElementById("root")
);
