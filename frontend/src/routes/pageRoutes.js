import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from "../main/dashboard";
import Navbar from "../main/components/navBar";
import Register from "../components/registration";
import Login from "../components/login";
import AddSite from "../sites/addSite";
import ListOfSites from "../sites/listOfSites";

function PageRoutes() {
    return (
        <div>
            <Router>
                <Navbar/>
                <section className="content">
                    <Switch>
                        <Route path="/" component={Dashboard} exact/>
                        <Route path="/registration" component={Register}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/add-site" component={AddSite}/>
                        <Route path="/sites" component={ListOfSites}/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default PageRoutes;

