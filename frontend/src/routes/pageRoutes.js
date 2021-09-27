import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from "../main/dashboard";
import Navbar from "../main/components/navBar";
import Register from "../components/registration";
import Login from "../components/login";
import AddSite from "../sites/addSite";
import ListOfSites from "../sites/listOfSites";
import AddItems from "../items/addItems";
import ListOfItems from "../items/listOfItems";
import AddOrder from "../order/addOrder";

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
                        <Route path="/add-item" component={AddItems}/>
                        <Route path="/items" component={ListOfItems}/>
                        <Route path="/add-order" component={AddOrder}/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default PageRoutes;

