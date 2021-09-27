import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import img from './images/login.png'

const Login = () => {
    return (
        <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
            <div className="p-3 row">
                <div className="col-md-6">
                    <img src={img} height="320px" alt="" className="mt-5"/>
                </div>
                <div className="col-md-6">
                    <h1>Sign In</h1>
                    <div className="p-3">
                        <Form className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label" htmlFor="username">username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"

                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label" htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                />
                            </div>
                            <div className="d-grid mt-5 gap-2">
                                <button className="btn btn-primary btn-block">
                                    <span>Login</span>
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;