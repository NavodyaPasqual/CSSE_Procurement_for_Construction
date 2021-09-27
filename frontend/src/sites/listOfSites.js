import React, {useState, useEffect} from "react";
import './styles/lisOfSites.css';
import {Link} from "react-router-dom";

const ListOfSites = () => {

    return (
        <div className="background-st-ac p-3">
            <div className="card shadow p-3 mb-4 bg-body rounded">
                <div className="row g-2">
                    <div className="col-md">
                        <h1><center>List Of Sites</center></h1><br/>
                    </div>
                </div>
                <div className="search-wrapper">
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="row">
                                <div className="justify-content-md-end">
                                    <div className="input-group justify-content-md-end">
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="Search..."
                                        />
                                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="justify-content-md-end">
                                <div className="input-group justify-content-md-end">
                                <Link to={`/add-site`}>
                                    <button className="button-black button2-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fas fa-plus-circle">&nbsp;&nbsp;&nbsp;&nbsp;Add new site</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div><br/>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Site ID</th>
                                <th>Site Name</th>
                                <th>Location</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr className="align-top">
                                    <td>S3456</td>
                                    <td>Colombo</td>
                                    <td>Colombo</td>
                                    <td>
                                        <button className="btn btn-outline-warning me-md-2"><i className="fas fa-edit"></i></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-danger"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListOfSites;
