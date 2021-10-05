import React, {Component} from 'react';
import './styles/button.css';
import './styles/forms.css';
import './styles/alert.css';
import axios from "axios";
import {Link} from "react-router-dom";

class ViewSiteByID extends Component {
    constructor(props) {
        super(props)


        // State
        this.state = {
            siteID: '',
            name: '',
            location: '',
            loading: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/site/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    siteID: res.data.siteID,
                    name: res.data.name,
                    location: res.data.location
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    render(){
        return (
            <div className="background-one-time row p-4 d-flex justify-content-center">
                <div className="row g-2">
                    <div className="col-md">
                        <div className="justify-content-md-end">
                            <div className="input-group justify-content-md-end">
                                <Link to={`/sites`}>
                                    <button className="button-black button2-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <i className="fas fa-angle-double-left">&nbsp;&nbsp;&nbsp;&nbsp;Back To Table</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-3 shadow-lg w-50 mt-4 p-4 rounded">
                    <div >
                        <h3><center>Site</center></h3>
                        <div className=""><br/>
                            <form onSubmit={this.onSubmit}>
                                <div className="body">
                                    <div className="row">
                                        <div className="row">
                                            <dt className="col-sm-6">Site ID</dt>
                                            <dd className="col-sm-6">
                                                        <span className="text-info">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="siteID"
                                                                name="siteID"
                                                                value={this.state.siteID}
                                                                disabled
                                                            />
                                                        </span>
                                            </dd>
                                            <dt className="col-sm-6">Site Name</dt>
                                            <dd className="col-sm-6">
                                                        <span className="text-info">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="name"
                                                                name="name"
                                                                value={this.state.name}
                                                                disabled
                                                            />
                                                        </span>
                                            </dd>
                                            <dt className="col-sm-6">Location</dt>
                                            <dd className="col-sm-6">
                                                        <span className="text-info">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="location"
                                                                name="location"
                                                                value={this.state.location}
                                                                disabled
                                                            />
                                                        </span>
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
        );
    }

};

export default ViewSiteByID;
