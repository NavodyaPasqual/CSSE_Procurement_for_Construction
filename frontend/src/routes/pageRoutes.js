import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from "../main/dashboard";
import Navbar from "../main/components/navBar";
import Register from "../components/registration";
import Login from "../components/login";
import AddSite from "../sites/addSite";
import ListOfSites from "../sites/listOfSites";
import UpdateSites from "../sites/updateSites";
import ViewSiteByID from "../sites/viewSiteByID";
import AddItems from "../items/addItems";
import ListOfItems from "../items/listOfItems";
import UpdateItems from "../items/updateItems";
import ViewItemByID from "../items/viewItemByID";
import AddOrder from "../order/addOrder";
import ViewOrderList from "../order/viewOrderList";
import UpdateOrderStatus from "../order/updateOrderStatus";
import profile from "../main/components/Profile";

function PageRoutes() {
    return (
        <div>
            <Router>
                <Navbar/>
                <section className="content">
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/dashboard" component={Dashboard} exact/>
                        <Route path="/registration" component={Register}/>
                        <Route path="/view-site/:id" component={ViewSiteByID}/>
                        <Route path="/update-site/:id" component={UpdateSites}/>
                        <Route path="/add-site" component={AddSite}/>
                        <Route path="/sites" component={ListOfSites}/>
                        <Route path="/view-item/:id" component={ViewItemByID}/>
                        <Route path="/update-item/:id" component={UpdateItems}/>
                        <Route path="/add-item" component={AddItems}/>
                        <Route path="/items" component={ListOfItems}/>
                        <Route path="/add-order" component={AddOrder}/>
                        <Route path="/orders" component={ViewOrderList}/>
                        <Route path="/profile" component={profile}/>
                        <Route path="/order/status/update" component={UpdateOrderStatus}/>
                    </Switch>
                </section>
            </Router>
        </div>
    );
}

export default PageRoutes;

