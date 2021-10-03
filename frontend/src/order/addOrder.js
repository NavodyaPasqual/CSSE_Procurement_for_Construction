import React, {Component} from 'react';
import './styles/button.css';
import './styles/forms.css'
import axios from "axios";
import Select from 'react-select';

//Initial states of input fields
const initialState = {
    orderID:'',
    site:'',
    supplier: '',
    item1: '',
    item2: '',
    item3: '',
    quantity1: 0,
    quantity2: 0,
    quantity3: 0,
    items: [],
    sites: [],
    suppliers:[],
    selectedItem1:[],
    selectedItem2:[],
    selectedItem3:[],
    selectedSite:[],
    selectedSupplier:[]
}

class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onItemSelect1 = this.onItemSelect1.bind(this);
        this.onItemSelect2 = this.onItemSelect2.bind(this);
        this.onItemSelect3 = this.onItemSelect3.bind(this);
        this.onSiteSelect = this.onSiteSelect.bind(this);
        this.onSupplierSelect = this.onSupplierSelect.bind(this);
        this.state = initialState;

    }

    //to get workshop array from the backend
    componentDidMount() {
        axios.get('http://localhost:8081/item/')
            .then(response => {
                this.setState({items: response.data}, () => {
                    let data = [];
                    this.state.items.map((item, index) =>{
                        let  items = {
                            value:item._id,
                            label:item.name
                        }
                        data.push(items)
                    });
                    this.setState({items: data});
                })
            })
        axios.get('http://localhost:8081/site/')
            .then(response => {
                this.setState({sites: response.data}, () => {
                    let data = [];
                    this.state.sites.map((item, index) =>{
                        let  site = {
                            value:item._id,
                            label:item.name
                        }
                        data.push(site)
                    });
                    this.setState({sites: data});
                })
            })
        axios.get('http://localhost:8081/supplier/')
            .then(response => {
                this.setState({suppliers: response.data}, () => {
                    let data = [];
                    this.state.suppliers.map((item, index) =>{
                        let  supplier = {
                            value:item._id,
                            label:item.name
                        }
                        data.push(supplier)
                    });
                    this.setState({suppliers: data});
                })
            })

    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let order = {
            orderID: this.state.orderID,
            site: this.state.selectedSite,
            supplier: this.state.selectedSupplier,
            item1: this.state.selectedItem1,
            item2: this.state.selectedItem2,
            item3: this.state.selectedItem3,
            quantity1: this.state.quantity1,
            quantity2: this.state.quantity2,
            quantity3: this.state.quantity3
        }
        //call the end point and pass the values using axios
        console.log('data to send', order);
        axios.post('http://localhost:8081/order/create', order )
            .then(response => {
                alert('Successfully submitted')
                this.props.history.push('/orders');
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    onSiteSelect(e) {
        this.setState({selectedSite: e? e.map(item => item.value):[]});
    }

    onSupplierSelect(e) {
        this.setState({selectedSupplier: e? e.map(item => item.value):[]});
    }

    onItemSelect1(e) {
        this.setState({selectedItem1: e? e.map(item => item.value): []});
    }
    onItemSelect2(e) {
        this.setState({selectedItem2: e? e.map(item => item.value): []});
    }
    onItemSelect3(e) {
        this.setState({selectedItem3: e? e.map(item => item.value): []});
    }

    render() {
        return (
            <div className="background row p-4 d-flex justify-content-center">
                <div className="container-1 w-50 mt-4 mb-5 shadow pb-4 pt-4  rounded">
                    <h3>
                        <center>Add Order</center>
                    </h3>
                    <div className="p-3">
                        <form onSubmit={this.onSubmit} className="row g-3">
                            <div className="col-12">
                                <label htmlFor="orderID" className="form-label">Order ID</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="fas fa-italic"></i></span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="orderID"
                                        name="orderID"
                                        value={this.state.orderID}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="site" className="form-label">Site name</label>
                                <div className="mb-3">
                                    <Select
                                        options = {this.state.sites}
                                        className="basic-select"
                                        onChange={this.onSiteSelect}
                                        isMulti
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="supplier" className="form-label">Supplier name</label>
                                <div className="mb-3">
                                    <Select
                                        options = {this.state.suppliers}
                                        className="basic-select"
                                        onChange={this.onSupplierSelect}
                                        isMulti
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                <div className="col-6">
                                    <label htmlFor="item" className="form-label">Item 1</label>
                                    <div className="mb-3">
                                            <Select
                                                options = {this.state.items}
                                                className="basic-multi-select"
                                                onChange={this.onItemSelect1}
                                                isMulti
                                            />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="quantity1" className="form-label">Quantity</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i
                                            className="fas fa-sort-numeric-up-alt"></i></span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="quantity1"
                                            name="quantity1"
                                            value={this.state.quantity1}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="item" className="form-label">Item 2</label>
                                        <div className="mb-3">
                                            <Select
                                                options = {this.state.items}
                                                className="basic-multi-select"
                                                onChange={this.onItemSelect2}
                                                isMulti
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="quantity2" className="form-label">Quantity</label>
                                        <div className="input-group mb-3">
                                        <span className="input-group-text"><i
                                            className="fas fa-sort-numeric-up-alt"></i></span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="quantity2"
                                                name="quantity2"
                                                value={this.state.quantity2}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="item3" className="form-label">Item 3</label>
                                        <div className="mb-3">
                                            <Select
                                                options = {this.state.items}
                                                className="basic-multi-select"
                                                onChange={this.onItemSelect3}
                                                isMulti
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="quantity3" className="form-label">Quantity</label>
                                        <div className="input-group mb-3">
                                        <span className="input-group-text"><i
                                            className="fas fa-sort-numeric-up-alt"></i></span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="quantity3"
                                                name="quantity3"
                                                value={this.state.quantity3}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="mt-5 button-black button2-black">Create the Item</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default AddOrder;
