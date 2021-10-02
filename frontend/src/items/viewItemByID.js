import React, {Component} from 'react';
import './styles/button.css';
import './styles/forms.css';
import './styles/alert.css';
import axios from "axios";
import {Link} from "react-router-dom";

class ViewItemByID extends Component {
    constructor(props) {
        super(props)

        // State
        this.state = {
            itemID: '',
            name: '',
            loading: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/item/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    itemID: res.data.itemID,
                    name: res.data.name,
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
                                <Link to={`/items`}>
                                    <button className="button-black button2-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <i className="fas fa-angle-double-left">&nbsp;&nbsp;&nbsp;&nbsp;Back To Table</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-3 shadow-lg w-50 mt-4 p-4 rounded">
                    <div >
                        <h3><center>Items</center></h3>
                        <div className=""><br/>
                            <form onSubmit={this.onSubmit}>
                                <div className="body">
                                    <div className="row">
                                        <div className="row">
                                            <dt className="col-sm-6">Item ID</dt>
                                            <dd className="col-sm-6">
                                                        <span className="text-info">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="itemID"
                                                                name="itemID"
                                                                value={this.state.itemID}
                                                                disabled
                                                            />
                                                        </span>
                                            </dd>
                                            <dt className="col-sm-6">Item Name</dt>
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

export default ViewItemByID;