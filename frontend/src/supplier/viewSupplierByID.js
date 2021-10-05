import React, {Component} from 'react';
import './styles/button.css';
import './styles/forms.css';
import './styles/alert.css';
import axios from "axios";
import {Link} from "react-router-dom";

class ViewSupplierByID extends Component {
    constructor(props) {
        super(props)


        // State
        this.state = {
            supplierID: '',
            name: '',
            address: '',
            contactNo: '',
            loading: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/supplier/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    supplierID: res.data.supplierID,
                    name: res.data.name,
                    address: res.data.address,
                    contactNo: res.data.contactNo
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
                                <Link to={`/suppliers`}>
                                    <button className="button-black button2-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <i className="fas fa-angle-double-left">&nbsp;&nbsp;&nbsp;&nbsp;Back To Table</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-3 shadow-lg w-50 mt-4 p-4 rounded">
                    <div >
                        <h3><center>Supplier</center></h3>
                        <div className=""><br/>
                            <form onSubmit={this.onSubmit}>
                                <div className="body">
                                    <div className="row">
                                        <div className="row">
                                            <dt className="col-sm-6">Supplier ID</dt>
                                            <dd className="col-sm-6">
                                                        <span className="text-info">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="siteID"
                                                                name="siteID"
                                                                value={this.state.supplierID}
                                                                disabled
                                                            />
                                                        </span>
                                            </dd>
                                            <dt className="col-sm-6">Supplier Name</dt>
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
                                            <dt className="col-sm-6">Address</dt>
                                            <dd className="col-sm-6">
                                                        <span className="text-info">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="address"
                                                                name="address"
                                                                value={this.state.address}
                                                                disabled
                                                            />
                                                        </span>
                                            </dd>
                                            <dt className="col-sm-6">Contact No</dt>
                                            <dd className="col-sm-6">
                                                        <span className="text-info">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="contactNo"
                                                                name="contactNo"
                                                                value={this.state.contactNo}
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

export default ViewSupplierByID;
