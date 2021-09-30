import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import img from './images/login.png'

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeusername = (e) => {
    const username = e.target.value;
    setusername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
          () => {
            props.history.push("/profile");
            window.location.reload();
          },
          (error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
      );
    } else {
      setLoading(false);
    }
  };

  return (
      <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
        <div className="p-3 row">
          <div className="col-md-6">
            <img src={img} height="320px" alt="" className="mt-5"/>
          </div>
          <div className="col-md-6">
            <h1>Sign In</h1>
            <div className="p-3">
          <Form className="row g-3" onSubmit={handleLogin} ref={form}>
            <div className="col-md-12">
              <label className="form-label" htmlFor="username">username</label>
              <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeusername}
                  validations={[required]}
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
                  validations={[required]}
              />
            </div>

            <div className="d-grid mt-5 gap-2">
              <button className="btn btn-primary btn-block" disabled={loading}>
                {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
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

export default Login;