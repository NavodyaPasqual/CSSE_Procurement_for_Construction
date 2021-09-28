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
        if(r == true) {
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
                    <h1>Order List</h1><br/>
                    <div className="p-3">
                        {this.state.orders.length > 0 && this.state.orders.map((item,index) => (
                            <div key={index}>
                                <div className="card shadow p-3 mb-5 bg-body rounded">
                                    {item.status == "Not decided" &&
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-outline-danger" onClick={e => this.deleteOrder(e,item._id)}><i className="fas fa-trash">&nbsp;&nbsp;DELETE</i></button>
                                    </div>
                                    }
                                    <div className="row">
                                        <dt className="col-sm-2">orderID</dt>
                                        <dd className="col-sm-10">{item.orderID}</dd>
                                    </div>
                                    <div className="row">
                                        <dt className="col-sm-2">Quantity</dt>
                                        <dd className="col-sm-10">{item.quantity}</dd>
                                    </div>
                                    {item.status == "Not approved" &&
                                    <div className="row">
                                        <dt className="col-sm-2">Status </dt>
                                        <dd className="col-sm-10"><h6><span className="badge bg-danger">{item.status}</span></h6></dd>
                                    </div>
                                    }
                                    {item.status == "Not decided" &&
                                    <div className="row">
                                        <dt className="col-sm-2">Status</dt>
                                        <dd className="col-sm-10"><h6><span
                                            className="badge bg-danger">{item.status}</span></h6></dd>
                                    </div>
                                    }
                                    {item.status == "Approved" &&
                                    <div className="row">
                                        <dt className="col-sm-2">Status </dt>
                                        <dd className="col-sm-10"><h6><span className="badge bg-success">{item.status}</span></h6></dd>
                                    </div>
                                    }
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