import React, {Component} from 'react';
import './styles/button.css';
import './styles/forms.css';
import './styles/alert.css';
import axios from "axios";

class UpdateSupplier extends Component {
    constructor(props) {
        super(props)
        this.onChangeSupplierID = this.onChangeSupplierID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeContactNo = this.onChangeContactNo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


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

    onChangeSupplierID(e) {
        this.setState({ supplierID: e.target.value })
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeAddress(e) {
        this.setState({ address: e.target.value })
    }

    onChangeContactNo(e) {
        this.setState({ contactNo: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const supplierObject = {
            supplierID: this.state.supplierID,
            name: this.state.name,
            address: this.state.address,
            contactNo: this.state.contactNo
        };

        axios.put('http://localhost:8081/supplier/update/' + this.props.match.params.id, supplierObject)
            .then((res) => {
                console.log(res.data)
                console.log('Supplier successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        // Redirect to Item List
        this.props.history.push('/suppliers')
    }

    render(){
        return (
            <div className="background row p-4 d-flex justify-content-center">
                <div className="container-3 w-50 mt-4 shadow pb-4 pt-4 mb-5 rounded">
                    <div >
                        <center><h3>Edit Supplier</h3></center>
                        <div className="p-3">
                            <form className="row g-3" onSubmit={this.onSubmit}>
                                <div className="col-12">
                                    <label htmlFor="supplierID" className="form-label">Supplier ID</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fas fa-italic"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="supplierID"
                                            name="supplierID"
                                            value={this.state.supplierID}
                                            onChange={this.onChangeSupplierID}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="name" className="form-label">Supplier name</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fas fa-users"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            value={this.state.address}
                                            onChange={this.onChangeAddress}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="contactNo" className="form-label">Contact Number</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="contactNo"
                                            name="contactNo"
                                            value={this.state.contactNo}
                                            onChange={this.onChangeContactNo}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button className="mt-4 button-red button2-red">Delete Supplier</button>
                                </div>
                                <div className="col-md-6 d-flex justify-content-md-end">
                                    <button className="mt-4 button-orange button2-orange">Update Supplier</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default UpdateSupplier;