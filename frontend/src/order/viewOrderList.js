import React, {Component} from 'react';
import axios from 'axios';

class ViewOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    //to call the end point and get the values using axios
    componentDidMount() {
        axios.get('http://localhost:8081/order/')
            .then(response => {
                this.setState({orders: response.data.data})

            } )
    }

    //to call the end point and delete a value using axios
    deleteOrder(e, id){
        const r = window.confirm("Do you really want to delete payment submission");
        if(r === true) {
            axios.delete(`http://localhost:8081/order/delete/${id}`)
                .then(response => {
                    alert('Data successfully deleted')
                    this.componentDidMount()
                })
        }
    }

    render() {
        return (
            <div className="background-workshop">
                <div className="container p-3">
                    <center><h1>Order List</h1></center>
                    <div className="p-3">
                        {this.state.orders.length > 0 && this.state.orders.map((item,index) => (
                            <div key={index}>
                                <div className="card shadow p-3 mb-5 bg-body rounded">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-outline-danger" onClick={e => this.deleteOrder(e,item._id)}><i className="fas fa-trash">&nbsp;&nbsp;DELETE</i></button>
                                    </div>
                                    <div className="row">
                                        <dt className="col-sm-2">orderID</dt>
                                        <dd className="col-sm-10">{item.orderID}</dd>
                                    </div>
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
                                    {item.status === "Not approved" &&
                                    <div className="row">
                                        <dt className="col-sm-2">Approval Status</dt>
                                        <dd className="col-sm-10"><h6><span className="badge bg-danger">{item.status}</span></h6></dd>
                                    </div>
                                    }
                                    {item.status === "Not decided" &&
                                    <div className="row">
                                        <dt className="col-sm-2">Approval Status</dt>
                                        <dd className="col-sm-10"><h6><span
                                            className="badge bg-warning">{item.status}</span></h6></dd>
                                    </div>
                                    }
                                    {item.status === "Approved" &&
                                    <div className="row">
                                        <dt className="col-sm-2">Approval Status</dt>
                                        <dd className="col-sm-10"><h6><span className="badge bg-success">{item.status}</span></h6></dd>
                                    </div>
                                    }
                                    {/* Delivery status (Only will display if the approval status is approved*/}
                                    {item.status === "Approved" &&
                                    <div>
                                        {item.deliveryStatus === "Not delivered" &&
                                        <div className="row">
                                            <dt className="col-sm-2">Delivery Status</dt>
                                            <dd className="col-sm-10"><h6><span className="badge bg-danger">{item.deliveryStatus}</span></h6></dd>
                                        </div>
                                        }
                                        {item.deliveryStatus === "Pending" &&
                                        <div className="row">
                                            <dt className="col-sm-2">Delivery Status</dt>
                                            <dd className="col-sm-10"><h6><span className="badge bg-warning">{item.deliveryStatus}</span></h6></dd>
                                        </div>
                                        }
                                        {item.deliveryStatus === "Delivered" &&
                                        <div className="row">
                                            <dt className="col-sm-2">Delivery Status</dt>
                                            <dd className="col-sm-10"><h6><span className="badge bg-success">{item.deliveryStatus}</span></h6></dd>
                                        </div>
                                        }
                                    </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewOrderList;