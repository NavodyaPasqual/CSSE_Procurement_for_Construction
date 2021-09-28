import React, {Component} from 'react';
import './styles/button.css';
import './styles/forms.css'
import axios from "axios";
import Select from 'react-select';

//Initial states of input fields
const initialState = {
    orderID:'',
    site:'',
    item: '',
    quantity: 0,
    items: [],
    sites: [],
    selectedItem:[],
    selectedSite:[],
}

class AddOrder extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.onSiteSelect = this.onSiteSelect.bind(this);
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

    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        let order = {
            orderID: this.state.orderID,
            site: this.state.selectedSite,
            item: this.state.selectedItem,
            quantity: this.state.quantity
        }
        //call the end point and pass the values using axios
        console.log('data to send', order);
        axios.post('http://localhost:8081/order/create', order )
            .then(response => {
                alert('Successfully submitted')
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }

    onSiteSelect(e) {
        this.setState({selectedSite: e? e.map(item => item.value):[]});
    }

    onItemSelect(e) {
        this.setState({selectedItem: e? e.map(item => item.value): []});
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
                                <label htmlFor="item" className="form-label">Item</label>
                                <div className="mb-3">
                                        <Select
                                            options = {this.state.items}
                                            className="basic-multi-select"
                                            onChange={this.onItemSelect}
                                            isMulti
                                        />
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i
                                        className="fas fa-sort-numeric-up-alt"></i></span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quantity"
                                        name="quantity"
                                        value={this.state.quantity}
                                        onChange={this.onChange}
                                    />
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
