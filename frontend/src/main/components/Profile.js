import React from "react";
import AuthService from "../../services/auth.service";
import img from './images/profile.png'

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <div className="container mt-4 shadow p-3 mb-5 bg-body rounded">
                    <div className="p-3 row">
                        <div className="col-md-6">
                            <img src={img} height="400px" alt="" className="mt-0 ml-5"/>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="container">
                                <div className="col-sm-12 col-md-9">
                                    <p className="aboutus_titles"><br/><br/>
                                      <h1> Profile </h1>
                                    </p>
                                    <p className="con">
                                      <p>
                                        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                                      </p>
                                      <p>
                                        <strong>Id:</strong> {currentUser.id}
                                      </p>
                                      <p>
                                        <strong>Email:</strong> {currentUser.email}
                                      </p>
                                      <p>
                                        <strong>Phone Number:</strong> +94 {currentUser.number}
                                      </p>
                                      <strong>Authorities:</strong>
                                      <ul>
                                        {currentUser.roles &&
                                          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                                      </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
    </div>
    
  );
};

export default Profile;
