import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import img from "./images/registrion.png";

const Register = () => {
    return (
        <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
            <div className="p-3 row">
                <div className="col-md-6">
                    <img src={img} height="320px" alt="" className="mt-5"/>
                </div>
                <div className="col-md-6">
                    <h1>Sign Up</h1>
                    <div className="p-3">
                        <Form>
                                <div>
                                    <div className="col-md-12">
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            data-testid='input-field'
                                            name="username"
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
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

                                    <div className="col-md-12">
                                        <label className="form-label" htmlFor="number">Phone Number</label>
                                        <Input
                                            type="number"
                                            className="form-control"
                                            name="number"
                                        />
                                    </div>

                                    <div className="d-grid mt-3 gap-2">
                                        <button data-testid='submit-btn' className="btn btn-primary btn-block">Sign Up</button>
                                    </div>
                                </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;