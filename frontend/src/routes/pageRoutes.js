import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from "../main/dashboard";
import Navbar from "../main/components/navBar";
import Register from "../components/registration";
import Login from "../components/login";

function PageRoutes() {
    return (
        <div>
            <Router>
                <Navbar/>
                <section className="content">
                    <Switch>
                        <Route path="/" component={Dashboard} exact/>
                        <Route path="/registration" component={Register} exact/>
                        <Route path="/login" component={Login} exact/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default PageRoutes;

