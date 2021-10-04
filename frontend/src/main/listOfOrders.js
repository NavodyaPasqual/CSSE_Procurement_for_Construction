import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class ListOfOrders extends Component {
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

    render() {
        return (
            <div>
                <div className="card bg-body border-info rounded">
                    <div className="card-header">
                        <h5>Orders</h5>
                    </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Approval Status</th>
                                            <th>Delivery Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.orders.length > 0 && this.state.orders.map((item,index) => (
                                            <tr key={index} className="align-top">
                                                <td>{item.orderID}</td>
                                                {item.status === "Approved" &&
                                                <td><span className="badge bg-success">{item.status}</span></td>
                                                }
                                                {item.status === "Not approved" &&
                                                <td><span className="badge bg-danger">{item.status}</span></td>
                                                }
                                                {item.status === "Not decided" &&
                                                <td><span className="badge bg-warning">{item.status}</span></td>
                                                }
                                                {item.deliveryStatus === "Delivered" &&
                                                <td><span className="badge bg-success">{item.deliveryStatus}</span></td>
                                                }
                                                {item.deliveryStatus === "Not delivered" &&
                                                <td><span className="badge bg-danger">{item.deliveryStatus}</span></td>
                                                }
                                                {item.deliveryStatus === "Pending" &&
                                                <td><span className="badge bg-warning">{item.deliveryStatus}</span></td>
                                                }
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                </div>
        )
    }
}

export default ListOfOrders;


