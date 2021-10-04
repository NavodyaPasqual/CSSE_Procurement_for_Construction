import React, {Component} from 'react';
import item from './images/item.png';
import site from './images/sites.png';
import suppliers from './images/suppliers.png';
import order from './images/order.png';
import approval from  './images/approval.png';
import delivery_status from './images/delivery_status.png';
import './styles/adminHome.css'
import ListOfOrders from "./listOfOrders";
import ListOfSites from "./listOfSites";
import ListOfSuppliers from "./listOfSuppliers";
import axios from "axios";
import ApprovalChart from "./approvalChart";
import DeliveryChart from "./deliveryChart";
import Footer from "./components/footer";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordersDeliveryStatus: 0,
            ordersNotDeliveryStatus: 0,
            ordersPendingStatus: 0,
            orderApprovedStatus: 0,
            orderNotApprovedStatus: 0,
            orderNotDecidedStatus: 0,
            orderCount:0,
            siteCount: 0,
            itemCount: 0,
            supplierCount: 0,
            isExpandClick: false
        }
    }

    //to call the end point and get the values using axios
    componentDidMount() {
        axios.get('http://localhost:8081/order/status-delivered/count')
            .then(response => {
                this.setState({ordersDeliveryStatus: response.data})
            } )
        axios.get('http://localhost:8081/order/status-not-delivered/count')
            .then(response => {
                this.setState({ordersNotDeliveryStatus: response.data})
            } )
        axios.get('http://localhost:8081/order/status-pending/count')
            .then(response => {
                this.setState({ordersPendingStatus: response.data})
            } )
        axios.get('http://localhost:8081/order/status-approved/count')
            .then(response => {
                this.setState({orderApprovedStatus: response.data})
            } )
        axios.get('http://localhost:8081/order/status-not-approved/count')
            .then(response => {
                this.setState({orderNotApprovedStatus: response.data})
            } )
        axios.get('http://localhost:8081/order/orders/count')
            .then(response => {
                this.setState({orderCount: response.data})
            } )
        axios.get('http://localhost:8081/order/status-not-decided/count')
            .then(response => {
                this.setState({orderNotDecidedStatus: response.data})
            } )
        axios.get('http://localhost:8081/site/sites/count')
            .then(response => {
                this.setState({siteCount: response.data})
            } )
        axios.get('http://localhost:8081/item/items/count')
            .then(response => {
                this.setState({itemCount: response.data})
            } )
        axios.get('http://localhost:8081/supplier/suppliers/count')
            .then(response => {
                this.setState({supplierCount: response.data})
            } )
    }

    render() {
        return (
            <div>
                <div className="admin-container"><br/>
                    <center><h1>DASHBOARD</h1></center>
                    <div className="admin-container-top">
                        <div className="row row-cols-1 p-3 row-cols-md-3 g-2"><br/>
                            <div className="col">
                                <a href="/sites">
                                    <div className="card mr-1 border-dark m-3 p-3 rounded">
                                        <div className="row row-cols-1 row-cols-md-2">
                                            <div className="col">
                                                <h6>Sites</h6>
                                                <p>Total Sites &nbsp;&nbsp;- {this.state.siteCount}</p>
                                            </div>
                                            <div className="col">
                                                <img src={site} height="100px"/>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col">
                                <a href="/items">
                                    <div className="card border-dark shadow p-3 m-3 rounded">
                                        <div className="row row-cols-1 row-cols-md-2">
                                            <div className="col">
                                                <h6>Items</h6>
                                                <p>Total Items &nbsp;&nbsp;- {this.state.itemCount}</p>
                                            </div>
                                            <div className="col">
                                                <img src={item} height="100px"/>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col">
                                <a href="/suppliers">
                                    <div className="card border-dark shadow p-3 m-3 rounded">
                                        <div className="row row-cols-1 row-cols-md-2">
                                            <div className="col">
                                                <h6>Suppliers</h6>
                                                <p>Total Suppliers &nbsp;&nbsp;- {this.state.supplierCount}</p>
                                            </div>
                                            <div className="col">
                                                <img src={suppliers} height="100px"/>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col">
                                <a href="/orders">
                                    <div className="card border-dark shadow p-3 m-3 rounded">
                                        <div className="row row-cols-1 row-cols-md-2">
                                            <div className="col">
                                                <h6>Orders</h6>
                                                <p>Total Orders &nbsp;&nbsp;- {this.state.orderCount}</p>
                                            </div>
                                            <div className="col">
                                                <img src={order} height="100px"/>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col">
                                <a href="/order/status-approval/update">
                                    <div className="card border-dark shadow p-3 m-3 rounded">
                                        <div className="row row-cols-1 row-cols-md-2">
                                            <div className="col">
                                                <h6>Order Approval Status</h6>
                                                <p>Approved Orders &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- {this.state.orderApprovedStatus}</p>
                                                <p>Not Decided Orders &nbsp;&nbsp;- {this.state.orderNotDecidedStatus}</p>
                                            </div>
                                            <div className="col">
                                                <img src={approval} height="100px"/>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col">
                                <a href="/order/status-delivery/update">
                                    <div className="card border-dark shadow p-3 m-3 rounded">
                                        <div className="row row-cols-1 row-cols-md-2">
                                            <div className="col">
                                                <h6>Order Delivery Status</h6>
                                                <p>Delivered Orders &nbsp;- {this.state.ordersDeliveryStatus}</p>
                                                <p>Pending Orders &nbsp;&nbsp;&nbsp;&nbsp;- {this.state.ordersPendingStatus}</p>
                                            </div>
                                            <div className="col">
                                                <img src={delivery_status} height="100px"/>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-1 row row-cols-1 p-3 row-cols-md-2 g-4">
                        <div className="col">
                            <div className="card">
                                <ApprovalChart/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <DeliveryChart/>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-1 row row-cols-1 p-1 row-cols-md-3 g-4">
                        <div className="col">
                            <ListOfOrders/>
                        </div>
                        <div className="col">
                            <ListOfSites/>
                        </div>
                        <div className="col">
                            <ListOfSuppliers/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Dashboard;
