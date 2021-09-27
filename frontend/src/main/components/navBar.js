import React, { useState, useEffect } from "react";
import {useHistory,useLocation ,Link} from "react-router-dom";

import "./styles/navBar.css";

const Navbar = () =>{
    const history = useHistory();
    const location = useLocation();

    const isActive = (history, path) => {
        if(history.location.pathname === path){
            return { color: "#aca5a5"}
        } else {
            return { color: "#000000"}
        }
    };

    return (
        <div data-testid="nav-1 row">
            <nav className="navbar shadow-sm navbar-expand-lg navbar-custom">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <a className="navbar-brand" href="/">
                            &nbsp;<span>Platinum Fort</span>
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
                                <li className="nav-item">
                                    <Link className="nav-link" style={isActive(history, '/')} to="/">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" style={isActive(history, '/registration')} to="/registration">dd</Link>
                                </li>
                            </div>
                        </ul>
                    </div>

                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"}  style={isActive(history, '/login')} className="nav-link">
                                <b>Login</b>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/registration"} style={isActive(history, '/registration')} className="nav-link">
                                <button class="button-submit button2-submit">Sign Up</button>
                            </Link>
                        </li>
                    </div>
                
            </div>
            </nav>
        </div>
    )
}

export default Navbar;
