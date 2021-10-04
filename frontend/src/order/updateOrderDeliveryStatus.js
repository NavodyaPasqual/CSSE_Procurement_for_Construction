import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class UpdateOrderDeliveryStatus extends Component {
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

    delivered(e, id){
        let answer = window.confirm('Are you sure you want to update the delivery status to delivered?');
        if(answer) {
            axios.put(`http://localhost:8081/order/update/delivery-status/${id}`, {deliveryStatus: "Delivered", id: id})
                .then(response => {
                    this.componentDidMount()
                })
        }
    }

    notDelivered(e, id){
        let answer = window.confirm('Are you sure you want to update the delivery status to not delivered?');
        if(answer) {
            axios.put(`http://localhost:8081/order/update/delivery-status/${id}`, {
                deliveryStatus: "Not delivered",
                id: id
            })
                .then(response => {
                    this.componentDidMount()
                })
        }
    }

    pending(e, id){
        let answer = window.confirm('Are you sure you want to update the delivery status to pending?');
        if(answer) {
            axios.put(`http://localhost:8081/order/update/delivery-status/${id}`, {deliveryStatus: "Pending", id: id})
                .then(response => {
                    this.componentDidMount()
                })
        }
    }

    render() {
        return (
            <div className="background-workshop">
                <div className="container p-3">
                    <center><h1>Update Delivery Status of Orders</h1></center><br/>
                    <div>
                        {this.state.orders.length > 0 && this.state.orders.map((item,index) => (
                            <div key={index} >
                                {item.status === "Approved" &&
                                <div className="card border-dark shadow mb-5 bg-body rounded">
                                    <div className="card-header">
                                        <h5>Order ID: <b>{item.orderID}</b></h5>
                                    </div>
                                    <div className="card-body">
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
                                        {item.supplier && item.supplier.length > 0 ?
                                            <div className="row">
                                                <dt className="col-sm-2">Supplier</dt>
                                                <dd className="col-sm-10">
                                                    {item.supplier.map((supplier, index) => (
                                                        <div key={index} className="card p-2 mb-2">
                                                            <div className="row">
                                                                <dt className="col-sm-2">Supplier ID</dt>
                                                                <dd className="col-sm-10">{supplier.supplierID}</dd>
                                                            </div>
                                                            <div className="row">
                                                                <dt className="col-sm-2">Supplier Name</dt>
                                                                <dd className="col-sm-10">{supplier.name}</dd>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </dd>
                                            </div>
                                            : null}
                                        {/* Item 1 */}
                                        <div className="row">
                                            {item.quantity1 !== 0 &&
                                            <dt className="col-sm-2">Item 1</dt>
                                            }
                                            <div className="col-sm-10">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        {item.item1 && item.item1.length > 0 ?
                                                            <div>
                                                                {item.item1.map((item, index) => (
                                                                    <div key={index} className="card p-2 mb-2">
                                                                        <div className="row">
                                                                            <dt className="col-sm-4">Item ID</dt>
                                                                            <dd className="col-sm-8">{item.itemID}</dd>
                                                                        </div>
                                                                        <div className="row">
                                                                            <dt className="col-sm-4">Item Name</dt>
                                                                            <dd className="col-sm-8">{item.name}</dd>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            : null}
                                                    </div>
                                                    {item.quantity1 !== 0 &&
                                                    <div className="col-md-6 card p-2 mb-2">
                                                        <div className="row">
                                                            <dt className="col-sm-4">Quantity</dt>
                                                            <dd className="col-sm-8">{item.quantity1}</dd>
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* Item 2 */}
                                        <div className="row">
                                            {item.quantity2 !== 0 &&
                                            <dt className="col-sm-2">Item 2</dt>
                                            }
                                            <div className="col-sm-10">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        {item.item2 && item.item2.length > 0 ?
                                                            <div>
                                                                {item.item2.map((item, index) => (
                                                                    <div key={index} className="card p-2 mb-2">
                                                                        <div className="row">
                                                                            <dt className="col-sm-4">Item ID</dt>
                                                                            <dd className="col-sm-8">{item.itemID}</dd>
                                                                        </div>
                                                                        <div className="row">
                                                                            <dt className="col-sm-4">Item Name</dt>
                                                                            <dd className="col-sm-8">{item.name}</dd>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            : null}
                                                    </div>
                                                    {item.quantity2 !== 0 &&
                                                    <div className="col-md-6 card p-2 mb-2">
                                                        <div className="row">
                                                            <dt className="col-sm-4">Quantity</dt>
                                                            <dd className="col-sm-8">{item.quantity2}</dd>
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* Item 3 */}
                                        <div className="row">
                                            {item.quantity3 !== 0 &&
                                            <dt className="col-sm-2">Item 3</dt>
                                            }
                                            <div className="col-sm-10">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        {item.item3 && item.item3.length > 0 ?
                                                            <div>
                                                                {item.item3.map((item, index) => (
                                                                    <div key={index} className="card p-2 mb-2">
                                                                        <div className="row">
                                                                            <dt className="col-sm-4">Item ID</dt>
                                                                            <dd className="col-sm-8">{item.itemID}</dd>
                                                                        </div>
                                                                        <div className="row">
                                                                            <dt className="col-sm-4">Item Name</dt>
                                                                            <dd className="col-sm-8">{item.name}</dd>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            : null}
                                                    </div>
                                                    {item.quantity3 !== 0 &&
                                                    <div className="col-md-6 card p-2 mb-2">
                                                        <div className="row">
                                                            <dt className="col-sm-4">Quantity</dt>
                                                            <dd className="col-sm-8">{item.quantity3}</dd>
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/* End of items */}
                                        {/* Approval status */}
                                        {item.status === "Approved" &&
                                        <div className="row">
                                            <dt className="col-sm-2">Approval Status</dt>
                                            <dd className="col-sm-10"><h6><span
                                                className="badge bg-success">{item.status}</span></h6></dd>
                                        </div>
                                        }
                                        {item.deliveryStatus === "Delivered" &&
                                        <div className="row">
                                            <dt className="col-sm-2">Delivery Status</dt>
                                            <dd className="col-sm-10"><h6><span
                                                className="badge bg-success">{item.deliveryStatus}</span></h6></dd>
                                        </div>
                                        }
                                        {item.deliveryStatus === "Not delivered" &&
                                        <div className="row">
                                            <dt className="col-sm-2">Delivery Status</dt>
                                            <dd className="col-sm-10"><h6><span
                                                className="badge bg-danger">{item.deliveryStatus}</span></h6></dd>
                                        </div>
                                        }
                                        {item.deliveryStatus === "Pending" &&
                                        <div className="row">
                                            <dt className="col-sm-2">Delivery Status</dt>
                                            <dd className="col-sm-10"><h6><span
                                                className="badge bg-warning">{item.deliveryStatus}</span></h6></dd>
                                        </div>
                                        }
                                        <div className="row">
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <Link to="/orders">
                                                    <button className="btn btn-outline-primary mr-5">
                                                        <i className="far fa-eye"></i> &nbsp; View order
                                                    </button>
                                                </Link>&nbsp;
                                                <button className="btn btn-outline-success mr-5"
                                                        onClick={e => this.delivered(e, item._id)}>
                                                    <i className="fa fa-check"></i> &nbsp; Delivered
                                                </button>
                                                &nbsp;
                                                <button className="btn btn-outline-warning ml-4"
                                                        onClick={e => this.pending(e, item._id)}>
                                                    <i className="fas fa-hourglass-half"></i> &nbsp; Pending
                                                </button>
                                                &nbsp;
                                                <button className="btn btn-outline-danger ml-4"
                                                        onClick={e => this.notDelivered(e, item._id)}>
                                                    <i className="fas fa-times"></i> &nbsp; Not delivered
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        )
    }
}

export default UpdateOrderDeliveryStatus;


