import React from 'react';
import ReactDOM from 'react-dom';
import Watchmakers from './components/Watchmakers.jsx';
import Home from './components/Home.jsx';
import AdminHome from './components/AdminHome.jsx';
import Clients from './components/Clients.jsx';
import Cities from './components/Cities.jsx';
import Reservations from './components/Reservations.jsx';
import NotFound from './components/notfound.jsx';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/admin" component={AdminHome}/>
            <Route path="/admin/watchmakers" component={Watchmakers}/>
            <Route path="/admin/clients" component={Clients}/>
            <Route path="/admin/cities" component={Cities}/>
            <Route path="/admin/reservations" component={Reservations}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>,
    document.getElementById("root")
);
