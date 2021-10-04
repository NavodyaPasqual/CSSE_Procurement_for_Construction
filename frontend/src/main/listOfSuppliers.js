import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class ListOfSuppliers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            isExpandClick: false
        }
    }

    //to call the end point and get the values using axios
    componentDidMount() {
        axios.get('http://localhost:8081/supplier/')
            .then(response => {
                this.setState({suppliers: response.data})
            } )
    }

    render() {
        return (
            <div>
                <div className="card bg-body border-info rounded">
                    <div className="card-header">
                        <h5>Suppliers</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Supplier ID</th>
                                    <th>Supplier Name</th>
                                    <th>Address</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.suppliers.length > 0 && this.state.suppliers.map((item,index) => (
                                    <tr key={index} className="align-top">
                                        <td>{item.supplierID}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
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

export default ListOfSuppliers;


