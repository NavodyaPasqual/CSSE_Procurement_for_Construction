import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class UpdateOrderStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            isExpandClick: false
        }
    }

    //to call the end point and get the values using axios
    componentDidMount() {
        axios.get('http://localhost:8081/order/')
            .then(response => {
                this.setState({orders: response.data.data})
            } )
    }

    approve(e, id){
        axios.put(`http://localhost:8081/order/update/status/${id}`, {status: "Approved", id:id})
            .then(response => {
                this.componentDidMount()
            })
    }

    decline(e, id){
        axios.put(`http://localhost:8081/order/update/status/${id}`, {status: "Not approved", id:id})
            .then(response => {
                this.componentDidMount()
            })
    }

    render() {
        return (
            <div className="background-workshop">
                <div className="container p-3">
                    <h1>Review orders</h1><br/>
                    <div>
                        {this.state.orders.length > 0 && this.state.orders.map((item,index) => (
                            <div key={index} >
                                <div className="card shadow mb-5 bg-body rounded">
                                    <div className="card-header">
                                        <h5>Order ID: {item.orderID}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="row">
                                                    <dt className="col-sm-2">Quantity</dt>
                                                    <dd className="col-sm-10">{item.quantity}</dd>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-8">
                                                {item.site && item.site.length > 0 ?
                                                    <div className="row">
                                                        <dt className="col-sm-2">Site</dt>
                                                        <dd className="col-sm-10">
                                                            {item.site.map((site, index) => (
                                                                <div key={index} className="card p-2 mb-2">
                                                                    <div className="row">
                                                                        <dt className="col-sm-2">Site ID</dt>
                                                                        <dd className="col-sm-10">{site.siteID}</dd>
                                                                    </div>
                                                                    <div className="row">
                                                                        <dt className="col-sm-2">Site Name</dt>
                                                                        <dd className="col-sm-10">{site.name}</dd>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </dd>
                                                    </div>
                                                    : null}
                                                {item.item && item.item.length > 0 ?
                                                    <div className="row">
                                                        <dt className="col-sm-2">Item</dt>
                                                        <dd className="col-sm-10">
                                                            {item.item.map((item, index) => (
                                                                <div key={index} className="card p-2 mb-2">
                                                                    <div className="row">
                                                                        <dt className="col-sm-2">Item Name</dt>
                                                                        <dd className="col-sm-10">{item.name}</dd>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </dd>
                                                    </div>
                                                    : null}
                                                <div className="row">
                                                    <dt className="col-sm-2">Status</dt>
                                                    <dd className="col-sm-10">
                                                        {item.status == "Not approved" &&
                                                        <span className="badge bg-danger">{item.status}</span>
                                                        }
                                                        {item.status == "Approved" &&
                                                        <span className="badge bg-success">{item.status}</span>
                                                        }
                                                        {item.status == "Not decided" &&
                                                        <span className="badge bg-secondary">{item.status}</span>
                                                        }
                                                    </dd>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <Link to="/orders"><button className="btn btn-outline-primary mr-5">
                                                    <i className="far fa-eye"></i> &nbsp; View order
                                                </button></Link>&nbsp;
                                                <button className="btn btn-outline-success mr-5" onClick={e => this.approve(e,item._id)}>
                                                    <i className="fa fa-check"></i> &nbsp; Approve
                                                </button>&nbsp;
                                                <button className="btn btn-outline-danger ml-4" onClick={e => this.decline(e,item._id)}>
                                                    <i className="fas fa-times"></i> &nbsp; Decline
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        )
    }
}

export default UpdateOrderStatus;


