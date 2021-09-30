import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import img from "./images/registrion.png";

const required = (value) => {
  if (!value) {
    return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
    );
  }
};

const vnumber = (value) => {
  if (value.length < 7 || value.length > 9) {
    return (
        <div className="alert alert-danger" role="alert">
          The number must be 8 digits. Discard 0 from initial...
        </div>
    );
  }
};


const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeNumber = (e) => {
    const number = e.target.value;
    setNumber(number);
  };

 

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const roles = "user"
      AuthService.register(username, email, password, number, roles).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
      );
    }
  };

  return (
      <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
        <div className="p-3 row">
          <div className="col-md-6">
            <img src={img} height="320px" alt="" className="mt-5"/>
          </div>
          <div className="col-md-6">
            <h1>Sign Up</h1>
            <div className="p-3">
          <Form onSubmit={handleRegister} ref={form} data-testid='from-tag'>
            {!successful && (
                <div>
                  <div className="col-md-12">
                    <label className="form-label" htmlFor="username">Username</label>
                    <Input
                        type="text"
                        className="form-control"
                        data-testid='input-field'
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label" htmlFor="email">Email</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                    />

                  </div>

                  <div className="col-md-12">
                    <label className="form-label" htmlFor="password">Password</label>
                    <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required, vpassword]}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label" htmlFor="number">Phone Number</label>
                    <Input
                        type="number"
                        className="form-control"
                        name="number"
                        value={number}
                        onChange={onChangeNumber}
                        validations={[required, vnumber]}
                    />
                  </div>

                  <div className="d-grid mt-3 gap-2">
                    <button data-testid='submit-btn' className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
            )}

            {message && (
                <div className="form-group">
                  <div
                      className={
                        successful ? "alert alert-success" : "alert alert-danger"
                      }
                      role="alert"
                  >
                    {message}
                  </div>
                </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Register;