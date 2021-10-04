import React, {Component} from 'react';
import './styles/button.css';
import './styles/forms.css';
import './styles/alert.css';
import axios from "axios";

class UpdateItems extends Component {
    constructor(props) {
        super(props)
        this.onChangeItemID = this.onChangeItemID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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
                    name: res.data.name
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeItemID(e) {
        this.setState({ itemID: e.target.value })
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const itemObject = {
            itemID: this.state.itemID,
            name: this.state.name,
            type: this.state.type
        };

        axios.put('http://localhost:8081/item/update/' + this.props.match.params.id, itemObject)
            .then((res) => {
                console.log(res.data)
                console.log('Item successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        // Redirect to Item List
        this.props.history.push('/items')
    }

    render(){
        return (
            <div className="background row p-4 d-flex justify-content-center">
                <div className="container-3 w-50 mt-4 shadow pb-4 pt-4 mb-5 rounded">
                    <div >
                        <center><h3>Edit Item</h3></center>
                        <div className="p-3">
                            <form className="row g-3" onSubmit={this.onSubmit}>
                                <div className="col-12">
                                    <label htmlFor="siteID" className="form-label">Item ID</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fas fa-italic"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="siteID"
                                            name="siteID"
                                            value={this.state.itemID}
                                            onChange={this.onChangeItemID}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="name" className="form-label">Item Name</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fas fa-building"></i></span>
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
                                <div className="col-md-6">
                                    <button className="mt-4 button-red button2-red">Delete Item</button>
                                </div>
                                <div className="col-md-6 d-flex justify-content-md-end">
                                    <button className="mt-4 button-orange button2-orange">Update Item</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default UpdateItems;
