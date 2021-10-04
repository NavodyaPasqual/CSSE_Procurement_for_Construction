import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class ListOfSites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sites: [],
            isExpandClick: false
        }
    }

    //to call the end point and get the values using axios
    componentDidMount() {
        axios.get('http://localhost:8081/site/')
            .then(response => {
                this.setState({sites: response.data})
            } )
    }

    render() {
        return (
            <div>
                <div className="card bg-body border-info rounded">
                    <div className="card-header">
                        <h5>Sites</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Site ID</th>
                                    <th>Site Name</th>
                                    <th>Location</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.sites.length > 0 && this.state.sites.map((item,index) => (
                                    <tr key={index} className="align-top">
                                        <td>{item.siteID}</td>
                                        <td>{item.name}</td>
                                        <td>{item.location}</td>
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

export default ListOfSites;


