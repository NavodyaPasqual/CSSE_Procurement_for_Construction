import React, { useState, useEffect } from "react";
import {useHistory,useLocation ,Link} from "react-router-dom";

import AuthService from "../../services/auth.service";

import "./styles/navBar.css";
import img1 from './images/l1.gif'
import img2 from './images/l2.gif'

const Navbar = () =>{
    const history = useHistory();
    const location = useLocation();

    const [currentUser, setCurrentUser] = useState(undefined);
    const [showUserBoard, setShowUserBoard] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowUserBoard(user.roles.includes("ROLE_USER"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    const isActive = (history, path) => {
        if(history.location.pathname === path){
            return { color: "#000000"}
        } else {
            return { color: "#aca5a5"}
        }
    };

    return (
        <div data-testid="nav-1 row">
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <a className="navbar-brand" href="/login">
                            <img src={img1} height="40px" alt="" className="ml-5"/>
                            <img src={img2} height="40px" alt="" className="ml-0"/>
                        </a>
                    </div>

                    <button className="navbar-toggler ml-auto custom-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="nav collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ">
                            <div className="navbar-nav mr-auto">
                                {/* Teacher nav */}
                                {showUserBoard && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" style={isActive(history, '/dashboard')} to="/dashboard">Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" style={isActive(history, '/add-site')} to="/add-site">Add Site</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" style={isActive(history, '/sites')} to="/sites">Sites</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" style={isActive(history, '/add-item')} to="/add-item">Add Item</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" style={isActive(history, '/items')} to="/items">Items</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" style={isActive(history, '/add-order')} to="/add-order">Add Order</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" style={isActive(history, '/orders')} to="/orders">Orders</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" style={isActive(history, '/order/status-approval/update')} to="/order/status-approval/update">Approval Status</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" style={isActive(history, '/order/status-delivery/update')} to="/order/status-delivery/update">Delivery Status</Link>
                                        </li>
                                    </>
                                )}
                                
                            </div>
                        </ul>
                    </div>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <center>
                                    <Link to={"/profile"} style={isActive(history, '/profile')} className="nav-link mt-1 ">
                                    <b>{currentUser.username}</b>
                                    </Link>
                                </center>
                            </li>
                            <li className="nav-item">
                                <a href="/login"  style={isActive(history, '/login')} className="nav-link mt-0" onClick={logOut}>
                                    <button className="button-signUp button2-signup">
                                        LogOut
                                    </button>
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"}  style={isActive(history, '/login')} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/registration"} style={isActive(history, '/registration')} className="nav-link">
                                    Sign Up
                                </Link> 
                            </li>
                        </div>
                    )}
                
            </div>
            </nav>
        </div>
    )
}

export default Navbar;
